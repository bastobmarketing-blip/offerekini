import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { OrderTimeline } from '../../components/OrderTimeline'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Order } from '../../types'

const ACTION_MAP: Record<string, { label: string; next: string; tone: 'primary' | 'outline' }[]> = {
  pending: [{ label: 'Accept Order', next: 'accepted', tone: 'primary' }, { label: 'Reject Order', next: 'cancelled', tone: 'outline' }],
  accepted: [{ label: 'Mark Processing', next: 'processing', tone: 'primary' }],
  processing: [{ label: 'Mark Ready', next: 'ready', tone: 'primary' }],
  ready: [{ label: 'Mark Shipped', next: 'shipped', tone: 'primary' }],
  shipped: [{ label: 'Mark Delivered', next: 'delivered', tone: 'primary' }],
  delivered: [],
  cancelled: [],
  returned: []
}

export const MerchantOrderDetailPage: FC<{ order: Order }> = ({ order }) => {
  const actions = ACTION_MAP[order.status] || []

  return (
    <MerchantLayout title={`Order ${order.id}`} active="orders">
      <div class="max-w-4xl">
        <div class="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div>
            <h2 class="font-bold text-lg">অর্ডার {order.id}</h2>
            <p class="text-xs text-ok-gray-500">{formatDateBn(order.createdAt)}</p>
          </div>
          <StatusBadge label={orderStatusLabel(order.status)} tone={orderStatusTone(order.status)} />
        </div>

        <div class="grid lg:grid-cols-3 gap-5">
          <div class="lg:col-span-2 space-y-5">
            <div class="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 class="font-bold text-sm mb-4">কাস্টমার তথ্য</h3>
              <div class="grid sm:grid-cols-2 gap-3 text-sm">
                <div><p class="text-ok-gray-500 text-xs">নাম</p><p class="font-medium">{order.customerName}</p></div>
                <div><p class="text-ok-gray-500 text-xs">ফোন</p><p class="font-medium">{order.customerPhone}</p></div>
                <div class="sm:col-span-2"><p class="text-ok-gray-500 text-xs">ঠিকানা</p><p class="font-medium">{order.address}, {order.area}, {order.district}</p></div>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 class="font-bold text-sm mb-4">পণ্য</h3>
              {order.items.map((item) => (
                <div class="flex items-center gap-3">
                  <img src={item.productImage} class="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm">{item.productName}</p>
                    <p class="text-xs text-ok-gray-500">পরিমাণ: {item.quantity} × {formatBDT(item.unitPrice)}</p>
                  </div>
                  <span class="font-bold">{formatBDT(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 class="font-bold text-sm mb-4">Timeline</h3>
              <OrderTimeline timeline={order.timeline} isCancelled={order.status === 'cancelled' || order.status === 'returned'} />
            </div>
          </div>

          <div class="space-y-5">
            <div class="bg-ok-green-50 rounded-2xl p-5 space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-ok-gray-600">প্রোডাক্ট প্রাইস</span><span class="font-semibold">{formatBDT(order.productTotal)}</span></div>
              <div class="flex justify-between"><span class="text-ok-gray-600">ডেলিভারি চার্জ</span><span class="font-semibold">{formatBDT(order.deliveryCharge)}</span></div>
              <div class="h-px bg-ok-green-100 my-1"></div>
              <div class="flex justify-between"><span class="text-ok-gray-600">Advance Paid</span><span class="font-bold text-ok-green-800">{formatBDT(order.advancePaid)}</span></div>
              <div class="flex justify-between"><span class="text-ok-gray-600">Due on Delivery</span><span class="font-bold">{formatBDT(order.dueOnDelivery)}</span></div>
            </div>

            {actions.length > 0 && (
              <div class="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 class="font-bold text-sm mb-3">Order Actions</h3>
                <div id="order-action-buttons" class="flex flex-col gap-2">
                  {actions.map((a) => (
                    <button
                      class={`w-full font-bold text-sm py-2.5 rounded-xl transition-colors ${
                        a.tone === 'primary' ? 'bg-ok-green-800 text-white hover:bg-ok-green-900' : 'border-2 border-ok-red text-ok-red hover:bg-red-50'
                      }`}
                      onclick={`window.OK.toast('Order status → ${a.next} (ডেমো)', 'success'); this.closest('#order-action-buttons').innerHTML='<p class=\\'text-sm text-ok-gray-500 text-center py-2\\'>Status updated (demo)</p>';`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}
