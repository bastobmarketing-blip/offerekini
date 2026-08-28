import type { FC } from 'hono/jsx'
import type { Product } from '../types'
import { formatBDT } from '../utils/format'
import { SavingsBadge } from './ui/SavingsBadge'
import { stockStatusLabel } from '../utils/pricing'

interface ProductCardProps {
  product: Product
  className?: string
}

// Reusable product card. Never receives hard-coded price values directly —
// always driven by a Product object from src/data/products.ts (mock now,
// API-backed later).
export const ProductCard: FC<ProductCardProps> = ({ product, className = '' }) => {
  const isOutOfStock = product.stockStatus === 'out_of_stock'

  return (
    <article class={`group bg-white rounded-2xl shadow-ok-card hover:shadow-ok-card-hover transition-all duration-200 overflow-hidden border border-gray-100 flex flex-col ${className}`}>
      <a href={`/product/${product.slug}`} class="relative block aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <div class="absolute top-2 left-2">
            <SavingsBadge badge={product.badge} />
          </div>
        )}
        {product.stockStatus === 'low_stock' && (
          <div class="absolute top-2 right-2 bg-white/95 text-ok-red text-[11px] font-bold px-2 py-1 rounded-md">
            সীমিত স্টক
          </div>
        )}
        {isOutOfStock && (
          <div class="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span class="bg-ok-charcoal text-white text-xs font-bold px-3 py-1.5 rounded-md">স্টক আউট</span>
          </div>
        )}
      </a>

      <div class="p-3 sm:p-4 flex flex-col gap-2 flex-1">
        <a href={`/product/${product.slug}`}>
          <h3 class="text-sm sm:text-[15px] font-semibold text-ok-charcoal line-clamp-2 leading-snug min-h-[2.5em]">
            {product.name}
          </h3>
        </a>

        <div class="flex items-center gap-1 text-xs text-ok-gray-500">
          <i class="fas fa-star text-ok-lime-600"></i>
          <span class="font-medium text-ok-charcoal">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        <div class="mt-auto">
          <div class="flex items-baseline gap-2">
            <span class="text-ok-gray-500 line-through text-xs">{formatBDT(product.referencePrice)}</span>
            <span class="text-[11px] text-ok-gray-500">অন্যান্য পেজে</span>
          </div>
          <div class="flex items-baseline gap-2 mt-0.5">
            <span class="text-lg sm:text-xl font-extrabold text-ok-green-800">{formatBDT(product.offerKiniPrice)}</span>
            <span class="text-[11px] text-ok-green-700 font-semibold">OfferKini</span>
          </div>
          <div class="mt-1 inline-flex items-center gap-1 bg-ok-lime-500/15 text-ok-green-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
            <i class="fas fa-piggy-bank"></i>
            বাঁচছে {formatBDT(product.savings)}
          </div>
        </div>

        <a
          href={`/product/${product.slug}`}
          class={`mt-2 w-full text-center rounded-xl py-2.5 text-sm font-bold transition-colors ${
            isOutOfStock
              ? 'bg-ok-gray-300 text-ok-gray-500 pointer-events-none'
              : 'bg-ok-green-800 text-white hover:bg-ok-green-900'
          }`}
        >
          {isOutOfStock ? stockStatusLabel(product.stockStatus) : 'অর্ডার করুন'}
        </a>
      </div>
    </article>
  )
}

// Skeleton placeholder shown while a product list would be "loading"
export const ProductCardSkeleton: FC = () => (
  <div class="bg-white rounded-2xl shadow-ok-card overflow-hidden border border-gray-100">
    <div class="skeleton aspect-square"></div>
    <div class="p-4 space-y-2">
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-2/3"></div>
      <div class="skeleton h-6 w-1/2 mt-2"></div>
      <div class="skeleton h-9 w-full mt-2"></div>
    </div>
  </div>
)
