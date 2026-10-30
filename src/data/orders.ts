import fs from 'node:fs'
import path from 'node:path'
import type { Order, OrderStatus, OrderTimelineStep, PaymentStatus } from '../types'
import { products } from './products'
import { computeOrderPayment } from '../utils/pricing'

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'অর্ডার গ্রহণ করা হয়েছে',
  accepted: 'Merchant অর্ডার গ্রহণ করেছে',
  processing: 'প্যাক করা হচ্ছে',
  ready: 'ডেলিভারির জন্য প্রস্তুত',
  shipped: 'কুরিয়ারে দেওয়া হয়েছে',
  delivered: 'ডেলিভারি সম্পন্ন হয়েছে',
  cancelled: 'অর্ডার বাতিল হয়েছে',
  returned: 'পণ্য ফেরত দেওয়া হয়েছে'
}

const FULL_FLOW: OrderStatus[] = ['pending', 'accepted', 'processing', 'shipped', 'delivered']

export function buildTimeline(currentStatus: OrderStatus, baseDate: Date): OrderTimelineStep[] {
  if (currentStatus === 'cancelled' || currentStatus === 'returned') {
    const idx = 2
    return FULL_FLOW.slice(0, idx + 1).map((key, i) => ({
      key,
      label: STATUS_LABELS[key],
      timestamp: new Date(baseDate.getTime() + i * 3600_000).toISOString(),
      done: true
    })).concat([
      {
        key: currentStatus,
        label: STATUS_LABELS[currentStatus],
        timestamp: new Date(baseDate.getTime() + 4 * 3600_000).toISOString(),
        done: true
      }
    ])
  }
  const currentIdx = FULL_FLOW.indexOf(currentStatus)
  return FULL_FLOW.map((key, i) => ({
    key,
    label: STATUS_LABELS[key],
    timestamp: i <= currentIdx ? new Date(baseDate.getTime() + i * 5 * 3600_000).toISOString() : undefined,
    done: i <= currentIdx
  }))
}

interface OrderSeed {
  id: string
  customerName: string
  customerPhone: string
  address: string
  district: string
  area: string
  productId: string
  quantity: number
  status: OrderStatus
  daysAgo: number
}

const seeds: OrderSeed[] = [
  { id: 'OK-10245', customerName: 'তানভীর আহমেদ', customerPhone: '01711-112233', address: 'বাসা ৫২, রোড ৭, ধানমন্ডি', district: 'ঢাকা', area: 'ধানমন্ডি', productId: 'p-1', quantity: 1, status: 'delivered', daysAgo: 6 },
  { id: 'OK-10246', customerName: 'নুসরাত জাহান', customerPhone: '01822-334455', address: 'হাউস ১২, ব্লক সি, বসুন্ধরা', district: 'ঢাকা', area: 'বসুন্ধরা', productId: 'p-6', quantity: 1, status: 'shipped', daysAgo: 2 },
  { id: 'OK-10247', customerName: 'রফিকুল ইসলাম', customerPhone: '01933-556677', address: 'বায়েজিদ, নাসিরাবাদ', district: 'চট্টগ্রাম', area: 'নাসিরাবাদ', productId: 'p-9', quantity: 1, status: 'processing', daysAgo: 1 },
  { id: 'OK-10248', customerName: 'সুমাইয়া ইসলাম', customerPhone: '01644-778899', address: 'শাহবাগ, সেক্টর ২', district: 'ঢাকা', area: 'শাহবাগ', productId: 'p-7', quantity: 2, status: 'delivered', daysAgo: 10 },
  { id: 'OK-10249', customerName: 'মাহমুদুল হাসান', customerPhone: '01555-990011', address: 'জিন্দাবাজার', district: 'সিলেট', area: 'জিন্দাবাজার', productId: 'p-2', quantity: 1, status: 'accepted', daysAgo: 0 },
  { id: 'OK-10250', customerName: 'ফারহানা আক্তার', customerPhone: '01766-223344', address: 'বনানী, রোড ১১', district: 'ঢাকা', area: 'বনানী', productId: 'p-10', quantity: 1, status: 'delivered', daysAgo: 15 },
  { id: 'OK-10251', customerName: 'আরিফুল ইসলাম', customerPhone: '01877-445566', address: 'উত্তরা সেক্টর ৭', district: 'ঢাকা', area: 'উত্তরা', productId: 'p-3', quantity: 1, status: 'delivered', daysAgo: 20 },
  { id: 'OK-10252', customerName: 'তাসনিম রহমান', customerPhone: '01988-667788', address: 'আগ্রাবাদ', district: 'চট্টগ্রাম', area: 'আগ্রাবাদ', productId: 'p-8', quantity: 1, status: 'pending', daysAgo: 0 },
  { id: 'OK-10253', customerName: 'ইমরান হোসেন', customerPhone: '01711-889900', address: 'মিরপুর-১', district: 'ঢাকা', area: 'মিরপুর', productId: 'p-4', quantity: 1, status: 'cancelled', daysAgo: 3 },
  { id: 'OK-10254', customerName: 'সাদিয়া ইসলাম', customerPhone: '01822-001122', address: 'বাড্ডা লিংক রোড', district: 'ঢাকা', area: 'বাড্ডা', productId: 'p-11', quantity: 1, status: 'delivered', daysAgo: 8 },
  { id: 'OK-10255', customerName: 'জাহিদ হাসান', customerPhone: '01933-223344', address: 'খুলশী', district: 'চট্টগ্রাম', area: 'খুলশী', productId: 'p-5', quantity: 2, status: 'delivered', daysAgo: 12 },
  { id: 'OK-10256', customerName: 'রুমানা পারভীন', customerPhone: '01644-334455', address: 'মোহাম্মদপুর', district: 'ঢাকা', area: 'মোহাম্মদপুর', productId: 'p-12', quantity: 1, status: 'ready', daysAgo: 1 },
  { id: 'OK-10257', customerName: 'শাহরিয়ার কবির', customerPhone: '01555-445566', address: 'বহদ্দারহাট', district: 'চট্টগ্রাম', area: 'বহদ্দারহাট', productId: 'p-1', quantity: 1, status: 'delivered', daysAgo: 18 },
  { id: 'OK-10258', customerName: 'নাজিয়া সুলতানা', customerPhone: '01766-556677', address: 'উপশহর', district: 'সিলেট', area: 'উপশহর', productId: 'p-6', quantity: 1, status: 'delivered', daysAgo: 25 },
  { id: 'OK-10259', customerName: 'কামরুজ্জামান', customerPhone: '01877-667788', address: 'মালিবাগ', district: 'ঢাকা', area: 'মালিবাগ', productId: 'p-2', quantity: 1, status: 'returned', daysAgo: 9 },
  { id: 'OK-10260', customerName: 'রিফাত হোসেন', customerPhone: '01988-778899', address: 'সাগরিকা রোড', district: 'চট্টগ্রাম', area: 'সাগরিকা', productId: 'p-3', quantity: 1, status: 'delivered', daysAgo: 5 },
  { id: 'OK-10261', customerName: 'তানজিলা আক্তার', customerPhone: '01711-990011', address: 'ধানমন্ডি রোড ৯', district: 'ঢাকা', area: 'ধানমন্ডি', productId: 'p-7', quantity: 1, status: 'delivered', daysAgo: 30 },
  { id: 'OK-10262', customerName: 'ওয়ালিউল্লাহ', customerPhone: '01822-112233', address: 'তেজগাঁও', district: 'ঢাকা', area: 'তেজগাঁও', productId: 'p-9', quantity: 1, status: 'delivered', daysAgo: 22 },
  { id: 'OK-10263', customerName: 'মিথিলা ফেরদৌস', customerPhone: '01933-334455', address: 'জামালখান', district: 'চট্টগ্রাম', area: 'জামালখান', productId: 'p-10', quantity: 1, status: 'processing', daysAgo: 1 },
  { id: 'OK-10264', customerName: 'আশরাফুল আলম', customerPhone: '01644-556677', address: 'গুলশান-১', district: 'ঢাকা', area: 'গুলশান', productId: 'p-4', quantity: 1, status: 'delivered', daysAgo: 14 }
]

export const orders: Order[] = seeds.map((s) => {
  const product = products.find((p) => p.id === s.productId)!
  const payment = computeOrderPayment(product.offerKiniPrice, s.quantity, product.deliveryCharge)
  const createdDate = new Date(Date.now() - s.daysAgo * 86400_000)
  const paymentStatus: PaymentStatus =
    s.status === 'delivered' ? 'fully_paid' : s.status === 'returned' ? 'refunded' : 'advance_paid'

  return {
    id: s.id,
    customerName: s.customerName,
    customerPhone: s.customerPhone,
    address: s.address,
    district: s.district,
    area: s.area,
    merchantId: product.merchantId,
    items: [
      {
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        quantity: s.quantity,
        unitPrice: product.offerKiniPrice
      }
    ],
    productTotal: payment.productTotal,
    deliveryCharge: payment.deliveryCharge,
    advancePaid: payment.payNow,
    dueOnDelivery: payment.dueOnDelivery,
    totalAmount: payment.grandTotal,
    status: s.status,
    paymentStatus,
    createdAt: createdDate.toISOString(),
    estimatedDelivery: new Date(createdDate.getTime() + 3 * 86400_000).toISOString(),
    timeline: buildTimeline(s.status, createdDate)
  }
})

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id.toLowerCase() === id.toLowerCase())
}

export function getOrdersByMerchant(merchantId: string): Order[] {
  return orders.filter((o) => o.merchantId === merchantId)
}

export function getOrdersByPhone(phone: string): Order[] {
  return orders.filter((o) => o.customerPhone === phone)
}

export interface CreateOrderInput {
  customerName: string
  customerPhone: string
  address: string
  district?: string
  area?: string
  productName: string
  productId?: string
  merchantId?: string
  productImage?: string
  package?: string
  quantity?: number
  price: number
  delivery: number
  total: number
}

export function createOrder(data: CreateOrderInput): Order {
  const orderId = `OK-TK-${Math.floor(10000 + Math.random() * 89999)}`
  const now = new Date()

  let district = data.district || ''
  if (!district) {
    const knownDistricts = [
      'ঢাকা', 'Dhaka', 'চট্টগ্রাম', 'Chittagong', 'সিলেট', 'Sylhet', 'রাজশাহী', 'Rajshahi',
      'খুলনা', 'Khulna', 'বরিশাল', 'Barisal', 'রংপুর', 'Rangpur', 'ময়মনসিংহ', 'Mymensingh',
      'কুমিল্লা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'বগুড়া', 'দিনাজপুর', 'পাবনা', 'যশোর'
    ]
    for (const d of knownDistricts) {
      if (data.address && data.address.includes(d)) {
        district = d
        break
      }
    }
    if (!district) district = 'ঢাকা'
  }

  // Auto-resolve merchant and product details
  let matchedProduct = data.productId ? products.find((p) => p.id === data.productId) : undefined
  if (!matchedProduct && data.productName) {
    const searchLower = data.productName.toLowerCase()
    matchedProduct = products.find(
      (p) =>
        p.name.toLowerCase() === searchLower ||
        p.nameEn.toLowerCase() === searchLower ||
        searchLower.includes(p.name.toLowerCase()) ||
        searchLower.includes(p.slug.toLowerCase()) ||
        p.slug.includes(searchLower)
    )
  }

  const resolvedMerchantId = data.merchantId || matchedProduct?.merchantId || 'mer-1'
  const resolvedProductId = data.productId || matchedProduct?.id || 'p-testo-king'
  const resolvedProductName = data.productName || matchedProduct?.name || 'অফারকিনি প্রোডাক্ট'
  const resolvedProductImage = data.productImage || matchedProduct?.image || '/testo_king/jar.webp'

  const newOrder: Order = {
    id: orderId,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    address: data.address,
    district,
    area: data.area || district,
    merchantId: resolvedMerchantId,
    items: [
      {
        productId: resolvedProductId,
        productName: resolvedProductName,
        productImage: resolvedProductImage,
        quantity: data.quantity || (data.package === '2x' ? 2 : 1),
        unitPrice: data.price
      }
    ],
    productTotal: data.price,
    deliveryCharge: data.delivery,
    advancePaid: 0,
    dueOnDelivery: data.total,
    totalAmount: data.total,
    status: 'pending',
    paymentStatus: 'cod',
    createdAt: now.toISOString(),
    estimatedDelivery: new Date(now.getTime() + 3 * 86400_000).toISOString(),
    timeline: buildTimeline('pending', now)
  }

  orders.unshift(newOrder)
  saveCustomOrders()
  return newOrder
}

const ORDERS_FILE = path.resolve(process.cwd(), 'data/orders_store.json')

function loadCustomOrders(): Order[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'))
      if (Array.isArray(data)) return data
    }
  } catch (e) {}
  return []
}

function saveCustomOrders(): void {
  try {
    const dir = path.dirname(ORDERS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8')
  } catch (e) {}
}

// Load previously saved orders on startup
const storedOrders = loadCustomOrders()
if (storedOrders.length > 0) {
  for (const so of storedOrders) {
    const idx = orders.findIndex((o) => o.id === so.id)
    if (idx >= 0) {
      orders[idx] = so
    } else {
      orders.unshift(so)
    }
  }
}

export function updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
  const order = orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase())
  if (!order) return null

  order.status = status
  order.timeline = buildTimeline(status, new Date(order.createdAt))
  if (status === 'delivered') order.paymentStatus = 'fully_paid'
  if (status === 'returned') order.paymentStatus = 'refunded'

  saveCustomOrders()
  return order
}

export function updateOrderCourier(orderId: string, info: { consignmentId?: string | number; trackingCode?: string; courierProvider?: string }): Order | null {
  const order = orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase())
  if (!order) return null

  if (info.consignmentId) order.consignmentId = info.consignmentId
  if (info.trackingCode) order.trackingCode = info.trackingCode
  if (info.courierProvider) order.courierProvider = info.courierProvider
  if (order.status === 'pending' || order.status === 'accepted' || order.status === 'processing') {
    order.status = 'ready'
  }

  saveCustomOrders()
  return order
}
