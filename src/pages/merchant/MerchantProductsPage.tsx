import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { StatusBadge, productStatusLabel, productStatusTone } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatBDT } from '../../utils/format'
import type { Product } from '../../types'

export const MerchantProductsPage: FC<{ products: Product[] }> = ({ products }) => (
  <MerchantLayout title="Products" active="products">
    <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
      <div class="relative flex-1 max-w-sm">
        <input type="text" placeholder="পণ্য খুঁজুন..." class="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ok-lime-400" />
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-ok-gray-400 text-sm"></i>
      </div>
      <a href="/merchant/products/new" class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 whitespace-nowrap">
        <i class="fas fa-plus"></i> Add Product
      </a>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 p-3 mb-5 flex gap-2 overflow-x-auto ok-scroll-x">
      {['সব', 'Draft', 'Pending Review', 'Approved', 'Rejected', 'Out of Stock', 'Hidden'].map((f, i) => (
        <button class={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${i === 0 ? 'bg-ok-green-800 text-white' : 'bg-gray-50 text-ok-gray-600 hover:bg-gray-100'}`}>
          {f}
        </button>
      ))}
    </div>

    {products.length === 0 ? (
      <EmptyState icon="fa-box-open" title="কোনো পণ্য পাওয়া যায়নি" actionLabel="নতুন পণ্য যুক্ত করুন" actionHref="/merchant/products/new" />
    ) : (
      <>
        {/* Desktop table */}
        <div class="hidden sm:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-ok-gray-500 text-xs border-b border-gray-100">
                <th class="px-4 py-3 font-medium">Product</th>
                <th class="px-4 py-3 font-medium">Price</th>
                <th class="px-4 py-3 font-medium">Stock</th>
                <th class="px-4 py-3 font-medium">Status</th>
                <th class="px-4 py-3 font-medium">Orders</th>
                <th class="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr class="border-b border-gray-50 hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <img src={p.image} class="w-11 h-11 rounded-lg object-cover bg-gray-50" />
                      <span class="font-medium line-clamp-1 max-w-[200px]">{p.name}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 font-semibold">{formatBDT(p.offerKiniPrice)}</td>
                  <td class="px-4 py-3">{p.stock}</td>
                  <td class="px-4 py-3"><StatusBadge label={productStatusLabel(p.status)} tone={productStatusTone(p.status)} /></td>
                  <td class="px-4 py-3 text-ok-gray-500">{p.reviewCount}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <a href={`/merchant/products/${p.id}`} class="text-ok-green-800 hover:underline font-semibold">Edit</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div class="sm:hidden space-y-3">
          {products.map((p) => (
            <a href={`/merchant/products/${p.id}`} class="block bg-white rounded-2xl border border-gray-100 p-4">
              <div class="flex gap-3">
                <img src={p.image} class="w-16 h-16 rounded-xl object-cover bg-gray-50" />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm line-clamp-2">{p.name}</p>
                  <p class="font-bold text-ok-green-800 mt-1">{formatBDT(p.offerKiniPrice)}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <StatusBadge label={productStatusLabel(p.status)} tone={productStatusTone(p.status)} />
                    <span class="text-xs text-ok-gray-500">স্টক: {p.stock}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </>
    )}
  </MerchantLayout>
)
