import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'

export const OrderSuccessPage: FC = () => (
  <CustomerLayout title="অর্ডার সফল হয়েছে" showMobileNav={false}>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div id="order-success-empty" class="hidden text-center py-16">
        <i class="fas fa-receipt text-4xl text-ok-gray-300 mb-4"></i>
        <h2 class="font-bold text-lg mb-2">কোনো সাম্প্রতিক অর্ডার পাওয়া যায়নি</h2>
        <a href="/products" class="text-ok-green-800 font-semibold underline">পণ্য দেখুন</a>
      </div>

      <div id="order-success-content" class="hidden">
        <div class="text-center mb-8">
          <div class="w-20 h-20 rounded-full bg-ok-lime-500/20 flex items-center justify-center mx-auto mb-5">
            <i class="fas fa-circle-check text-4xl text-ok-green-700"></i>
          </div>
          <h1 class="text-xl sm:text-2xl font-extrabold mb-2">আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।</h1>
          <p class="text-sm text-ok-gray-500">ধন্যবাদ! আমরা শীঘ্রই আপনার অর্ডার প্রসেস করা শুরু করব।</p>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-5">
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div>
              <p class="text-xs text-ok-gray-500">অর্ডার আইডি</p>
              <p id="order-success-id" class="font-bold text-lg text-ok-green-800">—</p>
            </div>
            <span id="order-success-payment-badge" class="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full">অর্ডার গ্রহণ করা হয়েছে</span>
          </div>

          <div id="order-success-items" class="space-y-3 mb-4"></div>

          <div class="bg-ok-green-50 rounded-xl p-4 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-ok-gray-600">অগ্রিম পরিশোধ (ডেলিভারি চার্জ)</span>
              <span id="order-success-advance" class="font-bold text-ok-green-800">৳0</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ok-gray-600">বাকি টাকা (ডেলিভারির সময়)</span>
              <span id="order-success-due" class="font-bold">৳0</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-5">
          <h3 class="font-bold text-sm mb-4 flex items-center gap-2">
            <i class="fas fa-truck text-ok-green-800"></i> ডেলিভারি তথ্য
          </h3>
          <div id="order-success-delivery-info" class="text-sm text-ok-gray-600 space-y-1"></div>
          <p class="text-xs text-ok-gray-400 mt-3">আনুমানিক ডেলিভারি: ২-৪ কর্মদিবস</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <a href="/track-order" class="flex-1 text-center border-2 border-ok-green-800 text-ok-green-800 font-bold py-3 rounded-xl hover:bg-ok-green-50">
            অর্ডার ট্র্যাক করুন
          </a>
          <a href="/products" class="flex-1 text-center bg-ok-green-800 text-white font-bold py-3 rounded-xl hover:bg-ok-green-900">
            আরও শপিং করুন
          </a>
        </div>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
       (function () {
        var raw = localStorage.getItem('offerkini_last_order');
        var emptyEl = document.getElementById('order-success-empty');
        var contentEl = document.getElementById('order-success-content');
        if (!raw) {
          emptyEl.classList.remove('hidden');
          return;
        }
        var order = JSON.parse(raw);
        contentEl.classList.remove('hidden');

        document.getElementById('order-success-id').textContent = order.id;
        // Handle both property naming conventions
        var advanceAmt = order.advancePaid || order.payNow || order.deliveryCharge || 0;
        var dueAmt = order.dueOnDelivery || order.productTotal || 0;
        document.getElementById('order-success-advance').textContent = window.OK.formatBDT(advanceAmt);
        document.getElementById('order-success-due').textContent = window.OK.formatBDT(dueAmt);

        // Show payment status badge
        var badge = document.getElementById('order-success-payment-badge');
        if (badge && order.paymentStatus === 'advance_paid') {
          badge.textContent = '✅ অগ্রিম পেমেন্ট সম্পন্ন';
          badge.className = 'bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full';
        } else if (badge && order.paymentStatus === 'pending_payment') {
          badge.textContent = '⏳ পেমেন্ট অপেক্ষমান';
          badge.className = 'bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full';
        }

        var itemsHtml = '';
        (order.items || []).forEach(function (item) {
          var imgSrc = item.productImage || item.image || '/static/img/placeholder.png';
          var itemName = item.productName || item.name || 'পণ্য';
          itemsHtml += '<div class="flex gap-3 items-center">' +
            '<img src="' + imgSrc + '" class="w-12 h-12 rounded-lg object-cover bg-gray-50"/>' +
            '<div class="flex-1 min-w-0"><p class="text-sm font-medium line-clamp-1">' + itemName + '</p>' +
            '<p class="text-xs text-ok-gray-500">পরিমাণ: ' + item.quantity + '</p></div>' +
            '<span class="text-sm font-semibold">' + window.OK.formatBDT(item.unitPrice * item.quantity) + '</span>' +
            '</div>';
        });
        document.getElementById('order-success-items').innerHTML = itemsHtml;

        document.getElementById('order-success-delivery-info').innerHTML =
          '<p><span class="text-ok-charcoal font-medium">' + order.customerName + '</span> — ' + order.customerPhone + '</p>' +
          '<p>' + (order.address || '') + ', ' + (order.area || '') + ', ' + (order.district || '') + '</p>';
      })();
      `
    }} />
  </CustomerLayout>
)
