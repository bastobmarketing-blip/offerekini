import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { settlements } from '../../data/settlements'
import { getMerchantById } from '../../data/merchants'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'

export const AdminSettlementsPage: FC = () => {
  const totalSettled = settlements.filter((s) => s.status === 'paid').reduce((sum, s) => sum + s.netAmount, 0)
  const pendingSettlement = settlements.filter((s) => s.status === 'pending' || s.status === 'approved').reduce((sum, s) => sum + s.netAmount, 0)

  return (
    <AdminLayout title="Settlements" active="settlements">
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">মার্চেন্ট সেটেলমেন্ট ও পেমেন্ট হিস্ট্রি</h1>
          <p class="text-xs text-ok-gray-500">মার্চেন্টদের সাথে হিসাব নিকাশ ও বকেয়া অর্থ পরিশোধ</p>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">পরিশোধিত মোট অর্থ (Total Paid)</p>
          <p class="text-2xl font-black text-emerald-600 mt-1">{formatBDT(totalSettled)}</p>
        </div>
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">অপেক্ষমাণ সেটেলমেন্ট (Pending)</p>
          <p class="text-2xl font-black text-amber-600 mt-1">{formatBDT(pendingSettlement)}</p>
        </div>
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm col-span-2 sm:col-span-1">
          <p class="text-xs text-ok-gray-400 font-semibold">মোট স্টেটমেন্ট সংখ্যা</p>
          <p class="text-2xl font-black text-slate-800 mt-1">{settlements.length}</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Settlement ID</th>
                <th class="p-4">Merchant Store</th>
                <th class="p-4">Date</th>
                <th class="p-4">Orders</th>
                <th class="p-4">Gross Amount</th>
                <th class="p-4">Net Payable</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {settlements.map((s) => {
                const merchant = getMerchantById(s.merchantId)
                return (
                  <tr class="hover:bg-gray-50/60 transition-colors">
                    <td class="p-4 font-mono font-bold text-xs text-slate-700">{s.id}</td>
                    <td class="p-4">
                      <p class="font-bold text-xs text-ok-charcoal">{merchant?.storeName || s.merchantId}</p>
                      <p class="text-[11px] text-gray-400">{merchant?.ownerName} • {merchant?.phone}</p>
                    </td>
                    <td class="p-4 text-xs text-gray-500">{new Date(s.date).toLocaleDateString('bn-BD')}</td>
                    <td class="p-4 text-xs font-semibold">{s.orderCount} টি</td>
                    <td class="p-4 text-xs font-bold text-slate-700">{formatBDT(s.grossAmount)}</td>
                    <td class="p-4 text-xs font-extrabold text-ok-green-800">{formatBDT(s.netAmount)}</td>
                    <td class="p-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td class="p-4 text-right">
                      {s.status === 'paid' ? (
                        <span class="text-xs text-emerald-700 font-bold">পরিশোধিত ✓</span>
                      ) : (
                        <button
                          type="button"
                          onclick={`alert('সেটেলমেন্ট ${s.id} পেইড হিসেবে মার্ক করা হয়েছে')`}
                          class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg transition-colors border border-emerald-200"
                        >
                          Mark Paid
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
