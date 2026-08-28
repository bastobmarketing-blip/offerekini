import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { Breadcrumb } from '../../components/customer/Breadcrumb'
import { OrderTimeline } from '../../components/OrderTimeline'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Order } from '../../types'

export const AccountOrderDetailPage: FC<{ order: Order }> = ({ order }) => (
  <CustomerLayout title={`অর্ডার ${order.id}`} activeMobileNav="account">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumb items={[{ label: 'অ্যাকাউন্ট', href: '/account' }, { label: 'আমার অর্ডার', href: '/account/orders' }, { label: order.id }]} />

      <div class="flex items-center justify-between mt-3 mb-6 flex-wrap gap-2">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold">অর্ডার {order.id}</h1>
          <p class="text-sm text-ok-gray-500 mt-1">{formatDateBn(order.createdAt)}</p>
        </div>
        <StatusBadge label={orderStatusLabel(order.status)} tone={orderStatusTone(order.status)} />
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 class="font-bold text-sm mb-4">অর্ডার আইটেম</h3>
            <div class="space-y-3">
              {order.items.map((item) => (
                <div class="flex items-center gap-3">
                  <img src={item.productImage} class="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm line-clamp-1">{item.productName}</p>
                    <p class="text-xs text-ok-gray-500">পরিমাণ: {item.quantity} × {formatBDT(item.unitPrice)}</p>
                  </div>
                  <span class="font-bold">{formatBDT(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 class="font-bold text-sm mb-4">অর্ডার স্ট্যাটাস</h3>
            <OrderTimeline timeline={order.timeline} isCancelled={order.status === 'cancelled' || order.status === 'returned'} />
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 class="font-bold text-sm mb-3">ডেলিভারি ঠিকানা</h3>
            <p class="text-sm font-medium">{order.customerName}</p>
            <p class="text-sm text-ok-gray-500">{order.customerPhone}</p>
            <p class="text-sm text-ok-gray-500 mt-1">{order.address}, {order.area}, {order.district}</p>
          </div>

          <div class="bg-ok-green-50 rounded-2xl p-5 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-ok-gray-600">পণ্যের মূল্য</span>
              <span class="font-semibold">{formatBDT(order.productTotal)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ok-gray-600">ডেলিভারি চার্জ</span>
              <span class="font-semibold">{formatBDT(order.deliveryCharge)}</span>
            </div>
            <div class="h-px bg-ok-green-100 my-1"></div>
            <div class="flex justify-between">
              <span class="text-ok-gray-600">অগ্রিম পরিশোধ</span>
              <span class="font-bold text-ok-green-800">{formatBDT(order.advancePaid)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ok-gray-600">বাকি (ডেলিভারিতে)</span>
              <span class="font-bold">{formatBDT(order.dueOnDelivery)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomerLayout>
)
