import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'

const DEFAULT_Banners = [
  { id: 'b-1', title: 'টেস্টো কিং মেগা ডিল', subtitle: '১০০% পিওর হার্বাল এনার্জি বুস্টার', link: '/testo_king/', image: '/testo_king/hero.webp', status: 'active', position: 1 },
  { id: 'b-2', title: 'ফোকাস কিং স্পেশাল অফার', subtitle: 'ব্রেইন পাওয়ার ও মনোযোগ বৃদ্ধির ডেইলি রুটিন', link: '/focus_king', image: '/static/images/products/focus-king.jpg', status: 'active', position: 2 },
  { id: 'b-3', title: 'ট্রু প্রাইস ইলেকট্রনিক্স গ্যাজেটস', subtitle: 'সরাসরি হোলসেল রেটে অরিজিনাল পণ্য', link: '/category/electronics', image: '/static/images/products/earbuds.jpg', status: 'active', position: 3 }
]

export const AdminBannersPage: FC = () => {
  return (
    <AdminLayout title="Banners" active="banners">
      <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">ব্যানার ও প্রমোশনাল স্লাইডার</h1>
          <p class="text-xs text-ok-gray-500">হোমপেজ হিরো ব্যানার, অফার ইমেজ ও লিঙ্ক ম্যানেজমেন্ট</p>
        </div>
        <button
          type="button"
          onclick="document.getElementById('modal-add-banner').classList.remove('hidden')"
          class="bg-ok-green-800 hover:bg-ok-green-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all"
        >
          <i class="fas fa-plus"></i> নতুন ব্যানার যোগ করুন
        </button>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        {DEFAULT_Banners.map((b) => (
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="h-40 bg-gray-100 relative overflow-hidden">
              <img src={b.image} class="w-full h-full object-cover" />
              <span class="absolute top-3 left-3 bg-ok-green-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                পজিশন #{b.position}
              </span>
              <span class="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                সক্রিয় (Active)
              </span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-sm text-ok-charcoal">{b.title}</h3>
              <p class="text-xs text-gray-500 mt-0.5 line-clamp-1">{b.subtitle}</p>
              <p class="text-[11px] text-ok-green-700 font-mono mt-2 truncate">🔗 {b.link}</p>
              <div class="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                <a
                  href={b.link}
                  target="_blank"
                  class="text-xs font-bold text-ok-green-800 hover:underline flex items-center gap-1"
                >
                  <i class="fas fa-external-link-alt text-[10px]"></i> লিঙ্ক দেখুন
                </a>
                <button
                  type="button"
                  onclick="alert('ব্যানার সফলভাবে রিমুভ করা হয়েছে')"
                  class="text-xs text-red-500 hover:text-red-700 font-bold"
                >
                  মুছে ফেলুন
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD BANNER MODAL */}
      <div id="modal-add-banner" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
          <button
            type="button"
            onclick="document.getElementById('modal-add-banner').classList.add('hidden')"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
          <h3 class="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <i class="fas fa-image text-ok-green-700"></i> নতুন ব্যানার যোগ করুন
          </h3>
          <form
            class="space-y-3"
            onsubmit="event.preventDefault(); alert('ব্যানার সফলভাবে যুক্ত হয়েছে!'); document.getElementById('modal-add-banner').classList.add('hidden');"
          >
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ব্যানার শিরোনাম *</label>
              <input type="text" required placeholder="যেমন: নতুন ধামাকা অফার" class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">সাবটাইটেল / বিবরণ</label>
              <input type="text" placeholder="এক লাইনে অফার বিবরণ" class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ইমেজ URL *</label>
              <input type="text" required placeholder="/static/images/... বা https://..." class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">ক্লিক লিঙ্ক (Target URL) *</label>
              <input type="text" required placeholder="/testo_king/ বা /product/slug" class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 font-mono" />
            </div>
            <div class="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onclick="document.getElementById('modal-add-banner').classList.add('hidden')"
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                class="px-5 py-2 bg-ok-green-800 text-white rounded-xl text-xs font-bold hover:bg-ok-green-900 shadow-sm"
              >
                যুক্ত করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
