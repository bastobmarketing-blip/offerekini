import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { orders } from '../../data/orders'
import { merchants, getMerchantById } from '../../data/merchants'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'

export const AdminOrdersPage: FC = () => {
  return (
    <AdminLayout title="Orders" active="orders">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">All Orders ({orders.length})</h1>
          <p class="text-xs text-ok-gray-500">প্ল্যাটফর্মের সকল কাস্টমার অর্ডারের তালিকা ও নির্ধারিত মার্চেন্ট</p>
        </div>
        <div class="flex items-center gap-3">
          <label class="text-xs font-bold text-ok-charcoal">ফিল্টার মার্চেন্ট:</label>
          <select
            id="filter-merchant-select"
            class="text-xs font-medium px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 shadow-sm"
          >
            <option value="all">সকল মার্চেন্ট (All)</option>
            {merchants.map((m) => (
              <option value={m.id}>{m.storeName} ({m.phone})</option>
            ))}
          </select>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Order ID</th>
                <th class="p-4">Customer</th>
                <th class="p-4">Assigned Merchant</th>
                <th class="p-4">Total Amount</th>
                <th class="p-4">Advance Paid</th>
                <th class="p-4">Status</th>
                <th class="p-4">Courier</th>
                <th class="p-4">Date</th>
              </tr>
            </thead>
            <tbody id="admin-orders-tbody" class="divide-y divide-gray-100">
              {orders.map((o) => {
                const merchant = getMerchantById(o.merchantId)
                return (
                  <tr
                    class="hover:bg-gray-50/60 transition-colors order-row"
                    data-order-id={o.id}
                    data-merchant-id={o.merchantId || ''}
                  >
                    <td class="p-4 font-bold text-ok-green-800">
                      <span>{o.id}</span>
                    </td>
                    <td class="p-4 font-semibold text-ok-charcoal">
                      <p>{o.customerName}</p>
                      <p class="text-xs text-ok-gray-500 font-normal">{o.customerPhone}</p>
                      {o.items && o.items.length > 0 && (
                        <p class="text-[11px] font-normal text-ok-gray-500 mt-0.5">
                          📦 {o.items.map((it) => it.productName).join(', ')}
                        </p>
                      )}
                    </td>
                    <td class="p-4">
                      {merchant ? (
                        <div>
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            🏪 {merchant.storeName}
                          </span>
                          <p class="text-[10px] text-gray-400 font-mono mt-0.5">{merchant.phone}</p>
                        </div>
                      ) : (
                        <span class="text-xs font-mono text-gray-400">{o.merchantId || 'mer-1'}</span>
                      )}
                    </td>
                    <td class="p-4 font-bold text-ok-charcoal">{formatBDT(o.totalAmount)}</td>
                    <td class="p-4 text-xs font-bold text-ok-lime-600">{formatBDT(o.advancePaid)}</td>
                    <td class="p-4">
                      <StatusBadge status={o.status} />
                    </td>
                    <td class="p-4">
                      {o.trackingCode ? (
                        <span class="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          🚚 {o.trackingCode}
                        </span>
                      ) : (
                        <span class="text-xs text-gray-400 italic">নট সেন্ট</span>
                      )}
                    </td>
                    <td class="p-4 text-xs text-ok-gray-500">
                      {new Date(o.createdAt).toLocaleDateString('bn-BD')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Client-side merchant filter
          document.getElementById('filter-merchant-select').addEventListener('change', function(e) {
            var selected = e.target.value;
            var rows = document.querySelectorAll('.order-row');
            rows.forEach(function(r) {
              var mId = r.getAttribute('data-merchant-id');
              if (selected === 'all' || mId === selected) {
                r.style.display = '';
              } else {
                r.style.display = 'none';
              }
            });
          });

          // Insert new local storage orders
          (function() {
            try {
              var localOrders = JSON.parse(localStorage.getItem('offerkini_orders') || '[]');
              var tbody = document.getElementById('admin-orders-tbody');
              if (!tbody || !localOrders.length) return;
              localOrders.forEach(function(o) {
                if (!o || !o.id) return;
                if (document.querySelector('tr[data-order-id="' + o.id + '"]')) return;
                var tr = document.createElement('tr');
                tr.className = 'hover:bg-emerald-50/50 bg-emerald-50/20 transition-colors order-row';
                tr.setAttribute('data-order-id', o.id);
                tr.setAttribute('data-merchant-id', o.merchantId || 'mer-1');
                var itemsText = (o.items && o.items.length) ? o.items.map(function(i){ return i.productName; }).join(', ') : 'Testo King';
                var bnPrice = '৳' + (o.totalAmount || 0).toLocaleString('en-IN');
                var bnAdv = '৳' + (o.advancePaid || 0).toLocaleString('en-IN');
                var dt = new Date(o.createdAt || Date.now()).toLocaleDateString('bn-BD');
                tr.innerHTML = '<td class="p-4 font-bold text-ok-green-800">' + o.id + ' <span class="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold ml-1">নতুন</span></td>' +
                  '<td class="p-4 font-semibold text-ok-charcoal"><p>' + (o.customerName || '') + '</p><p class="text-xs text-ok-gray-500 font-normal">' + (o.customerPhone || '') + '</p><p class="text-[11px] font-normal text-ok-gray-500 mt-0.5">📦 ' + itemsText + '</p></td>' +
                  '<td class="p-4"><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">🏪 Assigned</span></td>' +
                  '<td class="p-4 font-bold text-ok-charcoal">' + bnPrice + '</td>' +
                  '<td class="p-4 text-xs font-bold text-ok-lime-600">' + bnAdv + '</td>' +
                  '<td class="p-4"><span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">অর্ডার গ্রহণ করা হয়েছে</span></td>' +
                  '<td class="p-4"><span class="text-xs text-gray-400 italic">নট সেন্ট</span></td>' +
                  '<td class="p-4 text-xs text-ok-gray-500">' + dt + '</td>';
                tbody.insertBefore(tr, tbody.firstChild);
              });
            } catch(e){}
          })();
        `
      }} />
    </AdminLayout>
  )
}
