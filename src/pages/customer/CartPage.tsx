import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { Breadcrumb } from '../../components/customer/Breadcrumb'

// Cart page content is entirely client-rendered from localStorage since
// this is a frontend-only prototype with no server session/cart API.
export const CartPage: FC = () => (
  <CustomerLayout title="আপনার কার্ট" activeMobileNav="cart">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumb items={[{ label: 'কার্ট' }]} />
      <h1 class="text-xl sm:text-2xl font-extrabold mt-3 mb-6">আপনার কার্ট</h1>

      <div id="cart-page-loading" class="space-y-3">
        <div class="skeleton h-24 w-full rounded-2xl"></div>
        <div class="skeleton h-24 w-full rounded-2xl"></div>
      </div>

      <div id="cart-page-empty" class="hidden">
        <div class="flex flex-col items-center justify-center text-center py-16 px-4">
          <div class="w-16 h-16 rounded-full bg-ok-green-50 flex items-center justify-center mb-4">
            <i class="fas fa-cart-shopping text-2xl text-ok-green-800"></i>
          </div>
          <h3 class="font-bold text-lg text-ok-charcoal mb-1">আপনার কার্ট খালি</h3>
          <p class="text-sm text-ok-gray-500 max-w-sm mb-5">এখনও কোনো পণ্য যুক্ত করা হয়নি। কেনাকাটা শুরু করুন।</p>
          <a href="/products" class="bg-ok-green-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-ok-green-900 transition-colors">
            পণ্য দেখুন
          </a>
        </div>
      </div>

      <div id="cart-page-content" class="hidden grid lg:grid-cols-3 gap-6">
        <div id="cart-page-items" class="lg:col-span-2 space-y-3"></div>

        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h3 class="font-bold mb-4">অর্ডার সামারি</h3>
            <div class="space-y-2.5 text-sm">
              <div class="flex justify-between">
                <span class="text-ok-gray-500">পণ্যের মূল্য</span>
                <span id="cart-summary-subtotal" class="font-semibold">৳0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ok-gray-500">ডেলিভারি চার্জ</span>
                <span id="cart-summary-delivery" class="font-semibold">৳0</span>
              </div>
              <div class="h-px bg-gray-100 my-2"></div>
              <div class="flex justify-between">
                <span class="font-bold">মোট</span>
                <span id="cart-summary-total" class="font-bold text-ok-green-800 text-lg">৳0</span>
              </div>
            </div>
            <div class="bg-ok-green-50 rounded-xl p-3 mt-4 text-xs text-ok-gray-600 leading-relaxed">
              <i class="fas fa-circle-info text-ok-green-700 mr-1"></i>
              ডেলিভারি চার্জ আগে পরিশোধ করুন। বাকি টাকা পণ্য হাতে পাওয়ার সময় পরিশোধ করবেন।
            </div>
            <a
              href="/checkout"
              class="w-full block text-center bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold py-3.5 rounded-xl mt-4 transition-colors"
            >
              চেকআউটে যান <i class="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
      (function () {
        function render() {
          var cart = window.OK.getCart();
          var loading = document.getElementById('cart-page-loading');
          var empty = document.getElementById('cart-page-empty');
          var content = document.getElementById('cart-page-content');
          loading.classList.add('hidden');

          if (cart.length === 0) {
            empty.classList.remove('hidden');
            content.classList.add('hidden');
            return;
          }
          empty.classList.add('hidden');
          content.classList.remove('hidden');

          var itemsWrap = document.getElementById('cart-page-items');
          var html = '';
          cart.forEach(function (item) {
            var p = window.OK.findCatalogItem(item.productId);
            if (!p) return;
            html += '<div class="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">' +
              '<a href="/product/' + p.slug + '" class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0"><img src="' + p.image + '" class="w-full h-full object-cover"/></a>' +
              '<div class="flex-1 min-w-0 flex flex-col">' +
              '<a href="/product/' + p.slug + '" class="font-semibold text-sm sm:text-base leading-snug line-clamp-2">' + p.name + '</a>' +
              (item.variantLabel ? '<p class="text-xs text-ok-gray-500 mt-1">' + item.variantLabel + '</p>' : '') +
              '<div class="flex items-center justify-between mt-auto pt-2">' +
              '<div class="flex items-center border border-gray-200 rounded-lg">' +
              '<button data-qty-btn="dec" data-pid="' + item.productId + '" data-vid="' + (item.variantId || '') + '" class="w-8 h-8 flex items-center justify-center hover:bg-gray-50">−</button>' +
              '<span class="w-9 text-center text-sm font-semibold">' + item.quantity + '</span>' +
              '<button data-qty-btn="inc" data-pid="' + item.productId + '" data-vid="' + (item.variantId || '') + '" class="w-8 h-8 flex items-center justify-center hover:bg-gray-50">+</button>' +
              '</div>' +
              '<span class="font-bold text-ok-green-800">' + window.OK.formatBDT(p.price * item.quantity) + '</span>' +
              '</div>' +
              '</div>' +
              '<button data-remove-btn data-pid="' + item.productId + '" data-vid="' + (item.variantId || '') + '" class="text-ok-gray-400 hover:text-ok-red self-start p-1"><i class="fas fa-trash"></i></button>' +
              '</div>';
          });
          itemsWrap.innerHTML = html;

          var totals = window.OK.cartTotals();
          document.getElementById('cart-summary-subtotal').textContent = window.OK.formatBDT(totals.productTotal);
          document.getElementById('cart-summary-delivery').textContent = window.OK.formatBDT(totals.deliveryCharge);
          document.getElementById('cart-summary-total').textContent = window.OK.formatBDT(totals.grandTotal);

          itemsWrap.querySelectorAll('[data-qty-btn]').forEach(function (btn) {
            btn.addEventListener('click', function () {
              var pid = btn.getAttribute('data-pid');
              var vid = btn.getAttribute('data-vid') || null;
              var cart = window.OK.getCart();
              var item = cart.find(function (c) { return c.productId === pid && c.variantId === vid; });
              if (!item) return;
              var delta = btn.getAttribute('data-qty-btn') === 'inc' ? 1 : -1;
              window.OK.updateQuantity(pid, vid, item.quantity + delta);
              render();
            });
          });
          itemsWrap.querySelectorAll('[data-remove-btn]').forEach(function (btn) {
            btn.addEventListener('click', function () {
              window.OK.removeFromCart(btn.getAttribute('data-pid'), btn.getAttribute('data-vid') || null);
              render();
            });
          });
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', render);
        } else {
          render();
        }
      })();
      `
    }} />
  </CustomerLayout>
)
