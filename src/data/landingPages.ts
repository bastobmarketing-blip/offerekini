import fs from 'node:fs'
import path from 'node:path'

export interface LandingPageConfig {
  id: string
  slug: string
  title: string
  headline: string
  subheadline: string
  productName: string
  productId?: string
  productImage: string
  badgeText?: string
  themeColor?: 'blue' | 'amber' | 'emerald' | 'purple' | 'red'
  pillar1Icon?: string
  pillar1Text?: string
  pillar2Icon?: string
  pillar2Text?: string
  pillar3Icon?: string
  pillar3Text?: string
  pillar4Icon?: string
  pillar4Text?: string
  regularPrice: number
  offerPrice: number
  regularWeight: string
  deliveryDhaka: number
  deliveryOutside: number
  megaDealEnabled?: boolean
  megaPrice?: number
  megaWeight?: string
  megaSavings?: string
  active: boolean
  createdAt: string
  customHtmlPath?: string
}

const DATA_FILE = path.resolve(process.cwd(), 'data/landing_pages.json')

const DEFAULT_PAGES: LandingPageConfig[] = [
  {
    id: 'lp-focus-king',
    slug: 'focus_king',
    title: 'Focus King — 500g & 1KG | Daily Focus, Energy & Productivity Routine Support',
    headline: 'FOCUS KING',
    subheadline: 'পড়াশোনা হোক বা কাজ—প্রতিদিনের Focus, Energy & Productivity Routine-এর জন্য Daily Support।',
    productName: 'Focus King',
    productId: 'p-focus-king',
    productImage: '/static/images/products/focus-king.jpg',
    badgeText: 'প্রতিদিন মাত্র ৳30 ইনভেস্ট করুন আপনার Focus Routine-এ।',
    themeColor: 'blue',
    pillar1Icon: '🎯',
    pillar1Text: 'BETTER FOCUS',
    pillar2Icon: '⚡',
    pillar2Text: 'MORE ENERGY',
    pillar3Icon: '⚙️',
    pillar3Text: 'PRODUCTIVITY',
    pillar4Icon: '🌿',
    pillar4Text: 'NATURAL SUPPORT',
    regularPrice: 1000,
    offerPrice: 890,
    regularWeight: '500g রেগুলার প্যাক',
    deliveryDhaka: 60,
    deliveryOutside: 100,
    megaDealEnabled: true,
    megaPrice: 1390,
    megaWeight: '1 KG মেগা সেভার',
    megaSavings: '৳550+ সেভ!',
    active: true,
    createdAt: '2026-09-17'
  },
  {
    id: 'lp-testo-king',
    slug: 'testo_king',
    title: 'Testo King — প্রিমিয়াম ফর্মুলা | স্ট্যামিনা, ভাইটালিটি ও এনার্জি বুস্টার',
    headline: 'TESTO KING',
    subheadline: 'ব্যস্ত জীবন, রাত জেগে কাজ কিংবা পড়াশোনা — নিজের প্রতিদিনের রুটিনে বেছে নিন Testo King।',
    productName: 'Testo King',
    productId: 'p-testo-king',
    productImage: '/testo_king/jar.webp',
    badgeText: 'ন্যাচারাল হার্বাল এনার্জি সাপোর্ট ফর্মুলা',
    themeColor: 'amber',
    regularPrice: 1290,
    offerPrice: 990,
    regularWeight: '500g রেগুলার জার',
    deliveryDhaka: 60,
    deliveryOutside: 100,
    megaDealEnabled: true,
    megaPrice: 1490,
    megaWeight: '২টি জার মেগা কম্বো',
    megaSavings: 'ফ্রি ডেলিভারি + ৳৮০০ সেভ!',
    active: true,
    createdAt: '2026-10-18',
    customHtmlPath: '/testo_king/index.html'
  }
]

let cachedPages: LandingPageConfig[] = []

function loadPages(): LandingPageConfig[] {
  if (cachedPages.length > 0) return cachedPages
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8')
      const parsed = JSON.parse(data)
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedPages = parsed
        return cachedPages
      }
    }
  } catch (err) {
    console.error('Failed to read landing pages file:', err)
  }
  cachedPages = [...DEFAULT_PAGES]
  savePages(cachedPages)
  return cachedPages
}

function savePages(pages: LandingPageConfig[]): void {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(DATA_FILE, JSON.stringify(pages, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to save landing pages file:', err)
  }
}

export function getAllLandingPages(): LandingPageConfig[] {
  return loadPages()
}

export function getLandingPageBySlug(slug: string): LandingPageConfig | undefined {
  const pages = loadPages()
  const clean = slug.trim().toLowerCase().replace(/^\//, '')
  return pages.find((p) => p.slug.toLowerCase() === clean || p.slug.toLowerCase() === slug.toLowerCase())
}

export function getLandingPageForProduct(productIdOrSlug: string): LandingPageConfig | undefined {
  if (!productIdOrSlug) return undefined
  const pages = loadPages().filter((p) => p.active)
  const clean = productIdOrSlug.trim().toLowerCase()
  const cleanNormalized = clean.replace(/[_-]/g, '')

  return pages.find((p) => {
    if (p.productId && p.productId.toLowerCase() === clean) return true
    if (p.slug.toLowerCase() === clean) return true
    if (p.slug.replace(/[_-]/g, '') === cleanNormalized) return true
    if (p.productName && p.productName.toLowerCase().replace(/\s+/g, '-') === clean) return true
    if (clean.includes('focus') && p.slug.includes('focus')) return true
    if (clean.includes('testo') && p.slug.includes('testo')) return true
    return false
  })
}

export function getLandingPageUrl(lp: LandingPageConfig): string {
  if (lp.slug === 'focus_king' || lp.slug === 'focus-king') return '/focus_king'
  if (lp.slug === 'testo_king' || lp.slug === 'testo-king') return '/testo_king/'
  return `/${lp.slug}`
}

export function createLandingPage(input: Partial<LandingPageConfig> & { slug: string; title: string; productName: string }): LandingPageConfig {
  const pages = loadPages()
  const cleanSlug = input.slug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-')
  
  // Check if slug exists
  const existingIndex = pages.findIndex((p) => p.slug === cleanSlug)
  const newPage: LandingPageConfig = {
    id: input.id || `lp-${Date.now()}`,
    slug: cleanSlug,
    title: input.title,
    headline: input.headline || input.productName,
    subheadline: input.subheadline || 'সেরা কোয়ালিটি ও দ্রুত হোম ডেলিভারি নিশ্চিন্তে অর্ডার করুন।',
    productName: input.productName,
    productId: input.productId,
    productImage: input.productImage || '/static/images/brand/offerkini-logo.png',
    badgeText: input.badgeText || 'সেরা ডিল অফার',
    themeColor: input.themeColor || 'blue',
    pillar1Icon: input.pillar1Icon || '✨',
    pillar1Text: input.pillar1Text || 'PREMIUM QUALITY',
    pillar2Icon: input.pillar2Icon || '⚡',
    pillar2Text: input.pillar2Text || 'FAST RESULTS',
    pillar3Icon: input.pillar3Icon || '🛡️',
    pillar3Text: input.pillar3Text || '100% AUTHENTIC',
    pillar4Icon: input.pillar4Icon || '🚚',
    pillar4Text: input.pillar4Text || 'COD AVAILABLE',
    regularPrice: Number(input.regularPrice) || 1200,
    offerPrice: Number(input.offerPrice) || 890,
    regularWeight: input.regularWeight || '১ প্যাক রেগুলার',
    deliveryDhaka: Number(input.deliveryDhaka) || 60,
    deliveryOutside: Number(input.deliveryOutside) || 100,
    megaDealEnabled: input.megaDealEnabled ?? true,
    megaPrice: Number(input.megaPrice) || 1490,
    megaWeight: input.megaWeight || '২ প্যাক মেগা সেভার',
    megaSavings: input.megaSavings || 'ফ্রি ডেলিভারি + স্পেশাল ছাড়!',
    active: input.active ?? true,
    createdAt: new Date().toISOString().split('T')[0]
  }

  if (existingIndex >= 0) {
    pages[existingIndex] = { ...pages[existingIndex], ...newPage }
  } else {
    pages.unshift(newPage)
  }

  savePages(pages)
  return newPage
}

export function deleteLandingPage(idOrSlug: string): boolean {
  const pages = loadPages()
  const index = pages.findIndex((p) => p.id === idOrSlug || p.slug === idOrSlug)
  if (index >= 0) {
    pages.splice(index, 1)
    savePages(pages)
    return true
  }
  return false
}
