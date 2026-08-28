import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { DataCard } from '../../components/ui/DataCard'
import { ChartCard } from '../../components/ui/ChartCard'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Merchant, Order, Product } from '../../types'

interface MerchantDashboardPageProps {
  merchant: Merchant
  orders: Order[]
  products: Product[]
}

export const MerchantDashboardPage: FC<MerchantDashboardPageProps> = ({ merchant, orders, products }) => {
  const today = new Date()
  const isToday = (iso: string) => new Date(iso).toDateString() === today.toDateString()

  const todaysOrders = orders.filter((o) => isToday(o.createdAt))
  const pending = orders.filter((o) => o.status === 'pending')
  const processing = orders.filter((o) => o.status === 'processing' || o.status === 'accepted')
  const shipped = orders.filter((o) => o.status === 'shipped' || o.status === 'ready')
  const delivered = orders.filter((o) => o.status === 'delivered')

  const todaysSales = todaysOrders.reduce((sum, o) => sum + o.totalAmount, 0)
  const pendingSettlement = delivered.reduce((sum, o) => sum + o.totalAmount, 0) * 0.15 // demo estimate
  const activeProducts = products.filter((p) => p.status === 'approved').length
  const lowStock = products.filter((p) => p.stockStatus === 'low_stock').length

  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6)

  // Last 7 days sales trend for chart
  const days: string[] = []
  const daySales: number[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    days.push(d.toLocaleDateString('bn-BD', { weekday: 'short' }))
    const dayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === d.toDateString())
    daySales.push(dayOrders.reduce((sum, o) => sum + o.totalAmount, 0))
  }

  return (
    <MerchantLayout title="Dashboard" active="dashboard" merchantName={merchant.storeName}>
      <div class="mb-6">
        <h2 class="font-bold text-lg">স্বাগতম, {merchant.ownerName}</h2>
        <p class="text-sm text-ok-gray-500">{merchant.storeName} — আজকের পারফরম্যান্স সংক্ষিপ্তভাবে দেখুন</p>
      </div>

      {/* Order status cards */}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
        <DataCard label="আজকের অর্ডার" value={String(todaysOrders.length)} icon="fa-cart-shopping" tone="green" />
        <DataCard label="Pending" value={String(pending.length)} icon="fa-clock" tone="orange" />
        <DataCard label="Processing" value={String(processing.length)} icon="fa-box-open" tone="blue" />
        <DataCard label="Shipped" value={String(shipped.length)} icon="fa-truck" tone="lime" />
        <DataCard label="Delivered" value={String(delivered.length)} icon="fa-circle-check" tone="green" />
      </div>

      {/* Sales / settlement / product cards */}
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <DataCard label="আজকের বিক্রয়" value={formatBDT(todaysSales)} icon="fa-money-bill-wave" tone="green" trend={{ value: '+12%', positive: true }} />
        <DataCard label="Pending Settlement" value={formatBDT(pendingSettlement)} icon="fa-hourglass-half" tone="orange" />
        <DataCard label="Active Products" value={String(activeProducts)} icon="fa-boxes-stacked" tone="blue" />
        <DataCard label="Low Stock" value={String(lowStock)} icon="fa-triangle-exclamation" tone="red" />
      </div>

      <div class="grid lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="বিক্রয় ট্রেন্ড (গত ৭ দিন)" canvasId="merchant-sales-chart" className="lg:col-span-2" />
        <div class="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
          <h3 class="font-bold text-sm mb-4">Quick Actions</h3>
          <div class="space-y-2">
            <a href="/merchant/products/new" class="flex items-center gap-3 p-3 rounded-xl bg-ok-green-50 hover:bg-ok-green-100 transition-colors">
              <i class="fas fa-plus text-ok-green-800"></i>
              <span class="text-sm font-semibold">নতুন পণ্য যুক্ত করুন</span>
            </a>
            <a href="/merchant/orders" class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <i class="fas fa-receipt text-ok-charcoal"></i>
              <span class="text-sm font-semibold">অর্ডার দেখুন</span>
            </a>
            <a href="/merchant/settlements" class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <i class="fas fa-file-invoice-dollar text-ok-charcoal"></i>
              <span class="text-sm font-semibold">সেটেলমেন্ট চেক করুন</span>
            </a>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div class="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100">
          <h3 class="font-bold text-sm">সাম্প্রতিক অর্ডার</h3>
          <a href="/merchant/orders" class="text-ok-green-800 text-sm font-semibold">সব দেখুন</a>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-ok-gray-500 text-xs border-b border-gray-100">
                <th class="px-4 py-3 font-medium">Order ID</th>
                <th class="px-4 py-3 font-medium">Customer</th>
                <th class="px-4 py-3 font-medium">Amount</th>
                <th class="px-4 py-3 font-medium">Status</th>
                <th class="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr class="border-b border-gray-50 hover:bg-gray-50">
                  <td class="px-4 py-3 font-semibold text-ok-green-800">
                    <a href={`/merchant/orders/${o.id}`}>{o.id}</a>
                  </td>
                  <td class="px-4 py-3">{o.customerName}</td>
                  <td class="px-4 py-3 font-semibold">{formatBDT(o.totalAmount)}</td>
                  <td class="px-4 py-3"><StatusBadge label={orderStatusLabel(o.status)} tone={orderStatusTone(o.status)} /></td>
                  <td class="px-4 py-3 text-ok-gray-500">{formatDateBn(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var ctx = document.getElementById('merchant-sales-chart');
            if (!ctx || !window.Chart) return;
            new Chart(ctx, {
              type: 'line',
              data: {
                labels: ${JSON.stringify(days)},
                datasets: [{
                  label: 'বিক্রয় (৳)',
                  data: ${JSON.stringify(daySales)},
                  borderColor: '#0f4c3a',
                  backgroundColor: 'rgba(166,226,46,0.15)',
                  tension: 0.35,
                  fill: true,
                  pointBackgroundColor: '#a6e22e'
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }
            });
          })();
        `
      }} />
    </MerchantLayout>
  )
}
