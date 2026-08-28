import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'

const TOGGLES = [
  { label: 'অর্ডার নোটিফিকেশন', desc: 'নতুন অর্ডার এলে নোটিফিকেশন পান', checked: true },
  { label: 'SMS নোটিফিকেশন', desc: 'গুরুত্বপূর্ণ আপডেট SMS-এ পান', checked: true },
  { label: 'সেটেলমেন্ট অ্যালার্ট', desc: 'সেটেলমেন্ট প্রসেস হলে জানানো হবে', checked: false },
  { label: 'মার্কেটিং ইমেইল', desc: 'নতুন ফিচার ও অফার সম্পর্কে জানুন', checked: false }
]

export const MerchantSettingsPage: FC = () => (
  <MerchantLayout title="Settings" active="settings">
    <div class="max-w-2xl space-y-6">
      <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
        <h3 class="font-bold text-base mb-4">নোটিফিকেশন সেটিংস</h3>
        <div class="space-y-4">
          {TOGGLES.map((t, i) => (
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-sm">{t.label}</p>
                <p class="text-xs text-ok-gray-500">{t.desc}</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={t.checked} class="sr-only peer" id={`toggle-${i}`} />
                <div class="w-11 h-6 bg-gray-200 peer-checked:bg-ok-green-800 rounded-full transition-colors"></div>
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
        <h3 class="font-bold text-base mb-4">পাসওয়ার্ড পরিবর্তন</h3>
        <div class="space-y-3">
          <input type="password" placeholder="বর্তমান পাসওয়ার্ড" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
          <input type="password" placeholder="নতুন পাসওয়ার্ড" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm" />
          <button id="change-password-btn" class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm">
            পাসওয়ার্ড পরিবর্তন করুন
          </button>
        </div>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.querySelectorAll('input[type=checkbox]').forEach(function(el) {
          el.addEventListener('change', function() { window.OK.toast('সেটিংস আপডেট হয়েছে (ডেমো)', 'success'); });
        });
        document.getElementById('change-password-btn').addEventListener('click', function() {
          window.OK.toast('পাসওয়ার্ড পরিবর্তন করা হয়েছে (ডেমো)', 'success');
        });
      `
    }} />
  </MerchantLayout>
)
