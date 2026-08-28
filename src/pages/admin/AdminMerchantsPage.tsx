import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { merchants } from '../../data/merchants'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'

export const AdminMerchantsPage: FC = () => {
  return (
    <AdminLayout title="Merchants" active="merchants">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">Merchant Management</h1>
          <p class="text-xs text-ok-gray-500">платফর্মে নিবন্ধিত সকল মার্চেন্ট ও স্টোর</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Merchant / Store</th>
                <th class="p-4">Owner Name</th>
                <th class="p-4">Phone / District</th>
                <th class="p-4">Total Sales</th>
                <th class="p-4">Status</th>
                <th class="p-4">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {merchants.map((m) => (
                <tr class="hover:bg-gray-50/60 transition-colors">
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl bg-ok-green-800 text-white flex items-center justify-center font-bold text-sm">
                        {m.storeName.charAt(0)}
                      </div>
                      <div>
                        <p class="font-bold text-ok-charcoal">{m.storeName}</p>
                        <p class="text-xs text-ok-gray-400">ID: {m.id}</p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4 font-medium">{m.ownerName}</td>
                  <td class="p-4 text-xs text-ok-gray-600">
                    <p>{m.phone}</p>
                    <p class="text-ok-gray-400">{m.district}</p>
                  </td>
                  <td class="p-4 font-bold text-ok-green-800">{formatBDT(m.totalSales)}</td>
                  <td class="p-4">
                    <StatusBadge status={m.status} />
                  </td>
                  <td class="p-4">
                    <button class="bg-ok-green-50 text-ok-green-800 hover:bg-ok-green-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                      View Store
                    </button>
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
