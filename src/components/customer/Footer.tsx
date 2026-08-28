import type { FC } from 'hono/jsx'

export const Footer: FC = () => (
  <footer class="bg-ok-green-900 text-white mt-12">
    <div class="max-w-7xl mx-auto px-4 py-10 sm:py-14">
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div class="col-span-2 lg:col-span-2">
          <img src="/static/images/brand/offerkini-logo.svg" alt="OfferKini" class="h-8 mb-4" />
          <p class="text-sm text-white/70 leading-relaxed max-w-xs">
            OfferKini একটি True Price Commerce প্ল্যাটফর্ম — যেখানে ফেক ডিসকাউন্ট নয়, সত্যিকারের কম দামে পণ্য পাওয়া যায়।
          </p>
          <div class="flex items-center gap-3 mt-5">
            <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-ok-lime-500 hover:text-ok-green-900 flex items-center justify-center transition-colors"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-ok-lime-500 hover:text-ok-green-900 flex items-center justify-center transition-colors"><i class="fab fa-instagram"></i></a>
            <a href="#" class="w-9 h-9 rounded-full bg-white/10 hover:bg-ok-lime-500 hover:text-ok-green-900 flex items-center justify-center transition-colors"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-4 text-sm">OfferKini</h4>
          <ul class="space-y-2.5 text-sm text-white/70">
            <li><a href="/about" class="hover:text-ok-lime-400">আমাদের সম্পর্কে</a></li>
            <li><a href="/how-it-works" class="hover:text-ok-lime-400">কীভাবে কাজ করে</a></li>
            <li><a href="/contact" class="hover:text-ok-lime-400">যোগাযোগ</a></li>
            <li><a href="/merchant/login" class="hover:text-ok-lime-400">মার্চেন্ট হোন</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-4 text-sm">সহায়তা</h4>
          <ul class="space-y-2.5 text-sm text-white/70">
            <li><a href="/track-order" class="hover:text-ok-lime-400">অর্ডার ট্র্যাক করুন</a></li>
            <li><a href="/delivery-policy" class="hover:text-ok-lime-400">ডেলিভারি পলিসি</a></li>
            <li><a href="/return-policy" class="hover:text-ok-lime-400">রিটার্ন পলিসি</a></li>
            <li><a href="/terms" class="hover:text-ok-lime-400">শর্তাবলী</a></li>
            <li><a href="/privacy" class="hover:text-ok-lime-400">প্রাইভেসি পলিসি</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-4 text-sm">যোগাযোগ করুন</h4>
          <ul class="space-y-2.5 text-sm text-white/70">
            <li class="flex items-center gap-2"><i class="fas fa-phone text-ok-lime-400"></i> ১৬XXX (হটলাইন)</li>
            <li class="flex items-center gap-2"><i class="fas fa-envelope text-ok-lime-400"></i> support@offerkini.com</li>
            <li class="flex items-center gap-2"><i class="fas fa-location-dot text-ok-lime-400"></i> ঢাকা, বাংলাদেশ</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <p>© 2026 OfferKini.com — সর্বস্বত্ব সংরক্ষিত।</p>
        <p class="flex items-center gap-2">
          <i class="fas fa-shield-halved text-ok-lime-400"></i> True Price Commerce Platform
        </p>
      </div>
    </div>
  </footer>
)
