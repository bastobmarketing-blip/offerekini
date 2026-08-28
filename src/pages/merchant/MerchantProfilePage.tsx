import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { FormField } from '../../components/ui/FormField'
import { formatDateBn } from '../../utils/format'
import type { Merchant } from '../../types'

export const MerchantProfilePage: FC<{ merchant: Merchant }> = ({ merchant }) => (
  <MerchantLayout title="Profile" active="profile" merchantName={merchant.storeName}>
    <div class="max-w-2xl">
      <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mb-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-ok-green-800 text-white flex items-center justify-center text-2xl font-bold">
            {merchant.ownerName.charAt(0)}
          </div>
          <div>
            <p class="font-bold text-lg">{merchant.ownerName}</p>
            <p class="text-sm text-ok-gray-500">যুক্ত হয়েছেন {formatDateBn(merchant.joinedAt)}</p>
          </div>
        </div>
      </div>

      <form id="profile-form" class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4">
        <h3 class="font-bold text-base mb-2">ব্যক্তিগত তথ্য</h3>
        <FormField label="Full Name" name="ownerName" value={merchant.ownerName} required />
        <FormField label="Phone" name="phone" value={merchant.phone} required />
        <FormField label="Email" name="email" type="email" value={merchant.email} required />
        <button type="submit" class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm">
          Save Changes
        </button>
      </form>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.getElementById('profile-form').addEventListener('submit', function (e) {
          e.preventDefault();
          window.OK.toast('প্রোফাইল আপডেট হয়েছে (ডেমো)', 'success');
        });
      `
    }} />
  </MerchantLayout>
)
