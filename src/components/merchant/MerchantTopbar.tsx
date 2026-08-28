import type { FC } from 'hono/jsx'
import { MERCHANT_NAV_ITEMS } from './MerchantSidebar'

interface MerchantTopbarProps {
  title: string
  merchantName?: string
  active: string
}

export const MerchantTopbar: FC<MerchantTopbarProps> = ({ title, merchantName = 'Dhaka Lifestyle Store', active }) => (
  <header class="sticky top-0 z-30 bg-white border-b border-gray-100">
    <div class="flex items-center justify-between px-4 sm:px-6 py-3.5">
      <div class="flex items-center gap-3">
        <button id="merchant-menu-btn" class="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
          <i class="fas fa-bars text-lg"></i>
        </button>
        <h1 class="font-bold text-base sm:text-lg">{title}</h1>
      </div>
      <div class="flex items-center gap-3">
        <span class="hidden sm:inline text-sm text-ok-gray-500">{merchantName}</span>
        <div class="w-9 h-9 rounded-full bg-ok-green-800 text-white flex items-center justify-center font-bold text-sm">
          {merchantName.charAt(0)}
        </div>
      </div>
    </div>

    {/* Mobile drawer */}
    <div id="merchant-menu-overlay" class="hidden lg:hidden fixed inset-0 bg-black/40 z-40"></div>
    <aside id="merchant-menu-drawer" class="hidden lg:hidden fixed top-0 left-0 h-full w-72 bg-ok-green-900 text-white z-40 flex-col overflow-y-auto">
      <div class="p-5 border-b border-white/10 flex items-center justify-between">
        <img src="/static/images/brand/offerkini-logo.png" alt="OfferKini" class="h-7" />
        <button id="merchant-menu-close" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
          <i class="fas fa-xmark"></i>
        </button>
      </div>
      <nav class="flex-1 p-3 space-y-1">
        {MERCHANT_NAV_ITEMS.map((item) => (
          <a
            href={item.href}
            class={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              active === item.key ? 'bg-ok-lime-500 text-ok-green-900 font-bold' : 'text-white/75 hover:bg-white/10'
            }`}
          >
            <i class={`fas ${item.icon} w-4`}></i> {item.label}
          </a>
        ))}
      </nav>
    </aside>

    <script dangerouslySetInnerHTML={{
      __html: `
        (function() {
          var btn = document.getElementById('merchant-menu-btn');
          var close = document.getElementById('merchant-menu-close');
          var overlay = document.getElementById('merchant-menu-overlay');
          var drawer = document.getElementById('merchant-menu-drawer');
          function open() { overlay.classList.remove('hidden'); drawer.classList.remove('hidden'); drawer.classList.add('flex'); }
          function closeIt() { overlay.classList.add('hidden'); drawer.classList.add('hidden'); drawer.classList.remove('flex'); }
          if (btn) btn.addEventListener('click', open);
          if (close) close.addEventListener('click', closeIt);
          if (overlay) overlay.addEventListener('click', closeIt);
        })();
      `
    }} />
  </header>
)
