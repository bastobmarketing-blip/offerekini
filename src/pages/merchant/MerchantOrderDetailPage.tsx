import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { OrderTimeline } from '../../components/OrderTimeline'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Order } from '../../types'

const ACTION_MAP: Record<string, { label: string; next: string; tone: 'primary' | 'outline' }[]> = {
  pending: [
    { label: 'Accept Order', next: 'accepted', tone: 'primary' },
    { label: 'Reject Order', next: 'cancelled', tone: 'outline' }
  ],
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
            <div class="flex items-center gap-2">
              <h2 class="font-bold text-lg">অর্ডার #{order.id}</h2>
              {order.trackingCode && (
                <span class="bg-sky-100 text-sky-800 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
                  🚚 {order.courierProvider || 'Steadfast'}: {order.trackingCode}
                </span>
              )}
            </div>
            <p class="text-xs text-ok-gray-500">{formatDateBn(order.createdAt)}</p>
          </div>
          <StatusBadge label={orderStatusLabel(order.status)} tone={orderStatusTone(order.status)} />
        </div>

        <div class="grid lg:grid-cols-3 gap-5">
          <div class="lg:col-span-2 space-y-5">
            {/* COURIER DISPATCH CARD */}
            <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-bold text-sm text-ok-charcoal flex items-center gap-2">
                  <i class="fas fa-truck-fast text-ok-green-700"></i> কুরিয়ার ডেলিভারি (Steadfast)
                </h3>
                {order.trackingCode ? (
                  <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <i class="fas fa-circle-check"></i> কুরিয়ারে বুকড
                  </span>
                ) : (
                  <span class="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                    কুরিয়ারে পাঠানো হয়নি
                  </span>
                )}
              </div>

              {order.trackingCode ? (
                <div class="bg-gray-50 rounded-xl p-3.5 space-y-2 text-xs">
                  <div class="flex justify-between">
                    <span class="text-ok-gray-500">Tracking Code:</span>
                    <span class="font-mono font-bold text-slate-900">{order.trackingCode}</span>
                  </div>
                  {order.consignmentId && (
                    <div class="flex justify-between">
                      <span class="text-ok-gray-500">Consignment ID:</span>
                      <span class="font-mono font-bold text-slate-900">{order.consignmentId}</span>
                    </div>
                  )}
                  <div class="pt-2 border-t">
                    <a
                      href={`https://steadfast.com.bd/tracking/${order.trackingCode}`}
                      target="_blank"
                      class="text-sky-600 hover:underline font-bold inline-flex items-center gap-1"
                    >
                      <i class="fas fa-arrow-up-right-from-square text-[10px]"></i> ট্র্যাক পার্সেল (Steadfast)
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <p class="text-xs text-ok-gray-500 mb-3">
                    ১-ক্লিকে কাস্টমারের নাম, ফোন, ঠিকানা ও ক্যাশ অন ডেলিভারি (৳{order.dueOnDelivery || order.totalAmount}) তথ্য সহ Steadfast কুরিয়ারে বুক করুন:
                  </p>
                  <button
                    type="button"
                    id="send-courier-btn"
                    onclick={`dispatchToCourier('${order.id}')`}
                    class="bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
                  >
                    <i class="fas fa-paper-plane"></i>
                    <span>Send to Steadfast Courier</span>
                  </button>
                </div>
              )}
            </div>

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
                      type="button"
                      class={`w-full font-bold text-sm py-2.5 rounded-xl transition-colors ${
                        a.tone === 'primary' ? 'bg-ok-green-800 text-white hover:bg-ok-green-900' : 'border-2 border-ok-red text-ok-red hover:bg-red-50'
                      }`}
                      onclick={`updateOrderStatus('${order.id}', '${a.next}')`}
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

      <script dangerouslySetInnerHTML={{
        __html: `
          async function updateOrderStatus(orderId, nextStatus) {
            try {
              const res = await fetch('/api/merchant/orders/' + orderId + '/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus })
              });
              const data = await res.json();
              if (data.success) {
                alert('অর্ডারের স্ট্যাটাস আপডেট হয়েছে: ' + nextStatus);
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed to update'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          }

          async function dispatchToCourier(orderId) {
            const btn = document.getElementById('send-courier-btn');
            btn.disabled = true;
            btn.innerHTML = '<span class="ok-spinner"></span> কুরিয়ারে পাঠানো হচ্ছে...';
            try {
              const res = await fetch('/api/merchant/orders/' + orderId + '/send-courier', {
                method: 'POST'
              });
              const data = await res.json();
              if (data.success) {
                alert('সফলভাবে Steadfast কুরিয়ারে বুক হয়েছে! Tracking: ' + data.trackingCode);
                window.location.reload();
              } else {
                alert('কুরিয়ার বুকিং ত্রুটি: ' + (data.error || 'Unknown'));
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send to Steadfast Courier';
              }
            } catch(e) {
              alert('Network error: ' + e.message);
              btn.disabled = false;
              btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send to Steadfast Courier';
            }
          }
        `
      }} />
    </MerchantLayout>
  )
}
