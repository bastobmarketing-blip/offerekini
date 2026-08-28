import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { StaticPageHeader } from '../../components/customer/StaticPageHeader'
import { FormField } from '../../components/ui/FormField'

export const ContactPage: FC = () => (
  <CustomerLayout title="যোগাযোগ">
    <StaticPageHeader title="যোগাযোগ করুন" subtitle="আমরা আপনার প্রশ্নের উত্তর দিতে প্রস্তুত" icon="fa-headset" />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid lg:grid-cols-2 gap-8">
      <div class="space-y-5">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl bg-ok-green-50 flex items-center justify-center shrink-0">
            <i class="fas fa-phone text-ok-green-800"></i>
          </div>
          <div>
            <p class="font-semibold text-sm">হটলাইন</p>
            <p class="text-sm text-ok-gray-500">১৬XXX (সকাল ৯টা - রাত ৯টা)</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl bg-ok-green-50 flex items-center justify-center shrink-0">
            <i class="fas fa-envelope text-ok-green-800"></i>
          </div>
          <div>
            <p class="font-semibold text-sm">ইমেইল</p>
            <p class="text-sm text-ok-gray-500">support@offerkini.com</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
          <div class="w-11 h-11 rounded-xl bg-ok-green-50 flex items-center justify-center shrink-0">
            <i class="fas fa-location-dot text-ok-green-800"></i>
          </div>
          <div>
            <p class="font-semibold text-sm">অফিস</p>
            <p class="text-sm text-ok-gray-500">গুলশান-২, ঢাকা, বাংলাদেশ</p>
          </div>
        </div>
      </div>

      <form id="contact-form" class="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <FormField label="নাম" name="name" required />
        <FormField label="মোবাইল / ইমেইল" name="contact" required />
        <FormField label="বার্তা" name="message" type="textarea" rows={4} required />
        <button type="submit" id="contact-submit" class="w-full bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold py-3 rounded-xl transition-colors">
          বার্তা পাঠান
        </button>
      </form>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.getElementById('contact-form').addEventListener('submit', function (e) {
          e.preventDefault();
          window.OK.toast('আপনার বার্তা পাঠানো হয়েছে (ডেমো)', 'success');
          this.reset();
        });
      `
    }} />
  </CustomerLayout>
)
