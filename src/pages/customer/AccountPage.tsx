import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { formatBDT } from '../../utils/format'
import { formatDateBn } from '../../utils/format'
import type { Customer, Order } from '../../types'

export const AccountPage: FC<{ customer: Customer; recentOrders: Order[] }> = ({ customer, recentOrders }) => (
  <CustomerLayout title="আমার অ্যাকাউন্ট" activeMobileNav="account">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-16 h-16 rounded-full bg-ok-green-800 text-white flex items-center justify-center text-2xl font-bold shrink-0">
          {customer.name.charAt(0)}
        </div>
        <div>
          <h1 class="text-lg sm:text-xl font-extrabold">{customer.name}</h1>
          <p class="text-sm text-ok-gray-500">{customer.phone}</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3 mb-8">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p class="text-xl sm:text-2xl font-extrabold text-ok-green-800">{customer.totalOrders}</p>
          <p class="text-xs text-ok-gray-500 mt-1">মোট অর্ডার</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p class="text-xl sm:text-2xl font-extrabold text-ok-green-800">{customer.deliveredOrders}</p>
          <p class="text-xs text-ok-gray-500 mt-1">ডেলিভারড</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p class="text-xl sm:text-2xl font-extrabold text-ok-green-800">{formatBDT(customer.totalSpending)}</p>
          <p class="text-xs text-ok-gray-500 mt-1">মোট খরচ</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-base">সাম্প্রতিক অর্ডার</h2>
            <a href="/account/orders" class="text-ok-green-800 font-semibold text-sm">সব দেখুন</a>
          </div>
          <div class="space-y-3">
            {recentOrders.map((o) => (
              <a href={`/account/order/${o.id}`} class="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4 hover:border-ok-green-200 transition-colors">
                <img src={o.items[0].productImage} class="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm line-clamp-1">{o.items[0].productName}</p>
                  <p class="text-xs text-ok-gray-500">{o.id} · {formatDateBn(o.createdAt)}</p>
                </div>
                <span class="font-bold text-sm">{formatBDT(o.totalAmount)}</span>
                <i class="fas fa-chevron-right text-ok-gray-300 text-xs"></i>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 class="font-bold text-base mb-4">সংরক্ষিত ঠিকানা</h2>
          <div class="space-y-3">
            {customer.addresses.map((a) => (
              <div class="bg-white rounded-2xl border border-gray-100 p-4">
                <p class="font-semibold text-sm mb-1"><i class="fas fa-location-dot text-ok-green-700 mr-1"></i> {a.label}</p>
                <p class="text-xs text-ok-gray-500">{a.address}, {a.area}, {a.district}</p>
              </div>
            ))}
          </div>
          <a href="#" class="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 mt-3 text-sm font-semibold text-ok-gray-500 hover:border-ok-green-300 hover:text-ok-green-800">
            <i class="fas fa-plus"></i> নতুন ঠিকানা যুক্ত করুন
          </a>

          <button id="logout-btn" class="w-full mt-6 border-2 border-ok-red text-ok-red font-bold py-2.5 rounded-xl hover:bg-red-50 text-sm">
            <i class="fas fa-arrow-right-from-bracket mr-1"></i> লগআউট করুন
          </button>
        </div>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.getElementById('logout-btn').addEventListener('click', function () {
          window.OK.toast('লগআউট হয়েছে (ডেমো)');
          window.location.href = '/';
        });
      `
    }} />
  </CustomerLayout>
)
