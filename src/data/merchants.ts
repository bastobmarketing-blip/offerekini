import type { Merchant } from '../types'

export const merchants: Merchant[] = [
  {
    id: 'mer-1',
    storeName: 'Dhaka Lifestyle Store',
    ownerName: 'রহিম উদ্দিন',
    phone: '01711-223344',
    email: 'rahim@dhakalifestyle.com',
    logo: '/static/images/brand/offerkini-logo.png',
    description:
      'ঢাকা ভিত্তিক ফ্যাশন ও লাইফস্টাইল পণ্যের সরবরাহকারী। ৩ বছর ধরে মানসম্পন্ন পণ্য সরবরাহ করছি।',
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
    phone: '01822-556677',
    email: 'sabina@homecarebd.com',
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
    phone: '01933-889900',
    email: 'kamrul@techzonebd.com',
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

export function getMerchantById(id: string): Merchant | undefined {
  return merchants.find((m) => m.id === id)
}
