import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { ProductCard } from '../../components/ProductCard'
import { Breadcrumb } from '../../components/customer/Breadcrumb'
import { EmptyState } from '../../components/ui/EmptyState'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import type { Product } from '../../types'

interface ProductsPageProps {
  filter?: string
  sort?: string
}

function applyFilter(list: Product[], filter?: string): Product[] {
  if (!filter) return list
  if (filter === 'true_price') return list.filter((p) => p.isTruePrice)
  if (filter === 'featured') return list.filter((p) => p.isFeatured)
  if (filter === 'new') return list.filter((p) => p.isNewArrival)
  return list
}

function applySort(list: Product[], sort?: string): Product[] {
  const copy = [...list]
  switch (sort) {
    case 'price_low':
      return copy.sort((a, b) => a.offerKiniPrice - b.offerKiniPrice)
    case 'price_high':
      return copy.sort((a, b) => b.offerKiniPrice - a.offerKiniPrice)
    case 'savings':
      return copy.sort((a, b) => b.savings - a.savings)
    default:
      return copy
  }
}

export const ProductsPage: FC<ProductsPageProps> = ({ filter, sort }) => {
  let list = applyFilter(products, filter)
  list = applySort(list, sort)

  const sortOptions = [
    { value: '', label: 'ডিফল্ট সাজানো' },
    { value: 'price_low', label: 'দাম: কম থেকে বেশি' },
    { value: 'price_high', label: 'দাম: বেশি থেকে কম' },
    { value: 'savings', label: 'সবচেয়ে বেশি সাশ্রয়' }
  ]

  return (
    <CustomerLayout title="সব পণ্য" activeNav="products" activeMobileNav="categories">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <Breadcrumb items={[{ label: 'সব পণ্য' }]} />

        <div class="flex items-center justify-between mt-4 mb-6 flex-wrap gap-3">
          <h1 class="text-xl sm:text-2xl font-extrabold">সব পণ্য ({list.length})</h1>

          <div class="flex items-center gap-2">
            <form method="get" class="flex items-center gap-2">
              {filter && <input type="hidden" name="filter" value={filter} />}
              <select
                name="sort"
                onchange="this.form.submit()"
                class="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ok-lime-400 bg-white"
              >
                {sortOptions.map((o) => (
                  <option value={o.value} selected={o.value === (sort || '')}>{o.label}</option>
                ))}
              </select>
            </form>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Sidebar filters - desktop */}
          <aside class="hidden lg:block lg:col-span-1">
            <div class="bg-white rounded-2xl border border-gray-100 p-4 sticky top-24">
              <h3 class="font-bold text-sm mb-3">ক্যাটাগরি</h3>
              <ul class="space-y-1">
                {categories.map((c) => (
                  <li>
                    <a href={`/category/${c.slug}`} class="flex items-center justify-between text-sm px-2 py-2 rounded-lg hover:bg-ok-green-50 text-ok-charcoal">
                      <span class="flex items-center gap-2"><i class={`fas ${c.icon} text-ok-green-700 w-4`}></i>{c.name}</span>
                      <span class="text-xs text-ok-gray-400">{c.productCount}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div class="h-px bg-gray-100 my-4"></div>
              <h3 class="font-bold text-sm mb-3">ফিল্টার</h3>
              <div class="space-y-2">
                <a href="/products" class={`block text-sm px-2 py-2 rounded-lg ${!filter ? 'bg-ok-green-50 text-ok-green-800 font-semibold' : 'hover:bg-gray-50'}`}>সব পণ্য</a>
                <a href="/products?filter=true_price" class={`block text-sm px-2 py-2 rounded-lg ${filter === 'true_price' ? 'bg-ok-green-50 text-ok-green-800 font-semibold' : 'hover:bg-gray-50'}`}>True Price</a>
                <a href="/products?filter=featured" class={`block text-sm px-2 py-2 rounded-lg ${filter === 'featured' ? 'bg-ok-green-50 text-ok-green-800 font-semibold' : 'hover:bg-gray-50'}`}>Featured</a>
                <a href="/products?filter=new" class={`block text-sm px-2 py-2 rounded-lg ${filter === 'new' ? 'bg-ok-green-50 text-ok-green-800 font-semibold' : 'hover:bg-gray-50'}`}>নতুন পণ্য</a>
              </div>
            </div>
          </aside>

          <div class="col-span-1 sm:col-span-2 lg:col-span-4">
            {list.length === 0 ? (
              <EmptyState icon="fa-box-open" title="কোনো পণ্য পাওয়া যায়নি" description="এই ফিল্টারে কোনো পণ্য নেই। অন্য ফিল্টার ব্যবহার করে দেখুন।" actionLabel="সব পণ্য দেখুন" actionHref="/products" />
            ) : (
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {list.map((p) => (
                  <ProductCard product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
