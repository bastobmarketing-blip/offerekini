import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import type { LandingPageConfig } from '../../data/landingPages'

const DISTRICTS = [
  'ঢাকা (Dhaka)',
  'চট্টগ্রাম (Chittagong)',
  'সিলেট (Sylhet)',
  'রাজশাহী (Rajshahi)',
  'খুলনা (Khulna)',
  'বরিশাল (Barisal)',
  'রংপুর (Rangpur)',
  'ময়মনসিংহ (Mymensingh)',
  'কুমিল্লা (Comilla)',
  'গাজীপুর (Gazipur)',
  'নারায়ণগঞ্জ (Narayanganj)',
  'বগুড়া (Bogra)',
  'দিনাজপুর (Dinajpur)',
  'পাবনা (Pabna)',
  'যশোর (Jessore)',
  'অন্যান্য (Other District)'
]

export const DynamicLandingPage: FC<{ config: LandingPageConfig }> = ({ config }) => {
  const isAmber = config.themeColor === 'amber'
  const isEmerald = config.themeColor === 'emerald'
  const isRose = config.themeColor === 'red'

  const heroBg = isAmber
    ? 'from-[#2b1803] via-[#1a0f02] to-[#0e0701]'
    : isEmerald
    ? 'from-[#03261a] via-[#021811] to-[#010e0a]'
    : isRose
    ? 'from-[#26050e] via-[#170308] to-[#0a0104]'
    : 'from-[#06182c] via-[#0a2540] to-[#04101e]'

  const accentColor = isAmber ? 'text-amber-400' : isEmerald ? 'text-emerald-400' : isRose ? 'text-rose-400' : 'text-sky-400'
  const btnBg = isAmber
    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950'
    : isEmerald
    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950'
    : isRose
    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
    : 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950'

  return (
    <CustomerLayout
      title={config.title}
      description={config.subheadline}
      showHeader={false}
      showFooter={false}
      showMobileNav={false}
    >
      <div class="bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden">
        {/* HERO SECTION */}
        <section class={`relative bg-gradient-to-br ${heroBg} text-white py-12 lg:py-16 overflow-hidden border-b border-white/10`}>
          <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
            
            {/* Tagline Pill */}
            {config.badgeText && (
              <div>
                <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                  {config.badgeText}
                </div>
              </div>
            )}

            {/* Main Title */}
            <div>
              <div class="text-amber-400 font-extrabold text-sm sm:text-base uppercase tracking-wider mb-1">
                <span>👑 PREMIUM COLLECTION</span>
              </div>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white uppercase">
                {config.headline}
              </h1>
            </div>

            {/* Product Image */}
            <div class="py-2">
              <div class="relative inline-block mx-auto max-w-xs sm:max-w-sm">
                <img
                  src={config.productImage}
                  alt={config.productName}
                  class="w-72 sm:w-80 h-auto object-contain mx-auto drop-shadow-2xl rounded-2xl"
                />
              </div>
            </div>

            {/* Subtitle */}
            <p class="text-white/90 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-medium">
              {config.subheadline}
            </p>

            {/* Feature Pillars */}
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 max-w-xl mx-auto">
              <div class="bg-white/10 border border-white/15 rounded-xl p-2.5 text-center">
                <span class="text-lg block">{config.pillar1Icon || '🎯'}</span>
                <span class="text-[11px] font-bold text-white block mt-0.5">{config.pillar1Text || 'TOP QUALITY'}</span>
              </div>
              <div class="bg-white/10 border border-white/15 rounded-xl p-2.5 text-center">
                <span class="text-lg block">{config.pillar2Icon || '⚡'}</span>
                <span class="text-[11px] font-bold text-white block mt-0.5">{config.pillar2Text || 'FAST RESULTS'}</span>
              </div>
              <div class="bg-white/10 border border-white/15 rounded-xl p-2.5 text-center">
                <span class="text-lg block">{config.pillar3Icon || '⚙️'}</span>
                <span class="text-[11px] font-bold text-white block mt-0.5">{config.pillar3Text || '100% NATURAL'}</span>
              </div>
              <div class="bg-white/10 border border-white/15 rounded-xl p-2.5 text-center">
                <span class="text-lg block">{config.pillar4Icon || '🌿'}</span>
                <span class="text-[11px] font-bold text-white block mt-0.5">{config.pillar4Text || 'COD AVAILABLE'}</span>
              </div>
            </div>

            {/* Pricing Offer Cards */}
            <div class="pt-3 grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
              <div class="bg-white/10 border border-white/20 p-4 rounded-2xl shadow-lg relative">
                <div class="text-[11px] text-white/80 font-bold uppercase tracking-wider">{config.regularWeight || '১ প্যাক রেগুলার'}</div>
                <div class="flex items-baseline gap-2 mt-0.5">
                  <span class="text-2xl font-black text-white">৳{config.offerPrice}</span>
                  <span class="text-xs text-gray-400 line-through">৳{config.regularPrice}</span>
                </div>
                <div class="text-[11px] text-white/70 mt-1 font-medium">
                  ডেলিভারি: ঢাকা ৳{config.deliveryDhaka} | বাইরে ৳{config.deliveryOutside}
                </div>
              </div>

              {config.megaDealEnabled && (
                <div class="bg-white/15 border-2 border-amber-400 p-4 rounded-2xl shadow-xl relative overflow-hidden">
                  <span class="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-bl-lg uppercase">
                    🔥 সেরা অফার
                  </span>
                  <div class="text-[11px] text-amber-300 font-bold uppercase tracking-wider">{config.megaWeight || '২ প্যাক মেগা ডিল'}</div>
                  <div class="flex items-baseline gap-2 mt-0.5">
                    <span class="text-2xl font-black text-amber-400">৳{config.megaPrice}</span>
                    <span class="text-xs text-gray-400 line-through">৳{config.regularPrice * 2}</span>
                  </div>
                  <div class="text-[11px] text-emerald-300 font-extrabold mt-1">
                    🚀 {config.megaSavings || 'ফ্রি ডেলিভারি + স্পেশাল ছাড়!'}
                  </div>
                </div>
              )}
            </div>

            <div class="pt-4">
              <a
                href="#order-form-section"
                class={`inline-block w-full max-w-md ${btnBg} font-black py-4 px-6 rounded-2xl text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                এখনই অর্ডার করুন — ক্যাশ অন ডেলিভারি
              </a>
            </div>
          </div>
        </section>

        {/* ORDER FORM SECTION */}
        <section id="order-form-section" class="py-12 sm:py-16 max-w-xl mx-auto px-4">
          <div class="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xl">
            <div class="text-center mb-6">
              <span class="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                সহজ অর্ডার ফর্ম
              </span>
              <h2 class="text-2xl font-black text-slate-900">ডেলিভারি তথ্য দিয়ে অর্ডার সম্পন্ন করুন</h2>
              <p class="text-xs text-slate-500 mt-1">পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন (ক্যাশ অন ডেলিভারি)</p>
            </div>

            <form id="landing-order-form" class="space-y-4">
              <input type="hidden" name="product" value={config.productName} />
              <input type="hidden" name="productId" value={config.productId || config.id} />
              <input type="hidden" name="pageSlug" value={config.slug} />

              {/* Package Selector */}
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-700 block">প্যাকেজ বেছে নিন:</label>
                <div class="grid grid-cols-2 gap-3">
                  <label class="flex items-center gap-2 p-3 border-2 border-ok-green-600 bg-ok-green-50/50 rounded-xl cursor-pointer">
                    <input type="radio" name="package" value="1x" checked class="accent-ok-green-700" />
                    <div class="text-xs">
                      <p class="font-black text-slate-900">{config.regularWeight || '১ প্যাক'}</p>
                      <p class="text-ok-green-700 font-bold">৳{config.offerPrice}</p>
                    </div>
                  </label>
                  {config.megaDealEnabled && (
                    <label class="flex items-center gap-2 p-3 border-2 border-amber-400 bg-amber-50/50 rounded-xl cursor-pointer">
                      <input type="radio" name="package" value="2x" class="accent-amber-600" />
                      <div class="text-xs">
                        <p class="font-black text-slate-900">{config.megaWeight || '২ প্যাক'}</p>
                        <p class="text-amber-700 font-bold">৳{config.megaPrice}</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">আপনার পূর্ণ নাম *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="যেমন: মোঃ কামরুল ইসলাম"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">সচল মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">জেলা নির্বাচন করুন *</label>
                <select
                  name="district"
                  id="district-select"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none bg-white"
                >
                  {DISTRICTS.map((d) => (
                    <option value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">পূর্ণ ঠিকানা (বাসা/রোড/থানা) *</label>
                <textarea
                  name="address"
                  rows={2}
                  placeholder="যেমন: বাসা #৪৫, রোড #৩, সেক্টর #১০, উত্তরা, ঢাকা"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-ok-green-600 focus:outline-none"
                ></textarea>
              </div>

              {/* Order Summary Box */}
              <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-1.5">
                <div class="flex justify-between text-slate-600">
                  <span>পণ্যের মূল্য:</span>
                  <span id="summary-price" class="font-bold">৳{config.offerPrice}</span>
                </div>
                <div class="flex justify-between text-slate-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span id="summary-delivery" class="font-bold">৳{config.deliveryDhaka}</span>
                </div>
                <div class="border-t pt-1.5 flex justify-between text-sm font-black text-slate-900">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span id="summary-total" class="text-ok-green-800 text-base">৳{config.offerPrice + config.deliveryDhaka}</span>
                </div>
              </div>

              <button
                type="submit"
                id="order-submit-btn"
                class="w-full bg-ok-green-800 hover:bg-ok-green-900 text-white font-black py-4 rounded-2xl text-base shadow-xl flex items-center justify-center gap-2 transition-all"
              >
                <i class="fas fa-lock"></i>
                <span>অর্ডার নিশ্চিত করুন (৳<span id="btn-total-amount">{config.offerPrice + config.deliveryDhaka}</span>)</span>
              </button>
            </form>

            <div id="order-success-box" class="hidden text-center py-8">
              <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 text-2xl font-bold">
                ✓
              </div>
              <h3 class="text-xl font-black text-slate-900">আপনার অর্ডার সফল হয়েছে!</h3>
              <p class="text-xs text-slate-600 mt-1 mb-4">আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করবে।</p>
              <div class="p-3 bg-slate-50 rounded-xl text-xs font-mono font-bold text-slate-700">
                Order ID: <span id="confirmed-order-id"></span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var regularPrice = ${config.offerPrice};
            var megaPrice = ${config.megaPrice || config.offerPrice * 2};
            var deliveryDhaka = ${config.deliveryDhaka};
            var deliveryOutside = ${config.deliveryOutside};

            var form = document.getElementById('landing-order-form');
            var successBox = document.getElementById('order-success-box');
            var districtSelect = document.getElementById('district-select');
            var summaryPrice = document.getElementById('summary-price');
            var summaryDelivery = document.getElementById('summary-delivery');
            var summaryTotal = document.getElementById('summary-total');
            var btnTotal = document.getElementById('btn-total-amount');
            var submitBtn = document.getElementById('order-submit-btn');

            function getSelectedPackage() {
              var r = form.querySelector('input[name="package"]:checked');
              return r ? r.value : '1x';
            }

            function recalculate() {
              var pkg = getSelectedPackage();
              var price = pkg === '2x' ? megaPrice : regularPrice;
              var isDhaka = districtSelect.value.indexOf('ঢাকা') >= 0 || districtSelect.value.indexOf('Dhaka') >= 0;
              var delivery = (pkg === '2x' && ${Boolean(config.megaDealEnabled)}) ? 0 : (isDhaka ? deliveryDhaka : deliveryOutside);
              var total = price + delivery;

              summaryPrice.textContent = '৳' + price;
              summaryDelivery.textContent = delivery === 0 ? 'ফ্রি' : '৳' + delivery;
              summaryTotal.textContent = '৳' + total;
              btnTotal.textContent = total;
            }

            form.querySelectorAll('input[name="package"]').forEach(function(el) {
              el.addEventListener('change', recalculate);
            });
            districtSelect.addEventListener('change', recalculate);

            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              submitBtn.disabled = true;
              submitBtn.innerHTML = 'অর্ডার প্রক্রিয়াধীন...';

              var pkg = getSelectedPackage();
              var price = pkg === '2x' ? megaPrice : regularPrice;
              var isDhaka = districtSelect.value.indexOf('ঢাকা') >= 0 || districtSelect.value.indexOf('Dhaka') >= 0;
              var delivery = (pkg === '2x' && ${Boolean(config.megaDealEnabled)}) ? 0 : (isDhaka ? deliveryDhaka : deliveryOutside);
              var total = price + delivery;

              var payload = {
                name: form.name.value,
                phone: form.phone.value,
                district: districtSelect.value,
                address: form.address.value,
                product: form.product.value,
                productId: form.productId.value,
                package: pkg,
                price: price,
                delivery: delivery,
                total: total
              };

              try {
                var res = await fetch('/api/testo_king/order', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
                var data = await res.json();
                if (data.success) {
                  form.classList.add('hidden');
                  successBox.classList.remove('hidden');
                  document.getElementById('confirmed-order-id').textContent = data.orderId;
                } else {
                  alert('ত্রুটি: ' + (data.error || 'অর্ডার সাবমিট করা যায়নি'));
                  submitBtn.disabled = false;
                  submitBtn.innerHTML = 'অর্ডার নিশ্চিত করুন';
                }
              } catch(err) {
                alert('সার্ভার এরর: ' + err.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'অর্ডার নিশ্চিত করুন';
              }
            });
          })();
        `
      }} />
    </CustomerLayout>
  )
}
