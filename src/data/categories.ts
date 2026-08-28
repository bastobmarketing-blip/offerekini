import type { Category } from '../types'

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'fashion',
    name: 'ফ্যাশন',
    nameEn: 'Fashion',
    image: '/static/images/categories/fashion.jpg',
    icon: 'fa-shirt',
    productCount: 3,
    enabled: true,
    order: 1
  },
  {
    id: 'cat-2',
    slug: 'beauty',
    name: 'বিউটি',
    nameEn: 'Beauty',
    image: '/static/images/categories/beauty.jpg',
    icon: 'fa-spray-can-sparkles',
    productCount: 2,
    enabled: true,
    order: 2
  },
  {
    id: 'cat-3',
    slug: 'home-kitchen',
    name: 'হোম & কিচেন',
    nameEn: 'Home & Kitchen',
    image: '/static/images/categories/home-kitchen.jpg',
    icon: 'fa-kitchen-set',
    productCount: 2,
    enabled: true,
    order: 3
  },
  {
    id: 'cat-4',
    slug: 'electronics',
    name: 'ইলেকট্রনিক্স',
    nameEn: 'Electronics',
    image: '/static/images/categories/electronics.jpg',
    icon: 'fa-headphones',
    productCount: 4,
    enabled: true,
    order: 4
  },
  {
    id: 'cat-5',
    slug: 'lifestyle',
    name: 'লাইফস্টাইল',
    nameEn: 'Lifestyle',
    image: '/static/images/categories/lifestyle.jpg',
    icon: 'fa-bag-shopping',
    productCount: 1,
    enabled: true,
    order: 5
  },
  {
    id: 'cat-6',
    slug: 'kids',
    name: 'কিডস',
    nameEn: 'Kids',
    image: '/static/images/categories/kids.jpg',
    icon: 'fa-child-reaching',
    productCount: 1,
    enabled: true,
    order: 6
  },
  {
    id: 'cat-7',
    slug: 'others',
    name: 'অন্যান্য',
    nameEn: 'Others',
    image: '/static/images/categories/others.jpg',
    icon: 'fa-lightbulb',
    productCount: 1,
    enabled: true,
    order: 7
  }
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
