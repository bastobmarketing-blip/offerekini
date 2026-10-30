import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { orders } from '../../data/orders'
import { products } from '../../data/products'
import { merchants } from '../../data/merchants'
import { formatBDT } from '../../utils/format'

export const AdminReportsPage: FC = () => {
  const totalOrders = orders.length
  const validOrders = orders.filter((o) => o.status !== 'cancelled')
  const totalRevenue = validOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
  const deliveredOrders = orders.filter((o) => o.status === 'delivered')
  const pendingOrders = orders.filter((o) => o.status === 'pending')
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled')
  const deliverySuccessRate = totalOrders > 0 ? Math.round((deliveredOrders.length / totalOrders) * 100) : 0

  return (
    <AdminLayout title="Reports & Analytics" active="reports">
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">সেলস ও অ্যানালিটিক্স রিপোর্ট</h1>
          <p class="text-xs text-ok-gray-500">প্ল্যাটফর্মের বিক্রয় পারফরম্যান্স, অর্ডার বিশ্লেষণ ও মার্চেন্ট মেট্রিক্স</p>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">মোট বিক্রয় (Gross Revenue)</p>
          <p class="text-2xl font-black text-ok-green-800 mt-1">{formatBDT(totalRevenue)}</p>
          <p class="text-[11px] text-emerald-600 font-bold mt-1">↑ সকল সম্পন্ন ও একটিভ অর্ডার</p>
        </div>
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">মোট অর্ডার সংখ্যা</p>
          <p class="text-2xl font-black text-ok-charcoal mt-1">{totalOrders}</p>
          <p class="text-[11px] text-indigo-600 font-bold mt-1">কাস্টমার অর্ডার</p>
        </div>
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">ডেলিভারি সাকসেস রেট</p>
          <p class="text-2xl font-black text-emerald-600 mt-1">{deliverySuccessRate}%</p>
          <p class="text-[11px] text-emerald-700 font-bold mt-1">{deliveredOrders.length} টি ডেলিভার্ড</p>
        </div>
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">পেন্ডিং ও ক্যানসেল অর্ডার</p>
          <p class="text-2xl font-black text-amber-600 mt-1">{pendingOrders.length} / {cancelledOrders.length}</p>
          <p class="text-[11px] text-gray-400 mt-1">পেন্ডিং / বাতিল</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6">
        {/* TOP SELLING PRODUCTS */}
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 class="font-bold text-sm text-ok-charcoal mb-4 flex items-center gap-2 border-b pb-2">
            <i class="fas fa-trophy text-amber-500"></i> সর্বোচ্চ বিক্রিত প্রোডাক্ট (Top Products)
          </h3>
          <div class="space-y-3">
            {products.slice(0, 5).map((p, idx) => (
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-full bg-ok-green-800 text-white font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <p class="font-bold text-xs text-ok-charcoal line-clamp-1">{p.name}</p>
                    <p class="text-[10px] text-gray-400">ক্যাটাগরি: {p.category}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-xs text-ok-green-800">{formatBDT(p.offerKiniPrice)}</p>
                  <p class="text-[10px] text-gray-500 font-medium">স্টক: {p.stock || 50}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOP MERCHANTS PERFORMANCE */}
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 class="font-bold text-sm text-ok-charcoal mb-4 flex items-center gap-2 border-b pb-2">
            <i class="fas fa-store text-emerald-600"></i> শীর্ষ মার্চেন্ট পারফরম্যান্স (Merchants)
          </h3>
          <div class="space-y-3">
            {merchants.map((m) => {
              const mOrders = orders.filter((o) => o.merchantId === m.id)
              const mRevenue = mOrders
                .filter((o) => o.status !== 'cancelled')
                .reduce((sum, o) => sum + (o.totalAmount || 0), 0)

              return (
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/70 hover:bg-gray-100/70 transition-colors">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                      {m.storeName.charAt(0)}
                    </div>
                    <div>
                      <p class="font-bold text-xs text-ok-charcoal">{m.storeName}</p>
                      <p class="text-[10px] text-gray-400 font-mono">{m.phone} • {m.ownerName}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-xs text-emerald-700">{formatBDT(mRevenue || m.totalSales || 0)}</p>
                    <p class="text-[10px] text-gray-500 font-medium">{mOrders.length || m.totalOrders || 0} টি অর্ডার</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
