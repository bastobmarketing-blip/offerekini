import type { FC } from 'hono/jsx'
import { Document } from '../../components/Document'
import { FormField } from '../../components/ui/FormField'

export const MerchantLoginPage: FC = () => (
  <Document title="Merchant Login">
    <div class="min-h-screen bg-ok-green-900 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <img src="/static/images/brand/offerkini-logo.png" alt="OfferKini" class="h-9 mx-auto mb-4" />
          <p class="text-ok-lime-400 font-bold text-sm tracking-wide">OFFERKINI MERCHANT</p>
          <h1 class="text-white text-xl sm:text-2xl font-extrabold mt-3 leading-snug">
            আপনার পণ্য, আরও একটি Sales Channel।
          </h1>
        </div>

        <form id="merchant-login-form" class="bg-white rounded-2xl p-6 space-y-4 shadow-2xl">
          <FormField label="ফোন নম্বর / ইমেইল" name="identifier" placeholder="01XXXXXXXXX বা email@example.com" required />
          <FormField label="পাসওয়ার্ড" name="password" type="password" placeholder="••••••••" required />
          <div class="flex justify-end">
            <a href="#" class="text-sm text-ok-green-800 font-semibold">পাসওয়ার্ড ভুলে গেছেন?</a>
          </div>
          <button type="submit" id="merchant-login-btn" class="w-full bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold py-3 rounded-xl transition-colors">
            লগইন করুন
          </button>
          <p class="text-xs text-ok-gray-400 text-center">
            <i class="fas fa-circle-info mr-1"></i> ডেমো: যেকোনো তথ্য দিয়ে লগইন করা যাবে।
          </p>
        </form>

        <p class="text-center text-white/60 text-sm mt-6">
          নতুন মার্চেন্ট? <a href="#" class="text-ok-lime-400 font-bold">আবেদন করুন</a>
        </p>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.getElementById('merchant-login-form').addEventListener('submit', function (e) {
          e.preventDefault();
          var btn = document.getElementById('merchant-login-btn');
          btn.innerHTML = '<span class="ok-spinner"></span>';
          setTimeout(function () { window.location.href = '/merchant/dashboard'; }, 700);
        });
      `
    }} />
  </Document>
)
