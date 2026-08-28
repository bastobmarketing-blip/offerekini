import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { ProductCard } from '../../components/ProductCard'
import { EmptyState } from '../../components/ui/EmptyState'
import type { Product } from '../../types'

export const SearchPage: FC<{ query: string; results: Product[] }> = ({ query, results }) => (
  <CustomerLayout title={query ? `"${query}" এর ফলাফল` : 'খুঁজুন'}>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <form action="/search" method="get" class="mb-6 max-w-xl">
        <div class="relative">
          <input
            type="text"
            name="q"
            value={query}
            placeholder="পণ্যের নাম লিখুন..."
            autofocus
            class="w-full border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ok-lime-400"
          />
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-ok-gray-500"></i>
        </div>
      </form>

      {!query ? (
        <EmptyState icon="fa-magnifying-glass" title="পণ্য খুঁজুন" description="উপরে সার্চ বক্সে পণ্যের নাম লিখে খুঁজুন।" />
      ) : results.length === 0 ? (
        <EmptyState
          icon="fa-face-frown"
          title={`"${query}" এর জন্য কোনো ফলাফল পাওয়া যায়নি`}
          description="ভিন্ন কীওয়ার্ড ব্যবহার করে আবার চেষ্টা করুন।"
          actionLabel="সব পণ্য দেখুন"
          actionHref="/products"
        />
      ) : (
        <>
          <p class="text-sm text-ok-gray-500 mb-4">"{query}" এর জন্য {results.length} টি ফলাফল পাওয়া গেছে</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {results.map((p) => (
              <ProductCard product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  </CustomerLayout>
)
