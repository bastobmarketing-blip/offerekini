import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { FormField } from '../../components/ui/FormField'

export const RegisterPage: FC = () => (
  <CustomerLayout title="রেজিস্ট্রেশন" showMobileNav={false}>
    <div class="max-w-md mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="text-center mb-8">
        <div class="inline-block bg-ok-green-900 rounded-xl px-4 py-2.5 mb-5">
          <img src="/static/images/brand/offerkini-logo.png" alt="OfferKini" class="h-7" />
        </div>
        <h1 class="text-xl font-extrabold">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
        <p class="text-sm text-ok-gray-500 mt-1">সত্যিকারের কম দামে পণ্য পেতে যোগ দিন</p>
      </div>

      <form id="register-form" class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <FormField label="পুরো নাম" name="name" placeholder="আপনার নাম" required />
        <FormField label="মোবাইল নম্বর" name="phone" type="tel" placeholder="01XXXXXXXXX" required />
        <FormField label="ইমেইল (ঐচ্ছিক)" name="email" type="email" placeholder="you@example.com" />
        <FormField label="পাসওয়ার্ড" name="password" type="password" placeholder="••••••••" required />
        <label class="flex items-start gap-2 text-xs text-ok-gray-500">
          <input type="checkbox" required class="rounded mt-0.5" />
          আমি OfferKini-র <a href="/terms" class="text-ok-green-800 font-semibold">শর্তাবলী</a> ও <a href="/privacy" class="text-ok-green-800 font-semibold">প্রাইভেসি পলিসি</a> মেনে নিচ্ছি
        </label>
        <button type="submit" id="register-submit" class="w-full bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold py-3 rounded-xl transition-colors">
          অ্যাকাউন্ট তৈরি করুন
        </button>
        <p class="text-xs text-ok-gray-400 text-center">
          <i class="fas fa-circle-info mr-1"></i> এটি একটি ডেমো UI, কোনো প্রকৃত ডাটা সংরক্ষণ হয় না।
        </p>
      </form>

      <p class="text-center text-sm text-ok-gray-500 mt-6">
        ইতিমধ্যে অ্যাকাউন্ট আছে? <a href="/login" class="text-ok-green-800 font-bold">লগইন করুন</a>
      </p>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.getElementById('register-form').addEventListener('submit', function (e) {
          e.preventDefault();
          var btn = document.getElementById('register-submit');
          btn.innerHTML = '<span class="ok-spinner"></span>';
          setTimeout(function () {
            window.OK.toast('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে (ডেমো)', 'success');
            window.location.href = '/account';
          }, 700);
        });
      `
    }} />
  </CustomerLayout>
)
