import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Order } from '../../types'

export const MerchantOrdersPage: FC<{ orders: Order[] }> = ({ orders }) => {
  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const calledCount = orders.filter((o) => o.status === 'called').length
  const inTransitCount = orders.filter((o) => o.status === 'shipped' || o.status === 'ready').length
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length
  const cancelledCount = orders.filter((o) => o.status === 'cancelled' || o.status === 'returned').length

  return (
    <MerchantLayout title="Orders" active="orders">
      <div class="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">মার্চেন্ট অর্ডার ও পার্সেল ম্যানেজমেন্ট ({orders.length})</h1>
          <p class="text-xs text-ok-gray-500">আপনার অ্যাসাইন করা প্রোডাক্টের সকল গ্রাহক অর্ডার ও কুরিয়ার ডিসপ্যাচ</p>
        </div>
      </div>

      {/* KPI TILES */}
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] text-gray-400 font-bold uppercase">পেন্ডিং অর্ডার</p>
          <p class="text-xl font-black text-amber-600 mt-0.5">{pendingCount}</p>
        </div>
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] text-gray-400 font-bold uppercase">কল দেওয়া হয়েছে</p>
          <p class="text-xl font-black text-blue-600 mt-0.5">{calledCount}</p>
        </div>
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] text-gray-400 font-bold uppercase">কুরিয়ার / ট্রানজিট</p>
          <p class="text-xl font-black text-sky-600 mt-0.5">{inTransitCount}</p>
        </div>
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] text-gray-400 font-bold uppercase">ডেলিভারি সম্পন্ন</p>
          <p class="text-xl font-black text-emerald-600 mt-0.5">{deliveredCount}</p>
        </div>
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center col-span-2 sm:col-span-1">
          <p class="text-[10px] text-gray-400 font-bold uppercase">বাতিল / রিটার্ন</p>
          <p class="text-xl font-black text-rose-600 mt-0.5">{cancelledCount}</p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 mb-4 text-xs font-bold scrollbar-none">
        <button
          type="button"
          onclick="filterMerchantOrders('all')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-ok-green-800 text-white transition-all whitespace-nowrap active"
          data-tab="all"
        >
          সকল অর্ডার ({orders.length})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('pending')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="pending"
        >
          পেন্ডিং ({pendingCount})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('called')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="called"
        >
          কল দেওয়া হয়েছে ({calledCount})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('in_transit')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="in_transit"
        >
          ট্রানজিটে / কুরিয়ারে ({inTransitCount})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('delivered')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="delivered"
        >
          ডেলিভার্ড ({deliveredCount})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('cancelled')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="cancelled"
        >
          বাতিল ({cancelledCount})
        </button>
      </div>

      {orders.length === 0 ? (
        <EmptyState icon="fa-receipt" title="কোনো অর্ডার পাওয়া যায়নি" />
      ) : (
        <>
          <div class="hidden sm:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-ok-gray-500 text-xs border-b border-gray-100 bg-gray-50">
                  <th class="px-4 py-3 font-medium">Order ID & Date</th>
                  <th class="px-4 py-3 font-medium">Product Details</th>
                  <th class="px-4 py-3 font-medium">Customer & Address</th>
                  <th class="px-4 py-3 font-medium">Amount</th>
                  <th class="px-4 py-3 font-medium">Status Update</th>
                  <th class="px-4 py-3 font-medium">Courier</th>
                  <th class="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                {orders.map((o) => (
                  <tr
                    class="hover:bg-gray-50/70 transition-colors merchant-order-row"
                    data-status={o.status}
                    id={`m-order-row-${o.id}`}
                  >
                    <td class="px-4 py-3 font-bold text-ok-green-800">
                      <a href={`/merchant/orders/${o.id}`} class="hover:underline font-mono">
                        {o.id}
                      </a>
                      <p class="text-[11px] text-gray-400 font-normal mt-0.5">{formatDateBn(o.createdAt)}</p>
                    </td>

                    <td class="px-4 py-3 max-w-[200px]">
                      <p class="font-bold text-ok-charcoal line-clamp-1">{o.items[0]?.productName || 'Product'}</p>
                      <p class="text-xs text-ok-gray-500">পরিমাণ: {o.items[0]?.quantity || 1} টি</p>
                    </td>

                    <td class="px-4 py-3">
                      <p class="font-semibold text-slate-800">{o.customerName}</p>
                      <p class="text-xs text-ok-gray-500 font-mono">{o.customerPhone}</p>
                      <p class="text-[11px] text-ok-gray-400 line-clamp-1">{o.address}, {o.district}</p>
                    </td>

                    <td class="px-4 py-3">
                      <p class="font-bold text-slate-900">{formatBDT(o.totalAmount)}</p>
                      <p class="text-[11px] text-ok-green-700">Due: {formatBDT(o.dueOnDelivery || o.totalAmount)}</p>
                    </td>

                    <td class="px-4 py-3">
                      <select
                        onchange={`changeMerchantOrderStatus('${o.id}', this.value)`}
                        class="text-xs font-bold px-2 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-ok-green-700 shadow-xs"
                      >
                        <option value="pending" selected={o.status === 'pending'}>⏳ পেন্ডিং</option>
                        <option value="called" selected={o.status === 'called'}>📞 কল দেওয়া হয়েছে</option>
                        <option value="processing" selected={o.status === 'processing'}>📦 প্যাকিং চলছে</option>
                        <option value="ready" selected={o.status === 'ready'}>🚚 প্রস্তুত</option>
                        <option value="shipped" selected={o.status === 'shipped'}>🚚 কুরিয়ারে পাঠানো</option>
                        <option value="delivered" selected={o.status === 'delivered'}>✅ ডেলিভার্ড</option>
                        <option value="cancelled" selected={o.status === 'cancelled'}>❌ বাতিল</option>
                        <option value="returned" selected={o.status === 'returned'}>↩️ রিটার্ন</option>
                      </select>
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
                          class="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-lg border border-sky-200 transition-colors inline-flex items-center gap-1 shadow-xs"
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
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="sm:hidden space-y-3">
            {orders.map((o) => (
              <div
                class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm merchant-order-row"
                data-status={o.status}
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-sm text-ok-green-800 font-mono">#{o.id}</span>
                  <StatusBadge label={orderStatusLabel(o.status)} tone={orderStatusTone(o.status)} />
                </div>
                <p class="text-sm font-bold text-slate-900 line-clamp-1">{o.items[0]?.productName}</p>
                <div class="text-xs text-ok-gray-500 mt-1 space-y-0.5">
                  <p>কাস্টমার: {o.customerName} ({o.customerPhone})</p>
                  <p>ঠিকানা: {o.address}, {o.district}</p>
                </div>
                <div class="flex items-center justify-between mt-3 pt-2.5 border-t text-xs">
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
          // Filter Tabs
          window.filterMerchantOrders = function(tab) {
            var tabs = document.querySelectorAll('.merchant-filter-tab');
            tabs.forEach(function(t) {
              if (t.getAttribute('data-tab') === tab) {
                t.className = 'merchant-filter-tab px-4 py-2 rounded-xl bg-ok-green-800 text-white transition-all whitespace-nowrap active';
              } else {
                t.className = 'merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap';
              }
            });

            var rows = document.querySelectorAll('.merchant-order-row');
            rows.forEach(function(r) {
              var s = r.getAttribute('data-status');
              if (tab === 'all') {
                r.style.display = '';
              } else if (tab === 'in_transit') {
                if (s === 'shipped' || s === 'ready') r.style.display = '';
                else r.style.display = 'none';
              } else if (tab === 'cancelled') {
                if (s === 'cancelled' || s === 'returned') r.style.display = '';
                else r.style.display = 'none';
              } else {
                if (s === tab) r.style.display = '';
                else r.style.display = 'none';
              }
            });
          };

          // Change Order Status
          window.changeMerchantOrderStatus = async function(orderId, newStatus) {
            try {
              var res = await fetch('/api/merchant/orders/' + orderId + '/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
              });
              var data = await res.json();
              if (data.success) {
                alert('অর্ডার স্ট্যাটাস সফলভাবে পরিবর্তিত হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          };

          // Courier Dispatch
          async function quickSendCourier(orderId) {
            if (!confirm('আপনি কি নিশ্চিতভাবে এই অর্ডারটি Steadfast কুরিয়ারে বুক করতে চান?')) return;
            try {
              var res = await fetch('/api/merchant/orders/' + orderId + '/send-courier', { method: 'POST' });
              var data = await res.json();
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
}
