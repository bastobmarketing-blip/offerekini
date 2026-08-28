import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { DataCard } from '../../components/ui/DataCard'
import { ChartCard } from '../../components/ui/ChartCard'
import { formatBDT } from '../../utils/format'
import { orders } from '../../data/orders'
import { products } from '../../data/products'
import { merchants } from '../../data/merchants'
import { settlements } from '../../data/settlements'

export const AdminDashboardPage: FC = () => {
  const today = new Date()
  const isToday = (iso: string) => new Date(iso).toDateString() === today.toDateString()
  const todaysOrders = orders.filter((o) => isToday(o.createdAt))
  const todaysRevenue = todaysOrders.reduce((s, o) => s + o.totalAmount, 0)
  const delivered = orders.filter((o) => o.status === 'delivered')
  const cancelled = orders.filter((o) => o.status === 'cancelled')
  const returned = orders.filter((o) => o.status === 'returned')
  const activeMerchants = merchants.filter((m) => m.status === 'active').length
  const activeProducts = products.filter((p) => p.status === 'approved').length
  const pendingSettlements = settlements.filter((s) => s.status === 'pending').length
  const topProduct = [...products].sort((a, b) => b.reviewCount - a.reviewCount)[0]
  const topMerchant = [...merchants].sort((a, b) => b.totalSales - a.totalSales)[0]

  const days: string[] = []
  const revenueData: number[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    days.push(d.toLocaleDateString('bn-BD', { weekday: 'short' }))
    revenueData.push(orders.filter((o) => new Date(o.createdAt).toDateString() === d.toDateString()).reduce((s, o) => s + o.totalAmount, 0))
  }

  const catCounts: Record<string, number> = {}
  products.forEach((p) => { catCounts[p.category] = (catCounts[p.category] || 0) + 1 })

  return (
    <AdminLayout title="Dashboard" active="dashboard">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        <DataCard label="Today's Orders" value={String(todaysOrders.length)} icon="fa-cart-shopping" tone="green" />
        <DataCard label="Today's Revenue" value={formatBDT(todaysRevenue)} icon="fa-money-bill-wave" tone="lime" />
        <DataCard label="Delivered Orders" value={String(delivered.length)} icon="fa-circle-check" tone="blue" />
        <DataCard label="Cancelled Orders" value={String(cancelled.length)} icon="fa-ban" tone="red" />
        <DataCard label="Returned Orders" value={String(returned.length)} icon="fa-rotate-left" tone="orange" />
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <DataCard label="Active Merchants" value={String(activeMerchants)} icon="fa-store" tone="green" />
        <DataCard label="Active Products" value={String(activeProducts)} icon="fa-boxes-stacked" tone="blue" />
        <DataCard label="Pending Settlements" value={String(pendingSettlements)} icon="fa-hourglass-half" tone="orange" />
        <DataCard label="Total Orders" value={String(orders.length)} icon="fa-receipt" tone="lime" />
      </div>

      <div class="grid lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Revenue Trend (৭ দিন)" canvasId="admin-revenue-chart" className="lg:col-span-2" />
        <ChartCard title="Delivered vs Cancelled" canvasId="admin-dvc-chart" />
      </div>

      <div class="grid lg:grid-cols-2 gap-4">
        <div class="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 class="font-bold text-sm mb-3">Top Product</h3>
          {topProduct && (
            <div class="flex items-center gap-3">
              <img src={topProduct.image} class="w-14 h-14 rounded-xl object-cover bg-gray-50" />
              <div>
                <p class="font-semibold text-sm">{topProduct.name}</p>
                <p class="text-xs text-ok-gray-500">{topProduct.reviewCount} reviews · {formatBDT(topProduct.offerKiniPrice)}</p>
              </div>
            </div>
          )}
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 class="font-bold text-sm mb-3">Top Merchant</h3>
          {topMerchant && (
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 rounded-xl bg-ok-green-800 text-white flex items-center justify-center font-bold text-lg">{topMerchant.storeName.charAt(0)}</div>
              <div>
                <p class="font-semibold text-sm">{topMerchant.storeName}</p>
                <p class="text-xs text-ok-gray-500">{formatBDT(topMerchant.totalSales)} total sales</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var ctx1 = document.getElementById('admin-revenue-chart');
          if (ctx1 && window.Chart) new Chart(ctx1, { type: 'line', data: { labels: ${JSON.stringify(days)}, datasets: [{ label: 'Revenue', data: ${JSON.stringify(revenueData)}, borderColor: '#0f4c3a', backgroundColor: 'rgba(166,226,46,0.15)', fill: true, tension: 0.35 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
          var ctx2 = document.getElementById('admin-dvc-chart');
          if (ctx2 && window.Chart) new Chart(ctx2, { type: 'doughnut', data: { labels: ['Delivered', 'Cancelled', 'Returned'], datasets: [{ data: [${delivered.length}, ${cancelled.length}, ${returned.length}], backgroundColor: ['#0f4c3a', '#d9362f', '#f59e0b'] }] }, options: { responsive: true, maintainAspectRatio: false } });
        })();
      `}} />
    </AdminLayout>
  )
}
