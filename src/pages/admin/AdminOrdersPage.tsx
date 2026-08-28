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
            <tbody class="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr class="hover:bg-gray-50/60 transition-colors">
                  <td class="p-4 font-bold text-ok-green-800">{o.id}</td>
                  <td class="p-4 font-semibold text-ok-charcoal">{o.customerName}</td>
                  <td class="p-4 text-xs text-ok-gray-600">
                    <p>{o.customerPhone}</p>
                    <p class="text-ok-gray-400">{o.district}</p>
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
    </AdminLayout>
  )
}
