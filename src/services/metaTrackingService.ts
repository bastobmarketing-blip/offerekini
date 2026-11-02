import fs from 'node:fs'
import path from 'node:path'
import type { Order } from '../types'
import { sendMetaServerEventDetailed } from '../utils/tracking'

export interface MetaPurchaseJob {
  id: string
  orderId: string
  eventName: 'Purchase'
  eventId: string
  status: 'pending' | 'processing' | 'sent' | 'failed' | 'skipped'
  orderTotal: number
  currency: 'BDT'
  customerName: string
  customerPhone: string
  productName: string
  createdAt: string
  confirmedBy: string
  attemptCount: number
  lastAttemptAt?: string
  nextRetryAt?: string
  lastError?: string
  fbtraceId?: string
  metaResponse?: any
  sentAt?: string
  skipReason?: string
}

const META_STORE_FILE = path.resolve(process.cwd(), 'data/meta_events_store.json')

function loadMetaJobs(): MetaPurchaseJob[] {
  try {
    if (fs.existsSync(META_STORE_FILE)) {
      const data = JSON.parse(fs.readFileSync(META_STORE_FILE, 'utf-8'))
      if (Array.isArray(data)) return data
    }
  } catch (e) {
    console.error('[MetaTrackingService] Error reading meta store file:', e)
  }
  return []
}

function saveMetaJobs(jobs: MetaPurchaseJob[]): void {
  try {
    const dir = path.dirname(META_STORE_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(META_STORE_FILE, JSON.stringify(jobs, null, 2), 'utf-8')
  } catch (e) {
    console.error('[MetaTrackingService] Error saving meta store file:', e)
  }
}

// In-memory cache synced to disk
let jobsCache: MetaPurchaseJob[] = loadMetaJobs()

export function getJobByOrderId(orderId: string): MetaPurchaseJob | undefined {
  const normId = (orderId || '').trim().toLowerCase()
  return jobsCache.find((j) => j.orderId.toLowerCase() === normId)
}

export function getAllMetaJobs(): MetaPurchaseJob[] {
  return [...jobsCache]
}

/**
 * Enqueues an order for Meta Purchase tracking.
 * Strictly Idempotent: If a job already exists for this orderId, it will NOT be recreated.
 */
export function enqueuePurchaseJob(order: Order, confirmedBy: string = 'admin'): { job: MetaPurchaseJob; isNew: boolean } {
  const existing = getJobByOrderId(order.id)
  if (existing) {
    return { job: existing, isNew: false }
  }

  const eventId = `offerkini_purchase_${order.id}`
  const firstItem = order.items && order.items[0]
  const productName = firstItem?.productName || 'Order Purchase'

  const newJob: MetaPurchaseJob = {
    id: `job_${order.id}`,
    orderId: order.id,
    eventName: 'Purchase',
    eventId,
    status: 'pending',
    orderTotal: order.totalAmount || 0,
    currency: 'BDT',
    customerName: order.customerName || 'Customer',
    customerPhone: order.customerPhone || '',
    productName,
    createdAt: new Date().toISOString(),
    confirmedBy,
    attemptCount: 0
  }

  jobsCache.unshift(newJob)
  saveMetaJobs(jobsCache)
  return { job: newJob, isNew: true }
}

/**
 * Marks a job or creates a skipped job for an order (e.g. duplicate or rejected order).
 * Prevents any Meta Purchase from ever being sent for this order.
 */
export function skipPurchaseJob(orderId: string, reason: string): boolean {
  const existing = getJobByOrderId(orderId)
  if (existing) {
    if (existing.status === 'sent') {
      return false // Cannot skip an event that was already sent
    }
    existing.status = 'skipped'
    existing.skipReason = reason
    saveMetaJobs(jobsCache)
    return true
  }

  const skippedJob: MetaPurchaseJob = {
    id: `job_${orderId}`,
    orderId,
    eventName: 'Purchase',
    eventId: `offerkini_purchase_${orderId}`,
    status: 'skipped',
    orderTotal: 0,
    currency: 'BDT',
    customerName: '',
    customerPhone: '',
    productName: '',
    createdAt: new Date().toISOString(),
    confirmedBy: 'admin',
    attemptCount: 0,
    skipReason: reason
  }

  jobsCache.unshift(skippedJob)
  saveMetaJobs(jobsCache)
  return true
}

/**
 * Executes delivery of a single Meta Purchase job.
 * Guaranteed Idempotency: Will never send twice if already 'sent' or 'skipped'.
 */
export async function dispatchPurchaseJob(jobIdOrOrderId: string): Promise<{ success: boolean; job?: MetaPurchaseJob; error?: string }> {
  const norm = (jobIdOrOrderId || '').trim().toLowerCase()
  const job = jobsCache.find((j) => j.id.toLowerCase() === norm || j.orderId.toLowerCase() === norm)
  
  if (!job) {
    return { success: false, error: 'Job not found' }
  }

  // Idempotency check: Already sent or explicitly skipped
  if (job.status === 'sent') {
    return { success: true, job }
  }
  if (job.status === 'skipped') {
    return { success: false, job, error: `Event skipped: ${job.skipReason || 'Non-billable order'}` }
  }

  job.status = 'processing'
  job.attemptCount += 1
  job.lastAttemptAt = new Date().toISOString()
  saveMetaJobs(jobsCache)

  try {
    const res = await sendMetaServerEventDetailed({
      eventName: 'Purchase',
      eventId: job.eventId,
      orderId: job.orderId,
      productName: job.productName,
      value: job.orderTotal,
      currency: job.currency,
      phone: job.customerPhone,
      name: job.customerName
    })

    if (res.success) {
      job.status = 'sent'
      job.sentAt = new Date().toISOString()
      job.fbtraceId = res.fbtraceId
      job.metaResponse = res.rawResponse
      job.lastError = undefined
      saveMetaJobs(jobsCache)
      console.log(`[MetaTrackingService] Successfully sent Purchase for order ${job.orderId}. Trace: ${job.fbtraceId}`)
      return { success: true, job }
    } else {
      job.status = 'failed'
      job.lastError = res.error || 'Meta API returned 0 events received'
      job.metaResponse = res.rawResponse
      saveMetaJobs(jobsCache)
      console.error(`[MetaTrackingService] Delivery failed for order ${job.orderId}:`, job.lastError)
      return { success: false, job, error: job.lastError }
    }
  } catch (err: any) {
    job.status = 'failed'
    job.lastError = err.message || 'Unknown network error'
    saveMetaJobs(jobsCache)
    console.error(`[MetaTrackingService] Exception sending order ${job.orderId}:`, err)
    return { success: false, job, error: job.lastError }
  }
}

/**
 * Manually retries a failed Meta Purchase job for an order.
 */
export async function retryMetaJob(orderId: string): Promise<{ success: boolean; message: string; job?: MetaPurchaseJob }> {
  const job = getJobByOrderId(orderId)
  if (!job) {
    return { success: false, message: 'এই অর্ডারের জন্য কোনো ট্র্যাকিং জব পাওয়া যায়নি।' }
  }
  if (job.status === 'sent') {
    return { success: true, message: 'এই অর্ডারটির পার্চেস ইভেন্ট মেটাতে ইতিমধ্যে সফলভাবে পাঠানো হয়েছে।', job }
  }
  if (job.status === 'skipped') {
    return { success: false, message: 'এই অর্ডারটি ডুপ্লিকেট বা বাতিল হিসেবে স্কিপ করা হয়েছে।', job }
  }

  const result = await dispatchPurchaseJob(job.id)
  if (result.success) {
    return { success: true, message: `মেটাতে সফলভাবে পার্চেস পাঠানো হয়েছে! Trace ID: ${result.job?.fbtraceId || 'N/A'}`, job: result.job }
  }
  return { success: false, message: `মেটা ট্র্যাকিং ব্যর্থ হয়েছে: ${result.error || 'Unknown error'}`, job: result.job }
}

/**
 * Background worker: retries pending/failed jobs with exponential backoff.
 */
export async function processQueueWorker(): Promise<number> {
  const now = Date.now()
  let processed = 0

  for (const job of jobsCache) {
    if (job.status === 'pending') {
      await dispatchPurchaseJob(job.id)
      processed++
    } else if (job.status === 'failed' && job.attemptCount < 5) {
      // Exponential backoff: 2^attempts * 60 seconds
      const backoffMs = Math.pow(2, job.attemptCount) * 60 * 1000
      const lastTime = job.lastAttemptAt ? new Date(job.lastAttemptAt).getTime() : 0
      if (now - lastTime >= backoffMs) {
        console.log(`[MetaTrackingWorker] Retrying order ${job.orderId} (Attempt ${job.attemptCount + 1})...`)
        await dispatchPurchaseJob(job.id)
        processed++
      }
    }
  }

  return processed
}

// Start recurring queue processor every 60 seconds
let workerInterval: any = null
export function initMetaQueueWorker(): void {
  if (workerInterval) return
  workerInterval = setInterval(() => {
    processQueueWorker().catch((e) => console.error('[MetaTrackingWorker] Error in worker tick:', e))
  }, 60000)
}
