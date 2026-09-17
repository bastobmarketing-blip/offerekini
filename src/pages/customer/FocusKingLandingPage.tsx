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
      <div class="bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden">
        
        {/* ===================================================================
            01. HERO SECTION
           =================================================================== */}
        <section class="relative bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 text-white py-12 lg:py-20 overflow-hidden">
          {/* Ambient Glow Effects */}
          <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-lime-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Text & Value Prop */}
              <div class="lg:col-span-7 text-center lg:text-left space-y-5">
                <div class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 border border-emerald-400/30 text-emerald-300 px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm">
                  <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  প্রতিদিন মাত্র ৳30 ইনভেস্ট করুন আপনার Focus Routine-এ।
                </div>

                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  Focus King <span class="text-lime-400">— 500g</span>
                </h1>

                <p class="text-emerald-100/90 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                  পড়াশোনা হোক বা কাজ—প্রতিদিনের <strong class="text-white">Focus, Energy & Productivity Routine</strong>-এর জন্য Daily Support।
                </p>

                {/* Feature Pills */}
                <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                  <span class="bg-white/10 backdrop-blur-md border border-white/15 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                    🧠 Focus Support
                  </span>
                  <span class="bg-white/10 backdrop-blur-md border border-white/15 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                    ⚡ Energy Support
                  </span>
                  <span class="bg-white/10 backdrop-blur-md border border-white/15 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                    🎯 Productivity Support
                  </span>
                </div>

                {/* Price & CTA */}
                <div class="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <div class="bg-emerald-900/60 border border-emerald-500/30 px-5 py-3 rounded-2xl text-center sm:text-left">
                    <div class="text-xs text-emerald-300 font-semibold">বিশেষ অফার প্রাইস</div>
                    <div class="flex items-baseline gap-2">
                      <span class="text-3xl font-extrabold text-white">৳900</span>
                      <span class="text-sm text-emerald-300/70 line-through">৳1,000</span>
                    </div>
                    <div class="text-[11px] text-lime-400 font-bold mt-0.5">প্রায় ৳30/day*</div>
                  </div>

                  <a
                    href="#order-section"
                    class="w-full sm:w-auto bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] text-center inline-flex items-center justify-center gap-2"
                  >
                    🟢 এখনই অর্ডার করুন →
                  </a>
                </div>

                <p class="text-[11px] text-emerald-300/60 italic">
                  *দৈনিক খরচ নির্ধারিত serving size-এর ওপর নির্ভরশীল।
                </p>
              </div>

              {/* Right Column: Visual Showcase */}
              <div class="lg:col-span-5 relative flex justify-center">
                <div class="relative w-full max-w-sm sm:max-w-md">
                  {/* Glowing background ring */}
                  <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-lime-400 rounded-3xl blur-2xl opacity-30 transform -rotate-3 scale-95"></div>

                  <div class="relative bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl text-center overflow-hidden">
                    <div class="absolute top-3 right-3 bg-lime-400 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      500g Tub
                    </div>

                    {/* Product Mockup Container */}
                    <div class="my-4 py-8 px-4 bg-gradient-to-b from-emerald-950 to-slate-950 rounded-2xl border border-emerald-800/40 flex flex-col items-center justify-center min-h-[260px] relative">
                      <div class="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full flex items-center justify-center shadow-inner relative group mb-3">
                        <i class="fas fa-brain text-5xl sm:text-6xl text-slate-950 transition-transform group-hover:scale-110"></i>
                        <span class="absolute -bottom-2 bg-slate-900 text-lime-400 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-lime-400/40">
                          FOCUS KING
                        </span>
                      </div>
                      <h3 class="text-xl font-black text-white mt-2">FOCUS KING</h3>
                      <p class="text-xs text-emerald-300 font-medium">Daily Productivity Formula (500g)</p>
                      
                      <div class="mt-4 flex items-center gap-3 text-[11px] text-emerald-200">
                        <span class="flex items-center gap-1"><i class="fas fa-check-circle text-lime-400"></i> 100% Support</span>
                        <span class="flex items-center gap-1"><i class="fas fa-truck-fast text-lime-400"></i> দ্রুত ডেলিভারি</span>
                      </div>
                    </div>

                    <div class="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-emerald-200">
                      <div class="bg-emerald-900/50 p-2 rounded-xl border border-emerald-700/30">
                        <i class="fas fa-fire-flame-curved text-lime-400 block text-base mb-1"></i> Energy
                      </div>
                      <div class="bg-emerald-900/50 p-2 rounded-xl border border-emerald-700/30">
                        <i class="fas fa-bullseye text-lime-400 block text-base mb-1"></i> Focus
                      </div>
                      <div class="bg-emerald-900/50 p-2 rounded-xl border border-emerald-700/30">
                        <i class="fas fa-bolt text-lime-400 block text-base mb-1"></i> Routine
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            02. WHY FOCUS KING? SECTION
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-white">
          <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                WHY FOCUS KING?
              </span>
              <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
                আপনার প্রতিদিনের Focus Routine-এর জন্য
              </h2>
              <p class="text-gray-600 text-sm sm:text-base">
                প্রতিদিনের পড়াশোনা বা কাজের পারফরম্যান্স সর্বোচ্চ রাখতে Focus King আপনার ডেইলি সাপোর্ট।
              </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Focus */}
              <div class="bg-gradient-to-b from-emerald-50/50 to-white border border-emerald-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div class="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-emerald-600/20">
                  🧠
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Focus</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  দৈনন্দিন Focus Routine-কে Support করতে।
                </p>
              </div>

              {/* Card 2: Energy */}
              <div class="bg-gradient-to-b from-lime-50/50 to-white border border-lime-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div class="w-14 h-14 rounded-2xl bg-lime-500 text-slate-950 flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-lime-500/20">
                  ⚡
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Energy</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Active ও Productive দিনের জন্য Daily Energy Support।
                </p>
              </div>

              {/* Card 3: Productivity */}
              <div class="bg-gradient-to-b from-teal-50/50 to-white border border-teal-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div class="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-teal-600/20">
                  🎯
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Productivity</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  পড়াশোনা ও কাজের Routine-এর সাথে ব্যবহার করার জন্য।
                </p>
              </div>

              {/* Card 4: Mental Clarity */}
              <div class="bg-gradient-to-b from-indigo-50/50 to-white border border-indigo-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-md shadow-indigo-600/20">
                  💡
                </div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">Mental Clarity</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  দৈনন্দিন Mental Performance Routine-কে Support করতে।
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            03. WHO IS IT FOR? (কার জন্য?) SECTION
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-lime-400 bg-lime-500/10 border border-lime-400/20 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                TARGET AUDIENCE
              </span>
              <h2 class="text-2xl sm:text-4xl font-extrabold text-white mt-3">
                Focus King আপনার জন্য, যদি—
              </h2>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Persona 1: Student */}
              <div class="bg-slate-800/80 border border-slate-700/70 p-5 rounded-2xl flex items-start gap-4 hover:border-emerald-500/50 transition-all">
                <span class="text-3xl p-2.5 rounded-xl bg-slate-700/50 shrink-0">📚</span>
                <div>
                  <h4 class="font-extrabold text-lg text-white">Student</h4>
                  <p class="text-emerald-300 text-sm mt-0.5">পড়াশোনায় Focus ধরে রাখতে চান</p>
                </div>
              </div>

              {/* Persona 2: Freelancer */}
              <div class="bg-slate-800/80 border border-slate-700/70 p-5 rounded-2xl flex items-start gap-4 hover:border-emerald-500/50 transition-all">
                <span class="text-3xl p-2.5 rounded-xl bg-slate-700/50 shrink-0">💻</span>
                <div>
                  <h4 class="font-extrabold text-lg text-white">Freelancer</h4>
                  <p class="text-emerald-300 text-sm mt-0.5">দীর্ঘ সময় কাজ করেন</p>
                </div>
              </div>

              {/* Persona 3: Entrepreneur */}
              <div class="bg-slate-800/80 border border-slate-700/70 p-5 rounded-2xl flex items-start gap-4 hover:border-emerald-500/50 transition-all">
                <span class="text-3xl p-2.5 rounded-xl bg-slate-700/50 shrink-0">👨‍💼</span>
                <div>
                  <h4 class="font-extrabold text-lg text-white">Entrepreneur</h4>
                  <p class="text-emerald-300 text-sm mt-0.5">Business নিয়ে ব্যস্ত থাকেন</p>
                </div>
              </div>

              {/* Persona 4: Content Creator */}
              <div class="bg-slate-800/80 border border-slate-700/70 p-5 rounded-2xl flex items-start gap-4 hover:border-emerald-500/50 transition-all">
                <span class="text-3xl p-2.5 rounded-xl bg-slate-700/50 shrink-0">🎨</span>
                <div>
                  <h4 class="font-extrabold text-lg text-white">Content Creator</h4>
                  <p class="text-emerald-300 text-sm mt-0.5">নিয়মিত Creative Work করেন</p>
                </div>
              </div>

              {/* Persona 5: Professional */}
              <div class="bg-slate-800/80 border border-slate-700/70 p-5 rounded-2xl flex items-start gap-4 hover:border-emerald-500/50 transition-all sm:col-span-2 lg:col-span-1">
                <span class="text-3xl p-2.5 rounded-xl bg-slate-700/50 shrink-0">🧑‍💻</span>
                <div>
                  <h4 class="font-extrabold text-lg text-white">Professional</h4>
                  <p class="text-emerald-300 text-sm mt-0.5">প্রতিদিন অনেক কাজ সামলান</p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            04. 500g = প্রায় ৳30/day VALUE BREAKDOWN SECTION
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-gradient-to-b from-emerald-50 to-white">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            
            <div class="bg-white border-2 border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div class="inline-block bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                DAILY VALUE CALCULATION
              </div>

              <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                একদিনের জন্য নয়—Daily Routine-এর জন্য।
              </h2>

              {/* Price Highlight Banner */}
              <div class="my-6 py-6 px-4 bg-gradient-to-r from-emerald-950 via-green-900 to-slate-950 text-white rounded-2xl shadow-inner max-w-xl mx-auto">
                <p class="text-xs text-emerald-300 font-bold uppercase">500g Focus King</p>
                <div class="text-4xl sm:text-5xl font-black text-lime-400 my-1">
                  ৳900
                </div>
                <div class="inline-block bg-lime-400 text-slate-950 font-extrabold text-sm sm:text-base px-4 py-1 rounded-full">
                  প্রায় ৳30 / Day
                </div>
              </div>

              <p class="text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
                এক কাপ চা/কফির খরচের কাছাকাছি বাজেটে আপনার Daily Focus & Productivity Routine-এ একটি নতুন Support যোগ করুন।
              </p>

              <a
                href="#order-section"
                class="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg shadow-emerald-700/25 transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                🟢 Focus King অর্ডার করুন →
              </a>
            </div>

          </div>
        </section>


        {/* ===================================================================
            05. CUSTOMER REVIEW & PROOF SECTION
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-white">
          <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                CUSTOMER REVIEWS
              </span>
              <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                যারা ব্যবহার করেছেন, তারা কী বলছেন?
              </h2>
            </div>

            {/* 3 Real Customer Review Cards */}
            <div class="grid md:grid-cols-3 gap-6 mb-12">
              
              {/* Review 1 */}
              <div class="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div class="flex text-amber-400 text-sm mb-3">
                    ★★★★★
                  </div>
                  <p class="text-gray-700 text-sm leading-relaxed italic mb-4">
                    “পড়াশোনায় এবং দীর্ঘ সময় ল্যাপটপে কাজ করার সময় ফোকাস ধরে রাখতে Focus King অসাধারণ কাজ করছে। ডেলি ডেইলি রুটিনে এটি খুব হেল্পফুল।”
                  </p>
                </div>
                <div class="pt-3 border-t border-gray-200/60 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    ত
                  </div>
                  <div>
                    <h5 class="font-bold text-slate-900 text-sm">তানভীর আহমেদ</h5>
                    <p class="text-xs text-gray-500">Student</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div class="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div class="flex text-amber-400 text-sm mb-3">
                    ★★★★★
                  </div>
                  <p class="text-gray-700 text-sm leading-relaxed italic mb-4">
                    “ফ্রিল্যান্সিংয়ের লেট নাইট শিফটে এনার্জি ও মেন্টাল ক্লারিটি বজায় রাখতে আমি প্রতিদিন এটি ব্যবহার করি। বাজেটের দিক থেকেও অনেক সাশ্রয়ী।”
                  </p>
                </div>
                <div class="pt-3 border-t border-gray-200/60 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    শ
                  </div>
                  <div>
                    <h5 class="font-bold text-slate-900 text-sm">শরিফুল ইসলাম</h5>
                    <p class="text-xs text-gray-500">Freelancer</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div class="bg-gray-50 border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div class="flex text-amber-400 text-sm mb-3">
                    ★★★★★
                  </div>
                  <p class="text-gray-700 text-sm leading-relaxed italic mb-4">
                    “বিজনেস এবং প্রতিদিনের কাজের প্রেসারে উৎপাদনশীলতা ধরে রাখতে এটি এখন আমার ডেইলি রুটিনের অংশ। দ্রুত ডেলিভারিও পেয়েছি।”
                  </p>
                </div>
                <div class="pt-3 border-t border-gray-200/60 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    ম
                  </div>
                  <div>
                    <h5 class="font-bold text-slate-900 text-sm">মাহমুদুল হাসান</h5>
                    <p class="text-xs text-gray-500">Entrepreneur</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Real Video Reviews Placeholder Cards */}
            <div class="mt-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
              <h3 class="text-lg sm:text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                <i class="fas fa-video text-lime-400"></i> কাস্টমার ভিডিও রিভিউ (Real Video Reviews)
              </h3>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Video Card 1 */}
                <div class="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 group relative">
                  <div class="aspect-video bg-slate-950 flex flex-col items-center justify-center relative p-4 text-center">
                    <div class="w-12 h-12 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center text-xl shadow-lg transition-transform group-hover:scale-110">
                      <i class="fas fa-play ml-1"></i>
                    </div>
                    <span class="text-xs text-emerald-300 font-semibold mt-3">কাস্টমার অভিজ্ঞতা ভিডিও ১</span>
                  </div>
                  <div class="p-3 bg-slate-800/90 text-xs text-gray-300 font-medium">
                    "Focus King ব্যবহারের অভিজ্ঞতা ও ডেইলি রুটিন সাপোর্ট"
                  </div>
                </div>

                {/* Video Card 2 */}
                <div class="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 group relative">
                  <div class="aspect-video bg-slate-950 flex flex-col items-center justify-center relative p-4 text-center">
                    <div class="w-12 h-12 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center text-xl shadow-lg transition-transform group-hover:scale-110">
                      <i class="fas fa-play ml-1"></i>
                    </div>
                    <span class="text-xs text-emerald-300 font-semibold mt-3">কাস্টমার অভিজ্ঞতা ভিডিও ২</span>
                  </div>
                  <div class="p-3 bg-slate-800/90 text-xs text-gray-300 font-medium">
                    "পড়াশোনায় ফোকাস ধরে রাখার রিয়েল অভিজ্ঞতা"
                  </div>
                </div>

                {/* Video Card 3 */}
                <div class="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 group relative sm:col-span-2 lg:col-span-1">
                  <div class="aspect-video bg-slate-950 flex flex-col items-center justify-center relative p-4 text-center">
                    <div class="w-12 h-12 rounded-full bg-lime-400 text-slate-950 flex items-center justify-center text-xl shadow-lg transition-transform group-hover:scale-110">
                      <i class="fas fa-play ml-1"></i>
                    </div>
                    <span class="text-xs text-emerald-300 font-semibold mt-3">কাস্টমার অভিজ্ঞতা ভিডিও ৩</span>
                  </div>
                  <div class="p-3 bg-slate-800/90 text-xs text-gray-300 font-medium">
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
        <section id="order-section" class="py-14 sm:py-20 bg-gradient-to-b from-slate-900 to-emerald-950 text-white">
          <div class="max-w-5xl mx-auto px-4 sm:px-6">
            
            <div class="text-center max-w-2xl mx-auto mb-10">
              <span class="bg-lime-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                SPECIAL OFFER & CHECKOUT
              </span>
              <h2 class="text-2xl sm:text-4xl font-extrabold text-white mt-3 mb-2">
                আপনার Daily Focus Routine শুরু করুন
              </h2>
              <p class="text-emerald-200/80 text-sm sm:text-base">
                নিচের ফর্মে সঠিক তথ্য দিয়ে ক্যাশ অন ডেলিভারিতে অর্ডার সম্পন্ন করুন।
              </p>
            </div>

            <div class="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Box: Product Summary */}
              <div class="lg:col-span-5 bg-slate-800/90 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-6">
                <div>
                  <span class="text-xs text-lime-400 font-bold uppercase tracking-wider">প্যাকেজ ডিটেইলস</span>
                  <h3 class="text-2xl font-black text-white mt-1">FOCUS KING</h3>
                  <p class="text-emerald-300 text-sm font-semibold">Net Weight: 500g</p>
                </div>

                <div class="bg-slate-900/80 p-4 rounded-2xl border border-emerald-800/40 flex items-center justify-between">
                  <div>
                    <span class="text-xs text-gray-400 block">মূল্য</span>
                    <span class="text-2xl font-black text-lime-400">৳900</span>
                    <span class="text-xs text-gray-400 line-through ml-2">৳1,000</span>
                  </div>
                  <span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full">
                    ১০% ছাড়
                  </span>
                </div>

                <div>
                  <h4 class="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">আপনি পাচ্ছেন:</h4>
                  <ul class="space-y-2.5 text-sm text-emerald-100">
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check-circle text-lime-400"></i>
                      <span><strong>500g Focus King</strong></span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check-circle text-lime-400"></i>
                      <span>Daily Focus Support</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check-circle text-lime-400"></i>
                      <span>Energy Support</span>
                    </li>
                    <li class="flex items-center gap-2">
                      <i class="fas fa-check-circle text-lime-400"></i>
                      <span>Productivity Support</span>
                    </li>
                  </ul>
                </div>

                <div class="pt-3 border-t border-slate-700/60">
                  <div class="bg-emerald-900/40 border border-emerald-600/30 rounded-xl p-3 text-xs text-emerald-200 flex items-center gap-2.5">
                    <i class="fas fa-hand-holding-dollar text-lime-400 text-lg"></i>
                    <span><strong>Cash on Delivery Available:</strong> পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা রয়েছে।</span>
                  </div>
                </div>
              </div>

              {/* Right Box: Order Form */}
              <div class="lg:col-span-7 bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
                <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <i class="fas fa-cart-shopping text-emerald-700"></i> 🛒 ORDER NOW (অর্ডার ফর্ম)
                </h3>

                <form id="fk-order-form" class="space-y-4">
                  {/* Name */}
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">
                      আপনার নাম <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="আপনার পুরো নাম লিখুন"
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">
                      মোবাইল নম্বর <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="01XXXXXXXXX"
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                  </div>

                  {/* District */}
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">
                      জেলা নির্বাচন করুন <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="fk-district"
                      name="district"
                      required
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                    >
                      {DISTRICTS.map((d) => (
                        <option value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">
                      সম্পূর্ণ ঠিকানা <span class="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      required
                      placeholder="বাড়ি/রোড নম্বর, এলাকা ও বিস্তারিত ঠিকানা লিখুন"
                      class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    ></textarea>
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">
                      পরিমাণ (Quantity)
                    </label>
                    <div class="grid grid-cols-3 gap-3">
                      <label class="fk-qty-label border-2 border-emerald-600 bg-emerald-50 rounded-xl p-2.5 text-center cursor-pointer transition-all">
                        <input type="radio" name="quantity" value="1" checked class="hidden fk-qty-radio" />
                        <span class="block text-xs font-bold text-gray-600">১টি জাড়</span>
                        <span class="block text-sm font-black text-emerald-800">৳900</span>
                      </label>
                      <label class="fk-qty-label border-2 border-gray-200 bg-white rounded-xl p-2.5 text-center cursor-pointer transition-all hover:border-gray-300">
                        <input type="radio" name="quantity" value="2" class="hidden fk-qty-radio" />
                        <span class="block text-xs font-bold text-gray-600">২টি জাড়</span>
                        <span class="block text-sm font-black text-emerald-800">৳1,800</span>
                      </label>
                      <label class="fk-qty-label border-2 border-gray-200 bg-white rounded-xl p-2.5 text-center cursor-pointer transition-all hover:border-gray-300">
                        <input type="radio" name="quantity" value="3" class="hidden fk-qty-radio" />
                        <span class="block text-xs font-bold text-gray-600">৩টি জাড়</span>
                        <span class="block text-sm font-black text-emerald-800">৳2,700</span>
                      </label>
                    </div>
                  </div>

                  {/* Payment Method Option */}
                  <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">
                      পেমেন্ট পদ্ধতি
                    </label>
                    <div class="grid grid-cols-2 gap-3">
                      <label class="fk-pay-label border-2 border-emerald-600 bg-emerald-50 rounded-xl p-3 text-center cursor-pointer transition-all">
                        <input type="radio" name="paymentMethod" value="cod" checked class="hidden fk-pay-radio" />
                        <span class="block text-xs font-bold text-emerald-900"><i class="fas fa-truck-ramp-box mr-1"></i> ক্যাশ অন ডেলিভারি</span>
                      </label>
                      <label class="fk-pay-label border-2 border-gray-200 bg-white rounded-xl p-3 text-center cursor-pointer transition-all hover:border-gray-300">
                        <input type="radio" name="paymentMethod" value="eps" class="hidden fk-pay-radio" />
                        <span class="block text-xs font-bold text-blue-900"><i class="fas fa-shield-halved mr-1"></i> EPS অনলাইন পেমেন্ট</span>
                      </label>
                    </div>
                  </div>

                  {/* Price Calculation Summary */}
                  <div class="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 text-xs sm:text-sm">
                    <div class="flex justify-between text-gray-600">
                      <span>পণ্যের দাম (<span id="fk-summary-qty">1</span>টি Focus King 500g):</span>
                      <span id="fk-summary-subtotal" class="font-bold text-gray-900">৳900</span>
                    </div>
                    <div class="flex justify-between text-gray-600">
                      <span>ডেলিভারি চার্জ:</span>
                      <span id="fk-summary-delivery" class="font-bold text-emerald-700">৳60</span>
                    </div>
                    <div class="h-px bg-gray-200 my-1"></div>
                    <div class="flex justify-between text-sm sm:text-base font-extrabold text-slate-900">
                      <span>সর্বমোট টাকা:</span>
                      <span id="fk-summary-total" class="text-emerald-700 text-lg">৳960</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="fk-submit-btn"
                    class="w-full bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white font-black text-base sm:text-lg py-4 rounded-xl shadow-lg shadow-emerald-700/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span id="fk-submit-text"># Cash on Delivery-তে অর্ডার করুন →</span>
                  </button>

                  <p class="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5">
                    <i class="fas fa-lock text-emerald-600"></i> আপনার তথ্য সম্পূর্ণ নিরাপদ থাকবে।
                  </p>
                </form>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            07. FAQ SECTION
           =================================================================== */}
        <section class="py-14 sm:py-20 bg-white">
          <div class="max-w-4xl mx-auto px-4 sm:px-6">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                সাধারণ জিজ্ঞাসা (FAQ)
              </h2>
            </div>

            <div class="space-y-4">
              
              {/* FAQ 1 */}
              <div class="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 hover:bg-white transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">?</span>
                  Focus King কী?
                </h4>
                <p class="text-gray-600 text-sm mt-2 pl-8 leading-relaxed">
                  Focus King হলো Daily Focus & Productivity Support-এর জন্য তৈরি 500g-এর একটি প্রিমিয়াম প্রোডাক্ট, যা আপনার প্রতিদিনের পড়ালেখা ও কাজের একাগ্রতা ধরে রাখতে সাহায্য করে।
                </p>
              </div>

              {/* FAQ 2 */}
              <div class="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 hover:bg-white transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">?</span>
                  Focus King-এর দাম কত?
                </h4>
                <p class="text-gray-600 text-sm mt-2 pl-8 leading-relaxed">
                  500g-এর জন্য বিশেষ অফার মূল্য <strong>৳900</strong> (নিয়মিত মূল্য ৳1,000)।
                </p>
              </div>

              {/* FAQ 3 */}
              <div class="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 hover:bg-white transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">?</span>
                  প্রতিদিন কত খরচ হবে?
                </h4>
                <p class="text-gray-600 text-sm mt-2 pl-8 leading-relaxed">
                  প্রায় <strong>৳30/day</strong>, যদি নির্ধারিত serving হিসাব অনুযায়ী ৩০ দিনের ব্যবহার হয়।
                </p>
              </div>

              {/* FAQ 4 */}
              <div class="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 hover:bg-white transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">?</span>
                  কারা ব্যবহার করতে পারেন?
                </h4>
                <p class="text-gray-600 text-sm mt-2 pl-8 leading-relaxed">
                  স্টুডেন্ট, ফ্রিল্যান্সার, উদ্যোক্তা, কনটেন্ট ক্রিয়েটর ও পেশাজীবী যে কেউ তাদের প্রতিদিনের রুটিনে এটি ব্যবহার করতে পারেন।
                </p>
              </div>

              {/* FAQ 5 */}
              <div class="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 hover:bg-white transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">?</span>
                  কীভাবে ব্যবহার করবো?
                </h4>
                <p class="text-gray-600 text-sm mt-2 pl-8 leading-relaxed">
                  Product packaging-এর গায়ে লেখা সহজ নির্দেশনা অনুযায়ী প্রতিদিন নির্দিষ্ট পরিমাণে গ্রহণ করুন।
                </p>
              </div>

              {/* FAQ 6 */}
              <div class="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 hover:bg-white transition-all">
                <h4 class="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">?</span>
                  Cash on Delivery আছে?
                </h4>
                <p class="text-gray-600 text-sm mt-2 pl-8 leading-relaxed">
                  হ্যাঁ! পুরো বাংলাদেশে ক্যাশ অন ডেলিভারিতে অর্ডার করার সুবিধা রয়েছে। পণ্য হাতে পেয়ে মুল্য পরিশোধ করতে পারবেন।
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* ===================================================================
            08. FINAL CTA SECTION
           =================================================================== */}
        <section class="py-16 sm:py-24 bg-gradient-to-br from-emerald-950 via-green-900 to-slate-950 text-white text-center relative overflow-hidden">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
            <h2 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Focus-এর জন্য অপেক্ষা নয়,<br />
              <span class="text-lime-400">নিজের Daily Routine-এ Invest করুন।</span>
            </h2>

            <p class="text-emerald-200 text-lg sm:text-xl font-bold">
              Focus King — 500g | ৳900
            </p>

            <div>
              <a
                href="#order-section"
                class="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 font-black text-lg sm:text-xl px-10 py-5 rounded-2xl shadow-2xl shadow-emerald-500/30 transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.03]"
              >
                🟢 এখনই অর্ডার করুন →
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
                  lbl.classList.remove('border-gray-200', 'bg-white');
                  lbl.classList.add('border-emerald-600', 'bg-emerald-50');
                } else {
                  lbl.classList.remove('border-emerald-600', 'bg-emerald-50');
                  lbl.classList.add('border-gray-200', 'bg-white');
                }
              });

              document.querySelectorAll('.fk-pay-label').forEach(function(lbl) {
                var radio = lbl.querySelector('.fk-pay-radio');
                if (radio && radio.checked) {
                  lbl.classList.remove('border-gray-200', 'bg-white');
                  lbl.classList.add('border-emerald-600', 'bg-emerald-50');
                } else {
                  lbl.classList.remove('border-emerald-600', 'bg-emerald-50');
                  lbl.classList.add('border-gray-200', 'bg-white');
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
