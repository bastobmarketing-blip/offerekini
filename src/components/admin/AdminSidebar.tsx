import type { FC } from 'hono/jsx'

interface NavItem {
  href: string
  icon: string
  label: string
  key: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/admin/dashboard', icon: 'fa-gauge', label: 'Dashboard', key: 'dashboard' },
  { href: '/admin/merchants', icon: 'fa-store', label: 'Merchants', key: 'merchants' },
  { href: '/admin/products', icon: 'fa-box', label: 'Products', key: 'products' },
  { href: '/admin/products/pending', icon: 'fa-hourglass-half', label: 'Pending Approval', key: 'pending' },
  { href: '/admin/orders', icon: 'fa-receipt', label: 'Orders', key: 'orders' },
  { href: '/admin/categories', icon: 'fa-tags', label: 'Categories', key: 'categories' },
  { href: '/admin/deals', icon: 'fa-fire', label: 'Best Deals', key: 'deals' },
  { href: '/admin/homepage', icon: 'fa-house', label: 'Homepage', key: 'homepage' },
  { href: '/admin/banners', icon: 'fa-image', label: 'Banners', key: 'banners' },
  { href: '/admin/settlements', icon: 'fa-file-invoice-dollar', label: 'Settlements', key: 'settlements' },
  { href: '/admin/customers', icon: 'fa-users', label: 'Customers', key: 'customers' },
  { href: '/admin/reports', icon: 'fa-chart-line', label: 'Reports', key: 'reports' },
  { href: '/admin/settings', icon: 'fa-gear', label: 'Settings', key: 'settings' }
]

export const AdminSidebar: FC<{ active: string }> = ({ active }) => (
  <aside class="hidden lg:flex flex-col w-64 shrink-0 bg-ok-charcoal text-white min-h-screen sticky top-0">
    <div class="p-5 border-b border-white/10">
      <img src="/static/images/brand/offerkini-logo.svg" alt="OfferKini" class="h-7" />
      <p class="text-xs text-white/50 mt-2">Admin Panel</p>
    </div>
    <nav class="flex-1 p-3 space-y-0.5 overflow-y-auto">
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
      <a href="/admin/login" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/75 hover:bg-white/10">
        <i class="fas fa-arrow-right-from-bracket w-4"></i> Logout
      </a>
    </div>
  </aside>
)

export const ADMIN_NAV_ITEMS = NAV_ITEMS
