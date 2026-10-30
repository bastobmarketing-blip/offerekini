import fs from 'node:fs'
import path from 'node:path'
import type { Merchant } from '../types'

const MERCHANTS_FILE = path.resolve(process.cwd(), 'data/merchants_store.json')

const DEFAULT_MERCHANTS: Merchant[] = [
  {
    id: 'mer-1',
    storeName: 'Dhaka Lifestyle Store',
    ownerName: 'রহিম উদ্দিন',
    phone: '01711223344',
    email: 'rahim@dhakalifestyle.com',
    password: 'password123',
    logo: '/static/images/brand/offerkini-logo.png',
    description: 'ঢাকা ভিত্তিক ফ্যাশন ও লাইফস্টাইল পণ্যের সরবরাহকারী। ৩ বছর ধরে মানসম্পন্ন পণ্য সরবরাহ করছি।',
    address: 'মিরপুর-১০, ঢাকা',
    joinedAt: '2023-11-02',
    status: 'active',
    totalProducts: 5,
    totalOrders: 412,
    totalSales: 386500,
    rating: 4.6
  },
  {
    id: 'mer-2',
    storeName: 'HomeCare BD',
    ownerName: 'সাবিনা ইয়াসমিন',
    phone: '01822556677',
    email: 'sabina@homecarebd.com',
    password: 'password123',
    logo: '/static/images/brand/offerkini-logo.png',
    description: 'হোম ও কিচেন প্রোডাক্টের বিশ্বাসযোগ্য সাপ্লায়ার। গুণগত মান নিশ্চিত করি প্রতিটি পণ্যে।',
    address: 'বনানী, ঢাকা',
    joinedAt: '2024-01-15',
    status: 'active',
    totalProducts: 3,
    totalOrders: 268,
    totalSales: 214300,
    rating: 4.4
  },
  {
    id: 'mer-3',
    storeName: 'TechZone Bangladesh',
    ownerName: 'কামরুল হাসান',
    phone: '01933889900',
    email: 'kamrul@techzonebd.com',
    password: 'password123',
    logo: '/static/images/brand/offerkini-logo.png',
    description: 'ইলেকট্রনিক্স ও গ্যাজেট বিশেষজ্ঞ। অরিজিনাল পণ্য, সরাসরি ইম্পোর্ট করা সোর্স থেকে।',
    address: 'গুলশান-২, ঢাকা',
    joinedAt: '2023-08-20',
    status: 'active',
    totalProducts: 4,
    totalOrders: 587,
    totalSales: 742900,
    rating: 4.7
  }
]

function loadStoredMerchants(): Merchant[] {
  try {
    if (fs.existsSync(MERCHANTS_FILE)) {
      const data = JSON.parse(fs.readFileSync(MERCHANTS_FILE, 'utf-8'))
      if (Array.isArray(data) && data.length > 0) return data
    }
  } catch (e) {}
  return [...DEFAULT_MERCHANTS]
}

function saveMerchantsToFile(list: Merchant[]): void {
  try {
    const dir = path.dirname(MERCHANTS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(MERCHANTS_FILE, JSON.stringify(list, null, 2), 'utf-8')
  } catch (e) {}
}

export const merchants: Merchant[] = loadStoredMerchants()

export function getMerchantById(id: string): Merchant | undefined {
  return merchants.find((m) => m.id.toLowerCase() === id.toLowerCase())
}

export function addMerchant(data: Partial<Merchant> & { storeName: string; phone: string }): Merchant {
  const cleanPhone = data.phone.replace(/[^0-9]/g, '')
  const id = data.id || `mer-${Date.now().toString().slice(-6)}`
  
  const newMerchant: Merchant = {
    id,
    storeName: data.storeName,
    ownerName: data.ownerName || data.storeName,
    phone: cleanPhone,
    email: data.email || `${cleanPhone}@offerekini.com`,
    password: data.password || '123456',
    logo: data.logo || '/static/images/brand/offerkini-logo.png',
    description: data.description || 'বিশ্বস্ত মার্চেন্ট স্টোর',
    address: data.address || 'ঢাকা, বাংলাদেশ',
    joinedAt: new Date().toISOString().split('T')[0],
    status: data.status || 'active',
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    rating: 5.0
  }

  merchants.unshift(newMerchant)
  saveMerchantsToFile(merchants)
  return newMerchant
}

export function updateMerchant(id: string, updates: Partial<Merchant>): Merchant | null {
  const index = merchants.findIndex((m) => m.id.toLowerCase() === id.toLowerCase())
  if (index === -1) return null

  merchants[index] = { ...merchants[index], ...updates }
  saveMerchantsToFile(merchants)
  return merchants[index]
}

export function deleteMerchant(id: string): boolean {
  const index = merchants.findIndex((m) => m.id.toLowerCase() === id.toLowerCase())
  if (index !== -1) {
    merchants.splice(index, 1)
    saveMerchantsToFile(merchants)
    return true
  }
  return false
}
