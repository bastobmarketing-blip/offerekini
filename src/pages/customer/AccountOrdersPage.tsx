import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { Breadcrumb } from '../../components/customer/Breadcrumb'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Order } from '../../types'

export const AccountOrdersPage: FC<{ orders: Order[] }> = ({ orders }) => (
  <CustomerLayout title="আমার অর্ডার" activeMobileNav="account">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumb items={[{ label: 'অ্যাকাউন্ট', href: '/account' }, { label: 'আমার অর্ডার' }]} />
      <h1 class="text-xl sm:text-2xl font-extrabold mt-3 mb-6">আমার অর্ডার ({orders.length})</h1>

      {orders.length === 0 ? (
        <EmptyState icon="fa-box-open" title="কোনো অর্ডার নেই" description="আপনি এখনও কোনো অর্ডার করেননি।" actionLabel="কেনাকাটা শুরু করুন" actionHref="/products" />
      ) : (
        <div class="space-y-3">
          {orders.map((o) => (
            <a href={`/account/order/${o.id}`} class="block bg-white rounded-2xl border border-gray-100 p-4 hover:border-ok-green-200 transition-colors">
              <div class="flex items-center justify-between mb-3">
                <span class="font-bold text-sm text-ok-green-800">{o.id}</span>
                <StatusBadge label={orderStatusLabel(o.status)} tone={orderStatusTone(o.status)} />
              </div>
              <div class="flex items-center gap-3">
                <img src={o.items[0].productImage} class="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm line-clamp-1">{o.items[0].productName}</p>
                  <p class="text-xs text-ok-gray-500 mt-0.5">{formatDateBn(o.createdAt)}</p>
                </div>
                <span class="font-bold">{formatBDT(o.totalAmount)}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  </CustomerLayout>
)
