import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Order } from '../../types'

export const MerchantOrdersPage: FC<{ orders: Order[] }> = ({ orders }) => (
  <MerchantLayout title="Orders" active="orders">
    <div class="flex items-center justify-between mb-5 flex-wrap gap-2">
      <div>
        <h1 class="text-xl font-bold text-ok-charcoal">মার্চেন্ট অর্ডার তালিকা ({orders.length})</h1>
        <p class="text-xs text-ok-gray-500">আপনার স্টোরের সকল গ্রাহকের অর্ডার ও কুরিয়ার ডিসপ্যাচ</p>
      </div>
    </div>

    {orders.length === 0 ? (
      <EmptyState icon="fa-receipt" title="কোনো অর্ডার পাওয়া যায়নি" />
    ) : (
      <>
        <div class="hidden sm:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-ok-gray-500 text-xs border-b border-gray-100 bg-gray-50">
                <th class="px-4 py-3 font-medium">Order ID</th>
                <th class="px-4 py-3 font-medium">Product</th>
                <th class="px-4 py-3 font-medium">Customer & Address</th>
                <th class="px-4 py-3 font-medium">Amount</th>
                <th class="px-4 py-3 font-medium">Status</th>
                <th class="px-4 py-3 font-medium">Courier</th>
                <th class="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr class="hover:bg-gray-50/70 transition-colors">
                  <td class="px-4 py-3 font-bold text-ok-green-800">
                    <a href={`/merchant/orders/${o.id}`} class="hover:underline">
                      {o.id}
                    </a>
                    <p class="text-[11px] text-gray-400 font-normal">{formatDateBn(o.createdAt)}</p>
                  </td>
                  <td class="px-4 py-3 max-w-[180px]">
                    <p class="font-bold text-ok-charcoal line-clamp-1">{o.items[0]?.productName || 'Product'}</p>
                    <p class="text-xs text-ok-gray-500">পরিমাণ: {o.items[0]?.quantity || 1}</p>
                  </td>
                  <td class="px-4 py-3">
                    <p class="font-semibold">{o.customerName}</p>
                    <p class="text-xs text-ok-gray-400">{o.customerPhone}</p>
                    <p class="text-xs text-ok-gray-500 line-clamp-1">{o.district}</p>
                  </td>
                  <td class="px-4 py-3">
                    <p class="font-bold text-slate-900">{formatBDT(o.totalAmount)}</p>
                    <p class="text-[11px] text-ok-green-700">Due: {formatBDT(o.dueOnDelivery || o.totalAmount)}</p>
                  </td>
                  <td class="px-4 py-3">
                    <StatusBadge label={orderStatusLabel(o.status)} tone={orderStatusTone(o.status)} />
                  </td>
                  <td class="px-4 py-3">
                    {o.trackingCode ? (
                      <span class="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        🚚 {o.trackingCode}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onclick={`quickSendCourier('${o.id}')`}
                        class="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-lg border border-sky-200 transition-colors inline-flex items-center gap-1"
                      >
                        <i class="fas fa-paper-plane text-[10px]"></i> Send Courier
                      </button>
                    )}
                  </td>
                  <td class="px-4 py-3 text-right">
                    <a
                      href={`/merchant/orders/${o.id}`}
                      class="bg-gray-100 hover:bg-ok-green-50 hover:text-ok-green-800 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-block"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="sm:hidden space-y-3">
          {orders.map((o) => (
            <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-sm text-ok-green-800">#{o.id}</span>
                <StatusBadge label={orderStatusLabel(o.status)} tone={orderStatusTone(o.status)} />
              </div>
              <p class="text-sm font-bold text-slate-900 line-clamp-1">{o.items[0]?.productName}</p>
              <div class="text-xs text-ok-gray-500 mt-1">
                <p>কাস্টমার: {o.customerName} ({o.customerPhone})</p>
                <p>ঠিকানা: {o.address}, {o.district}</p>
              </div>
              <div class="flex items-center justify-between mt-3 pt-2 border-t text-xs">
                <span class="font-bold text-slate-900">{formatBDT(o.totalAmount)}</span>
                <div class="flex items-center gap-2">
                  {o.trackingCode ? (
                    <span class="text-[10px] font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-bold">
                      {o.trackingCode}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onclick={`quickSendCourier('${o.id}')`}
                      class="text-xs bg-sky-600 text-white font-bold px-2.5 py-1 rounded-lg"
                    >
                      Send Courier
                    </button>
                  )}
                  <a href={`/merchant/orders/${o.id}`} class="text-xs font-bold text-ok-green-800 underline">
                    Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )}

    <script dangerouslySetInnerHTML={{
      __html: `
        async function quickSendCourier(orderId) {
          if (!confirm('আপনি কি নিশ্চিতভাবে এই অর্ডারটি Steadfast কুরিয়ারে বুক করতে চান?')) return;
          try {
            const res = await fetch('/api/merchant/orders/' + orderId + '/send-courier', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
              alert('সফলভাবে Steadfast কুরিয়ারে বুক হয়েছে! Tracking: ' + data.trackingCode);
              window.location.reload();
            } else {
              alert('ত্রুটি: ' + (data.error || 'Failed'));
            }
          } catch(e) {
            alert('Error: ' + e.message);
          }
        }
      `
    }} />
  </MerchantLayout>
)
