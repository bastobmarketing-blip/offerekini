import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { categories } from '../../data/categories'
import { products } from '../../data/products'

export const AdminCategoriesPage: FC = () => {
  return (
    <AdminLayout title="Categories" active="categories">
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">ক্যাটাগরি ম্যানেজমেন্ট</h1>
          <p class="text-xs text-ok-gray-500">পণ্যের বিভাগ, আইকন ও ভিজিবিলিটি নিয়ন্ত্রণ</p>
        </div>
        <button
          type="button"
          onclick="document.getElementById('modal-add-category').classList.remove('hidden')"
          class="bg-ok-green-800 hover:bg-ok-green-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all"
        >
          <i class="fas fa-plus"></i> নতুন ক্যাটাগরি
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length || c.productCount || 0
          return (
            <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-xl bg-ok-green-50 text-ok-green-800 flex items-center justify-center text-lg">
                  <i class={`fas ${c.icon || 'fa-tag'}`}></i>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {count} টি প্রোডাক্ট
                </span>
              </div>
              <h3 class="font-bold text-sm text-ok-charcoal">{c.name}</h3>
              <p class="text-xs text-gray-400 font-mono mt-0.5">{c.nameEn} ({c.slug})</p>
              <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={`/category/${c.slug}`}
                  target="_blank"
                  class="text-xs font-bold text-ok-green-800 hover:underline flex items-center gap-1"
                >
                  <i class="fas fa-eye text-[10px]"></i> ভিউ
                </a>
                <span class="text-xs text-emerald-600 font-bold">একটিভ</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ADD CATEGORY MODAL */}
      <div id="modal-add-category" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
          <button
            type="button"
            onclick="document.getElementById('modal-add-category').classList.add('hidden')"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
          <h3 class="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <i class="fas fa-tags text-ok-green-700"></i> নতুন ক্যাটাগরি তৈরি করুন
          </h3>
          <form
            class="space-y-3"
            onsubmit="event.preventDefault(); alert('ক্যাটাগরি সফলভাবে তৈরি হয়েছে!'); document.getElementById('modal-add-category').classList.add('hidden');"
          >
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি নাম (বাংলা) *</label>
              <input type="text" required placeholder="যেমন: অর্গানিক ফুড" class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Name (English) *</label>
              <input type="text" required placeholder="e.g. Organic Food" class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Slug / URL Key *</label>
              <input type="text" required placeholder="organic-food" class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 font-mono" />
            </div>
            <div class="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onclick="document.getElementById('modal-add-category').classList.add('hidden')"
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                class="px-5 py-2 bg-ok-green-800 text-white rounded-xl text-xs font-bold hover:bg-ok-green-900 shadow-sm"
              >
                তৈরি করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
