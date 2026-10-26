import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { getAllLandingPages } from '../../data/landingPages'
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
                      href={`/${lp.slug}`}
                      target="_blank"
                      class="text-xs font-mono font-bold text-sky-600 hover:underline flex items-center gap-1"
                    >
                      <span>/{lp.slug}</span>
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
        `
      }} />
    </AdminLayout>
  )
}
