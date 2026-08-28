import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { FormField } from '../../components/ui/FormField'

export const LoginPage: FC = () => (
  <CustomerLayout title="লগইন" showMobileNav={false}>
    <div class="max-w-md mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="text-center mb-8">
        <div class="inline-block bg-ok-green-900 rounded-xl px-4 py-2.5 mb-5">
          <img src="/static/images/brand/offerkini-logo.png" alt="OfferKini" class="h-7" />
        </div>
        <h1 class="text-xl font-extrabold">আপনার অ্যাকাউন্টে লগইন করুন</h1>
        <p class="text-sm text-ok-gray-500 mt-1">দাম কম, কথা পরিষ্কার — আবার স্বাগতম</p>
      </div>

      <form id="login-form" class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <FormField label="মোবাইল নম্বর" name="phone" type="tel" placeholder="01XXXXXXXXX" required />
        <FormField label="পাসওয়ার্ড" name="password" type="password" placeholder="••••••••" required />
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="rounded" /> মনে রাখুন
          </label>
          <a href="#" class="text-ok-green-800 font-semibold">পাসওয়ার্ড ভুলে গেছেন?</a>
        </div>
        <button type="submit" id="login-submit" class="w-full bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold py-3 rounded-xl transition-colors">
          লগইন করুন
        </button>
        <p class="text-xs text-ok-gray-400 text-center">
          <i class="fas fa-circle-info mr-1"></i> এটি একটি ডেমো UI, কোনো প্রকৃত অথেন্টিকেশন নেই।
        </p>
      </form>

      <p class="text-center text-sm text-ok-gray-500 mt-6">
        নতুন OfferKini-তে? <a href="/register" class="text-ok-green-800 font-bold">অ্যাকাউন্ট তৈরি করুন</a>
      </p>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.getElementById('login-form').addEventListener('submit', function (e) {
          e.preventDefault();
          var btn = document.getElementById('login-submit');
          btn.innerHTML = '<span class="ok-spinner"></span>';
          setTimeout(function () {
            window.OK.toast('সফলভাবে লগইন হয়েছে (ডেমো)', 'success');
            window.location.href = '/account';
          }, 700);
        });
      `
    }} />
  </CustomerLayout>
)
