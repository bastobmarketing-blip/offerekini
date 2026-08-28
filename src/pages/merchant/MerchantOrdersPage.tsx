import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Order } from '../../types'

export const MerchantOrdersPage: FC<{ orders: Order[] }> = ({ orders }) => (
  <MerchantLayout title="Orders" active="orders">
    <div class="flex items-center gap-2 mb-5 overflow-x-auto ok-scroll-x">
      {['সব', 'Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f, i) => (
        <button class={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${i === 0 ? 'bg-ok-green-800 text-white' : 'bg-white border border-gray-200 text-ok-gray-600 hover:bg-gray-50'}`}>
          {f}
        </button>
      ))}
    </div>

    {orders.length === 0 ? (
      <EmptyState icon="fa-receipt" title="কোনো অর্ডার নেই" />
    ) : (
      <>
        <div class="hidden sm:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-ok-gray-500 text-xs border-b border-gray-100">
                <th class="px-4 py-3 font-medium">Order ID</th>
                <th class="px-4 py-3 font-medium">Product</th>
                <th class="px-4 py-3 font-medium">Customer</th>
                <th class="px-4 py-3 font-medium">Amount</th>
                <th class="px-4 py-3 font-medium">Advance Paid</th>
                <th class="px-4 py-3 font-medium">Status</th>
                <th class="px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr class="border-b border-gray-50 hover:bg-gray-50">
                  <td class="px-4 py-3 font-semibold text-ok-green-800"><a href={`/merchant/orders/${o.id}`}>{o.id}</a></td>
                  <td class="px-4 py-3 line-clamp-1 max-w-[160px]">{o.items[0].productName}</td>
                  <td class="px-4 py-3">{o.customerName}</td>
                  <td class="px-4 py-3 font-semibold">{formatBDT(o.totalAmount)}</td>
                  <td class="px-4 py-3 text-ok-green-700">{formatBDT(o.advancePaid)}</td>
                  <td class="px-4 py-3"><StatusBadge label={orderStatusLabel(o.status)} tone={orderStatusTone(o.status)} /></td>
                  <td class="px-4 py-3 text-ok-gray-500">{formatDateBn(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="sm:hidden space-y-3">
          {orders.map((o) => (
            <a href={`/merchant/orders/${o.id}`} class="block bg-white rounded-2xl border border-gray-100 p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-sm text-ok-green-800">{o.id}</span>
                <StatusBadge label={orderStatusLabel(o.status)} tone={orderStatusTone(o.status)} />
              </div>
              <p class="text-sm font-medium line-clamp-1">{o.items[0].productName}</p>
              <div class="flex items-center justify-between mt-2 text-xs text-ok-gray-500">
                <span>{o.customerName}</span>
                <span class="font-bold text-ok-charcoal">{formatBDT(o.totalAmount)}</span>
              </div>
            </a>
          ))}
        </div>
      </>
    )}
  </MerchantLayout>
)
