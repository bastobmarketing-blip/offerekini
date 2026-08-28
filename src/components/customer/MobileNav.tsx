import type { FC } from 'hono/jsx'

interface MobileNavProps {
  active?: 'home' | 'categories' | 'cart' | 'account'
}

// Bottom navigation bar shown on mobile viewports for the customer site.
export const MobileNav: FC<MobileNavProps> = ({ active }) => {
  const item = (href: string, icon: string, label: string, key: string) => (
    <a
      href={href}
      class={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-semibold ${
        active === key ? 'text-ok-green-800' : 'text-ok-gray-500'
      }`}
    >
      <i class={`${icon} text-[18px]`}></i>
      {label}
    </a>
  )

  return (
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 flex safe-bottom shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      {item('/', 'fas fa-house', 'হোম', 'home')}
      {item('/products', 'fas fa-grip', 'পণ্য', 'categories')}
      <button id="mobile-nav-cart-btn" class={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-semibold relative ${active === 'cart' ? 'text-ok-green-800' : 'text-ok-gray-500'}`}>
        <span class="relative">
          <i class="fas fa-cart-shopping text-[18px]"></i>
          <span id="mobile-cart-count" class="hidden absolute -top-1.5 -right-2 bg-ok-red text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] flex items-center justify-center">0</span>
        </span>
        কার্ট
      </button>
      {item('/account', 'far fa-user', 'অ্যাকাউন্ট', 'account')}
    </nav>
  )
}
