import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { StaticPageHeader } from '../../components/customer/StaticPageHeader'
import { HowItWorksSteps } from '../../components/customer/HowItWorksSteps'
import { Button } from '../../components/ui/Button'

export const HowItWorksPage: FC = () => (
  <CustomerLayout title="কীভাবে কাজ করে" activeNav="how">
    <StaticPageHeader title="OfferKini কীভাবে কাজ করে" subtitle="সহজ, স্বচ্ছ এবং নিরাপদ কেনাকাটার প্রক্রিয়া" icon="fa-gears" />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <HowItWorksSteps />

      <div class="mt-12 bg-ok-green-900 text-white rounded-3xl p-6 sm:p-10">
        <h2 class="text-xl sm:text-2xl font-extrabold mb-4">ডেলিভারি চার্জ আগে কেন?</h2>
        <p class="text-white/75 text-sm sm:text-base leading-relaxed mb-4">
          OfferKini-তে অর্ডার করার সময় আপনাকে শুধু <strong class="text-ok-lime-400">ডেলিভারি চার্জ</strong> অগ্রিম পরিশোধ করতে হয়। পণ্যের সম্পূর্ণ মূল্য
          আপনি পণ্য হাতে পাওয়ার পর ক্যাশ অন ডেলিভারিতে পরিশোধ করবেন।
        </p>
        <p class="text-white/75 text-sm sm:text-base leading-relaxed mb-6">
          এই সিস্টেম Fake order কমাতে সাহায্য করে, যার ফলে merchant-দের অপ্রয়োজনীয় ক্ষতি কমে এবং আমরা সেই সাশ্রয় সরাসরি
          গ্রাহকের কাছে কম দামের মাধ্যমে পৌঁছে দিতে পারি।
        </p>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="bg-white/8 rounded-2xl p-4 border border-white/10">
            <i class="fas fa-wallet text-ok-lime-400 mb-2"></i>
            <p class="font-semibold text-sm">ডেলিভারি চার্জ আগে পরিশোধ করুন</p>
          </div>
          <div class="bg-white/8 rounded-2xl p-4 border border-white/10">
            <i class="fas fa-hand-holding-dollar text-ok-lime-400 mb-2"></i>
            <p class="font-semibold text-sm">বাকি টাকা পণ্য হাতে পাওয়ার সময়</p>
          </div>
        </div>
      </div>

      <div class="mt-10 text-center">
        <Button href="/products" size="lg">এখনই কেনাকাটা শুরু করুন <i class="fas fa-arrow-right ml-1"></i></Button>
      </div>
    </div>
  </CustomerLayout>
)
