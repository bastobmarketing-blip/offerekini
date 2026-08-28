import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { StatusBadge, settlementStatusTone } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatBDT, formatDateShort } from '../../utils/format'
import type { Settlement } from '../../types'

const STATUS_LABEL: Record<string, string> = { pending: 'Pending', approved: 'Approved', paid: 'Paid', disputed: 'Disputed' }

export const MerchantSettlementsPage: FC<{ settlements: Settlement[] }> = ({ settlements }) => (
  <MerchantLayout title="Settlements" active="settlements">
    {settlements.length === 0 ? (
      <EmptyState icon="fa-file-invoice-dollar" title="কোনো সেটেলমেন্ট নেই" />
    ) : (
      <div class="space-y-3">
        {settlements.map((s) => (
          <div class="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex items-center justify-between flex-wrap gap-3">
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-xl bg-ok-green-50 flex items-center justify-center shrink-0">
                <i class="fas fa-file-invoice-dollar text-ok-green-800"></i>
              </div>
              <div>
                <p class="font-bold text-sm">{s.id}</p>
                <p class="text-xs text-ok-gray-500">{formatDateShort(s.date)} · {s.orderCount} orders</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <p class="font-bold text-ok-green-800">{formatBDT(s.netAmount)}</p>
                {s.adjustments !== 0 && <p class="text-xs text-ok-gray-400">adj: {formatBDT(s.adjustments)}</p>}
              </div>
              <StatusBadge label={STATUS_LABEL[s.status]} tone={settlementStatusTone(s.status)} />
            </div>
          </div>
        ))}
      </div>
    )}
  </MerchantLayout>
)
