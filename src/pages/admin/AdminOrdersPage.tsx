import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { orders } from '../../data/orders'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'

export const AdminOrdersPage: FC = () => {
  return (
    <AdminLayout title="Orders" active="orders">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">All Orders</h1>
          <p class="text-xs text-ok-gray-500">প্ল্যাটফর্মের সকল কাস্টমার অর্ডারের তালিকা</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Order ID</th>
                <th class="p-4">Customer</th>
                <th class="p-4">Phone / District</th>
                <th class="p-4">Total Amount</th>
                <th class="p-4">Advance Paid</th>
                <th class="p-4">Status</th>
                <th class="p-4">Date</th>
              </tr>
            </thead>
            <tbody id="admin-orders-tbody" class="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr class="hover:bg-gray-50/60 transition-colors" data-order-id={o.id}>
                  <td class="p-4 font-bold text-ok-green-800">{o.id}</td>
                  <td class="p-4 font-semibold text-ok-charcoal">
                    <p>{o.customerName}</p>
                    {o.items && o.items.length > 0 && (
                      <p class="text-[11px] font-normal text-ok-gray-500 mt-0.5">
                        📦 {o.items.map((it) => it.productName).join(', ')}
                      </p>
                    )}
                  </td>
                  <td class="p-4 text-xs text-ok-gray-600">
                    <p>{o.customerPhone}</p>
                    <p class="text-ok-gray-400">{o.district || o.address}</p>
                  </td>
                  <td class="p-4 font-bold text-ok-charcoal">{formatBDT(o.totalAmount)}</td>
                  <td class="p-4 text-xs font-bold text-ok-lime-600">{formatBDT(o.advancePaid)}</td>
                  <td class="p-4">
                    <StatusBadge status={o.status} />
                  </td>
                  <td class="p-4 text-xs text-ok-gray-500">
                    {new Date(o.createdAt).toLocaleDateString('bn-BD')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var localOrders = JSON.parse(localStorage.getItem('offerkini_orders') || '[]');
              var tbody = document.getElementById('admin-orders-tbody');
              if (!tbody || !localOrders.length) return;
              localOrders.forEach(function(o) {
                if (!o || !o.id) return;
                if (document.querySelector('tr[data-order-id="' + o.id + '"]')) return;
                var tr = document.createElement('tr');
                tr.className = 'hover:bg-emerald-50/50 bg-emerald-50/20 transition-colors';
                tr.setAttribute('data-order-id', o.id);
                var itemsText = (o.items && o.items.length) ? o.items.map(function(i){ return i.productName; }).join(', ') : 'Testo King';
                var bnPrice = '৳' + (o.totalAmount || 0).toLocaleString('en-IN');
                var bnAdv = '৳' + (o.advancePaid || 0).toLocaleString('en-IN');
                var dt = new Date(o.createdAt || Date.now()).toLocaleDateString('bn-BD');
                tr.innerHTML = '<td class="p-4 font-bold text-ok-green-800">' + o.id + ' <span class="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold ml-1">নতুন</span></td>' +
                  '<td class="p-4 font-semibold text-ok-charcoal"><p>' + (o.customerName || '') + '</p><p class="text-[11px] font-normal text-ok-gray-500 mt-0.5">📦 ' + itemsText + '</p></td>' +
                  '<td class="p-4 text-xs text-ok-gray-600"><p>' + (o.customerPhone || '') + '</p><p class="text-ok-gray-400">' + (o.district || o.address || '') + '</p></td>' +
                  '<td class="p-4 font-bold text-ok-charcoal">' + bnPrice + '</td>' +
                  '<td class="p-4 text-xs font-bold text-ok-lime-600">' + bnAdv + '</td>' +
                  '<td class="p-4"><span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">অর্ডার গ্রহণ করা হয়েছে</span></td>' +
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
