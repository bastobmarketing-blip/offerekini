import type { Product, ReviewProof } from '../types'
import { calcSavings, calcSavingsPercent } from '../utils/pricing'

// Helper so every product entry only needs reference + offerKini price;
// savings fields are derived — never hard-coded, never computed in JSX.
function withSavings(p: Omit<Product, 'savings' | 'savingsPercent'>): Product {
  return {
    ...p,
    savings: calcSavings(p.referencePrice, p.offerKiniPrice),
    savingsPercent: calcSavingsPercent(p.referencePrice, p.offerKiniPrice)
  }
}

// Placeholder "how to use this product" YouTube video shown on every PDP
// until each merchant uploads their own real demo video via the merchant
// panel's "Product Video URL" field. (Big Buck Bunny — public domain demo.)
export const HOW_TO_USE_VIDEO_URL = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'

// Fixed generic "other marketplaces charge more" price-proof screenshot,
// shown once on every PDP (not merchant-editable — it's a site-wide trust
// element, not per-product content).
export const PRICE_PROOF_IMAGE = '/static/images/proof/price-proof-generic.jpg'

// Seed content for each product's customer-reviews trust slider. Merchants
// (and admins) can add more items — image OR video — or delete these from
// the product edit page any time; see reviewProofs on the Product type.
let reviewProofSeq = 0
export function defaultReviewProofs(): ReviewProof[] {
  return [
    { id: `rp-seed-${++reviewProofSeq}`, type: 'image', url: '/static/images/proof/review-proof-generic.jpg' }
  ]
}

export const products: Product[] = [
  withSavings({
    id: 'p-1',
    slug: 'wireless-earbuds-pro',
    name: 'ওয়্যারলেস ইয়ারবাডস প্রো',
    nameEn: 'Wireless Earbuds Pro',
    category: 'electronics',
    merchantId: 'mer-3',
    image: '/static/images/products/earbuds.jpg',
    gallery: ['/static/images/products/earbuds.jpg'],
    referencePrice: 1800,
    offerKiniPrice: 990,
    stockStatus: 'in_stock',
    stock: 42,
    badge: 'true_price',
    status: 'approved',
    rating: 4.5,
    reviewCount: 128,
    shortDescription: 'ব্লুটুথ ৫.৩, ২৪ ঘণ্টা ব্যাটারি ব্যাকআপ, নয়েজ ক্যান্সেলেশন সহ প্রিমিয়াম ইয়ারবাডস।',
    description:
      'দৈনন্দিন ব্যবহারের জন্য তৈরি এই ওয়্যারলেস ইয়ারবাডস প্রো দিচ্ছে ক্লিয়ার সাউন্ড, দীর্ঘ ব্যাটারি লাইফ এবং আরামদায়ক ফিট। চার্জিং কেসের মাধ্যমে সহজেই ৪+ বার ফুল চার্জ করা যায়।',
    benefits: [
      'ব্লুটুথ ৫.৩ — স্টেবল কানেকশন',
      '২৪ ঘণ্টা টোটাল প্লেব্যাক টাইম',
      'IPX4 ওয়াটার রেজিস্ট্যান্ট',
      'টাচ কন্ট্রোল সাপোর্ট'
    ],
    specifications: [
      { label: 'কানেক্টিভিটি', value: 'Bluetooth 5.3' },
      { label: 'ব্যাটারি', value: '৫০০mAh (কেস)' },
      { label: 'ওয়াটারপ্রুফ', value: 'IPX4' },
      { label: 'ওয়ারেন্টি', value: '৭ দিন রিপ্লেসমেন্ট' }
    ],
    variants: [
      { id: 'v-1', label: 'কালো', stock: 25 },
      { id: 'v-2', label: 'সাদা', stock: 17 }
    ],
    sku: 'OK-EB-001',
    weightGrams: 55,
    supplyPrice: 650,
    deliveryCharge: 100,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: true,
    isNewArrival: false,
    isTruePrice: true,
    createdAt: '2026-06-10'
  }),
  withSavings({
    id: 'p-2',
    slug: 'smart-watch-fitpro',
    name: 'স্মার্ট ওয়াচ ফিটপ্রো',
    nameEn: 'Smart Watch FitPro',
    category: 'electronics',
    merchantId: 'mer-3',
    image: '/static/images/products/smartwatch.jpg',
    gallery: ['/static/images/products/smartwatch.jpg'],
    referencePrice: 2500,
    offerKiniPrice: 1450,
    stockStatus: 'in_stock',
    stock: 30,
    badge: 'best_deal',
    status: 'approved',
    rating: 4.3,
    reviewCount: 96,
    shortDescription: 'হার্ট রেট, স্লিপ ট্র্যাকিং ও কল নোটিফিকেশন সহ স্মার্টওয়াচ।',
    description:
      'স্বাস্থ্য সচেতনদের জন্য পারফেক্ট এই স্মার্টওয়াচ ফিটপ্রো প্রতিদিনের অ্যাক্টিভিটি, হার্ট রেট এবং ঘুমের মান ট্র্যাক করে। ফোন থেকে নোটিফিকেশন সরাসরি হাতে পাবেন।',
    benefits: ['১.৪ ইঞ্চি HD ডিসপ্লে', '৭ দিন ব্যাটারি ব্যাকআপ', 'হার্ট রেট মনিটর', 'কল ও মেসেজ নোটিফিকেশন'],
    specifications: [
      { label: 'ডিসপ্লে', value: '1.4" IPS টাচস্ক্রিন' },
      { label: 'ব্যাটারি', value: '৭ দিন (নরমাল ইউজ)' },
      { label: 'ওয়াটারপ্রুফ', value: 'IP67' },
      { label: 'ওয়ারেন্টি', value: '৭ দিন রিপ্লেসমেন্ট' }
    ],
    variants: [
      { id: 'v-1', label: 'কালো স্ট্র্যাপ', stock: 18 },
      { id: 'v-2', label: 'নীল স্ট্র্যাপ', stock: 12 }
    ],
    sku: 'OK-SW-002',
    weightGrams: 45,
    supplyPrice: 950,
    deliveryCharge: 100,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: true,
    isNewArrival: false,
    isTruePrice: true,
    createdAt: '2026-06-15'
  }),
  withSavings({
    id: 'p-3',
    slug: 'portable-bluetooth-speaker',
    name: 'পোর্টেবল ব্লুটুথ স্পিকার',
    nameEn: 'Portable Bluetooth Speaker',
    category: 'electronics',
    merchantId: 'mer-3',
    image: '/static/images/products/speaker.jpg',
    gallery: ['/static/images/products/speaker.jpg'],
    referencePrice: 1500,
    offerKiniPrice: 850,
    stockStatus: 'in_stock',
    stock: 55,
    badge: 'true_price',
    status: 'approved',
    rating: 4.4,
    reviewCount: 74,
    shortDescription: 'পাওয়ারফুল বেস, ১২ ঘণ্টা ব্যাটারি ব্যাকআপ সহ কম্প্যাক্ট স্পিকার।',
    description:
      'ছোট সাইজে বড় সাউন্ড — এই ব্লুটুথ স্পিকারটি বাসায়, বাইরে কিংবা ভ্রমণে যেকোনো জায়গায় ব্যবহার করা যায়। ওয়াটার-রেজিস্ট্যান্ট বডি দিয়ে তৈরি।',
    benefits: ['১২ ঘণ্টা প্লেব্যাক', 'IPX5 স্প্ল্যাশপ্রুফ', 'TWS পেয়ারিং সাপোর্ট', 'বিল্ট-ইন মাইক্রোফোন'],
    specifications: [
      { label: 'আউটপুট', value: '10W' },
      { label: 'ব্যাটারি', value: '১২০০mAh' },
      { label: 'কানেক্টিভিটি', value: 'Bluetooth 5.0 / AUX' },
      { label: 'ওয়ারেন্টি', value: '৭ দিন রিপ্লেসমেন্ট' }
    ],
    variants: [{ id: 'v-1', label: 'কালো', stock: 55 }],
    sku: 'OK-SP-003',
    weightGrams: 320,
    supplyPrice: 550,
    deliveryCharge: 100,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: false,
    isNewArrival: true,
    isTruePrice: true,
    createdAt: '2026-07-20'
  }),
  withSavings({
    id: 'p-4',
    slug: 'power-bank-10000mah',
    name: 'পাওয়ার ব্যাংক ১০,০০০mAh',
    nameEn: 'Power Bank 10000mAh',
    category: 'electronics',
    merchantId: 'mer-3',
    image: '/static/images/products/powerbank.jpg',
    gallery: ['/static/images/products/powerbank.jpg'],
    referencePrice: 1400,
    offerKiniPrice: 799,
    stockStatus: 'low_stock',
    stock: 8,
    badge: 'limited_deal',
    status: 'approved',
    rating: 4.2,
    reviewCount: 61,
    shortDescription: 'ডুয়াল আউটপুট, ডিজিটাল ডিসপ্লে সহ ফাস্ট চার্জিং পাওয়ার ব্যাংক।',
    description:
      'সারাদিন ফোন চালু রাখতে এই ১০,০০০mAh পাওয়ার ব্যাংক যথেষ্ট। ডিজিটাল স্ক্রিনে চার্জ পার্সেন্টেজ দেখা যায়, ফাস্ট চার্জিং সাপোর্ট করে।',
    benefits: ['১০,০০০mAh ক্যাপাসিটি', 'ডুয়াল USB আউটপুট', 'ডিজিটাল LED ডিসপ্লে', 'ফাস্ট চার্জিং সাপোর্ট'],
    specifications: [
      { label: 'ক্যাপাসিটি', value: '10000mAh' },
      { label: 'আউটপুট', value: '2x USB-A, 1x Type-C' },
      { label: 'ওজন', value: '২১০ গ্রাম' },
      { label: 'ওয়ারেন্টি', value: '৭ দিন রিপ্লেসমেন্ট' }
    ],
    variants: [{ id: 'v-1', label: 'কালো', stock: 8 }],
    sku: 'OK-PB-004',
    weightGrams: 210,
    supplyPrice: 480,
    deliveryCharge: 100,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: false,
    isNewArrival: false,
    isTruePrice: true,
    createdAt: '2026-05-01'
  }),
  withSavings({
    id: 'p-5',
    slug: 'mens-premium-casual-shirt',
    name: 'প্রিমিয়াম কটন ক্যাজুয়াল শার্ট (পুরুষ)',
    nameEn: "Men's Premium Casual Shirt",
    category: 'fashion',
    merchantId: 'mer-1',
    image: '/static/images/products/shirt.jpg',
    gallery: ['/static/images/products/shirt.jpg'],
    referencePrice: 1200,
    offerKiniPrice: 690,
    stockStatus: 'in_stock',
    stock: 60,
    badge: 'true_price',
    status: 'approved',
    rating: 4.5,
    reviewCount: 203,
    shortDescription: '১০০% কটন ফেব্রিক, রেগুলার ফিট, অফিস ও ক্যাজুয়াল দুই জায়গাতেই মানানসই।',
    description:
      'উন্নতমানের কটন কাপড়ে তৈরি এই শার্টটি সারাদিন আরামদায়ক অনুভূতি দেয়। অফিস, আড্ডা কিংবা পার্টি — সব জায়গায় স্টাইলিশ লুক দিতে সক্ষম।',
    benefits: ['১০০% কটন ফেব্রিক', 'প্রিমিয়াম স্টিচিং', 'মেশিন ওয়াশ ফ্রেন্ডলি', 'সব ধরনের প্যান্টের সাথে মানানসই'],
    specifications: [
      { label: 'ফেব্রিক', value: '১০০% কটন' },
      { label: 'ফিট', value: 'রেগুলার ফিট' },
      { label: 'কলার', value: 'ক্লাসিক কলার' },
      { label: 'কেয়ার', value: 'মেশিন ওয়াশ' }
    ],
    variants: [
      { id: 'v-1', label: 'M', stock: 20 },
      { id: 'v-2', label: 'L', stock: 22 },
      { id: 'v-3', label: 'XL', stock: 18 }
    ],
    sku: 'OK-SH-005',
    weightGrams: 220,
    supplyPrice: 420,
    deliveryCharge: 80,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: true,
    isNewArrival: false,
    isTruePrice: true,
    createdAt: '2026-04-10'
  }),
  withSavings({
    id: 'p-6',
    slug: 'womens-leather-handbag',
    name: 'উইমেন্স লেদার হ্যান্ডব্যাগ',
    nameEn: "Women's Leather Handbag",
    category: 'fashion',
    merchantId: 'mer-1',
    image: '/static/images/products/handbag.jpg',
    gallery: ['/static/images/products/handbag.jpg'],
    referencePrice: 2200,
    offerKiniPrice: 1350,
    stockStatus: 'in_stock',
    stock: 25,
    badge: 'best_deal',
    status: 'approved',
    rating: 4.6,
    reviewCount: 87,
    shortDescription: 'প্রিমিয়াম PU লেদার, স্পেসিয়াস ইন্টেরিয়র, গোল্ড হার্ডওয়্যার ডিটেইল।',
    description:
      'দৈনন্দিন ব্যবহার ও বিশেষ অনুষ্ঠান — দুই ক্ষেত্রেই মানানসই এই হ্যান্ডব্যাগ। ভেতরে যথেষ্ট জায়গা থাকায় প্রয়োজনীয় সবকিছু সহজেই রাখা যায়।',
    benefits: ['প্রিমিয়াম PU লেদার', 'স্পেসিয়াস মেইন কম্পার্টমেন্ট', 'শক্তিশালী স্ট্র্যাপ', 'গোল্ড হার্ডওয়্যার'],
    specifications: [
      { label: 'ম্যাটেরিয়াল', value: 'PU লেদার' },
      { label: 'সাইজ', value: '৩২ x ২৪ x ১২ সেমি' },
      { label: 'কালার', value: 'ব্রাউন' },
      { label: 'কম্পার্টমেন্ট', value: '২টি মেইন + ১টি জিপ পকেট' }
    ],
    variants: [
      { id: 'v-1', label: 'ব্রাউন', stock: 15 },
      { id: 'v-2', label: 'কালো', stock: 10 }
    ],
    sku: 'OK-BG-006',
    weightGrams: 650,
    supplyPrice: 850,
    deliveryCharge: 100,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: true,
    isNewArrival: true,
    isTruePrice: true,
    createdAt: '2026-07-05'
  }),
  withSavings({
    id: 'p-7',
    slug: 'vitamin-c-face-serum',
    name: 'ভিটামিন সি ফেস সিরাম',
    nameEn: 'Vitamin C Face Serum',
    category: 'beauty',
    merchantId: 'mer-1',
    image: '/static/images/products/serum.jpg',
    gallery: ['/static/images/products/serum.jpg'],
    referencePrice: 950,
    offerKiniPrice: 550,
    stockStatus: 'in_stock',
    stock: 70,
    badge: 'true_price',
    status: 'approved',
    rating: 4.7,
    reviewCount: 156,
    shortDescription: 'ত্বক উজ্জ্বল করতে ও দাগ কমাতে সাহায্য করে, ৩০ মিলি বোতল।',
    description:
      'নিয়মিত ব্যবহারে ত্বকের উজ্জ্বলতা বৃদ্ধি করে এবং কালো দাগ কমাতে সাহায্য করে এই ভিটামিন সি সিরাম। সব স্কিন টাইপের জন্য উপযোগী।',
    benefits: ['ত্বক উজ্জ্বল করে', 'দাগ কমাতে সহায়ক', 'হালকা ও নন-স্টিকি ফর্মুলা', 'সব স্কিন টাইপের জন্য উপযোগী'],
    specifications: [
      { label: 'ভলিউম', value: '৩০ মিলি' },
      { label: 'মূল উপাদান', value: 'ভিটামিন সি ১০%' },
      { label: 'স্কিন টাইপ', value: 'সব ধরনের ত্বক' },
      { label: 'শেল্ফ লাইফ', value: '২৪ মাস' }
    ],
    variants: [{ id: 'v-1', label: '৩০ মিলি', stock: 70 }],
    sku: 'OK-SR-007',
    weightGrams: 60,
    supplyPrice: 320,
    deliveryCharge: 80,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: false,
    isNewArrival: true,
    isTruePrice: true,
    createdAt: '2026-07-25'
  }),
  withSavings({
    id: 'p-8',
    slug: 'matte-lipstick-trio-set',
    name: 'ম্যাট লিপস্টিক ট্রায়ো সেট',
    nameEn: 'Matte Lipstick Trio Set',
    category: 'beauty',
    merchantId: 'mer-1',
    image: '/static/images/products/lipstick.jpg',
    gallery: ['/static/images/products/lipstick.jpg'],
    referencePrice: 850,
    offerKiniPrice: 499,
    stockStatus: 'in_stock',
    stock: 40,
    badge: 'featured',
    status: 'approved',
    rating: 4.4,
    reviewCount: 92,
    shortDescription: '৩টি ট্রেন্ডি শেড, লং-লাস্টিং ম্যাট ফিনিশ, স্মুথ অ্যাপ্লিকেশন।',
    description:
      'একসাথে ৩টি জনপ্রিয় শেড — রেড, নুড ও পিংক নিয়ে এই লিপস্টিক সেট। ম্যাট ফিনিশ যা দীর্ঘ সময় স্থায়ী হয়।',
    benefits: ['লং-লাস্টিং ম্যাট ফিনিশ', '৩টি ট্রেন্ডি শেড', 'স্মুথ ও ক্রিমি টেক্সচার', 'হালকা ওজনের ফর্মুলা'],
    specifications: [
      { label: 'শেড সংখ্যা', value: '৩টি' },
      { label: 'ফিনিশ', value: 'ম্যাট' },
      { label: 'ওজন', value: 'প্রতিটি ৩.৫ গ্রাম' }
    ],
    variants: [{ id: 'v-1', label: 'রেড, নুড, পিংক সেট', stock: 40 }],
    sku: 'OK-LP-008',
    weightGrams: 45,
    supplyPrice: 280,
    deliveryCharge: 80,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: true,
    isNewArrival: false,
    isTruePrice: true,
    createdAt: '2026-06-01'
  }),
  withSavings({
    id: 'p-9',
    slug: 'non-stick-frying-pan',
    name: 'নন-স্টিক ফ্রাইং প্যান',
    nameEn: 'Non-Stick Frying Pan',
    category: 'home-kitchen',
    merchantId: 'mer-2',
    image: '/static/images/products/frying-pan.jpg',
    gallery: ['/static/images/products/frying-pan.jpg'],
    referencePrice: 1100,
    offerKiniPrice: 650,
    stockStatus: 'in_stock',
    stock: 35,
    badge: 'true_price',
    status: 'approved',
    rating: 4.5,
    reviewCount: 118,
    shortDescription: '২৮ সেমি নন-স্টিক কোটিং, হিট-রেজিস্ট্যান্ট হ্যান্ডেল সহ।',
    description:
      'রান্নাকে আরও সহজ করতে এই নন-স্টিক ফ্রাইং প্যান। খাবার লেগে থাকে না, সহজে পরিষ্কার করা যায় এবং তাপ সমানভাবে বিতরণ করে।',
    benefits: ['প্রিমিয়াম নন-স্টিক কোটিং', 'হিট-রেজিস্ট্যান্ট হ্যান্ডেল', 'ইনডাকশন কমপ্যাটিবল', 'ইজি ক্লিন'],
    specifications: [
      { label: 'সাইজ', value: '২৮ সেমি ব্যাস' },
      { label: 'ম্যাটেরিয়াল', value: 'অ্যালুমিনিয়াম বডি' },
      { label: 'কোটিং', value: 'নন-স্টিক' },
      { label: 'ওয়ারেন্টি', value: '৩০ দিন' }
    ],
    variants: [{ id: 'v-1', label: '২৮ সেমি', stock: 35 }],
    sku: 'OK-FP-009',
    weightGrams: 680,
    supplyPrice: 400,
    deliveryCharge: 100,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: false,
    isNewArrival: false,
    isTruePrice: true,
    createdAt: '2026-03-15'
  }),
  withSavings({
    id: 'p-10',
    slug: 'electric-kettle-1-8l',
    name: 'ইলেকট্রিক কেটলি ১.৮ লিটার',
    nameEn: 'Electric Kettle 1.8L',
    category: 'home-kitchen',
    merchantId: 'mer-2',
    image: '/static/images/products/kettle.jpg',
    gallery: ['/static/images/products/kettle.jpg'],
    referencePrice: 1600,
    offerKiniPrice: 999,
    stockStatus: 'in_stock',
    stock: 20,
    badge: 'best_deal',
    status: 'approved',
    rating: 4.6,
    reviewCount: 145,
    shortDescription: 'অটো শাট-অফ, ফাস্ট বয়েলিং, ১.৮ লিটার ক্যাপাসিটি সহ।',
    description:
      'দ্রুত পানি গরম করতে এই ইলেকট্রিক কেটলি সেরা পছন্দ। অটোমেটিক শাট-অফ ফিচার নিরাপত্তা নিশ্চিত করে এবং ১.৮ লিটার ক্যাপাসিটি পরিবারের জন্য যথেষ্ট।',
    benefits: ['অটো শাট-অফ প্রোটেকশন', 'ফাস্ট বয়েলিং টেকনোলজি', '১.৮ লিটার ক্যাপাসিটি', 'বিদ্যুৎ সাশ্রয়ী'],
    specifications: [
      { label: 'ক্যাপাসিটি', value: '১.৮ লিটার' },
      { label: 'পাওয়ার', value: '১৫০০W' },
      { label: 'সেফটি', value: 'অটো শাট-অফ' },
      { label: 'ওয়ারেন্টি', value: '৬ মাস' }
    ],
    variants: [{ id: 'v-1', label: 'সাদা', stock: 20 }],
    sku: 'OK-KT-010',
    weightGrams: 850,
    supplyPrice: 620,
    deliveryCharge: 100,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: true,
    isNewArrival: false,
    isTruePrice: true,
    createdAt: '2026-05-20'
  }),
  withSavings({
    id: 'p-11',
    slug: 'kids-cartoon-backpack',
    name: 'কিডস কার্টুন ব্যাকপ্যাক',
    nameEn: 'Kids Cartoon Backpack',
    category: 'kids',
    merchantId: 'mer-1',
    image: '/static/images/products/kids-backpack.jpg',
    gallery: ['/static/images/products/kids-backpack.jpg'],
    referencePrice: 900,
    offerKiniPrice: 520,
    stockStatus: 'in_stock',
    stock: 33,
    badge: 'new',
    status: 'approved',
    rating: 4.5,
    reviewCount: 68,
    shortDescription: 'হালকা ওজন, স্কুল ব্যাগের জন্য পারফেক্ট সাইজ, রঙিন প্রিন্ট।',
    description:
      'বাচ্চাদের স্কুলে যাওয়ার জন্য মজাদার ও হালকা এই ব্যাকপ্যাক। প্রশস্ত কম্পার্টমেন্ট বই ও টিফিন বক্স রাখার জন্য যথেষ্ট জায়গা দেয়।',
    benefits: ['হালকা ওজনের ডিজাইন', 'প্রশস্ত মেইন কম্পার্টমেন্ট', 'পানি-প্রতিরোধী ফেব্রিক', 'আরামদায়ক প্যাডেড স্ট্র্যাপ'],
    specifications: [
      { label: 'সাইজ', value: '৩০ x ২২ x ১২ সেমি' },
      { label: 'ম্যাটেরিয়াল', value: 'পলিয়েস্টার' },
      { label: 'উপযোগী বয়স', value: '৩-১০ বছর' }
    ],
    variants: [
      { id: 'v-1', label: 'নীল', stock: 18 },
      { id: 'v-2', label: 'কমলা', stock: 15 }
    ],
    sku: 'OK-KB-011',
    weightGrams: 280,
    supplyPrice: 300,
    deliveryCharge: 80,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: false,
    isNewArrival: true,
    isTruePrice: true,
    createdAt: '2026-08-01'
  }),
  withSavings({
    id: 'p-12',
    slug: 'led-desk-lamp',
    name: 'এলইডি ডেস্ক ল্যাম্প',
    nameEn: 'LED Desk Lamp',
    category: 'others',
    merchantId: 'mer-2',
    image: '/static/images/products/led-lamp.jpg',
    gallery: ['/static/images/products/led-lamp.jpg'],
    referencePrice: 1300,
    offerKiniPrice: 750,
    stockStatus: 'low_stock',
    stock: 6,
    badge: 'limited_deal',
    status: 'approved',
    rating: 4.3,
    reviewCount: 54,
    shortDescription: 'টাচ ডিমার কন্ট্রোল, ৩ লেভেল ব্রাইটনেস, ফ্লেক্সিবল আর্ম।',
    description:
      'পড়াশোনা ও কাজের জন্য আইডিয়াল এই এলইডি ডেস্ক ল্যাম্প। টাচ কন্ট্রোলের মাধ্যমে সহজেই ব্রাইটনেস অ্যাডজাস্ট করা যায়।',
    benefits: ['টাচ ডিমার কন্ট্রোল', '৩ লেভেল ব্রাইটনেস', 'ফ্লেক্সিবল গুজনেক আর্ম', 'আই-প্রোটেকশন লাইট'],
    specifications: [
      { label: 'পাওয়ার', value: '৮W LED' },
      { label: 'ব্রাইটনেস লেভেল', value: '৩ স্টেপ' },
      { label: 'পাওয়ার সোর্স', value: 'USB' }
    ],
    variants: [{ id: 'v-1', label: 'সাদা', stock: 6 }],
    sku: 'OK-LD-012',
    weightGrams: 380,
    supplyPrice: 450,
    deliveryCharge: 100,
    videoUrl: HOW_TO_USE_VIDEO_URL,
    reviewProofs: defaultReviewProofs(),
    isFeatured: false,
    isNewArrival: false,
    isTruePrice: true,
    createdAt: '2026-04-28'
  })
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured)
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival)
}

export function getTruePriceProducts(): Product[] {
  return products.filter((p) => p.isTruePrice)
}

export function getTodaysBestDeals(): Product[] {
  return products.filter((p) => p.badge === 'best_deal' || p.badge === 'true_price').slice(0, 6)
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  )
}
