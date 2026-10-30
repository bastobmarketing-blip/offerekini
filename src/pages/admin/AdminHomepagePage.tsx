import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { getHomepageSetting } from '../../data/homepage'
import { getAllLandingPages } from '../../data/landingPages'
import { products } from '../../data/products'

export const AdminHomepagePage: FC = () => {
  const current = getHomepageSetting()
  const landingPages = getAllLandingPages()

  return (
    <AdminLayout title="Homepage Settings" active="homepage">
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">হোমপেজ সেটিংস (Front Page Display)</h1>
          <p class="text-xs text-ok-gray-500">
            ওয়ার্ডপ্রেসের মতো আপনার মূল ডোমেইন (offerekini.com) এ ভিজিটর ঢুকলে কোন পেজটি হোমপেজ হিসেবে দেখতে পাবে তা নির্ধারণ করুন
          </p>
        </div>
        <div class="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            class="bg-white hover:bg-gray-50 text-ok-charcoal text-xs font-bold px-3.5 py-2 rounded-xl border border-gray-200 inline-flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <i class="fas fa-external-link-alt text-gray-500 text-[11px]"></i>
            <span>লাইভ হোমপেজ দেখুন</span>
          </a>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        {/* MAIN SETTINGS FORM */}
        <div class="lg:col-span-2 space-y-6">
          <form id="homepage-settings-form" class="bg-white rounded-2xl border border-gray-100 p-6 shadow-ok-card space-y-6">
            <div class="border-b border-gray-100 pb-4">
              <h2 class="font-bold text-base text-ok-charcoal flex items-center gap-2">
                <i class="fas fa-house text-ok-green-700"></i> মূল হোমপেজ ডিসপ্লে অপশন (Homepage Displays)
              </h2>
              <p class="text-xs text-gray-400 mt-1">যেকোনো একটি অপশন নির্বাচন করে 'Save Settings' বাটনে ক্লিক করুন</p>
            </div>

            {/* OPTION 1: DEFAULT STOREFRONT */}
            <label class="block p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-ok-green-600 bg-white border-gray-200 has-[:checked]:border-ok-green-700 has-[:checked]:bg-ok-green-50/20">
              <div class="flex items-start gap-3">
                <input
                  type="radio"
                  name="homepageType"
                  value="default"
                  checked={current.type === 'default' || !current.type}
                  class="mt-1 h-4 w-4 text-ok-green-700 focus:ring-ok-green-600"
                />
                <div class="flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-sm text-ok-charcoal">অফারকিনি মাল্টি-ভেন্ডার স্টোরফ্রন্ট (Default OfferKini Marketplace)</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-gray-100 text-gray-700 border border-gray-200">
                      ডিফল্ট মার্কেটপ্লেস
                    </span>
                  </div>
                  <p class="text-xs text-ok-gray-500 mt-1">
                    মূল অফারকিনি হোমপেজ যেখানে হিরো ব্যানার স্লাইডার, সকল ক্যাটাগরি, বেস্ট ডিলস এবং সকল মার্চেন্টের ট্রেন্ডিং প্রোডাক্ট সমন্বিতভাবে প্রদর্শিত হবে।
                  </p>
                </div>
              </div>
            </label>

            {/* OPTION 2: STATIC LANDING PAGE */}
            <label class="block p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-ok-green-600 bg-white border-gray-200 has-[:checked]:border-ok-green-700 has-[:checked]:bg-ok-green-50/20">
              <div class="flex items-start gap-3">
                <input
                  type="radio"
                  name="homepageType"
                  value="landing"
                  checked={current.type === 'landing'}
                  class="mt-1 h-4 w-4 text-ok-green-700 focus:ring-ok-green-600"
                />
                <div class="flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-sm text-ok-charcoal">একটি নির্দিষ্ট প্রোডাক্ট সেলস ল্যান্ডিং পেজ (A Static Landing Page)</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                      ⚡ হাই-কনভার্টিং ফানেল
                    </span>
                  </div>
                  <p class="text-xs text-ok-gray-500 mt-1">
                    ফেসবুক অ্যাড বা সরাসরি বিক্রির জন্য একটি প্রোডাক্টের নিবেদিত ওয়ান-পেজ সেলস ফানেলকে হোমপেজ হিসেবে সেট করুন।
                  </p>

                  <div id="landing-select-container" class={`mt-3 pt-3 border-t border-gray-100 ${current.type === 'landing' ? '' : 'opacity-60'}`}>
                    <label class="block text-xs font-bold text-ok-charcoal mb-1">কোন ল্যান্ডিং পেজটি হোমপেজ হবে?</label>
                    <select
                      id="landingPageSelect"
                      name="landingTarget"
                      class="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-ok-green-700 font-medium"
                    >
                      {landingPages.map((lp) => (
                        <option
                          value={lp.slug}
                          selected={current.type === 'landing' && current.target === lp.slug}
                        >
                          {lp.productName} ({lp.title.slice(0, 45)}...) — [/{lp.slug}]
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </label>

            {/* OPTION 3: SPECIFIC PRODUCT DETAIL PAGE */}
            <label class="block p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-ok-green-600 bg-white border-gray-200 has-[:checked]:border-ok-green-700 has-[:checked]:bg-ok-green-50/20">
              <div class="flex items-start gap-3">
                <input
                  type="radio"
                  name="homepageType"
                  value="product"
                  checked={current.type === 'product'}
                  class="mt-1 h-4 w-4 text-ok-green-700 focus:ring-ok-green-600"
                />
                <div class="flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-sm text-ok-charcoal">একটি নির্দিষ্ট প্রোডাক্ট পেজ (A Single Product Page)</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                      🛍️ প্রোডাক্ট শোকেস
                    </span>
                  </div>
                  <p class="text-xs text-ok-gray-500 mt-1">
                    যেকোনো একটি নির্দিষ্ট পণ্যের অফিসিয়াল প্রোডাক্ট পেজকে সরাসরি হোমপেজে প্রদর্শন করতে এটি সিলেক্ট করুন।
                  </p>

                  <div id="product-select-container" class={`mt-3 pt-3 border-t border-gray-100 ${current.type === 'product' ? '' : 'opacity-60'}`}>
                    <label class="block text-xs font-bold text-ok-charcoal mb-1">কোন প্রোডাক্টটি হোমপেজে দেখাবে?</label>
                    <select
                      id="productSelect"
                      name="productTarget"
                      class="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-ok-green-700 font-medium"
                    >
                      {products.map((p) => (
                        <option
                          value={p.slug || p.id}
                          selected={current.type === 'product' && (current.target === p.slug || current.target === p.id)}
                        >
                          {p.name} — ৳{p.offerKiniPrice} (ID: {p.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </label>

            {/* SUBMIT BUTTON */}
            <div class="pt-4 flex items-center justify-between border-t border-gray-100">
              <span id="save-status" class="text-xs font-semibold text-emerald-700"></span>
              <button
                type="submit"
                id="save-homepage-btn"
                class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <i class="fas fa-check"></i>
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* SIDEBAR INFO & SECTION SHORTCUTS */}
        <div class="space-y-6">
          {/* CURRENT STATUS CARD */}
          <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-ok-card">
            <h3 class="font-bold text-sm text-ok-charcoal mb-3 flex items-center gap-2">
              <i class="fas fa-circle-check text-ok-green-700"></i> বর্তমান অ্যাক্টিভ হোমপেজ
            </h3>
            <div class="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
              <p class="text-xs text-gray-500 font-medium">টাইপ:</p>
              <p class="text-sm font-bold text-ok-charcoal mt-0.5" id="active-type-text">
                {current.type === 'default'
                  ? '🏛️ অফারকিনি ডিফল্ট মার্কেটপ্লেস'
                  : current.type === 'landing'
                  ? `⚡ ল্যান্ডিং পেজ: ${current.target}`
                  : `🛍️ প্রোডাক্ট পেজ: ${current.target}`}
              </p>
              <p class="text-[11px] text-gray-400 mt-2">
                সর্বশেষ আপডেট: {new Date(current.updatedAt || Date.now()).toLocaleString('bn-BD')}
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              class="w-full mt-3 bg-ok-green-50 hover:bg-ok-green-100 text-ok-green-900 text-xs font-bold py-2 rounded-xl border border-ok-green-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <i class="fas fa-eye text-ok-green-700"></i> হোমপেজ লাইভ টেস্ট করুন
            </a>
          </div>

          {/* SECTION CONTROLS (IF USING DEFAULT HOMEPAGE) */}
          <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-ok-card space-y-3">
            <h3 class="font-bold text-sm text-ok-charcoal mb-1 flex items-center gap-2">
              <i class="fas fa-sliders text-ok-green-700"></i> ডিফল্ট হোমপেজের সেকশন
            </h3>
            <p class="text-[11px] text-gray-400">
              ডিফল্ট মার্কেটপ্লেস একটিভ থাকা অবস্থায় এই সেকশনগুলো কাজ করবে:
            </p>

            <a
              href="/admin/banners"
              class="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p class="font-bold text-xs text-ok-charcoal">1. হিরো ব্যানার স্লাইডার</p>
                <p class="text-[10px] text-gray-400">ব্যানার ও অফার বিজ্ঞাপন</p>
              </div>
              <span class="text-xs font-bold text-ok-green-700">ম্যানেজ &rarr;</span>
            </a>

            <a
              href="/admin/categories"
              class="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p class="font-bold text-xs text-ok-charcoal">2. ক্যাটাগরি গ্রিড</p>
                <p class="text-[10px] text-gray-400">ক্যাটাগরি আইকন ও শর্টকাট</p>
              </div>
              <span class="text-xs font-bold text-ok-green-700">ম্যানেজ &rarr;</span>
            </a>

            <a
              href="/admin/deals"
              class="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p class="font-bold text-xs text-ok-charcoal">3. বেস্ট ডিলস ও ট্রেন্ডিং</p>
                <p class="text-[10px] text-gray-400">ডিসকাউন্ট পণ্য তালিকা</p>
              </div>
              <span class="text-xs font-bold text-ok-green-700">ম্যানেজ &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var form = document.getElementById('homepage-settings-form');
            var btn = document.getElementById('save-homepage-btn');
            var statusEl = document.getElementById('save-status');

            var radioButtons = form.querySelectorAll('input[name="homepageType"]');
            var landingBox = document.getElementById('landing-select-container');
            var productBox = document.getElementById('product-select-container');

            function syncDisplay() {
              var selected = form.querySelector('input[name="homepageType"]:checked').value;
              if (landingBox) landingBox.style.opacity = selected === 'landing' ? '1' : '0.4';
              if (productBox) productBox.style.opacity = selected === 'product' ? '1' : '0.4';
            }

            radioButtons.forEach(function(r) {
              r.addEventListener('change', syncDisplay);
            });
            syncDisplay();

            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              btn.disabled = true;
              btn.innerHTML = '<span class="ok-spinner"></span> সংরক্ষণ হচ্ছে...';
              statusEl.textContent = '';

              var selectedType = form.querySelector('input[name="homepageType"]:checked').value;
              var target = '';

              if (selectedType === 'landing') {
                target = document.getElementById('landingPageSelect').value;
              } else if (selectedType === 'product') {
                target = document.getElementById('productSelect').value;
              }

              try {
                var res = await fetch('/api/admin/homepage-settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ type: selectedType, target: target })
                });
                var data = await res.json();
                if (data.success) {
                  statusEl.textContent = '✓ সফলভাবে হোমপেজ পরিবর্তন হয়েছে!';
                  setTimeout(function() {
                    window.location.reload();
                  }, 600);
                } else {
                  alert('ত্রুটি: ' + (data.error || 'সেভ করা সম্ভব হয়নি'));
                  btn.disabled = false;
                  btn.innerHTML = '<i class="fas fa-check"></i> Save Changes';
                }
              } catch(err) {
                alert('সার্ভার এরর: ' + err.message);
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-check"></i> Save Changes';
              }
            });
          })();
        `
      }} />
    </AdminLayout>
  )
}
