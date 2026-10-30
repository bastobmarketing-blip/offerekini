import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { products } from '../../data/products'
import { getMerchantById } from '../../data/merchants'
import { formatBDT } from '../../utils/format'

export const AdminPendingProductsPage: FC = () => {
  const pendingProducts = products.filter((p) => p.status === 'pending')

  return (
    <AdminLayout title="Pending Approval" active="pending">
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">মার্চেন্ট প্রোডাক্ট অ্যাপ্রুভাল ({pendingProducts.length})</h1>
          <p class="text-xs text-ok-gray-500">মার্চেন্টদের আপলোড করা প্রোডাক্ট রিভিউ এবং পাবলিশ অনুমোদন</p>
        </div>
      </div>

      {pendingProducts.length === 0 ? (
        <div class="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <div class="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-3">
            <i class="fas fa-check-double"></i>
          </div>
          <h3 class="font-bold text-base text-slate-800">কোনো প্রোডাক্ট অনুমোদনের জন্য অপেক্ষমাণ নেই</h3>
          <p class="text-xs text-gray-500 mt-1">মার্চেন্টদের সকল প্রোডাক্ট ইতোমধ্যে রিভিউ ও অনুমোদিত হয়েছে।</p>
        </div>
      ) : (
        <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Product</th>
                <th class="p-4">Merchant</th>
                <th class="p-4">Price</th>
                <th class="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {pendingProducts.map((p) => {
                const merchant = getMerchantById(p.merchantId)
                return (
                  <tr class="hover:bg-gray-50/60 transition-colors">
                    <td class="p-4 flex items-center gap-3">
                      <img src={p.image} class="w-10 h-10 rounded-lg object-cover bg-gray-50" />
                      <div>
                        <p class="font-bold text-xs text-slate-900">{p.name}</p>
                        <p class="text-[10px] text-gray-400">SKU: {p.sku}</p>
                      </div>
                    </td>
                    <td class="p-4 text-xs font-semibold">{merchant?.storeName}</td>
                    <td class="p-4 text-xs font-bold text-ok-green-800">{formatBDT(p.offerKiniPrice)}</td>
                    <td class="p-4 text-right">
                      <button class="bg-ok-green-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                        অনুমোদন করুন
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
