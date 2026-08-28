import type { Customer } from '../types'
import { orders } from './orders'

interface CustomerSeed {
  id: string
  name: string
  phone: string
  email?: string
  joinedAt: string
  addresses: { label: string; address: string; district: string; area: string }[]
}

const seeds: CustomerSeed[] = [
  {
    id: 'cus-1',
    name: 'তানভীর আহমেদ',
    phone: '01711-112233',
    email: 'tanvir.ahmed@gmail.com',
    joinedAt: '2026-02-10',
    addresses: [{ label: 'বাড়ি', address: 'বাসা ৫২, রোড ৭, ধানমন্ডি', district: 'ঢাকা', area: 'ধানমন্ডি' }]
  },
  {
    id: 'cus-2',
    name: 'নুসরাত জাহান',
    phone: '01822-334455',
    joinedAt: '2026-03-01',
    addresses: [{ label: 'বাড়ি', address: 'হাউস ১২, ব্লক সি, বসুন্ধরা', district: 'ঢাকা', area: 'বসুন্ধরা' }]
  },
  {
    id: 'cus-3',
    name: 'রফিকুল ইসলাম',
    phone: '01933-556677',
    joinedAt: '2026-01-22',
    addresses: [{ label: 'বাড়ি', address: 'বায়েজিদ, নাসিরাবাদ', district: 'চট্টগ্রাম', area: 'নাসিরাবাদ' }]
  },
  {
    id: 'cus-4',
    name: 'সুমাইয়া ইসলাম',
    phone: '01644-778899',
    email: 'sumaiya.islam@gmail.com',
    joinedAt: '2025-12-18',
    addresses: [{ label: 'বাড়ি', address: 'শাহবাগ, সেক্টর ২', district: 'ঢাকা', area: 'শাহবাগ' }]
  },
  {
    id: 'cus-5',
    name: 'মাহমুদুল হাসান',
    phone: '01555-990011',
    joinedAt: '2026-04-05',
    addresses: [{ label: 'বাড়ি', address: 'জিন্দাবাজার', district: 'সিলেট', area: 'জিন্দাবাজার' }]
  },
  {
    id: 'cus-6',
    name: 'ফারহানা আক্তার',
    phone: '01766-223344',
    joinedAt: '2025-11-30',
    addresses: [{ label: 'বাড়ি', address: 'বনানী, রোড ১১', district: 'ঢাকা', area: 'বনানী' }]
  }
]

export const customers: Customer[] = seeds.map((s) => {
  const custOrders = orders.filter((o) => o.customerPhone === s.phone)
  const delivered = custOrders.filter((o) => o.status === 'delivered')
  const cancelled = custOrders.filter((o) => o.status === 'cancelled' || o.status === 'returned')
  const totalSpending = delivered.reduce((sum, o) => sum + o.totalAmount, 0)
  return {
    id: s.id,
    name: s.name,
    phone: s.phone,
    email: s.email,
    totalOrders: custOrders.length,
    deliveredOrders: delivered.length,
    cancelledOrders: cancelled.length,
    totalSpending,
    joinedAt: s.joinedAt,
    addresses: s.addresses
  }
})

export function getCustomerByPhone(phone: string): Customer | undefined {
  return customers.find((c) => c.phone === phone)
}
