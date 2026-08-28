// ==========================================================================
// OfferKini — Shared TypeScript types
// Frontend-only prototype. These types describe the shape of data that will
// eventually come from a real backend/database. Keeping them centralized
// makes it easy to swap mock data modules for real API calls later.
// ==========================================================================

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export type ProductBadge = 'true_price' | 'best_deal' | 'featured' | 'new' | 'limited_deal'

export type ProductStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'out_of_stock'
  | 'hidden'

export interface ProductVariant {
  id: string
  label: string // e.g. "Red / Large"
  extraPrice?: number // added to offerKiniPrice, default 0
  stock: number
}

// A single customer "trust" proof shown in a product's review slider —
// either a review screenshot (image) or a short review video (YouTube URL).
// Merchants/admins can add or remove these per product.
export interface ReviewProof {
  id: string
  type: 'image' | 'video'
  url: string // image URL, or a YouTube URL / bare video ID for videos
}

export interface Product {
  id: string
  slug: string
  name: string
  nameEn?: string
  category: string // category slug
  merchantId: string
  image: string
  gallery: string[]
  referencePrice: number
  offerKiniPrice: number
  savings: number
  savingsPercent: number
  stockStatus: StockStatus
  stock: number
  badge?: ProductBadge
  status: ProductStatus
  rating: number
  reviewCount: number
  shortDescription: string
  description: string
  benefits: string[]
  specifications: { label: string; value: string }[]
  variants: ProductVariant[]
  sku: string
  weightGrams: number
  supplyPrice: number
  deliveryCharge: number
  videoUrl?: string // "How to use this product" YouTube video, shown on PDP
  reviewProofs: ReviewProof[] // customer review screenshots/videos (trust slider)
  isFeatured: boolean
  isNewArrival: boolean
  isTruePrice: boolean
  createdAt: string
}

export interface Category {
  id: string
  slug: string
  name: string
  nameEn: string
  image: string
  icon: string
  productCount: number
  enabled: boolean
  order: number
}

export type MerchantStatus = 'active' | 'pending' | 'suspended'

export interface Merchant {
  id: string
  storeName: string
  ownerName: string
  phone: string
  email: string
  logo: string
  description: string
  address: string
  joinedAt: string
  status: MerchantStatus
  totalProducts: number
  totalOrders: number
  totalSales: number
  rating: number
}

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'processing'
  | 'ready'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'

export type PaymentStatus = 'advance_paid' | 'fully_paid' | 'unpaid' | 'refunded'

export interface OrderTimelineStep {
  key: OrderStatus
  label: string
  timestamp?: string
  done: boolean
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  variantLabel?: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  address: string
  district: string
  area: string
  merchantId: string
  items: OrderItem[]
  productTotal: number
  deliveryCharge: number
  advancePaid: number
  dueOnDelivery: number
  totalAmount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  createdAt: string
  estimatedDelivery: string
  timeline: OrderTimelineStep[]
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  totalOrders: number
  deliveredOrders: number
  cancelledOrders: number
  totalSpending: number
  joinedAt: string
  addresses: { label: string; address: string; district: string; area: string }[]
}

export type SettlementStatus = 'pending' | 'approved' | 'paid' | 'disputed'

export interface Settlement {
  id: string
  merchantId: string
  date: string
  orderCount: number
  grossAmount: number
  adjustments: number
  netAmount: number
  status: SettlementStatus
}

export interface CartItem {
  productId: string
  variantId?: string
  quantity: number
}
