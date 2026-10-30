import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { products } from '../../data/products'
import { formatBDT } from '../../utils/format'

export const AdminDealsPage: FC = () => {
  const deals = products.filter((p) => (p.savingsPercent || 0) >= 20 || p.badge === 'best_deal')

  return (
    <AdminLayout title="Best Deals" active="deals">
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">বেস্ট ডিলস ও অফার কালেকশন ({deals.length})</h1>
          <p class="text-xs text-ok-gray-500">হোমপেজে প্রদর্শিত সর্বোচ্চ ছাড় ও স্পেশাল অফারের তালিকা</p>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {deals.map((p) => (
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="h-36 bg-gray-50 relative overflow-hidden">
              <img src={p.image} class="w-full h-full object-cover" />
              <span class="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                {p.savingsPercent}% OFF
              </span>
            </div>
            <div class="p-3.5">
              <h3 class="font-bold text-xs text-slate-900 line-clamp-1">{p.name}</h3>
              <div class="flex items-baseline gap-2 mt-2">
                <span class="text-sm font-extrabold text-ok-green-800">{formatBDT(p.offerKiniPrice)}</span>
                <span class="text-xs line-through text-gray-400">{formatBDT(p.referencePrice)}</span>
              </div>
              <div class="mt-3 pt-2 border-t flex justify-end">
                <a href={`/admin/products/${p.id}/edit`} class="text-xs font-bold text-ok-green-800 hover:underline">
                  এডিট ডিল
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
