import type { FC } from 'hono/jsx'

// Cart drawer shell — content is rendered client-side by app.js reading
// from localStorage + the embedded product catalog (see CustomerLayout).
export const CartDrawer: FC = () => (
  <>
    <div id="cart-drawer-overlay" class="hidden fixed inset-0 bg-black/40 z-[60] opacity-0"></div>
    <aside
      id="cart-drawer"
      class="hidden fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[60] shadow-2xl flex-col translate-x-full"
    >
      <div class="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
        <h3 class="font-bold text-lg flex items-center gap-2">
          <i class="fas fa-cart-shopping text-ok-green-800"></i> আপনার কার্ট
        </h3>
        <button id="cart-drawer-close" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <i class="fas fa-xmark text-lg"></i>
        </button>
      </div>

      <div id="cart-drawer-body" class="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Populated by JS */}
      </div>

      <div id="cart-drawer-footer" class="border-t border-gray-100 p-4 shrink-0 hidden">
        <div class="flex items-center justify-between text-sm text-ok-gray-600 mb-1">
          <span>পণ্যের মূল্য</span>
          <span id="cart-drawer-subtotal" class="font-semibold text-ok-charcoal">৳0</span>
        </div>
        <div class="flex items-center justify-between text-sm text-ok-gray-600 mb-3">
          <span>ডেলিভারি চার্জ</span>
          <span id="cart-drawer-delivery" class="font-semibold text-ok-charcoal">৳0</span>
        </div>
        <a href="/checkout" class="w-full block text-center bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold py-3 rounded-xl transition-colors">
          চেকআউট করুন
        </a>
      </div>
    </aside>
  </>
)
