import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { FormField } from '../../components/ui/FormField'
import { categories } from '../../data/categories'

export const MerchantAddProductPage: FC = () => (
  <MerchantLayout title="Add Product" active="add-product">
    <div class="max-w-3xl">
      <form id="add-product-form" class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <h3 class="font-bold text-base mb-4">মূল তথ্য</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            <FormField label="Product Name" name="name" placeholder="যেমন: ওয়্যারলেস ইয়ারবাডস প্রো" required className="sm:col-span-2" />
            <FormField
              label="Category"
              name="category"
              type="select"
              required
              options={categories.map((c) => ({ value: c.slug, label: `${c.name} (${c.nameEn})` }))}
            />
            <FormField label="Subcategory" name="subcategory" placeholder="ঐচ্ছিক" />
            <FormField label="Description" name="description" type="textarea" rows={4} placeholder="পণ্যের বিস্তারিত বিবরণ লিখুন" required className="sm:col-span-2" />
            <FormField label="Specifications" name="specifications" type="textarea" rows={3} placeholder="প্রতি লাইনে একটি স্পেসিফিকেশন লিখুন (যেমন: ব্যাটারি: ৭ দিন)" className="sm:col-span-2" />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <h3 class="font-bold text-base mb-4">Product Images & Video</h3>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div class="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-ok-gray-400 hover:border-ok-green-400 hover:text-ok-green-600 cursor-pointer transition-colors">
                <i class="fas fa-camera text-lg"></i>
              </div>
            ))}
          </div>
          <p class="text-xs text-ok-gray-400 mb-4">সর্বোচ্চ ৫টি ছবি আপলোড করুন (ডেমো — আপলোড কার্যকর নয়)</p>
          <FormField label="Product Video URL (ঐচ্ছিক)" name="videoUrl" placeholder="https://..." />
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <h3 class="font-bold text-base mb-4">Variants & Inventory</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            <FormField label="SKU" name="sku" placeholder="OK-XX-000" required />
            <FormField label="Stock" name="stock" type="number" placeholder="৫০" required />
            <FormField label="Weight (গ্রাম)" name="weight" type="number" placeholder="২৫০" required />
            <FormField label="Variants (ঐচ্ছিক)" name="variants" placeholder="যেমন: Red, Blue, Black (কমা দিয়ে আলাদা করুন)" />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <h3 class="font-bold text-base mb-4">Pricing</h3>
          <div class="grid sm:grid-cols-3 gap-4">
            <FormField label="Supply Price" name="supplyPrice" type="number" placeholder="৬৫০" required helpText="আপনার সরবরাহ মূল্য" />
            <FormField label="Reference Price" name="referencePrice" type="number" placeholder="১৮০০" required helpText="মার্কেট রেফারেন্স মূল্য" />
            <FormField label="Suggested OfferKini Price" name="offerKiniPrice" type="number" placeholder="৯৯০" required helpText="প্রস্তাবিত বিক্রয় মূল্য" />
          </div>
          <div id="add-product-price-preview" class="mt-4 bg-ok-green-50 rounded-xl p-4 text-sm hidden">
            <span class="text-ok-gray-600">আনুমানিক সাশ্রয়: </span>
            <span id="add-product-savings-preview" class="font-bold text-ok-green-800"></span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button type="submit" class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-6 py-3 rounded-xl text-sm">
            <i class="fas fa-paper-plane mr-1"></i> Submit Product
          </button>
          <button type="button" class="border border-gray-200 text-ok-charcoal font-semibold px-6 py-3 rounded-xl text-sm hover:bg-gray-50">
            Save as Draft
          </button>
        </div>
      </form>

      <div id="add-product-success" class="hidden text-center py-16">
        <div class="w-16 h-16 rounded-full bg-ok-lime-500/20 flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-circle-check text-3xl text-ok-green-700"></i>
        </div>
        <h3 class="font-bold text-lg mb-1">আপনার পণ্য Review-এর জন্য পাঠানো হয়েছে।</h3>
        <p class="text-sm text-ok-gray-500 mb-4">Admin অনুমোদন করলে পণ্যটি সাইটে প্রকাশিত হবে।</p>
        <span class="inline-flex bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full">Pending Review</span>
        <div class="mt-6">
          <a href="/merchant/products" class="text-ok-green-800 font-semibold text-sm underline">সব পণ্য দেখুন</a>
        </div>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        (function() {
          var refInput = document.querySelector('[name=referencePrice]');
          var okInput = document.querySelector('[name=offerKiniPrice]');
          var preview = document.getElementById('add-product-price-preview');
          var savingsPreview = document.getElementById('add-product-savings-preview');
          function updatePreview() {
            var ref = parseFloat(refInput.value) || 0;
            var ok = parseFloat(okInput.value) || 0;
            if (ref > 0 && ok > 0 && ref > ok) {
              preview.classList.remove('hidden');
              savingsPreview.textContent = window.OK.formatBDT(ref - ok) + ' (' + Math.round((ref - ok) / ref * 100) + '%)';
            } else {
              preview.classList.add('hidden');
            }
          }
          if (refInput) refInput.addEventListener('input', updatePreview);
          if (okInput) okInput.addEventListener('input', updatePreview);

          document.getElementById('add-product-form').addEventListener('submit', function (e) {
            e.preventDefault();
            this.classList.add('hidden');
            document.getElementById('add-product-success').classList.remove('hidden');
            window.OK.toast('পণ্য জমা দেওয়া হয়েছে (ডেমো)', 'success');
          });
        })();
      `
    }} />
  </MerchantLayout>
)
