import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { FormField } from '../../components/ui/FormField'
import type { Merchant } from '../../types'

export const MerchantStorePage: FC<{ merchant: Merchant }> = ({ merchant }) => (
  <MerchantLayout title="My Store" active="store" merchantName={merchant.storeName}>
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
        <h3 class="font-bold text-base mb-4">Store Information</h3>
        <form id="store-form" class="space-y-4">
          <div class="flex items-center gap-4 mb-2">
            <img src={merchant.logo} class="w-16 h-16 rounded-2xl object-cover bg-gray-50 border border-gray-100" />
            <button type="button" class="text-sm font-semibold text-ok-green-800 border border-ok-green-800 px-4 py-2 rounded-xl hover:bg-ok-green-50">
              Change Logo
            </button>
          </div>
          <FormField label="Store Name" name="storeName" value={merchant.storeName} required />
          <FormField label="Description" name="description" type="textarea" rows={3} value={merchant.description} />
          <div class="grid sm:grid-cols-2 gap-4">
            <FormField label="Phone" name="phone" value={merchant.phone} required />
            <FormField label="Business Address" name="address" value={merchant.address} required />
          </div>
          <button type="submit" class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm">
            Save Changes
          </button>
        </form>
      </div>

      <div>
        <h3 class="font-bold text-sm mb-3">Store Preview</h3>
        <div class="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <img src={merchant.logo} class="w-16 h-16 rounded-2xl object-cover bg-gray-50 mx-auto mb-3" />
          <p class="font-bold">{merchant.storeName}</p>
          <div class="flex items-center justify-center gap-1 text-sm text-ok-gray-500 mt-1">
            <i class="fas fa-star text-ok-lime-600"></i> {merchant.rating}
          </div>
          <p class="text-xs text-ok-gray-500 mt-3 leading-relaxed">{merchant.description}</p>
          <div class="grid grid-cols-2 gap-2 mt-4 text-center">
            <div class="bg-gray-50 rounded-xl p-2">
              <p class="font-bold text-sm">{merchant.totalProducts}</p>
              <p class="text-[11px] text-ok-gray-500">Products</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-2">
              <p class="font-bold text-sm">{merchant.totalOrders}</p>
              <p class="text-[11px] text-ok-gray-500">Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.getElementById('store-form').addEventListener('submit', function (e) {
          e.preventDefault();
          window.OK.toast('স্টোর তথ্য সংরক্ষণ করা হয়েছে (ডেমো)', 'success');
        });
      `
    }} />
  </MerchantLayout>
)
