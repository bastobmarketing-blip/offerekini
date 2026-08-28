import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { OrderTimeline } from '../../components/OrderTimeline'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { formatBDT } from '../../utils/format'
import type { Order } from '../../types'

interface TrackOrderPageProps {
  order?: Order
  searched?: boolean
  orderId?: string
  phone?: string
}

export const TrackOrderPage: FC<TrackOrderPageProps> = ({ order, searched, orderId, phone }) => (
  <CustomerLayout title="অর্ডার ট্র্যাক করুন">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div class="text-center mb-8">
        <i class="fas fa-truck-fast text-3xl text-ok-green-800 mb-3"></i>
        <h1 class="text-xl sm:text-2xl font-extrabold">আপনার অর্ডার ট্র্যাক করুন</h1>
        <p class="text-sm text-ok-gray-500 mt-1">অর্ডার আইডি এবং মোবাইল নম্বর দিয়ে খুঁজুন</p>
      </div>

      <form method="get" action="/track-order" class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          name="orderId"
          value={orderId || ''}
          placeholder="অর্ডার আইডি (যেমন: OK-10245)"
          required
          class="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ok-lime-400"
        />
        <input
          type="tel"
          name="phone"
          value={phone || ''}
          placeholder="মোবাইল নম্বর"
          required
          class="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ok-lime-400"
        />
        <button type="submit" class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm whitespace-nowrap">
          ট্র্যাক করুন
        </button>
      </form>

      {searched && !order && (
        <div class="text-center py-10">
          <i class="fas fa-circle-exclamation text-3xl text-ok-red mb-3"></i>
          <p class="font-semibold">কোনো অর্ডার পাওয়া যায়নি</p>
          <p class="text-sm text-ok-gray-500 mt-1">অর্ডার আইডি এবং মোবাইল নম্বর সঠিকভাবে দিয়ে আবার চেষ্টা করুন।</p>
          <p class="text-xs text-ok-gray-400 mt-3">ডেমো: OK-10245 এবং ফোন 01711-112233 ব্যবহার করে দেখুন</p>
        </div>
      )}

      {order && (
        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <p class="text-xs text-ok-gray-500">অর্ডার আইডি</p>
              <p class="font-bold text-lg text-ok-green-800">{order.id}</p>
            </div>
            <StatusBadge label={orderStatusLabel(order.status)} tone={orderStatusTone(order.status)} />
          </div>

          <div class="mb-6">
            <OrderTimeline timeline={order.timeline} isCancelled={order.status === 'cancelled' || order.status === 'returned'} />
          </div>

          <div class="bg-ok-green-50 rounded-xl p-4 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-ok-gray-600">পণ্যের মূল্য</span>
              <span class="font-semibold">{formatBDT(order.productTotal)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ok-gray-600">অগ্রিম পরিশোধ</span>
              <span class="font-semibold text-ok-green-800">{formatBDT(order.advancePaid)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ok-gray-600">বাকি টাকা (ডেলিভারিতে)</span>
              <span class="font-semibold">{formatBDT(order.dueOnDelivery)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </CustomerLayout>
)
