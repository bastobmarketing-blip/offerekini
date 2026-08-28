import type { FC } from 'hono/jsx'

const STEPS = [
  { num: '01', icon: 'fa-magnifying-glass', title: 'পছন্দের পণ্য দেখুন', desc: 'সত্যিকারের কম দামে পণ্য বেছে নিন True Price ট্যাগ দেখে।' },
  { num: '02', icon: 'fa-cart-plus', title: 'অর্ডার করুন', desc: 'সহজ কয়েকটি ধাপে আপনার অর্ডার নিশ্চিত করুন।' },
  { num: '03', icon: 'fa-truck-fast', title: 'ডেলিভারি চার্জ আগে দিন', desc: 'ফেক অর্ডার কমাতে ডেলিভারি চার্জ অগ্রিম পরিশোধ করুন।' },
  { num: '04', icon: 'fa-hand-holding-dollar', title: 'বাকি টাকা পণ্য হাতে পেয়ে দিন', desc: 'পণ্য হাতে পাওয়ার পর বাকি টাকা ক্যাশ অন ডেলিভারিতে পরিশোধ করুন।' }
]

export const HowItWorksSteps: FC<{ compact?: boolean }> = ({ compact }) => (
  <div class={`grid grid-cols-2 lg:grid-cols-4 ${compact ? 'gap-3' : 'gap-4 sm:gap-6'}`}>
    {STEPS.map((s, i) => (
      <div class="relative bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col items-start gap-3">
        <span class="text-2xl sm:text-3xl font-extrabold text-ok-lime-500">{s.num}</span>
        <div class="w-10 h-10 rounded-xl bg-ok-green-50 flex items-center justify-center">
          <i class={`fas ${s.icon} text-ok-green-800`}></i>
        </div>
        <h3 class="font-bold text-sm sm:text-base leading-snug">{s.title}</h3>
        {!compact && <p class="text-xs sm:text-sm text-ok-gray-500 leading-relaxed">{s.desc}</p>}
        {i < STEPS.length - 1 && (
          <i class="fas fa-chevron-right hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-ok-gray-300 text-lg"></i>
        )}
      </div>
    ))}
  </div>
)
