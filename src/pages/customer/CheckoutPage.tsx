import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { Breadcrumb } from '../../components/customer/Breadcrumb'
import { FormField } from '../../components/ui/FormField'

const DISTRICTS = ['ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ']

export const CheckoutPage: FC = () => (
  <CustomerLayout title="চেকআউট" showMobileNav={false}>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumb items={[{ label: 'কার্ট', href: '/cart' }, { label: 'চেকআউট' }]} />
      <h1 class="text-xl sm:text-2xl font-extrabold mt-3 mb-6">চেকআউট</h1>

      <div id="checkout-empty" class="hidden">
        <div class="flex flex-col items-center justify-center text-center py-16 px-4">
          <div class="w-16 h-16 rounded-full bg-ok-green-50 flex items-center justify-center mb-4">
            <i class="fas fa-cart-shopping text-2xl text-ok-green-800"></i>
          </div>
          <h3 class="font-bold text-lg mb-1">কার্ট খালি, চেকআউট করা যাবে না</h3>
          <a href="/products" class="bg-ok-green-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-ok-green-900 mt-4 inline-block">
            পণ্য দেখুন
          </a>
        </div>
      </div>

      <form id="checkout-form" class="hidden grid lg:grid-cols-3 gap-6">
        {/* ============ LEFT: Customer info + order summary ============ */}
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <h3 class="font-bold text-base mb-4 flex items-center gap-2">
              <i class="fas fa-user text-ok-green-800"></i> কাস্টমার তথ্য
            </h3>
            <div class="grid sm:grid-cols-2 gap-4">
              <FormField label="নাম" name="name" placeholder="আপনার পুরো নাম" required className="sm:col-span-2" />
              <FormField label="মোবাইল নম্বর" name="phone" type="tel" placeholder="01XXXXXXXXX" required />
              <FormField label="জেলা" name="district" type="select" required options={DISTRICTS.map((d) => ({ value: d, label: d }))} />
              <FormField label="এলাকা" name="area" placeholder="যেমন: ধানমন্ডি" required />
              <FormField label="সম্পূর্ণ ঠিকানা" name="address" type="textarea" rows={3} placeholder="বাড়ি/রোড নম্বর সহ সম্পূর্ণ ঠিকানা লিখুন" required className="sm:col-span-2" />
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <h3 class="font-bold text-base mb-4 flex items-center gap-2">
              <i class="fas fa-receipt text-ok-green-800"></i> অর্ডার সামারি
            </h3>
            <div id="checkout-items" class="space-y-3"></div>
          </div>
        </div>

        {/* ============ RIGHT: Payment summary ============ */}
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h3 class="font-bold text-base mb-4">পেমেন্ট সামারি</h3>
            <div class="space-y-2.5 text-sm">
              <div class="flex justify-between">
                <span class="text-ok-gray-500">প্রোডাক্ট প্রাইস</span>
                <span id="checkout-product-total" class="font-semibold">৳0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ok-gray-500">ডেলিভারি চার্জ</span>
                <span id="checkout-delivery" class="font-semibold">৳0</span>
              </div>
              <div class="h-px bg-gray-100 my-2"></div>
              <div class="flex justify-between items-center bg-ok-lime-500/15 rounded-lg px-3 py-2">
                <span class="font-bold text-ok-green-900">এখন পরিশোধ করবেন</span>
                <span id="checkout-pay-now" class="font-extrabold text-ok-green-800 text-lg">৳0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ok-gray-500">ডেলিভারির সময়</span>
                <span id="checkout-due" class="font-semibold">৳0</span>
              </div>
            </div>

            <div class="bg-ok-green-50 rounded-xl p-3 mt-4 text-xs text-ok-gray-600 leading-relaxed flex gap-2">
              <i class="fas fa-shield-halved text-ok-green-700 mt-0.5"></i>
              <span>ডেলিভারি চার্জ আগে পরিশোধ করলে Fake order কমে এবং আমরা পণ্যের দাম কম রাখতে পারি। বাকি টাকা পণ্য হাতে পাওয়ার সময় ক্যাশ অন ডেলিভারিতে দিবেন।</span>
            </div>

            <button
              type="submit"
              id="checkout-submit-btn"
              class="w-full bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold py-3.5 rounded-xl mt-4 transition-colors flex items-center justify-center gap-2"
            >
              <span id="checkout-submit-label"><span id="checkout-pay-now-label">৳0</span> দিয়ে অর্ডার নিশ্চিত করুন</span>
            </button>
            <p class="text-[11px] text-ok-gray-400 text-center mt-3">
              <i class="fas fa-lock mr-1"></i> এটি একটি ডেমো UI। কোনো প্রকৃত পেমেন্ট গ্রহণ করা হবে না।
            </p>
          </div>
        </div>
      </form>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
      (function () {
        var cart = window.OK.getCart();
        var emptyEl = document.getElementById('checkout-empty');
        var formEl = document.getElementById('checkout-form');

        if (cart.length === 0) {
          emptyEl.classList.remove('hidden');
          return;
        }
        formEl.classList.remove('hidden');
        formEl.classList.add('grid');

        var itemsWrap = document.getElementById('checkout-items');
        var html = '';
        cart.forEach(function (item) {
          var p = window.OK.findCatalogItem(item.productId);
          if (!p) return;
          html += '<div class="flex gap-3 items-center">' +
            '<img src="' + p.image + '" class="w-14 h-14 rounded-lg object-cover bg-gray-50"/>' +
            '<div class="flex-1 min-w-0">' +
            '<p class="text-sm font-semibold line-clamp-1">' + p.name + '</p>' +
            '<p class="text-xs text-ok-gray-500">পরিমাণ: ' + item.quantity + ' × ' + window.OK.formatBDT(p.price) + '</p>' +
            '</div>' +
            '<span class="font-bold text-sm">' + window.OK.formatBDT(p.price * item.quantity) + '</span>' +
            '</div>';
        });
        itemsWrap.innerHTML = html;

        var totals = window.OK.cartTotals();
        document.getElementById('checkout-product-total').textContent = window.OK.formatBDT(totals.productTotal);
        document.getElementById('checkout-delivery').textContent = window.OK.formatBDT(totals.deliveryCharge);
        document.getElementById('checkout-pay-now').textContent = window.OK.formatBDT(totals.payNow);
        document.getElementById('checkout-due').textContent = window.OK.formatBDT(totals.dueOnDelivery);
        document.getElementById('checkout-pay-now-label').textContent = window.OK.formatBDT(totals.payNow);

        formEl.addEventListener('submit', function (e) {
          e.preventDefault();
          var btn = document.getElementById('checkout-submit-btn');
          btn.disabled = true;
          btn.innerHTML = '<span class="ok-spinner"></span> অর্ডার প্রসেস হচ্ছে...';

          var formData = new FormData(formEl);
          var orderId = 'OK-' + Math.floor(10000 + Math.random() * 89999);
          var cartSnapshot = window.OK.getCart().map(function (item) {
            var p = window.OK.findCatalogItem(item.productId);
            return {
              productId: item.productId,
              name: p ? p.name : '',
              image: p ? p.image : '',
              quantity: item.quantity,
              unitPrice: p ? p.price : 0,
              variantLabel: item.variantLabel || null
            };
          });
          var totalsSnap = window.OK.cartTotals();
          var order = {
            id: orderId,
            customerName: formData.get('name'),
            customerPhone: formData.get('phone'),
            district: formData.get('district'),
            area: formData.get('area'),
            address: formData.get('address'),
            items: cartSnapshot,
            productTotal: totalsSnap.productTotal,
            deliveryCharge: totalsSnap.deliveryCharge,
            payNow: totalsSnap.payNow,
            dueOnDelivery: totalsSnap.dueOnDelivery,
            grandTotal: totalsSnap.grandTotal,
            createdAt: new Date().toISOString()
          };

          setTimeout(function () {
            localStorage.setItem('offerkini_last_order', JSON.stringify(order));
            window.OK.clearCart();
            window.location.href = '/order-success';
          }, 900);
        });
      })();
      `
    }} />
  </CustomerLayout>
)
