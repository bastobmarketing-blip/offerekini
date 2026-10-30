import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { getAllLandingPages, getLandingPageUrl } from '../../data/landingPages'
import { products } from '../../data/products'

export const AdminLandingPagesPage: FC = () => {
  const landingPages = getAllLandingPages()

  return (
    <AdminLayout title="Landing Pages" active="landing-pages">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">Landing Pages ({landingPages.length})</h1>
          <p class="text-xs text-ok-gray-500">হাই-কনভার্টিং সেলস ল্যান্ডিং পেজ তৈরি ও ম্যানেজমেন্ট</p>
        </div>
        <div>
          <button
            type="button"
            onclick="document.getElementById('create-lp-modal').classList.remove('hidden')"
            class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <i class="fas fa-plus"></i>
            <span>Create New Landing Page</span>
          </button>
        </div>
      </div>

      {/* Landing Pages Table */}
      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card mb-8">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Page Title & Product</th>
                <th class="p-4">Live URL Slug</th>
                <th class="p-4">Pricing Offer</th>
                <th class="p-4">Theme</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {landingPages.map((lp) => (
                <tr id={`lp-row-${lp.id}`} class="hover:bg-gray-50/60 transition-colors">
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <img src={lp.productImage} class="w-12 h-12 rounded-xl object-contain bg-gray-50 shrink-0 border border-gray-100" />
                      <div>
                        <p class="font-bold text-ok-charcoal line-clamp-1">{lp.headline || lp.title}</p>
                        <p class="text-xs text-ok-gray-400">Product: {lp.productName}</p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">
                    <a
                      href={getLandingPageUrl(lp)}
                      target="_blank"
                      class="text-xs font-mono font-bold text-sky-600 hover:underline flex items-center gap-1"
                    >
                      <span>{getLandingPageUrl(lp)}</span>
                      <i class="fas fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                  </td>
                  <td class="p-4">
                    <p class="font-extrabold text-ok-green-800 text-xs">৳{lp.offerPrice} <span class="line-through text-gray-400 font-normal">৳{lp.regularPrice}</span></p>
                    {lp.megaDealEnabled && (
                      <p class="text-[11px] text-amber-600 font-semibold">২ প্যাক: ৳{lp.megaPrice}</p>
                    )}
                  </td>
                  <td class="p-4">
                    <span class={`text-[11px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      lp.themeColor === 'amber' ? 'bg-amber-100 text-amber-800' :
                      lp.themeColor === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                      lp.themeColor === 'red' ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'
                    }`}>
                      {lp.themeColor || 'blue'}
                    </span>
                  </td>
                  <td class="p-4">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                    </span>
                  </td>
                  <td class="p-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onclick={`openSectionManager('${lp.slug}', '${(lp.productName || lp.headline || lp.slug).replace(/'/g, "\\'")}')`}
                        class="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                        title="Elementor-Style Section Toggle"
                      >
                        <i class="fas fa-layer-group text-[11px]"></i>
                        <span>Sections</span>
                      </button>
                      <a
                        href={`/${lp.slug}`}
                        target="_blank"
                        class="bg-ok-green-50 text-ok-green-800 hover:bg-ok-green-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <i class="fas fa-eye text-[11px]"></i> Live
                      </a>
                      <button
                        type="button"
                        onclick={`deleteLandingPageRow('${lp.id}', '${lp.headline || lp.slug}')`}
                        class="bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                        title="Delete Landing Page"
                      >
                        <i class="fas fa-trash-alt text-[11px]"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION MANAGER MODAL (Elementor-Style) */}
      <div id="manage-sections-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
          <div class="flex items-center justify-between border-b pb-4 mb-5">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <i class="fas fa-layer-group text-sm"></i>
                </span>
                <h2 class="text-lg font-black text-slate-900" id="sec-modal-title">ল্যান্ডিং পেজ সেকশন ম্যানেজার</h2>
              </div>
              <p class="text-xs text-slate-500 mt-1" id="sec-modal-subtitle">
                Elementor-এর মতো পেজের যেকোনো সেকশন অন বা অফ রাখুন
              </p>
            </div>
            <button
              type="button"
              onclick="closeSectionManager()"
              class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          <div class="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-3.5 mb-5 flex items-start gap-3">
            <span class="text-lg">⚡</span>
            <div class="text-xs text-indigo-950">
              <p class="font-bold">স্বয়ংক্রিয় সেকশন আবিষ্কার (Auto-Discovery Engine)</p>
              <p class="text-indigo-800/80 mt-0.5">
                ল্যান্ডিং পেজের কোডে নতুন কোনো উপাদান বা সেকশন যোগ হলে তা স্বয়ংক্রিয়ভাবে এখানে তালিকাভুক্ত হয়ে যাবে।
              </p>
            </div>
          </div>

          {/* DYNAMIC SECTIONS LIST */}
          <div id="sections-loading" class="py-8 text-center text-xs text-gray-400">
            <span class="ok-spinner mr-2"></span> সেকশন লোড হচ্ছে...
          </div>

          <form id="manage-sections-form" class="space-y-3">
            <div id="sections-list-container" class="space-y-2.5 max-h-[45vh] overflow-y-auto pr-1"></div>

            <div class="pt-5 border-t border-gray-100 flex items-center justify-between mt-4">
              <span id="sec-save-status" class="text-xs font-bold text-emerald-600"></span>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  onclick="closeSectionManager()"
                  class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="sec-save-btn"
                  class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-5 py-2 rounded-xl text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <i class="fas fa-check"></i>
                  <span>Save Visibility Settings</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* CREATE MODAL */}
      <div id="create-lp-modal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
          <div class="flex items-center justify-between border-b pb-4 mb-6">
            <div>
              <h2 class="text-lg font-black text-slate-900">নতুন ল্যান্ডিং পেজ তৈরি করুন</h2>
              <p class="text-xs text-slate-500">কাস্টম শিরোনাম, অফার ও ডিজাইন সেট করে মুহূর্তেই লাইভ করুন</p>
            </div>
            <button
              type="button"
              onclick="document.getElementById('create-lp-modal').classList.add('hidden')"
              class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          <form id="create-lp-form" class="space-y-4">
            <div class="sm:col-span-2 bg-ok-green-50/60 p-3.5 rounded-xl border border-ok-green-200">
              <label class="text-xs font-bold text-ok-green-900 block mb-1">
                <i class="fas fa-link text-ok-green-700"></i> প্রোডাক্টের সাথে লিংক করুন (Linked Product)
              </label>
              <select
                id="product-link-select"
                name="productId"
                class="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:border-ok-green-600 focus:outline-none bg-white"
                onchange="handleSelectProductForLP(this)"
              >
                <option value="">-- নতুন তৈরি করুন অথবা বিদ্যমান প্রোডাক্ট বাছাই করুন --</option>
                {products.map((p) => (
                  <option
                    value={p.id}
                    data-name={p.name}
                    data-slug={p.slug}
                    data-image={p.image}
                    data-price={p.offerKiniPrice}
                    data-reg={p.referencePrice}
                  >
                    {p.name} (৳{p.offerKiniPrice})
                  </option>
                ))}
              </select>
              <p class="text-[11px] text-ok-gray-500 mt-1">প্রোডাক্ট সিলেক্ট করলে নাম, ছবি এবং মূল্য অটোমেটিক পূরণ হবে ও প্রোডাক্টের সাথে ল্যান্ডিং পেজ মার্জ হয়ে যাবে।</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">URL Slug (লিংক পাথ) *</label>
                <div class="flex items-center">
                  <span class="bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl px-3 py-2.5 text-xs text-gray-500 font-mono">/</span>
                  <input
                    type="text"
                    name="slug"
                    placeholder="e.g. energy-booster"
                    required
                    class="w-full px-3 py-2.5 rounded-r-xl border border-gray-300 text-sm font-mono focus:border-ok-green-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">প্রোডাক্টের নাম *</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="e.g. King Energy Booster"
                  required
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div class="sm:col-span-2">
                <label class="text-xs font-bold text-slate-700 block mb-1">Main Headline (বড় শিরোনাম) *</label>
                <input
                  type="text"
                  name="headline"
                  placeholder="e.g. ENERGY BOOSTER 500G"
                  required
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div class="sm:col-span-2">
                <label class="text-xs font-bold text-slate-700 block mb-1">Subheadline (ছোট স্লোগান) *</label>
                <input
                  type="text"
                  name="subheadline"
                  placeholder="e.g. সারাদিনের কাজের ক্লান্তি দূর করে এনার্জি ও ফোকাস বৃদ্ধি করতে সহায়ক।"
                  required
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div class="sm:col-span-2">
                <label class="text-xs font-bold text-slate-700 block mb-1">প্রোডাক্ট ছবির URL *</label>
                <input
                  type="text"
                  name="productImage"
                  placeholder="e.g. /testo_king/jar.webp বা https://..."
                  required
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">কালার থিম</label>
                <select name="themeColor" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none bg-white">
                  <option value="blue">Royal Blue (ডিফল্ট)</option>
                  <option value="amber">Amber Gold (গোল্ডেন)</option>
                  <option value="emerald">Emerald Green (হার্বাল/অর্গানিক)</option>
                  <option value="red">Rose Red (বোল্ড)</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">ট্যাগলাইন ব্যাজ (ঐচ্ছিক)</label>
                <input
                  type="text"
                  name="badgeText"
                  placeholder="যেমন: প্রতিদিন মাত্র ৳৩০ ইনভেস্ট করুন"
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">রেগুলার মার্কেট মূল্য (৳) *</label>
                <input
                  type="number"
                  name="regularPrice"
                  placeholder="1200"
                  required
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">অফার মূল্য (৳) *</label>
                <input
                  type="number"
                  name="offerPrice"
                  placeholder="890"
                  required
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">মেগা সেভার কম্বো মূল্য (৳)</label>
                <input
                  type="number"
                  name="megaPrice"
                  placeholder="1390"
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">ডেলিভারি চার্জ (ঢাকা) (৳)</label>
                <input
                  type="number"
                  name="deliveryDhaka"
                  placeholder="60"
                  value="60"
                  class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>
            </div>

            <div class="pt-4 flex items-center justify-end gap-3 border-t">
              <button
                type="button"
                onclick="document.getElementById('create-lp-modal').classList.add('hidden')"
                class="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="lp-submit-btn"
                class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <i class="fas fa-check"></i>
                <span>Publish Landing Page</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          function handleSelectProductForLP(selectEl) {
            const opt = selectEl.options[selectEl.selectedIndex];
            if (!opt || !selectEl.value) return;
            const name = opt.getAttribute('data-name');
            const slug = opt.getAttribute('data-slug');
            const img = opt.getAttribute('data-image');
            const price = opt.getAttribute('data-price');
            const reg = opt.getAttribute('data-reg');

            const form = document.getElementById('create-lp-form');
            if (name) {
              form.productName.value = name;
              if (!form.headline.value) form.headline.value = name.toUpperCase();
            }
            if (slug && !form.slug.value) {
              form.slug.value = slug;
            }
            if (img) form.productImage.value = img;
            if (price) form.offerPrice.value = price;
            if (reg) form.regularPrice.value = reg;
            if (price) form.megaPrice.value = Math.round(Number(price) * 1.7);
          }

          async function deleteLandingPageRow(id, name) {
            if (!confirm('আপনি কি নিশ্চিতভাবে "' + name + '" ল্যান্ডিং পেজটি ডিলিট করতে চান?')) {
              return;
            }
            try {
              const res = await fetch('/api/admin/landing-pages/' + id, { method: 'DELETE' });
              const data = await res.json();
              if (data.success) {
                const row = document.getElementById('lp-row-' + id);
                if (row) {
                  row.style.opacity = '0.3';
                  row.style.backgroundColor = '#fee2e2';
                  setTimeout(() => row.remove(), 400);
                }
              } else {
                alert('ডিলিট করতে সমস্যা হয়েছে: ' + (data.error || 'Unknown error'));
              }
            } catch(err) {
              alert('সার্ভার এরর: ' + err.message);
            }
          }

          var lpForm = document.getElementById('create-lp-form');
          var lpSubmitBtn = document.getElementById('lp-submit-btn');

          lpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            lpSubmitBtn.disabled = true;
            lpSubmitBtn.innerHTML = 'পাবলিশ হচ্ছে...';

            var payload = {
              productId: lpForm.productId ? lpForm.productId.value : undefined,
              slug: lpForm.slug.value,
              title: lpForm.headline.value + ' | OfferKini',
              headline: lpForm.headline.value,
              subheadline: lpForm.subheadline.value,
              productName: lpForm.productName.value,
              productImage: lpForm.productImage.value,
              themeColor: lpForm.themeColor.value,
              badgeText: lpForm.badgeText.value,
              regularPrice: parseFloat(lpForm.regularPrice.value) || 1200,
              offerPrice: parseFloat(lpForm.offerPrice.value) || 890,
              megaPrice: parseFloat(lpForm.megaPrice.value) || 1390,
              deliveryDhaka: parseFloat(lpForm.deliveryDhaka.value) || 60,
              megaDealEnabled: true
            };

            try {
              var res = await fetch('/api/admin/landing-pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              var data = await res.json();
              if (data.success) {
                alert('সফলভাবে ল্যান্ডিং পেজ তৈরি করা হয়েছে! লিংক: /' + data.landingPage.slug);
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'ল্যান্ডিং পেজ তৈরি করা যায়নি'));
                lpSubmitBtn.disabled = false;
                lpSubmitBtn.innerHTML = 'Publish Landing Page';
              }
            } catch(err) {
              alert('সার্ভার এরর: ' + err.message);
              lpSubmitBtn.disabled = false;
              lpSubmitBtn.innerHTML = 'Publish Landing Page';
            }
          });

          // ========================================================
          // ELEMENTOR-STYLE SECTION MANAGER JAVASCRIPT
          // ========================================================
          var currentManagingSlug = '';
          var currentSectionsData = [];

          window.openSectionManager = async function(slug, pageName) {
            currentManagingSlug = slug;
            var modal = document.getElementById('manage-sections-modal');
            var title = document.getElementById('sec-modal-title');
            var sub = document.getElementById('sec-modal-subtitle');
            var loading = document.getElementById('sections-loading');
            var container = document.getElementById('sections-list-container');
            var status = document.getElementById('sec-save-status');

            if (status) status.textContent = '';
            modal.classList.remove('hidden');
            if (title) title.textContent = pageName + ' — সেকশন ম্যানেজার';
            if (sub) sub.textContent = 'পৃষ্ঠা: /' + slug + ' | Elementor-এর মতো যেকোনো সেকশন অন বা অফ রাখুন';

            if (loading) loading.style.display = 'block';
            if (container) container.innerHTML = '';

            try {
              var res = await fetch('/api/admin/landing-pages/' + slug + '/sections');
              var data = await res.json();
              if (loading) loading.style.display = 'none';

              if (data.success && data.sections) {
                currentSectionsData = data.sections;
                renderSectionsList(data.sections);
              } else {
                if (container) container.innerHTML = '<p class="text-xs text-rose-500 p-4">সেকশন লোড করা সম্ভব হয়নি</p>';
              }
            } catch(e) {
              if (loading) loading.style.display = 'none';
              if (container) container.innerHTML = '<p class="text-xs text-rose-500 p-4">ত্রুটি: ' + e.message + '</p>';
            }
          };

          function renderSectionsList(sections) {
            var container = document.getElementById('sections-list-container');
            if (!container) return;
            container.innerHTML = sections.map(function(sec, idx) {
              return '<div class="flex items-center justify-between p-3.5 rounded-2xl border ' + (sec.enabled ? 'border-gray-200 bg-white shadow-xs' : 'border-gray-200/60 bg-gray-50/80 opacity-70') + ' transition-all hover:border-indigo-300">' +
                '<div class="flex items-center gap-3">' +
                  '<span class="w-8 h-8 rounded-xl ' + (sec.enabled ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400') + ' flex items-center justify-center font-bold text-xs shrink-0">' +
                    (idx + 1) +
                  '</span>' +
                  '<div>' +
                    '<div class="flex items-center gap-2">' +
                      '<h4 class="font-bold text-sm text-slate-900">' + sec.title + '</h4>' +
                      '<span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ' + (sec.enabled ? 'bg-emerald-100/70 text-emerald-800' : 'bg-gray-200 text-gray-600') + '">' +
                        '#' + sec.id +
                      '</span>' +
                    '</div>' +
                    '<p class="text-[11px] ' + (sec.enabled ? 'text-emerald-700 font-semibold' : 'text-gray-400') + ' mt-0.5">' +
                      (sec.enabled ? '👁️ লাইভ পেজে প্রদর্শিত হচ্ছে (Active)' : '🚫 লাইভ পেজ থেকে হাইড করা আছে (Hidden)') +
                    '</p>' +
                  '</div>' +
                '</div>' +
                '<label class="relative inline-flex items-center cursor-pointer shrink-0 ml-3">' +
                  '<input type="checkbox" name="sec_' + sec.id + '" value="' + sec.id + '" class="sr-only peer" ' + (sec.enabled ? 'checked' : '') + ' onchange="this.closest(\'.flex\').classList.toggle(\'opacity-70\', !this.checked)">' +
                  '<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>' +
                '</label>' +
              '</div>';
            }).join('');
          }

          window.closeSectionManager = function() {
            var modal = document.getElementById('manage-sections-modal');
            if (modal) modal.classList.add('hidden');
          };

          var manageForm = document.getElementById('manage-sections-form');
          if (manageForm) {
            manageForm.addEventListener('submit', async function(e) {
              e.preventDefault();
              var btn = document.getElementById('sec-save-btn');
              var status = document.getElementById('sec-save-status');
              btn.disabled = true;
              btn.innerHTML = '<span class="ok-spinner"></span> সেভ হচ্ছে...';

              var visibility = {};
              currentSectionsData.forEach(function(sec) {
                var cb = document.querySelector('input[name="sec_' + sec.id + '"]');
                visibility[sec.id] = cb ? cb.checked : false;
              });

              try {
                var res = await fetch('/api/admin/landing-pages/' + currentManagingSlug + '/sections', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ visibility: visibility })
                });
                var data = await res.json();
                if (data.success) {
                  status.textContent = '✓ সেটিংস সফলভাবে সেভ হয়েছে!';
                  setTimeout(function() {
                    closeSectionManager();
                  }, 700);
                } else {
                  alert('ত্রুটি: ' + (data.error || 'Failed'));
                }
              } catch(err) {
                alert('এরর: ' + err.message);
              } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-check"></i> Save Visibility Settings';
              }
            });
          }
        `
      }} />
    </AdminLayout>
  )
}
