import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { ProductCard } from '../../components/ProductCard'
import { CategoryCard } from '../../components/CategoryCard'
import { HowItWorksSteps } from '../../components/customer/HowItWorksSteps'
import { Button } from '../../components/ui/Button'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { categories } from '../../data/categories'
import {
  getTodaysBestDeals,
  getTruePriceProducts,
  getFeaturedProducts,
  getNewArrivals
} from '../../data/products'
import { HOW_IT_WORKS_VIDEO_ID, HOW_IT_WORKS_VIDEO_TITLE } from '../../data/site'

export const HomePage: FC = () => {
  const bestDeals = getTodaysBestDeals()
  const truePriceProducts = getTruePriceProducts().slice(0, 4)
  const featured = getFeaturedProducts()
  const newArrivals = getNewArrivals()

  return (
    <CustomerLayout title="দাম কম, কথা পরিষ্কার" activeNav="deals" activeMobileNav="home">
      {/* ============================= HERO ============================= */}
      <section class="relative bg-ok-green-900 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 grid lg:grid-cols-2 gap-8 items-center">
          <div class="text-white relative z-10 text-center lg:text-left">
            <span class="inline-flex items-center gap-2 bg-ok-lime-500/15 text-ok-lime-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              <i class="fas fa-shield-halved"></i> True Price Commerce Platform
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              offerekini.com এখানে <span class="text-ok-lime-400">দাম অনেক কম</span>
            </h1>
            <p class="text-white/75 text-sm sm:text-base leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
              Fake Discount নয়। সত্যিকারের কম দামে পণ্য। offerekini.com-এ প্রতিটি দাম স্বচ্ছ, প্রতিটি অফার সত্যি।
            </p>
            <div class="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <Button href="#todays-deals" size="lg" variant="secondary" className="w-full sm:w-auto">
                আজকের সেরা ডিল দেখুন <i class="fas fa-arrow-right ml-1"></i>
              </Button>
              <Button href="/how-it-works" size="lg" variant="outline" className="w-full sm:w-auto !bg-transparent !text-white !border-white/40 hover:!bg-white/10">
                কীভাবে কাজ করে?
              </Button>
            </div>

            <div class="flex items-center justify-center lg:justify-start gap-6 mt-8 text-white/70 text-xs">
              <div class="flex items-center gap-2"><i class="fas fa-circle-check text-ok-lime-400"></i> স্বচ্ছ মূল্য</div>
              <div class="flex items-center gap-2"><i class="fas fa-circle-check text-ok-lime-400"></i> নিরাপদ অর্ডার</div>
              <div class="flex items-center gap-2"><i class="fas fa-circle-check text-ok-lime-400"></i> ক্যাশ অন ডেলিভারি</div>
            </div>
          </div>

          <div class="relative">
            <YouTubeEmbed videoId={HOW_IT_WORKS_VIDEO_ID} title={HOW_IT_WORKS_VIDEO_TITLE} />
          </div>
        </div>
        <div class="absolute -bottom-10 -left-10 w-64 h-64 bg-ok-lime-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* ======================= TODAY'S BEST DEALS ======================= */}
      <section id="todays-deals" class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div class="flex items-end justify-between mb-6">
          <div>
            <h2 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
              <i class="fas fa-fire text-ok-red"></i> আজকের সেরা ডিল
            </h2>
            <p class="text-ok-gray-500 text-sm mt-1">আজকের নির্বাচিত True Price Deals</p>
          </div>
          <a href="/products" class="text-ok-green-800 font-semibold text-sm whitespace-nowrap hidden sm:block">
            সব দেখুন <i class="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {bestDeals.map((p) => (
            <ProductCard product={p} />
          ))}
        </div>
        <a href="/products" class="mt-6 block sm:hidden text-center text-ok-green-800 font-semibold text-sm">
          সব দেখুন <i class="fas fa-arrow-right ml-1"></i>
        </a>
      </section>

      {/* ============================ CATEGORIES ============================ */}
      <section class="bg-white py-10 sm:py-14">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 class="text-xl sm:text-2xl font-extrabold mb-6">ক্যাটাগরি ঘুরে দেখুন</h2>
          <div class="flex gap-4 sm:gap-6 overflow-x-auto ok-scroll-x pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-start">
            {categories.map((c) => (
              <CategoryCard category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================= TRUE PRICE SECTION ========================= */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div class="bg-ok-green-50 rounded-3xl p-5 sm:p-8 lg:p-10">
          <div class="flex items-start sm:items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <span class="inline-flex items-center gap-1.5 bg-ok-green-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <i class="fas fa-tag"></i> True Price Deals
              </span>
              <h2 class="text-xl sm:text-2xl font-extrabold">দাম বাড়িয়ে Fake Discount নয়</h2>
              <p class="text-ok-gray-600 text-sm mt-1 max-w-xl">
                আমরা চেষ্টা করি সরাসরি কম দামে পণ্য দিতে — কোনো লুকানো শর্ত ছাড়াই।
              </p>
            </div>
            <a href="/products?filter=true_price" class="text-ok-green-800 font-semibold text-sm whitespace-nowrap">
              সব True Price পণ্য <i class="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {truePriceProducts.map((p) => (
              <ProductCard product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FEATURED PRODUCTS ========================= */}
      <section class="bg-white py-10 sm:py-14">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="flex items-end justify-between mb-6">
            <h2 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
              <i class="fas fa-star text-ok-lime-500"></i> Featured Products
            </h2>
            <a href="/products" class="text-ok-green-800 font-semibold text-sm hidden sm:block">সব দেখুন</a>
          </div>
          <div class="flex gap-4 overflow-x-auto ok-scroll-x pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {featured.map((p) => (
              <div class="w-[180px] sm:w-[220px] shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== NEW ARRIVALS ========================== */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div class="flex items-end justify-between mb-6">
          <h2 class="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
            <i class="fas fa-sparkles text-blue-600"></i> নতুন পণ্য
          </h2>
          <a href="/products" class="text-ok-green-800 font-semibold text-sm hidden sm:block">সব দেখুন</a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {newArrivals.map((p) => (
            <ProductCard product={p} />
          ))}
        </div>
      </section>

      {/* ========================== HOW IT WORKS ========================== */}
      <section class="bg-white py-10 sm:py-14">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center mb-8">
            <h2 class="text-xl sm:text-2xl font-extrabold mb-2">OfferKini কীভাবে কাজ করে</h2>
            <p class="text-ok-gray-500 text-sm">চারটি সহজ ধাপে আপনার অর্ডার সম্পন্ন হবে</p>
          </div>
          <HowItWorksSteps />
        </div>
      </section>

      {/* ===================== WHY DELIVERY ADVANCE ===================== */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div class="bg-ok-green-900 rounded-3xl p-6 sm:p-10 lg:p-14 text-white grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <span class="inline-flex items-center gap-1.5 bg-white/10 text-ok-lime-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
              <i class="fas fa-circle-info"></i> স্বচ্ছতার প্রতিশ্রুতি
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold mb-4 leading-snug">ডেলিভারি চার্জ আগে কেন?</h2>
            <p class="text-white/75 text-sm sm:text-base leading-relaxed mb-6">
              Fake order কমাতে এবং পণ্যের দাম কম রাখতে OfferKini-তে delivery charge আগে পরিশোধ করতে হয়।
              বাকি টাকা পণ্য হাতে পাওয়ার সময় পরিশোধ করবেন।
            </p>
            <a href="/how-it-works" class="inline-flex items-center gap-2 text-ok-lime-400 font-semibold text-sm">
              বিস্তারিত জানুন <i class="fas fa-arrow-right"></i>
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-white/8 rounded-2xl p-5 border border-white/10">
              <i class="fas fa-shield-halved text-ok-lime-400 text-2xl mb-3"></i>
              <h4 class="font-bold mb-1">ডেলিভারি চার্জ আগে পরিশোধ করুন</h4>
              <p class="text-white/60 text-xs leading-relaxed">চেকআউটের সময় ছোট একটি অগ্রিম পরিশোধ করে অর্ডার নিশ্চিত করুন।</p>
            </div>
            <div class="bg-white/8 rounded-2xl p-5 border border-white/10">
              <i class="fas fa-hand-holding-dollar text-ok-lime-400 text-2xl mb-3"></i>
              <h4 class="font-bold mb-1">বাকি টাকা পণ্য হাতে পাওয়ার সময়</h4>
              <p class="text-white/60 text-xs leading-relaxed">পণ্যের সম্পূর্ণ মূল্য ক্যাশ অন ডেলিভারিতে পরিশোধ করবেন।</p>
            </div>
            <div class="bg-white/8 rounded-2xl p-5 border border-white/10">
              <i class="fas fa-ban text-ok-lime-400 text-2xl mb-3"></i>
              <h4 class="font-bold mb-1">কম Fake Order</h4>
              <p class="text-white/60 text-xs leading-relaxed">এই সিস্টেম অপ্রয়োজনীয় অর্ডার কমিয়ে দেয়, ফলে পণ্যের দাম কম রাখা সম্ভব হয়।</p>
            </div>
            <div class="bg-white/8 rounded-2xl p-5 border border-white/10">
              <i class="fas fa-coins text-ok-lime-400 text-2xl mb-3"></i>
              <h4 class="font-bold mb-1">সবার জন্য কম দাম</h4>
              <p class="text-white/60 text-xs leading-relaxed">Fake order কমলে merchant-দের লস কমে, আর সেই সাশ্রয় আপনার কাছে পৌঁছায় কম দামে।</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ TRUST SECTION ============================ */}
      <section class="bg-white py-10 sm:py-14">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div class="p-4">
              <i class="fas fa-tags text-ok-green-800 text-2xl sm:text-3xl mb-3"></i>
              <h4 class="font-bold text-sm sm:text-base mb-1">স্বচ্ছ মূল্য</h4>
              <p class="text-xs text-ok-gray-500">কোনো লুকানো চার্জ নেই</p>
            </div>
            <div class="p-4">
              <i class="fas fa-ban text-ok-green-800 text-2xl sm:text-3xl mb-3"></i>
              <h4 class="font-bold text-sm sm:text-base mb-1">Fake Discount নয়</h4>
              <p class="text-xs text-ok-gray-500">দাম বাড়িয়ে দেখানো হয় না</p>
            </div>
            <div class="p-4">
              <i class="fas fa-truck text-ok-green-800 text-2xl sm:text-3xl mb-3"></i>
              <h4 class="font-bold text-sm sm:text-base mb-1">নিরাপদ ডেলিভারি</h4>
              <p class="text-xs text-ok-gray-500">সারা বাংলাদেশে ডেলিভারি</p>
            </div>
            <div class="p-4">
              <i class="fas fa-money-bill-wave text-ok-green-800 text-2xl sm:text-3xl mb-3"></i>
              <h4 class="font-bold text-sm sm:text-base mb-1">ক্যাশ অন ডেলিভারি</h4>
              <p class="text-xs text-ok-gray-500">পণ্য হাতে পেয়ে বাকি টাকা দিন</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================ CTA ================================ */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div class="bg-ok-lime-500 rounded-3xl p-8 sm:p-12 text-center">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-ok-green-900 mb-3">আজই সাশ্রয় শুরু করুন</h2>
          <p class="text-ok-green-900/70 text-sm sm:text-base mb-6 max-w-lg mx-auto">
            হাজারো সত্যিকারের কম দামের পণ্য এখন আপনার হাতের নাগালে।
          </p>
          <Button href="/products" size="lg" variant="primary">
            সব পণ্য দেখুন <i class="fas fa-arrow-right ml-1"></i>
          </Button>
        </div>
      </section>
    </CustomerLayout>
  )
}
