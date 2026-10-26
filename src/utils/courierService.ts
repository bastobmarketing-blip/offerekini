import fs from 'node:fs'
import path from 'node:path'
import type { Order } from '../types'

export interface CourierSettings {
  provider: 'steadfast' | 'pathao' | 'manual'
  apiKey: string
  secretKey: string
  enabled: boolean
}

const SETTINGS_FILE = path.resolve(process.cwd(), 'data/courier_settings.json')

const DEFAULT_SETTINGS: CourierSettings = {
  provider: 'steadfast',
  apiKey: process.env.STEADFAST_API_KEY || '',
  secretKey: process.env.STEADFAST_SECRET_KEY || '',
  enabled: true
}

export function getCourierSettings(): CourierSettings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'))
    }
  } catch (e) {}
  return DEFAULT_SETTINGS
}

export function saveCourierSettings(settings: CourierSettings): void {
  try {
    const dir = path.dirname(SETTINGS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8')
  } catch (e) {}
}

export interface SendToCourierResult {
  success: boolean
  consignmentId?: string | number
  trackingCode?: string
  error?: string
  raw?: any
}

export async function sendOrderToSteadfast(order: Order, customNote?: string): Promise<SendToCourierResult> {
  const settings = getCourierSettings()
  const apiKey = settings.apiKey || process.env.STEADFAST_API_KEY
  const secretKey = settings.secretKey || process.env.STEADFAST_SECRET_KEY

  if (!apiKey || !secretKey) {
    // If no credentials configured yet, simulate consignment for testing
    const mockTracking = `STDF-OK-${Math.floor(100000 + Math.random() * 899999)}`
    const mockConsignment = Math.floor(1000000 + Math.random() * 8999999)
    return {
      success: true,
      consignmentId: mockConsignment,
      trackingCode: mockTracking,
      raw: { mock: true, message: 'Steadfast API Key not configured yet — Mock Tracking ID generated' }
    }
  }

  try {
    // Clean phone number (must be 11 digits without hyphen)
    const cleanPhone = (order.customerPhone || '').replace(/[^0-9]/g, '')
    const codAmount = order.dueOnDelivery || order.totalAmount || 0

    const payload = {
      invoice: order.id,
      recipient_name: order.customerName,
      recipient_phone: cleanPhone,
      recipient_address: `${order.address}, ${order.district || ''}`,
      cod_amount: codAmount,
      note: customNote || `OfferKini Order #${order.id}`
    }

    const response = await fetch('https://portal.steadfast.com.bd/api/v1/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
        'Secret-Key': secretKey
      },
      body: JSON.stringify(payload)
    })

    const data: any = await response.json()

    if (response.ok && data.status === 200 && data.consignment) {
      return {
        success: true,
        consignmentId: data.consignment.consignment_id,
        trackingCode: data.consignment.tracking_code,
        raw: data
      }
    } else {
      return {
        success: false,
        error: data.message || data.error || 'Failed to place order in Steadfast',
        raw: data
      }
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network error reaching Steadfast portal'
    }
  }
}
