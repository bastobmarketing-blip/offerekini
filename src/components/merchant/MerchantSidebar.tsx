import type { FC } from 'hono/jsx'

interface NavItem {
  href: string
  icon: string
  label: string
  key: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/merchant/dashboard', icon: 'fa-gauge', label: 'Dashboard', key: 'dashboard' },
  { href: '/merchant/products', icon: 'fa-box', label: 'Products', key: 'products' },
  { href: '/merchant/products/new', icon: 'fa-plus', label: 'Add Product', key: 'add-product' },
  { href: '/merchant/orders', icon: 'fa-receipt', label: 'Orders', key: 'orders' },
  { href: '/merchant/earnings', icon: 'fa-sack-dollar', label: 'Earnings', key: 'earnings' },
  { href: '/merchant/settlements', icon: 'fa-file-invoice-dollar', label: 'Settlements', key: 'settlements' },
  { href: '/merchant/store', icon: 'fa-store', label: 'My Store', key: 'store' },
  { href: '/merchant/profile', icon: 'fa-user', label: 'Profile', key: 'profile' },
  { href: '/merchant/settings', icon: 'fa-gear', label: 'Settings', key: 'settings' }
]

export const MerchantSidebar: FC<{ active: string }> = ({ active }) => (
  <aside class="hidden lg:flex flex-col w-64 shrink-0 bg-ok-green-900 text-white min-h-screen sticky top-0">
    <div class="p-5 border-b border-white/10">
      <img src="/static/images/brand/offerkini-logo.svg" alt="OfferKini" class="h-7" />
      <p class="text-xs text-white/50 mt-2">Merchant Panel</p>
    </div>
    <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
      {NAV_ITEMS.map((item) => (
        <a
          href={item.href}
          class={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            active === item.key ? 'bg-ok-lime-500 text-ok-green-900 font-bold' : 'text-white/75 hover:bg-white/10'
          }`}
        >
          <i class={`fas ${item.icon} w-4`}></i>
          {item.label}
        </a>
      ))}
    </nav>
    <div class="p-3 border-t border-white/10">
      <a href="/merchant/login" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/75 hover:bg-white/10">
        <i class="fas fa-arrow-right-from-bracket w-4"></i> Logout
      </a>
    </div>
  </aside>
)

export const MERCHANT_NAV_ITEMS = NAV_ITEMS
