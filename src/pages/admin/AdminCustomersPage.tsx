import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { customers } from '../../data/customers'
import { orders } from '../../data/orders'
import { formatBDT } from '../../utils/format'

export const AdminCustomersPage: FC = () => {
  // Aggregate all unique customers from orders as well
  const customerMap = new Map<string, { name: string; phone: string; address: string; orderCount: number; totalSpent: number; lastOrder: string }>()

  // Populate from known customers
  for (const c of customers) {
    const custOrders = orders.filter((o) => o.customerPhone.replace(/[^0-9]/g, '') === c.phone.replace(/[^0-9]/g, ''))
    const spent = custOrders.reduce((s, o) => s + (o.totalAmount || 0), 0)
    customerMap.set(c.phone.replace(/[^0-9]/g, ''), {
      name: c.name,
      phone: c.phone,
      address: c.addresses[0]?.district || 'ঢাকা',
      orderCount: custOrders.length,
      totalSpent: spent,
      lastOrder: custOrders[0]?.createdAt || c.joinedAt
    })
  }

  // Populate from recent orders
  for (const o of orders) {
    const cleanPh = o.customerPhone.replace(/[^0-9]/g, '')
    if (!customerMap.has(cleanPh)) {
      customerMap.set(cleanPh, {
        name: o.customerName,
        phone: o.customerPhone,
        address: `${o.district || 'ঢাকা'} (${o.address || ''})`,
        orderCount: 1,
        totalSpent: o.totalAmount || 0,
        lastOrder: o.createdAt
      })
    }
  }

  const customerList = Array.from(customerMap.values())

  return (
    <AdminLayout title="Customers" active="customers">
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">কাস্টমার তালিকা ({customerList.length})</h1>
          <p class="text-xs text-ok-gray-500">প্ল্যাটফর্মের সকল নিবন্ধিত ও অর্ডারকারী গ্রাহকের তথ্য</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Customer</th>
                <th class="p-4">Phone Number</th>
                <th class="p-4">District / Address</th>
                <th class="p-4">Total Orders</th>
                <th class="p-4">Total Spent</th>
                <th class="p-4">Last Activity</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {customerList.map((c) => (
                <tr class="hover:bg-gray-50/60 transition-colors">
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <p class="font-bold text-ok-charcoal text-xs">{c.name}</p>
                    </div>
                  </td>
                  <td class="p-4 text-xs font-mono font-medium text-slate-700">{c.phone}</td>
                  <td class="p-4 text-xs text-gray-500 line-clamp-1 max-w-[220px]">{c.address}</td>
                  <td class="p-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                      {c.orderCount} টি অর্ডার
                    </span>
                  </td>
                  <td class="p-4 font-bold text-xs text-ok-green-800">{formatBDT(c.totalSpent)}</td>
                  <td class="p-4 text-xs text-gray-400">
                    {new Date(c.lastOrder).toLocaleDateString('bn-BD')}
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
