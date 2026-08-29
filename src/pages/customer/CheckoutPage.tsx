import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { Breadcrumb } from '../../components/customer/Breadcrumb'
import { FormField } from '../../components/ui/FormField'

const DISTRICTS = ['ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ']

export const CheckoutPage: FC = () => (
  <CustomerLayout title="চেকআউট" showMobileNav={false}>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumb items={[{ label: 'কার্ট', href: '/cart' }, { label: 'চেকআউট' }]} />
      <h1 class="text-xl sm:text-2xl font-extrabold mt-3 mb-6">অর্ডার চেকআউট (EPS Gateway Integration)</h1>

      <div id="checkout-empty" class="hidden">
        <div class="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div class="w-16 h-16 rounded-full bg-ok-green-50 flex items-center justify-center mb-4">
            <i class="fas fa-cart-shopping text-2xl text-ok-green-800"></i>
          </div>
          <h3 class="font-bold text-lg mb-1 text-ok-charcoal">কার্ট খালি, চেকআউট করা যাবে না</h3>
          <p class="text-sm text-ok-gray-500 mb-5">পছন্দের পণ্য কার্টে যুক্ত করে চেকআউট সম্পন্ন করুন।</p>
          <a href="/products" class="bg-ok-green-800 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-ok-green-900 transition-colors inline-block">
            পণ্য দেখুন
          </a>
        </div>
      </div>

      <form id="checkout-form" class="hidden grid lg:grid-cols-3 gap-6">
        {/* ============ LEFT: Customer info + order summary ============ */}
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
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

          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <h3 class="font-bold text-base mb-4 flex items-center gap-2">
              <i class="fas fa-receipt text-ok-green-800"></i> অর্ডার সামারি
            </h3>
            <div id="checkout-items" class="space-y-3"></div>
          </div>
        </div>

        {/* ============ RIGHT: Payment summary ============ */}
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24 shadow-sm">
            <h3 class="font-bold text-base mb-4">পেমেন্ট সামারি</h3>
            <div class="space-y-2.5 text-sm">
              <div class="flex justify-between">
                <span class="text-ok-gray-500">প্রোডাক্ট প্রাইস</span>
                <span id="checkout-product-total" class="font-semibold">৳0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ok-gray-500">অগ্রিম ডেলিভারি চার্জ</span>
                <span id="checkout-delivery" class="font-semibold text-ok-green-800">৳0</span>
              </div>
              <div class="h-px bg-gray-100 my-2"></div>
              <div class="flex justify-between items-center bg-ok-lime-500/15 rounded-lg px-3 py-2">
                <span class="font-bold text-ok-green-900 text-xs">EPS গেটওয়েতে পরিশোধ</span>
                <span id="checkout-pay-now" class="font-extrabold text-ok-green-800 text-lg">৳0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ok-gray-500">ক্যাশ অন ডেলিভারি (পণ্য পেয়ে)</span>
                <span id="checkout-due" class="font-semibold">৳0</span>
              </div>
            </div>

            {/* EPS Payment Method Branding Badge */}
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-3.5 mt-4 text-xs text-blue-900 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold flex items-center gap-1.5 text-blue-950">
                  <span class="bg-blue-700 text-white font-black text-[10px] px-1.5 py-0.5 rounded">EPS</span>
                  Easy Payment Gateway
                </span>
                <span class="text-[10px] bg-blue-200/60 text-blue-800 px-2 py-0.5 rounded-full font-semibold">100% Secured</span>
              </div>
              <p class="text-[11px] text-blue-800/80 leading-relaxed">
                অগ্রিম পেমেন্ট EPS গেটওয়ের মাধ্যমে (bKash, Nagad, Rocket, Visa/Mastercard) সরাসরি সম্পন্ন করতে পারবেন।
              </p>
            </div>

            <button
              type="submit"
              id="checkout-submit-btn"
              class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl mt-4 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-700/20"
            >
              <span id="checkout-submit-label"><span id="checkout-pay-now-label">৳0</span> দিয়ে EPS-এ অগ্রিম পে করুন</span>
            </button>
            <p class="text-[11px] text-ok-gray-400 text-center mt-3">
              <i class="fas fa-shield-halved text-blue-600 mr-1"></i> EPS (Easy Payment System) লোগো সহ বাংলাদেশ ব্যাংক অনুমোদিত।
            </p>
          </div>
        </div>
      </form>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
      (function () {
        function initCheckout() {
          if (!window.OK) return;
          var cart = window.OK.getCart();
          var emptyEl = document.getElementById('checkout-empty');
          var formEl = document.getElementById('checkout-form');
          if (!emptyEl || !formEl) return;

          // Quick buy fallback via URL params e.g. /checkout?productId=p-1
          var urlParams = new URLSearchParams(window.location.search);
          var qPid = urlParams.get('productId');
          if (qPid && (!cart || cart.length === 0)) {
            window.OK.addToCart(qPid, 1);
            cart = window.OK.getCart();
          }

          // Handle checkout error messages from query params e.g. /checkout?error=payment_unverified
          if (urlParams.get('error') === 'payment_unverified') {
            if (window.OK && window.OK.toast) {
              window.OK.toast('পেমেন্ট সফলভাবে ভেরিফাই হয়নি! অনুগ্রহ করে EPS গেটওয়েতে মূল্য পরিশোধ করুন।', 'error');
            } else {
              alert('পেমেন্ট সফলভাবে ভেরিফাই হয়নি! অনুগ্রহ করে EPS গেটওয়েতে মূল্য পরিশোধ করুন।');
            }
          }

          if (!cart || cart.length === 0) {
            emptyEl.classList.remove('hidden');
            formEl.classList.add('hidden');
            return;
          }
          emptyEl.classList.add('hidden');
          formEl.classList.remove('hidden');
          formEl.classList.add('grid');

          var itemsWrap = document.getElementById('checkout-items');
          var html = '';
          cart.forEach(function (item) {
            var p = window.OK.findCatalogItem(item.productId);
            if (!p) return;
            html += '<div class="flex gap-3 items-center border-b border-gray-50 pb-3">' +
              '<img src="' + p.image + '" class="w-14 h-14 rounded-lg object-cover bg-gray-50 shrink-0"/>' +
              '<div class="flex-1 min-w-0">' +
              '<p class="text-sm font-semibold line-clamp-1">' + p.name + '</p>' +
              '<p class="text-xs text-ok-gray-500">পরিমাণ: ' + item.quantity + ' × ' + window.OK.formatBDT(p.price) + '</p>' +
              '</div>' +
              '<span class="font-bold text-sm text-ok-green-800">' + window.OK.formatBDT(p.price * item.quantity) + '</span>' +
              '</div>';
          });
          itemsWrap.innerHTML = html;

          var totals = window.OK.cartTotals();
          var prodEl = document.getElementById('checkout-product-total');
          var delEl = document.getElementById('checkout-delivery');
          var payEl = document.getElementById('checkout-pay-now');
          var dueEl = document.getElementById('checkout-due');
          var payLbl = document.getElementById('checkout-pay-now-label');
          if (prodEl) prodEl.textContent = window.OK.formatBDT(totals.productTotal);
          if (delEl) delEl.textContent = window.OK.formatBDT(totals.deliveryCharge);
          if (payEl) payEl.textContent = window.OK.formatBDT(totals.payNow);
          if (dueEl) dueEl.textContent = window.OK.formatBDT(totals.dueOnDelivery);
          if (payLbl) payLbl.textContent = window.OK.formatBDT(totals.payNow);

          formEl.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = document.getElementById('checkout-submit-btn');
            if (btn) {
              btn.disabled = true;
              btn.innerHTML = '<span class="ok-spinner"></span> EPS গেটওয়েতে রিডাইরেক্ট করা হচ্ছে...';
            }

            var formData = new FormData(formEl);
            var orderId = 'OK-' + Math.floor(10000 + Math.random() * 89999);
            var cartSnapshot = window.OK.getCart().map(function (item) {
              var p = window.OK.findCatalogItem(item.productId);
              return {
                productId: item.productId,
                productName: p ? p.name : '',
                productImage: p ? p.image : '',
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
              advancePaid: totalsSnap.payNow,
              dueOnDelivery: totalsSnap.dueOnDelivery,
              totalAmount: totalsSnap.grandTotal,
              status: 'pending',
              createdAt: new Date().toISOString()
            };

            // Save order snapshot locally
            try {
              localStorage.setItem('offerkini_pending_order', JSON.stringify(order));
              localStorage.setItem('offerkini_last_order', JSON.stringify(order));
            } catch(e){}

            // Call backend API to initiate EPS payment
            fetch('/api/eps/initiate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderId,
                amount: totalsSnap.payNow,
                customerName: formData.get('name'),
                customerPhone: formData.get('phone'),
                district: formData.get('district'),
                area: formData.get('area'),
                address: formData.get('address')
              })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
              if (data && data.success && data.redirectUrl) {
                window.location.href = data.redirectUrl;
              } else {
                if (btn) {
                  btn.disabled = false;
                  btn.innerHTML = '<span id="checkout-pay-now-label">' + window.OK.formatBDT(totalsSnap.payNow) + '</span> দিয়ে EPS-এ অগ্রিম পে করুন';
                }
                var errTxt = (data && data.error) ? data.error : 'EPS Gateway connection error';
                if (window.OK && window.OK.toast) {
                  window.OK.toast('EPS পেমেন্ট এরর: ' + errTxt, 'error');
                } else {
                  alert('EPS পেমেন্ট এরর: ' + errTxt);
                }
              }
            })
            .catch(function(err) {
              console.error('EPS initiate error:', err);
              if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<span id="checkout-pay-now-label">' + window.OK.formatBDT(totalsSnap.payNow) + '</span> দিয়ে EPS-এ অগ্রিম পে করুন';
              }
              alert('EPS গেটওয়ে সংযোগ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
            });
          });
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initCheckout);
        } else {
          initCheckout();
        }
      })();
      `
    }} />
  </CustomerLayout>
)
