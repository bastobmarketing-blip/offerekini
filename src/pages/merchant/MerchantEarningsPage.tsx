import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { DataCard } from '../../components/ui/DataCard'
import { ChartCard } from '../../components/ui/ChartCard'
import { StatusBadge, settlementStatusTone } from '../../components/ui/StatusBadge'
import { formatBDT, formatDateShort } from '../../utils/format'
import type { Order, Settlement } from '../../types'

export const MerchantEarningsPage: FC<{ orders: Order[]; settlements: Settlement[] }> = ({ orders, settlements }) => {
  const grossSales = orders.reduce((sum, o) => sum + o.totalAmount, 0)
  const deliveredSales = orders.filter((o) => o.status === 'delivered').reduce((sum, o) => sum + o.totalAmount, 0)
  const pendingSettlement = settlements.filter((s) => s.status === 'pending').reduce((sum, s) => sum + s.netAmount, 0)
  const paidSettlement = settlements.filter((s) => s.status === 'paid').reduce((sum, s) => sum + s.netAmount, 0)

  const months = settlements.slice(-6).map((s) => formatDateShort(s.date))
  const amounts = settlements.slice(-6).map((s) => s.netAmount)

  const statusLabelMap: Record<string, string> = { pending: 'Pending', approved: 'Approved', paid: 'Paid', disputed: 'Disputed' }

  return (
    <MerchantLayout title="Earnings" active="earnings">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <DataCard label="Gross Sales" value={formatBDT(grossSales)} icon="fa-sack-dollar" tone="green" />
        <DataCard label="Delivered Sales" value={formatBDT(deliveredSales)} icon="fa-circle-check" tone="blue" />
        <DataCard label="Pending Settlement" value={formatBDT(pendingSettlement)} icon="fa-hourglass-half" tone="orange" />
        <DataCard label="Paid Settlement" value={formatBDT(paidSettlement)} icon="fa-wallet" tone="lime" />
      </div>

      <ChartCard title="সেটেলমেন্ট ট্রেন্ড" canvasId="earnings-chart" className="mb-6" />

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div class="p-4 sm:p-5 border-b border-gray-100">
          <h3 class="font-bold text-sm">Settlement History</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-ok-gray-500 text-xs border-b border-gray-100">
                <th class="px-4 py-3 font-medium">Settlement ID</th>
                <th class="px-4 py-3 font-medium">Date</th>
                <th class="px-4 py-3 font-medium">Orders</th>
                <th class="px-4 py-3 font-medium">Amount</th>
                <th class="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map((s) => (
                <tr class="border-b border-gray-50 hover:bg-gray-50">
                  <td class="px-4 py-3 font-semibold">{s.id}</td>
                  <td class="px-4 py-3 text-ok-gray-500">{formatDateShort(s.date)}</td>
                  <td class="px-4 py-3">{s.orderCount}</td>
                  <td class="px-4 py-3 font-semibold">{formatBDT(s.netAmount)}</td>
                  <td class="px-4 py-3"><StatusBadge label={statusLabelMap[s.status]} tone={settlementStatusTone(s.status)} /></td>
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
            var ctx = document.getElementById('earnings-chart');
            if (!ctx || !window.Chart) return;
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ${JSON.stringify(months)},
                datasets: [{ label: 'Net Settlement (৳)', data: ${JSON.stringify(amounts)}, backgroundColor: '#a6e22e', borderRadius: 6 }]
              },
              options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
          })();
        `
      }} />
    </MerchantLayout>
  )
}
