import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { products } from '../../data/products'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'

export const AdminProductsPage: FC = () => {
  return (
    <AdminLayout title="Products" active="products">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">All Products</h1>
          <p class="text-xs text-ok-gray-500">প্ল্যাটফর্মের সকল প্রোডাক্টের তালিকা</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Product</th>
                <th class="p-4">Category</th>
                <th class="p-4">Ref Price</th>
                <th class="p-4">OfferKini Price</th>
                <th class="p-4">Savings</th>
                <th class="p-4">Status</th>
                <th class="p-4">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {products.map((p) => (
                <tr class="hover:bg-gray-50/60 transition-colors">
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <img src={p.image} class="w-12 h-12 rounded-xl object-cover bg-gray-50 shrink-0" />
                      <div>
                        <p class="font-bold text-ok-charcoal line-clamp-1">{p.name}</p>
                        <p class="text-xs text-ok-gray-400">ID: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4 text-xs font-medium text-ok-gray-600">{p.category}</td>
                  <td class="p-4 text-xs line-through text-ok-gray-400">{formatBDT(p.referencePrice)}</td>
                  <td class="p-4 font-extrabold text-ok-green-800">{formatBDT(p.offerKiniPrice)}</td>
                  <td class="p-4 text-xs font-bold text-ok-lime-600">বাঁচছে {formatBDT(p.savings)}</td>
                  <td class="p-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td class="p-4">
                    <a href={`/product/${p.slug}`} target="_blank" class="bg-ok-green-50 text-ok-green-800 hover:bg-ok-green-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-block">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
