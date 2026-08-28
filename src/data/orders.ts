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
