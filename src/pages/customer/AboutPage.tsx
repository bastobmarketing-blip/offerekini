import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { StaticPageHeader } from '../../components/customer/StaticPageHeader'

export const AboutPage: FC = () => (
  <CustomerLayout title="OfferKini সম্পর্কে">
    <StaticPageHeader title="OfferKini সম্পর্কে" subtitle="True Price Commerce Platform — দাম কম, কথা পরিষ্কার।" icon="fa-circle-info" />

    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      <div>
        <h2 class="font-bold text-lg mb-2">আমাদের গল্প</h2>
        <p class="text-sm text-ok-gray-600 leading-relaxed">
          বাংলাদেশের ই-কমার্স মার্কেটে সাধারণত দাম বাড়িয়ে দেখিয়ে "ফেক ডিসকাউন্ট" দেওয়ার প্রবণতা লক্ষ্য করা যায়। OfferKini তৈরি হয়েছে এই সমস্যার সমাধান করতে —
          আমরা বিশ্বাস করি ক্রেতারা সত্যিকারের কম দাম এবং স্বচ্ছ মূল্য পাওয়ার যোগ্য।
        </p>
      </div>

      <div>
        <h2 class="font-bold text-lg mb-2">আমাদের লক্ষ্য</h2>
        <p class="text-sm text-ok-gray-600 leading-relaxed">
          OfferKini একটি True Price Commerce Platform, যেখানে merchant-রা সরাসরি সাশ্রয়ী মূল্যে পণ্য সরবরাহ করেন এবং গ্রাহকরা কোনো ধরনের বিভ্রান্তি ছাড়াই
          সঠিক দাম দেখতে পারেন।
        </p>
      </div>

      <div class="grid sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <i class="fas fa-tags text-2xl text-ok-green-800 mb-3"></i>
          <h3 class="font-bold text-sm mb-1">স্বচ্ছ মূল্য</h3>
          <p class="text-xs text-ok-gray-500">কোনো লুকানো শর্ত বা চার্জ নেই</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <i class="fas fa-handshake text-2xl text-ok-green-800 mb-3"></i>
          <h3 class="font-bold text-sm mb-1">বিশ্বাসযোগ্য মার্চেন্ট</h3>
          <p class="text-xs text-ok-gray-500">যাচাইকৃত ও নির্ভরযোগ্য সাপ্লায়ার</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <i class="fas fa-hand-holding-heart text-2xl text-ok-green-800 mb-3"></i>
          <h3 class="font-bold text-sm mb-1">গ্রাহক-কেন্দ্রিক</h3>
          <p class="text-xs text-ok-gray-500">প্রতিটি সিদ্ধান্ত গ্রাহকের ভালোর জন্য</p>
        </div>
      </div>

      <div class="bg-ok-green-50 rounded-2xl p-6 text-center">
        <p class="text-lg font-bold text-ok-green-900">"দাম কম, কথা পরিষ্কার।"</p>
        <p class="text-sm text-ok-gray-600 mt-2">এটাই আমাদের প্রতিশ্রুতি — প্রতিটি গ্রাহকের জন্য।</p>
      </div>
    </div>
  </CustomerLayout>
)
