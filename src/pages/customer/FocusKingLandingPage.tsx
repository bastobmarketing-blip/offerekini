import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'

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

export const FocusKingLandingPage: FC = () => {
  return (
    <CustomerLayout
      title="Focus King — 500g | Daily Focus, Energy & Productivity Routine Support"
      description="প্রতিদিন মাত্র ৳30 ইনভেস্ট করুন আপনার Focus Routine-এ। 500g Focus King মাত্র ৳900। ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।"
      showMobileNav={false}
    >
      <div class="bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-sky-500 selection:text-white">
        
        {/* ===================================================================
            01. HERO SECTION (Product Color Theme: Royal/Electric Blue & Gold Crown)
           =================================================================== */}
        <section class="relative bg-gradient-to-br from-[#06182c] via-[#0a2540] to-[#04101e] text-white py-12 lg:py-20 overflow-hidden border-b border-sky-500/20">
          {/* Ambient Electric Cyan & Blue Glows */}
          <div class="absolute -top-32 -left-32 w-[480px] h-[480px] bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Headline & Value Prop */}
              <div class="lg:col-span-7 text-center lg:text-left space-y-5">
                
                {/* Brand Tagline Pill */}
                <div class="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-amber-500/15 border border-sky-400/30 text-sky-300 px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-sky-500/10">
                  <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400 animate-pulse"></span>
                  প্রতিদিন মাত্র ৳30 ইনভেস্ট করুন আপনার Focus Routine-এ।
                </div>

                {/* Main Product Title */}
                <div>
                  <div class="inline-flex items-center gap-2 text-amber-400 font-extrabold text-sm sm:text-base uppercase tracking-wider mb-1">
                    <span>👑 KING™</span>
                    <span class="text-sky-300 font-medium">· Sharper Mind, Brighter Days</span>
                  </div>
                  <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                    FOCUS <span class="bg-gradient-to-r from-sky-400 via-sky-300 to-blue-200 bg-clip-text text-transparent">KING</span>
                    <span class="text-amber-400 text-3xl sm:text-4xl lg:text-5xl ml-2 font-black">— 500g</span>
                  </h1>
                </div>

                {/* Subtitle */}
                <p class="text-sky-100/90 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                  পড়াশোনা হোক বা কাজ—প্রতিদিনের <strong class="text-white font-bold">Focus, Energy & Productivity Routine</strong>-এর জন্য Daily Support।
                </p>

                {/* Authentic Jar Pillars matching image */}
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 max-w-xl mx-auto lg:mx-0">
                  <div class="bg-sky-950/60 border border-sky-400/20 rounded-xl p-2.5 text-center backdrop-blur-sm">
                    <span class="text-lg block">🎯</span>
                    <span class="text-[11px] font-bold text-sky-200 block mt-0.5">BETTER FOCUS</span>
                  </div>
                  <div class="bg-sky-950/60 border border-sky-400/20 rounded-xl p-2.5 text-center backdrop-blur-sm">
                    <span class="text-lg block">⚡</span>
                    <span class="text-[11px] font-bold text-sky-200 block mt-0.5">MORE ENERGY</span>
                  </div>
                  <div class="bg-sky-950/60 border border-sky-400/20 rounded-xl p-2.5 text-center backdrop-blur-sm">
                    <span class="text-lg block">⚙️</span>
                    <span class="text-[11px] font-bold text-sky-200 block mt-0.5">PRODUCTIVITY</span>
                  </div>
                  <div class="bg-sky-950/60 border border-sky-400/20 rounded-xl p-2.5 text-center backdrop-blur-sm">
                    <span class="text-lg block">🌿</span>
                    <span class="text-[11px] font-bold text-sky-200 block mt-0.5">NATURAL SUPPORT</span>
                  </div>
                </div>

                {/* Price Box & CTA Button */}
                <div class="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <div class="bg-gradient-to-br from-slate-900/90 to-[#0c2340]/90 border border-sky-500/40 px-5 py-3 rounded-2xl text-center sm:text-left shadow-lg">
                    <div class="text-xs text-sky-300 font-bold uppercase tracking-wider">মাত্র</div>
                    <div class="flex items-baseline gap-2">
                      <span class="text-3xl font-black text-amber-400">৳900</span>
                      <span class="text-sm text-gray-400 line-through">৳1,000</span>
                    </div>
                    <div class="text-[11px] text-sky-300 font-extrabold mt-0.5">প্রায় ৳30/day*</div>
                  </div>

                  <a
                    href="#order-section"
                    class="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] text-center inline-flex items-center justify-center gap-2 group"
                  >
                    <span>🟢 এখনই অর্ডার করুন</span>
                    <span class="transition-transform group-hover:translate-x-1 font-black">→</span>
                  </a>
                </div>

                <div class="flex items-center justify-center lg:justify-start gap-3 pt-1 text-xs text-sky-200/80">
                  <span class="bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    NATURAL · SAFE · EFFECTIVE
                  </span>
                  <span>*দৈনিক খরচ নির্ধারিত serving size-এর ওপর নির্ভরশীল।</span>
                </div>
              </div>

              {/* Right Column: Real Product Photo Showcase */}
              <div class="lg:col-span-5 relative flex justify-center">
                <div class="relative w-full max-w-sm sm:max-w-md">
                  {/* Glowing electric cyan halo */}
                  <div class="absolute inset-0 bg-gradient-to-tr from-sky-500 to-blue-600 rounded-3xl blur-2xl opacity-40 transform scale-95"></div>

                  <div class="relative bg-gradient-to-b from-slate-900/95 to-[#0b2440]/95 border-2 border-sky-400/40 rounded-3xl p-5 shadow-2xl backdrop-blur-xl text-center overflow-hidden">
                    
                    {/* Top Badges */}
                    <div class="flex items-center justify-between gap-2 mb-3">
                      <span class="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        👑 ORIGINAL
                      </span>
                      <span class="bg-sky-500/30 text-sky-200 border border-sky-400/40 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                        500 g Tub
                      </span>
                    </div>

                    {/* Actual Product Photo */}
                    <div class="relative rounded-2xl overflow-hidden bg-white/5 p-2 border border-sky-500/20">
                      <img
                        src="/static/images/products/focus-king.jpg"
                        alt="Focus King 500g - Natural Support for Focus & Productivity"
                        class="w-full h-auto object-contain max-h-[340px] mx-auto rounded-xl drop-shadow-[0_15px_35px_rgba(14,165,233,0.35)] transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Feature badges below photo */}
                    <div class="grid grid-cols-2 gap-2 mt-4 text-[11px] font-bold text-sky-100">
                      <div class="bg-sky-900/60 p-2 rounded-xl border border-sky-500/30 flex items-center justify-center gap-1.5">
                        <i class="fas fa-brain text-sky-300"></i>
                        <span>Sharper Mind</span>
                      </div>
                      <div class="bg-sky-900/60 p-2 rounded-xl border border-sky-500/30 flex items-center justify-center gap-1.5">
                        <i class="fas fa-sun text-amber-400"></i>
                        <span>Brighter Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            02. WHY FOCUS KING? SECTION (Electric Cyan/Sky Blue Themed)
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-gradient-to-b from-sky-50/70 via-white to-white border-b border-sky-100">
          <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-sky-700 bg-sky-100 border border-sky-200 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                <span>⚡</span> WHY FOCUS KING?
              </span>
              <h2 class="text-2xl sm:text-4xl font-black text-slate-900 mt-3 mb-3">
                আপনার প্রতিদিনের Focus Routine-এর জন্য
              </h2>
              <p class="text-slate-600 text-sm sm:text-base font-medium">
                প্রতিদিনের পড়াশোনা বা কাজের পারফরম্যান্স বাড়াতে Focus King আপনার বিশ্বস্ত ডেইলি পার্টনার।
              </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Focus */}
              <div class="bg-white border-2 border-sky-100 hover:border-sky-400 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all hover:-translate-y-1">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-sky-600/30">
                  🧠
                </div>
                <h3 class="text-xl font-extrabold text-slate-900 mb-2">Focus</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  দৈনন্দিন Focus Routine-কে Support করতে।
                </p>
                <div class="mt-4 pt-3 border-t border-sky-50 text-[11px] font-bold text-sky-600 uppercase tracking-wide">
                  Improves Focus
                </div>
              </div>

              {/* Card 2: Energy */}
              <div class="bg-white border-2 border-sky-100 hover:border-sky-400 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all hover:-translate-y-1">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-amber-500/30">
                  ⚡
                </div>
                <h3 class="text-xl font-extrabold text-slate-900 mb-2">Energy</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Active ও Productive দিনের জন্য Daily Energy Support।
                </p>
                <div class="mt-4 pt-3 border-t border-sky-50 text-[11px] font-bold text-amber-600 uppercase tracking-wide">
                  Reduces Mental Fatigue
                </div>
              </div>

              {/* Card 3: Productivity */}
              <div class="bg-white border-2 border-sky-100 hover:border-sky-400 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all hover:-translate-y-1">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-blue-600/30">
                  🎯
                </div>
                <h3 class="text-xl font-extrabold text-slate-900 mb-2">Productivity</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  পড়াশোনা ও কাজের Routine-এর সাথে ব্যবহার করার জন্য।
                </p>
                <div class="mt-4 pt-3 border-t border-sky-50 text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                  Boosts Productivity
                </div>
              </div>

              {/* Card 4: Mental Clarity */}
              <div class="bg-white border-2 border-sky-100 hover:border-sky-400 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all hover:-translate-y-1">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-sky-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-cyan-500/30">
                  💡
                </div>
                <h3 class="text-xl font-extrabold text-slate-900 mb-2">Mental Clarity</h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  দৈনন্দিন Mental Performance Routine-কে Support করতে।
                </p>
                <div class="mt-4 pt-3 border-t border-sky-50 text-[11px] font-bold text-cyan-600 uppercase tracking-wide">
                  Enhances Mental Clarity
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            03. WHO IS IT FOR? (কার জন্য?) SECTION (Deep Navy & Electric Cyan)
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-[#071a2e] text-white relative overflow-hidden border-b border-sky-500/20">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-amber-400 bg-amber-400/10 border border-amber-400/30 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                TARGET AUDIENCE
              </span>
              <h2 class="text-2xl sm:text-4xl font-black text-white mt-3">
                Focus King আপনার জন্য, যদি—
              </h2>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Persona 1: Student */}
              <div class="bg-gradient-to-br from-[#0c233e] to-[#08192e] border border-sky-500/30 p-5 rounded-2xl flex items-start gap-4 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/15 transition-all">
                <span class="text-3xl p-3 rounded-xl bg-sky-950/80 border border-sky-500/30 shrink-0">📚</span>
                <div>
                  <h4 class="font-black text-lg text-white">Student</h4>
                  <p class="text-sky-200 text-sm mt-0.5 font-medium">পড়াশোনায় Focus ধরে রাখতে চান</p>
                </div>
              </div>

              {/* Persona 2: Freelancer */}
              <div class="bg-gradient-to-br from-[#0c233e] to-[#08192e] border border-sky-500/30 p-5 rounded-2xl flex items-start gap-4 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/15 transition-all">
                <span class="text-3xl p-3 rounded-xl bg-sky-950/80 border border-sky-500/30 shrink-0">💻</span>
                <div>
                  <h4 class="font-black text-lg text-white">Freelancer</h4>
                  <p class="text-sky-200 text-sm mt-0.5 font-medium">দীর্ঘ সময় কাজ করেন</p>
                </div>
              </div>

              {/* Persona 3: Entrepreneur */}
              <div class="bg-gradient-to-br from-[#0c233e] to-[#08192e] border border-sky-500/30 p-5 rounded-2xl flex items-start gap-4 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/15 transition-all">
                <span class="text-3xl p-3 rounded-xl bg-sky-950/80 border border-sky-500/30 shrink-0">👨‍💼</span>
                <div>
                  <h4 class="font-black text-lg text-white">Entrepreneur</h4>
                  <p class="text-sky-200 text-sm mt-0.5 font-medium">Business নিয়ে ব্যস্ত থাকেন</p>
                </div>
              </div>

              {/* Persona 4: Content Creator */}
              <div class="bg-gradient-to-br from-[#0c233e] to-[#08192e] border border-sky-500/30 p-5 rounded-2xl flex items-start gap-4 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/15 transition-all">
                <span class="text-3xl p-3 rounded-xl bg-sky-950/80 border border-sky-500/30 shrink-0">🎨</span>
                <div>
                  <h4 class="font-black text-lg text-white">Content Creator</h4>
                  <p class="text-sky-200 text-sm mt-0.5 font-medium">নিয়মিত Creative Work করেন</p>
                </div>
              </div>

              {/* Persona 5: Professional */}
              <div class="bg-gradient-to-br from-[#0c233e] to-[#08192e] border border-sky-500/30 p-5 rounded-2xl flex items-start gap-4 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/15 transition-all sm:col-span-2 lg:col-span-1">
                <span class="text-3xl p-3 rounded-xl bg-sky-950/80 border border-sky-500/30 shrink-0">🧑‍💻</span>
                <div>
                  <h4 class="font-black text-lg text-white">Professional</h4>
                  <p class="text-sky-200 text-sm mt-0.5 font-medium">প্রতিদিন অনেক কাজ সামলান</p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            04. 500g = প্রায় ৳30/day VALUE BREAKDOWN SECTION
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-gradient-to-b from-sky-50/80 via-white to-white">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            
            <div class="bg-white border-2 border-sky-300 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div class="inline-flex items-center gap-1.5 bg-gradient-to-r from-sky-600 to-blue-700 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 shadow-sm">
                <span>👑</span> DAILY ROUTINE VALUE
              </div>

              <h2 class="text-2xl sm:text-4xl font-black text-slate-900 mb-3">
                একদিনের জন্য নয়—Daily Routine-এর জন্য।
              </h2>

              {/* Price Highlight Banner */}
              <div class="my-6 py-6 px-4 bg-gradient-to-r from-[#06182c] via-[#0a2540] to-[#06182c] text-white rounded-2xl shadow-xl max-w-xl mx-auto border border-sky-500/30">
                <p class="text-xs text-sky-300 font-bold uppercase tracking-wider">500g Focus King</p>
                <div class="text-4xl sm:text-5xl font-black text-amber-400 my-1">
                  ৳900
                </div>
                <div class="inline-block bg-sky-500 text-white font-extrabold text-sm sm:text-base px-5 py-1.5 rounded-full mt-1 shadow-sm">
                  প্রায় ৳30 / Day
                </div>
              </div>

              <p class="text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
                এক কাপ চা/কফির খরচের কাছাকাছি বাজেটে আপনার Daily Focus & Productivity Routine-এ একটি নতুন Support যোগ করুন।
              </p>

              <a
                href="#order-section"
                class="bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg shadow-sky-600/25 transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>🟢 Focus King অর্ডার করুন</span>
                <span class="font-black">→</span>
              </a>
            </div>

          </div>
        </section>


        {/* ===================================================================
            05. CUSTOMER REVIEW & PROOF SECTION
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-slate-50 border-y border-sky-100">
          <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-sky-700 bg-sky-100 border border-sky-200 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                CUSTOMER REVIEWS
              </span>
              <h2 class="text-2xl sm:text-4xl font-black text-slate-900 mt-3">
                যারা ব্যবহার করেছেন, তারা কী বলছেন?
              </h2>
            </div>

            {/* 3 Real Customer Review Cards */}
            <div class="grid md:grid-cols-3 gap-6 mb-12">
              
              {/* Review 1 */}
              <div class="bg-white border border-sky-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div class="flex text-amber-400 text-base mb-3">
                    ★★★★★
                  </div>
                  <p class="text-slate-700 text-sm leading-relaxed italic mb-4 font-medium">
                    “পড়াশোনায় এবং দীর্ঘ সময় ল্যাপটপে কাজ করার সময় ফোকাস ধরে রাখতে Focus King অসাধারণ কাজ করছে। ডেলি ডেইলি রুটিনে এটি খুব হেল্পফুল।”
                  </p>
                </div>
                <div class="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 text-white font-black flex items-center justify-center text-sm shadow-sm">
                    ত
                  </div>
                  <div>
                    <h5 class="font-extrabold text-slate-900 text-sm">তানভীর আহমেদ</h5>
                    <p class="text-xs text-sky-700 font-semibold">Student</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div class="bg-white border border-sky-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div class="flex text-amber-400 text-base mb-3">
                    ★★★★★
                  </div>
                  <p class="text-slate-700 text-sm leading-relaxed italic mb-4 font-medium">
                    “ফ্রিল্যান্সিংয়ের লেট নাইট শিফটে এনার্জি ও মেন্টাল ক্লারিটি বজায় রাখতে আমি প্রতিদিন এটি ব্যবহার করি। বাজেটের দিক থেকেও অনেক সাশ্রয়ী।”
                  </p>
                </div>
                <div class="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 text-white font-black flex items-center justify-center text-sm shadow-sm">
                    শ
                  </div>
                  <div>
                    <h5 class="font-extrabold text-slate-900 text-sm">শরিফুল ইসলাম</h5>
                    <p class="text-xs text-sky-700 font-semibold">Freelancer</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div class="bg-white border border-sky-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div class="flex text-amber-400 text-base mb-3">
                    ★★★★★
                  </div>
                  <p class="text-slate-700 text-sm leading-relaxed italic mb-4 font-medium">
                    “বিজনেস এবং প্রতিদিনের কাজের প্রেসারে উৎপাদনশীলতা ধরে রাখতে এটি এখন আমার ডেইলি রুটিনের অংশ। দ্রুত ডেলিভারিও পেয়েছি।”
                  </p>
                </div>
                <div class="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-700 text-white font-black flex items-center justify-center text-sm shadow-sm">
                    ম
                  </div>
                  <div>
                    <h5 class="font-extrabold text-slate-900 text-sm">মাহমুদুল হাসান</h5>
                    <p class="text-xs text-sky-700 font-semibold">Entrepreneur</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Video Review Placeholders */}
            <div class="mt-8 bg-gradient-to-br from-[#07192f] to-[#04101e] text-white rounded-3xl p-6 sm:p-8 border border-sky-500/30">
              <h3 class="text-lg sm:text-xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-sky-200">
                <i class="fas fa-video text-amber-400"></i> কাস্টমার ভিডিও রিভিউ (Real Video Reviews)
              </h3>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Video Card 1 */}
                <div class="bg-slate-900/80 rounded-2xl overflow-hidden border border-sky-500/20 group relative">
                  <div class="aspect-video bg-[#040e1a] flex flex-col items-center justify-center relative p-4 text-center">
                    <div class="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xl shadow-lg transition-transform group-hover:scale-110">
                      <i class="fas fa-play ml-1"></i>
                    </div>
                    <span class="text-xs text-sky-200 font-bold mt-3">কাস্টমার অভিজ্ঞতা ভিডিও ১</span>
                  </div>
                  <div class="p-3 bg-slate-900/90 text-xs text-slate-300 font-medium">
                    "Focus King ব্যবহারের অভিজ্ঞতা ও ডেইলি রুটিন সাপোর্ট"
                  </div>
                </div>

                {/* Video Card 2 */}
                <div class="bg-slate-900/80 rounded-2xl overflow-hidden border border-sky-500/20 group relative">
                  <div class="aspect-video bg-[#040e1a] flex flex-col items-center justify-center relative p-4 text-center">
                    <div class="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xl shadow-lg transition-transform group-hover:scale-110">
                      <i class="fas fa-play ml-1"></i>
                    </div>
                    <span class="text-xs text-sky-200 font-bold mt-3">কাস্টমার অভিজ্ঞতা ভিডিও ২</span>
                  </div>
                  <div class="p-3 bg-slate-900/90 text-xs text-slate-300 font-medium">
                    "পড়াশোনায় ফোকাস ধরে রাখার রিয়েল অভিজ্ঞতা"
                  </div>
                </div>

                {/* Video Card 3 */}
                <div class="bg-slate-900/80 rounded-2xl overflow-hidden border border-sky-500/20 group relative sm:col-span-2 lg:col-span-1">
                  <div class="aspect-video bg-[#040e1a] flex flex-col items-center justify-center relative p-4 text-center">
                    <div class="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xl shadow-lg transition-transform group-hover:scale-110">
                      <i class="fas fa-play ml-1"></i>
                    </div>
                    <span class="text-xs text-sky-200 font-bold mt-3">কাস্টমার অভিজ্ঞতা ভিডিও ৩</span>
                  </div>
                  <div class="p-3 bg-slate-900/90 text-xs text-slate-300 font-medium">
                    "অর্ডার ও ডেলিভারি আনবক্সিং অভিজ্ঞতা"
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* ===================================================================
            06. OFFER + ORDER FORM SECTION (#order-section)
           =================================================================== */}
        <section id="order-section" class="py-14 sm:py-20 bg-gradient-to-br from-[#06182c] via-[#09223c] to-[#04111f] text-white">
          <div class="max-w-5xl mx-auto px-4 sm:px-6">
            
            <div class="text-center max-w-2xl mx-auto mb-10">
              <span class="bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                SPECIAL OFFER & CHECKOUT
              </span>
              <h2 class="text-2xl sm:text-4xl font-black text-white mt-3 mb-2">
                আপনার Daily Focus Routine শুরু করুন
              </h2>
              <p class="text-sky-200/80 text-sm sm:text-base font-medium">
                নিচের ফর্মে সঠিক তথ্য দিয়ে ক্যাশ অন ডেলিভারিতে অর্ডার সম্পন্ন করুন।
              </p>
            </div>

            <div class="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Box: Product Summary */}
              <div class="lg:col-span-5 bg-gradient-to-b from-[#0c243e] to-[#08182b] border-2 border-sky-400/30 rounded-3xl p-6 shadow-2xl space-y-6">
                
                {/* Product Photo inside Form Card */}
                <div class="rounded-2xl overflow-hidden bg-slate-900/60 p-3 border border-sky-500/20 text-center">
                  <img
                    src="/static/images/products/focus-king.jpg"
                    alt="Focus King 500g"
                    class="w-48 h-auto object-contain mx-auto drop-shadow-md"
                  />
                  <div class="mt-2 text-xs font-black text-amber-400">
                    👑 KING™ FOCUS KING — 500g
                  </div>
                </div>

                <div class="bg-slate-900/90 p-4 rounded-2xl border border-sky-500/30 flex items-center justify-between">
                  <div>
                    <span class="text-xs text-sky-300 block font-bold uppercase">অফার মূল্য</span>
                    <span class="text-2xl font-black text-amber-400">৳900</span>
                    <span class="text-xs text-gray-400 line-through ml-2">৳1,000</span>
                  </div>
                  <span class="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black px-3 py-1 rounded-full">
                    ১০% ছাড়
                  </span>
                </div>

                <div>
                  <h4 class="text-xs font-bold text-sky-200 uppercase tracking-wider mb-3">আপনি পাচ্ছেন:</h4>
                  <ul class="space-y-2.5 text-sm text-sky-100 font-medium">
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check-circle text-sky-400"></i>
                      <span><strong>500g Focus King</strong> (Full Jar)</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check-circle text-sky-400"></i>
                      <span>Daily Focus Support</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check-circle text-sky-400"></i>
                      <span>Energy Support</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check-circle text-sky-400"></i>
                      <span>Productivity Support</span>
                    </li>
                  </ul>
                </div>

                <div class="pt-3 border-t border-sky-800/50">
                  <div class="bg-sky-950/70 border border-sky-500/30 rounded-xl p-3 text-xs text-sky-200 flex items-center gap-2.5">
                    <i class="fas fa-hand-holding-dollar text-amber-400 text-lg"></i>
                    <span><strong>Cash on Delivery Available:</strong> পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা রয়েছে।</span>
                  </div>
                </div>
              </div>

              {/* Right Box: Order Form */}
              <div class="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-sky-100">
                <h3 class="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <i class="fas fa-cart-shopping text-sky-600"></i> 🛒 ORDER NOW (অর্ডার ফর্ম)
                </h3>

                <form id="fk-order-form" class="space-y-4">
                  {/* Name */}
                  <div>
                    <label class="block text-xs font-black text-slate-700 uppercase mb-1">
                      আপনার নাম <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="আপনার পুরো নাম লিখুন"
                      class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label class="block text-xs font-black text-slate-700 uppercase mb-1">
                      মোবাইল নম্বর <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="01XXXXXXXXX"
                      class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-medium"
                    />
                  </div>

                  {/* District */}
                  <div>
                    <label class="block text-xs font-black text-slate-700 uppercase mb-1">
                      জেলা নির্বাচন করুন <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="fk-district"
                      name="district"
                      required
                      class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-200 outline-none transition-all bg-white font-medium"
                    >
                      {DISTRICTS.map((d) => (
                        <option value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label class="block text-xs font-black text-slate-700 uppercase mb-1">
                      সম্পূর্ণ ঠিকানা <span class="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      placeholder="বাড়ি/রোড নম্বর, এলাকা ও বিস্তারিত ঠিকানা লিখুন"
                      class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-medium"
                    ></textarea>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label class="block text-xs font-black text-slate-700 uppercase mb-1">
                      পরিমাণ (Quantity)
                    </label>
                    <div class="grid grid-cols-3 gap-3">
                      <label class="fk-qty-label border-2 border-sky-600 bg-sky-50 rounded-xl p-2.5 text-center cursor-pointer transition-all">
                        <input type="radio" name="quantity" value="1" checked class="hidden fk-qty-radio" />
                        <span class="block text-xs font-bold text-slate-600">১টি জাড়</span>
                        <span class="block text-sm font-black text-sky-800">৳900</span>
                      </label>
                      <label class="fk-qty-label border-2 border-slate-200 bg-white rounded-xl p-2.5 text-center cursor-pointer transition-all hover:border-sky-300">
                        <input type="radio" name="quantity" value="2" class="hidden fk-qty-radio" />
                        <span class="block text-xs font-bold text-slate-600">২টি জাড়</span>
                        <span class="block text-sm font-black text-sky-800">৳1,800</span>
                      </label>
                      <label class="fk-qty-label border-2 border-slate-200 bg-white rounded-xl p-2.5 text-center cursor-pointer transition-all hover:border-sky-300">
                        <input type="radio" name="quantity" value="3" class="hidden fk-qty-radio" />
                        <span class="block text-xs font-bold text-slate-600">৩টি জাড়</span>
                        <span class="block text-sm font-black text-sky-800">৳2,700</span>
                      </label>
                    </div>
                  </div>

                  {/* Payment Method Option */}
                  <div>
                    <label class="block text-xs font-black text-slate-700 uppercase mb-1">
                      পেমেন্ট পদ্ধতি
                    </label>
                    <div class="grid grid-cols-2 gap-3">
                      <label class="fk-pay-label border-2 border-sky-600 bg-sky-50 rounded-xl p-3 text-center cursor-pointer transition-all">
                        <input type="radio" name="paymentMethod" value="cod" checked class="hidden fk-pay-radio" />
                        <span class="block text-xs font-bold text-sky-950"><i class="fas fa-truck-ramp-box mr-1 text-sky-700"></i> ক্যাশ অন ডেলিভারি</span>
                      </label>
                      <label class="fk-pay-label border-2 border-slate-200 bg-white rounded-xl p-3 text-center cursor-pointer transition-all hover:border-sky-300">
                        <input type="radio" name="paymentMethod" value="eps" class="hidden fk-pay-radio" />
                        <span class="block text-xs font-bold text-blue-900"><i class="fas fa-shield-halved mr-1 text-blue-600"></i> EPS অনলাইন পেমেন্ট</span>
                      </label>
                    </div>
                  </div>

                  {/* Price Calculation Summary */}
                  <div class="bg-sky-50/70 rounded-2xl p-4 border border-sky-200 space-y-2 text-xs sm:text-sm">
                    <div class="flex justify-between text-slate-600 font-medium">
                      <span>পণ্যের দাম (<span id="fk-summary-qty">1</span>টি Focus King 500g):</span>
                      <span id="fk-summary-subtotal" class="font-bold text-slate-900">৳900</span>
                    </div>
                    <div class="flex justify-between text-slate-600 font-medium">
                      <span>ডেলিভারি চার্জ:</span>
                      <span id="fk-summary-delivery" class="font-bold text-sky-700">৳60</span>
                    </div>
                    <div class="h-px bg-sky-200 my-1"></div>
                    <div class="flex justify-between text-sm sm:text-base font-black text-slate-900">
                      <span>সর্বমোট টাকা:</span>
                      <span id="fk-summary-total" class="text-sky-700 text-lg font-black">৳960</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="fk-submit-btn"
                    class="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg py-4 rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span id="fk-submit-text"># Cash on Delivery-তে অর্ডার করুন →</span>
                  </button>

                  <p class="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 font-medium">
                    <i class="fas fa-shield-halved text-sky-600"></i> আপনার তথ্য সম্পূর্ণ নিরাপদ থাকবে।
                  </p>
                </form>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            07. FAQ SECTION
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-white border-t border-sky-100">
          <div class="max-w-4xl mx-auto px-4 sm:px-6">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-sky-700 bg-sky-100 border border-sky-200 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 class="text-2xl sm:text-4xl font-black text-slate-900 mt-3">
                সাধারণ জিজ্ঞাসা (FAQ)
              </h2>
            </div>

            <div class="space-y-4">
              
              {/* FAQ 1 */}
              <div class="border border-sky-100 rounded-2xl p-5 bg-sky-50/40 hover:bg-white hover:border-sky-300 transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-black">?</span>
                  Focus King কী?
                </h4>
                <p class="text-slate-600 text-sm mt-2 pl-8 leading-relaxed font-medium">
                  Focus King হলো Daily Focus & Productivity Support-এর জন্য তৈরি 500g-এর একটি প্রিমিয়াম প্রোডাক্ট, যা আপনার প্রতিদিনের পড়ালেখা ও কাজের একাগ্রতা ধরে রাখতে সাহায্য করে।
                </p>
              </div>

              {/* FAQ 2 */}
              <div class="border border-sky-100 rounded-2xl p-5 bg-sky-50/40 hover:bg-white hover:border-sky-300 transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-black">?</span>
                  Focus King-এর দাম কত?
                </h4>
                <p class="text-slate-600 text-sm mt-2 pl-8 leading-relaxed font-medium">
                  500g-এর জন্য বিশেষ অফার মূল্য <strong>৳900</strong> (নিয়মিত মূল্য ৳1,000)।
                </p>
              </div>

              {/* FAQ 3 */}
              <div class="border border-sky-100 rounded-2xl p-5 bg-sky-50/40 hover:bg-white hover:border-sky-300 transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-black">?</span>
                  প্রতিদিন কত খরচ হবে?
                </h4>
                <p class="text-slate-600 text-sm mt-2 pl-8 leading-relaxed font-medium">
                  প্রায় <strong>৳30/day</strong>, যদি নির্ধারিত serving হিসাব অনুযায়ী ৩০ দিনের ব্যবহার হয়।
                </p>
              </div>

              {/* FAQ 4 */}
              <div class="border border-sky-100 rounded-2xl p-5 bg-sky-50/40 hover:bg-white hover:border-sky-300 transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-black">?</span>
                  কারা ব্যবহার করতে পারেন?
                </h4>
                <p class="text-slate-600 text-sm mt-2 pl-8 leading-relaxed font-medium">
                  স্টুডেন্ট, ফ্রিল্যান্সার, উদ্যোক্তা, কনটেন্ট ক্রিয়েটর ও পেশাজীবী যে কেউ তাদের প্রতিদিনের রুটিনে এটি ব্যবহার করতে পারেন।
                </p>
              </div>

              {/* FAQ 5 */}
              <div class="border border-sky-100 rounded-2xl p-5 bg-sky-50/40 hover:bg-white hover:border-sky-300 transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-black">?</span>
                  কীভাবে ব্যবহার করবো?
                </h4>
                <p class="text-slate-600 text-sm mt-2 pl-8 leading-relaxed font-medium">
                  Product packaging-এর গায়ে লেখা সহজ নির্দেশনা অনুযায়ী প্রতিদিন নির্দিষ্ট পরিমাণে গ্রহণ করুন।
                </p>
              </div>

              {/* FAQ 6 */}
              <div class="border border-sky-100 rounded-2xl p-5 bg-sky-50/40 hover:bg-white hover:border-sky-300 transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-black">?</span>
                  Cash on Delivery আছে?
                </h4>
                <p class="text-slate-600 text-sm mt-2 pl-8 leading-relaxed font-medium">
                  হ্যাঁ! পুরো বাংলাদেশে ক্যাশ অন ডেলিভারিতে অর্ডার করার সুবিধা রয়েছে। পণ্য হাতে পেয়ে মুল্য পরিশোধ করতে পারবেন।
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            08. FINAL CTA SECTION (Deep Royal Blue & Gold Glow)
           =================================================================== */}
        <section class="py-16 sm:py-24 bg-gradient-to-br from-[#06182c] via-[#09223c] to-[#04111f] text-white text-center relative overflow-hidden border-t border-sky-500/30">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
            <h2 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Focus-এর জন্য অপেক্ষা নয়,<br />
              <span class="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                নিজের Daily Routine-এ Invest করুন।
              </span>
            </h2>

            <p class="text-sky-200 text-lg sm:text-xl font-bold">
              👑 Focus King — 500g | ৳900
            </p>

            <div>
              <a
                href="#order-section"
                class="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-lg sm:text-xl px-10 py-5 rounded-2xl shadow-2xl shadow-amber-500/30 transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.03]"
              >
                <span>🟢 এখনই অর্ডার করুন</span>
                <span class="font-black">→</span>
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Interactive Form Calculation & Order Handler Client Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
        (function() {
          function initFkOrder() {
            var form = document.getElementById('fk-order-form');
            if (!form) return;

            var unitPrice = 900;
            var districtSelect = document.getElementById('fk-district');
            var qtyRadios = document.querySelectorAll('.fk-qty-radio');
            var payRadios = document.querySelectorAll('.fk-pay-radio');

            var summaryQty = document.getElementById('fk-summary-qty');
            var summarySubtotal = document.getElementById('fk-summary-subtotal');
            var summaryDelivery = document.getElementById('fk-summary-delivery');
            var summaryTotal = document.getElementById('fk-summary-total');
            var submitText = document.getElementById('fk-submit-text');

            function calculateTotals() {
              var selectedQty = 1;
              qtyRadios.forEach(function(r) {
                if (r.checked) selectedQty = parseInt(r.value, 10) || 1;
              });

              var districtVal = districtSelect ? districtSelect.value : '';
              var deliveryCharge = (districtVal.indexOf('ঢাকা') !== -1 || districtVal.indexOf('Dhaka') !== -1) ? 60 : 120;

              var subtotal = unitPrice * selectedQty;
              var grandTotal = subtotal + deliveryCharge;

              if (summaryQty) summaryQty.textContent = selectedQty;
              if (summarySubtotal) summarySubtotal.textContent = '৳' + subtotal.toLocaleString('en-US');
              if (summaryDelivery) summaryDelivery.textContent = '৳' + deliveryCharge;
              if (summaryTotal) summaryTotal.textContent = '৳' + grandTotal.toLocaleString('en-US');

              // Radio label styling update
              document.querySelectorAll('.fk-qty-label').forEach(function(lbl) {
                var radio = lbl.querySelector('.fk-qty-radio');
                if (radio && radio.checked) {
                  lbl.classList.remove('border-slate-200', 'bg-white');
                  lbl.classList.add('border-sky-600', 'bg-sky-50');
                } else {
                  lbl.classList.remove('border-sky-600', 'bg-sky-50');
                  lbl.classList.add('border-slate-200', 'bg-white');
                }
              });

              document.querySelectorAll('.fk-pay-label').forEach(function(lbl) {
                var radio = lbl.querySelector('.fk-pay-radio');
                if (radio && radio.checked) {
                  lbl.classList.remove('border-slate-200', 'bg-white');
                  lbl.classList.add('border-sky-600', 'bg-sky-50');
                } else {
                  lbl.classList.remove('border-sky-600', 'bg-sky-50');
                  lbl.classList.add('border-slate-200', 'bg-white');
                }
              });

              // Submit button label update based on payment method
              var payMethod = 'cod';
              payRadios.forEach(function(p) { if (p.checked) payMethod = p.value; });
              if (submitText) {
                if (payMethod === 'eps') {
                  submitText.textContent = '# EPS-এ অনলাইন পে করুন (৳' + deliveryCharge + ' অগ্রিম) →';
                } else {
                  submitText.textContent = '# Cash on Delivery-তে অর্ডার করুন →';
                }
              }
            }

            if (districtSelect) districtSelect.addEventListener('change', calculateTotals);
            qtyRadios.forEach(function(r) { r.addEventListener('change', calculateTotals); });
            payRadios.forEach(function(r) { r.addEventListener('change', calculateTotals); });

            calculateTotals();

            // Handle Form Submission
            form.addEventListener('submit', function(e) {
              e.preventDefault();
              var submitBtn = document.getElementById('fk-submit-btn');
              if (submitBtn) submitBtn.disabled = true;

              var formData = new FormData(form);
              var name = formData.get('name');
              var phone = formData.get('phone');
              var district = formData.get('district');
              var address = formData.get('address');
              var quantity = parseInt(formData.get('quantity'), 10) || 1;
              var payMethod = formData.get('paymentMethod') || 'cod';

              var deliveryCharge = (district.indexOf('ঢাকা') !== -1 || district.indexOf('Dhaka') !== -1) ? 60 : 120;
              var productTotal = unitPrice * quantity;
              var grandTotal = productTotal + deliveryCharge;
              var orderId = 'OK-FK-' + Math.floor(10000 + Math.random() * 89999);

              var orderObj = {
                id: orderId,
                customerName: name,
                customerPhone: phone,
                district: district,
                area: district,
                address: address,
                items: [{
                  productId: 'p-focus-king',
                  productName: 'Focus King — 500g',
                  productImage: '/static/images/products/focus-king.jpg',
                  quantity: quantity,
                  unitPrice: unitPrice
                }],
                productTotal: productTotal,
                deliveryCharge: deliveryCharge,
                advancePaid: payMethod === 'eps' ? deliveryCharge : 0,
                dueOnDelivery: payMethod === 'eps' ? productTotal : grandTotal,
                totalAmount: grandTotal,
                status: 'pending',
                paymentStatus: payMethod === 'eps' ? 'pending_eps' : 'cod',
                createdAt: new Date().toISOString()
              };

              try {
                localStorage.setItem('offerkini_pending_order', JSON.stringify(orderObj));
                localStorage.setItem('offerkini_last_order', JSON.stringify(orderObj));
                var existing = JSON.parse(localStorage.getItem('offerkini_orders') || '[]');
                existing.unshift(orderObj);
                localStorage.setItem('offerkini_orders', JSON.stringify(existing));
              } catch(err) {}

              if (payMethod === 'eps') {
                // EPS Online Payment
                fetch('/api/eps/initiate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    orderId: orderId,
                    amount: deliveryCharge,
                    customerName: name,
                    customerPhone: phone,
                    district: district,
                    area: district,
                    address: address
                  })
                })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                  if (data && data.success && data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                  } else {
                    alert('EPS Payment Error: ' + ((data && data.error) || 'Could not connect to EPS'));
                    if (submitBtn) submitBtn.disabled = false;
                  }
                })
                .catch(function(err) {
                  alert('EPS Connection Error');
                  if (submitBtn) submitBtn.disabled = false;
                });
              } else {
                // Cash on Delivery
                window.location.href = '/order-success';
              }
            });
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initFkOrder);
          } else {
            initFkOrder();
          }
        })();
        `
      }} />
    </CustomerLayout>
  )
}
