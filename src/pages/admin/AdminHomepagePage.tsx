import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'

export const AdminHomepagePage: FC = () => {
  return (
    <AdminLayout title="Homepage" active="homepage">
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">হোমপেজ লেআউট ও সেকশন ম্যানেজমেন্ট</h1>
          <p class="text-xs text-ok-gray-500">হোমপেজের বিভিন্ন সেকশন, ব্যানার ও প্রোডাক্ট ব্লক নিয়ন্ত্রণ</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4 max-w-2xl">
        <div class="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/70">
          <div>
            <p class="font-bold text-sm text-slate-800">1. Hero Slider / Promotional Banners</p>
            <p class="text-xs text-gray-400">হোমপেজের শীর্ষ স্লাইডার ব্যানার</p>
          </div>
          <a href="/admin/banners" class="text-xs font-bold bg-ok-green-800 text-white px-3 py-1.5 rounded-lg">ম্যানেজ</a>
        </div>

        <div class="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/70">
          <div>
            <p class="font-bold text-sm text-slate-800">2. Featured Categories Grid</p>
            <p class="text-xs text-gray-400">ক্যাটাগরি আইকন ও শর্টকাট ব্লক</p>
          </div>
          <a href="/admin/categories" class="text-xs font-bold bg-ok-green-800 text-white px-3 py-1.5 rounded-lg">ম্যানেজ</a>
        </div>

        <div class="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/70">
          <div>
            <p class="font-bold text-sm text-slate-800">3. Best Deals & Offers Block</p>
            <p class="text-xs text-gray-400">বিশেষ অফার ও ডিসকাউন্ট প্রোডাক্ট</p>
          </div>
          <a href="/admin/deals" class="text-xs font-bold bg-ok-green-800 text-white px-3 py-1.5 rounded-lg">ম্যানেজ</a>
        </div>
      </div>
    </AdminLayout>
  )
}
