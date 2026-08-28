import type { FC } from 'hono/jsx'
import { categories } from '../../data/categories'

interface HeaderProps {
  activeNav?: 'deals' | 'categories' | 'products' | 'how'
}

export const Header: FC<HeaderProps> = ({ activeNav }) => {
  const navItem = (href: string, label: string, key: string) => (
    <a
      href={href}
      class={`text-sm font-semibold transition-colors hover:text-ok-lime-400 ${
        activeNav === key ? 'text-ok-lime-400' : 'text-white/90'
      }`}
    >
      {label}
    </a>
  )

  return (
    <header id="site-header" class="sticky top-0 z-40 bg-ok-green-900 border-b border-white/10">
      {/* Top utility bar - desktop only */}
      <div class="hidden lg:block bg-ok-green-800/60 text-white text-xs">
        <div class="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <i class="fas fa-circle-check text-ok-lime-400"></i>
            দাম কম, কথা পরিষ্কার — Fake Discount নয়
          </span>
          <div class="flex items-center gap-4">
            <a href="/track-order" class="hover:text-ok-lime-400 flex items-center gap-1"><i class="fas fa-truck-fast"></i> অর্ডার ট্র্যাক করুন</a>
            <a href="/how-it-works" class="hover:text-ok-lime-400">কীভাবে কাজ করে</a>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-3 sm:px-4">
        <div class="flex items-center justify-between gap-3 py-2.5 sm:py-3">
          {/* Logo */}
          <a href="/" class="flex items-center gap-2 shrink-0">
            <img src="/static/images/brand/offerkini-logo.png" alt="OfferKini" class="h-7 sm:h-8 w-auto" />
          </a>

          {/* Desktop nav */}
          <nav class="hidden lg:flex items-center gap-6 shrink-0">
            {navItem('/', 'আজকের সেরা ডিল', 'deals')}
            <div class="relative group">
              <button class="text-sm font-semibold flex items-center gap-1 text-white/90 hover:text-ok-lime-400">
                ক্যাটাগরি <i class="fas fa-chevron-down text-[10px]"></i>
              </button>
              <div class="absolute left-0 top-full pt-2 hidden group-hover:block">
                <div class="bg-white shadow-xl rounded-xl border border-gray-100 p-3 w-56 grid grid-cols-1 gap-1">
                  {categories.map((c) => (
                    <a href={`/category/${c.slug}`} class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-ok-green-50 text-sm font-medium text-ok-charcoal">
                      <i class={`fas ${c.icon} text-ok-green-700 w-4`}></i>
                      {c.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {navItem('/products', 'সব পণ্য', 'products')}
            {navItem('/how-it-works', 'কীভাবে কাজ করে', 'how')}
          </nav>

          {/* Search - desktop */}
          <form action="/search" method="get" class="hidden md:flex flex-1 max-w-md">
            <div class="relative w-full">
              <input
                type="text"
                name="q"
                placeholder="পণ্য খুঁজুন..."
                class="w-full bg-white border border-transparent rounded-full pl-10 pr-4 py-2 text-sm text-ok-charcoal focus:outline-none focus:ring-2 focus:ring-ok-lime-400 focus:border-transparent"
              />
              <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-ok-gray-500 text-sm"></i>
            </div>
          </form>

          {/* Right icons */}
          <div class="flex items-center gap-1 sm:gap-2 shrink-0">
            <a href="/search" class="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 ok-focus" aria-label="Search">
              <i class="fas fa-search text-white"></i>
            </a>
            <a href="/account" class="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-white/10 ok-focus" aria-label="Account">
              <i class="far fa-user text-white text-lg"></i>
            </a>
            <button id="cart-btn" class="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 ok-focus" aria-label="Cart">
              <i class="fas fa-cart-shopping text-white text-lg"></i>
              <span id="cart-count" class="hidden absolute -top-0.5 -right-0.5 bg-ok-red text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 min-w-[18px] h-[18px] flex items-center justify-center">0</span>
            </button>
            <button id="mobile-menu-btn" class="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 ok-focus" aria-label="Menu">
              <i class="fas fa-bars text-white text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar (always visible under header on small screens) */}
      <div class="md:hidden px-3 pb-2.5">
        <form action="/search" method="get">
          <div class="relative w-full">
            <input
              type="text"
              name="q"
              placeholder="পণ্য খুঁজুন..."
              class="w-full border border-transparent rounded-full pl-10 pr-4 py-2 text-sm bg-white text-ok-charcoal focus:outline-none focus:ring-2 focus:ring-ok-lime-400"
            />
            <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-ok-gray-500 text-sm"></i>
          </div>
        </form>
      </div>

      {/* Mobile drawer menu */}
      <div id="mobile-menu-overlay" class="hidden fixed inset-0 bg-black/40 z-50"></div>
      <aside id="mobile-menu" class="hidden fixed top-0 right-0 h-full w-[82%] max-w-sm bg-white z-50 shadow-2xl flex-col overflow-y-auto">
        <div class="flex items-center justify-between p-4 bg-ok-green-900 border-b border-white/10">
          <img src="/static/images/brand/offerkini-logo.png" alt="OfferKini" class="h-7" />
          <button id="mobile-menu-close" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white">
            <i class="fas fa-xmark text-lg"></i>
          </button>
        </div>
        <nav class="p-4 flex flex-col gap-1">
          <a href="/" class="px-3 py-3 rounded-xl hover:bg-ok-green-50 font-semibold flex items-center gap-3"><i class="fas fa-fire text-ok-red w-5"></i> আজকের সেরা ডিল</a>
          <a href="/products" class="px-3 py-3 rounded-xl hover:bg-ok-green-50 font-semibold flex items-center gap-3"><i class="fas fa-grip text-ok-green-800 w-5"></i> সব পণ্য</a>
          <a href="/how-it-works" class="px-3 py-3 rounded-xl hover:bg-ok-green-50 font-semibold flex items-center gap-3"><i class="fas fa-circle-info text-ok-green-800 w-5"></i> কীভাবে কাজ করে</a>
          <a href="/track-order" class="px-3 py-3 rounded-xl hover:bg-ok-green-50 font-semibold flex items-center gap-3"><i class="fas fa-truck-fast text-ok-green-800 w-5"></i> অর্ডার ট্র্যাক করুন</a>
          <a href="/account" class="px-3 py-3 rounded-xl hover:bg-ok-green-50 font-semibold flex items-center gap-3"><i class="far fa-user text-ok-green-800 w-5"></i> আমার অ্যাকাউন্ট</a>
          <div class="h-px bg-gray-100 my-2"></div>
          <p class="px-3 text-xs font-bold text-ok-gray-500 uppercase tracking-wide mb-1">ক্যাটাগরি</p>
          {categories.map((c) => (
            <a href={`/category/${c.slug}`} class="px-3 py-2.5 rounded-xl hover:bg-ok-green-50 font-medium flex items-center gap-3 text-sm">
              <i class={`fas ${c.icon} text-ok-green-700 w-5`}></i> {c.name}
            </a>
          ))}
          <div class="h-px bg-gray-100 my-2"></div>
          <a href="/about" class="px-3 py-2.5 rounded-xl hover:bg-ok-green-50 font-medium text-sm">OfferKini সম্পর্কে</a>
          <a href="/contact" class="px-3 py-2.5 rounded-xl hover:bg-ok-green-50 font-medium text-sm">যোগাযোগ</a>
        </nav>
      </aside>
    </header>
  )
}
