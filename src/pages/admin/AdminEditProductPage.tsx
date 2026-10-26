import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { FormField } from '../../components/ui/FormField'
import { categories } from '../../data/categories'
import type { Product } from '../../types'

export const AdminEditProductPage: FC<{ product: Product }> = ({ product }) => {
  const variants = product.variants && product.variants.length ? product.variants : [{ id: 'v-1', label: 'স্ট্যান্ডার্ড', stock: product.stock || 50 }]

  return (
    <AdminLayout title={`Edit: ${product.name}`} active="products">
      <div class="max-w-3xl">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold text-ok-charcoal">প্রোডাক্ট এডিট করুন</h1>
            <p class="text-xs text-ok-gray-500">মূল্য, ভ্যারিয়েন্ট ও বিবরণ আপডেট করুন — আইডি: {product.id}</p>
          </div>
          <a href="/admin/products" class="text-xs font-semibold text-ok-gray-500 hover:text-ok-charcoal flex items-center gap-1">
            <i class="fas fa-arrow-left"></i> সকল প্রোডাক্টে ফিরুন
          </a>
        </div>

        <form id="admin-edit-product-form" class="space-y-6">
          <input type="hidden" name="productId" value={product.id} />

          {/* BASIC INFO */}
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <h3 class="font-bold text-base mb-4 text-ok-charcoal border-b pb-2 flex items-center gap-2">
              <i class="fas fa-info-circle text-ok-green-700"></i> মূল তথ্য
            </h3>
            <div class="grid sm:grid-cols-2 gap-4">
              <FormField
                label="Product Name (বাংলা)"
                name="name"
                defaultValue={product.name}
                required
                className="sm:col-span-2"
              />
              <FormField
                label="Product Name (English)"
                name="nameEn"
                defaultValue={product.nameEn || ''}
                className="sm:col-span-2"
              />
              <FormField
                label="Category"
                name="category"
                type="select"
                defaultValue={product.category}
                required
                options={categories.map((c) => ({ value: c.slug, label: `${c.name} (${c.nameEn})` }))}
              />
              <FormField label="SKU" name="sku" defaultValue={product.sku || ''} />
              <FormField
                label="Short Description"
                name="shortDescription"
                defaultValue={product.shortDescription || ''}
                required
                className="sm:col-span-2"
              />
              <FormField
                label="Full Description"
                name="description"
                type="textarea"
                rows={4}
                defaultValue={product.description || ''}
                required
                className="sm:col-span-2"
              />
            </div>
          </div>

          {/* PRICING & INVENTORY */}
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <h3 class="font-bold text-base mb-4 text-ok-charcoal border-b pb-2 flex items-center gap-2">
              <i class="fas fa-tags text-ok-green-700"></i> মূল্য নির্ধারণ (Pricing) ও স্টক
            </h3>
            <div class="grid sm:grid-cols-3 gap-4">
              <FormField
                label="Reference Price (মার্কেট মূল্য)"
                name="referencePrice"
                type="number"
                defaultValue={String(product.referencePrice)}
                required
                helpText="বাজারের রেগুলার মূল্য"
              />
              <FormField
                label="OfferKini Price (বিক্রয় মূল্য)"
                name="offerKiniPrice"
                type="number"
                defaultValue={String(product.offerKiniPrice)}
                required
                helpText="যে মূল্যে গ্রাহক কিনবেন"
              />
              <FormField
                label="মোট স্টক (Stock Quantity)"
                name="stock"
                type="number"
                defaultValue={String(product.stock || 50)}
                required
              />
            </div>

            <div class="grid sm:grid-cols-2 gap-4 mt-4">
              <FormField
                label="ডেলিভারি চার্জ (ঢাকা)"
                name="deliveryCharge"
                type="number"
                defaultValue={String(product.deliveryCharge || 60)}
                required
              />
              <FormField
                label="ওজন (গ্রাম)"
                name="weightGrams"
                type="number"
                defaultValue={String(product.weightGrams || 500)}
              />
            </div>

            {/* LIVE SAVINGS PREVIEW */}
            <div id="price-preview-calc" class="mt-4 bg-ok-green-50/80 border border-ok-green-200 rounded-xl p-4 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-ok-gray-600 font-medium">গ্রাহকের সাশ্রয় (Savings): </span>
                <span id="savings-display" class="font-extrabold text-ok-green-800 text-base">
                  ৳{product.savings} ({product.savingsPercent}% ছাড়)
                </span>
              </div>
            </div>
          </div>

          {/* DYNAMIC VARIATIONS MANAGER */}
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <div class="flex items-center justify-between border-b pb-2 mb-4">
              <h3 class="font-bold text-base text-ok-charcoal flex items-center gap-2">
                <i class="fas fa-layer-group text-ok-green-700"></i> ভ্যারিয়েশন ম্যানেজমেন্ট (Variants)
              </h3>
              <button
                type="button"
                id="add-variant-btn"
                class="bg-ok-green-50 text-ok-green-800 hover:bg-ok-green-100 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors"
              >
                <i class="fas fa-plus"></i> + Add Variant
              </button>
            </div>
            <p class="text-xs text-ok-gray-500 mb-3">পণ্যের বিভিন্ন সাইজ, ওজন বা প্যাকেজ যোগ বা পরিবর্তন করুন:</p>

            <div id="variants-container" class="space-y-3">
              {variants.map((v, idx) => (
                <div class="variant-row flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div class="flex-1">
                    <label class="text-[11px] font-bold text-ok-gray-500 block mb-0.5">ভ্যারিয়েন্ট নাম (Label)</label>
                    <input
                      type="text"
                      class="variant-label w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:outline-none focus:border-ok-green-700 bg-white"
                      value={v.label}
                      placeholder="e.g. 500g রেগুলার জার"
                      required
                    />
                  </div>
                  <div class="w-28">
                    <label class="text-[11px] font-bold text-ok-gray-500 block mb-0.5">স্টক (Stock)</label>
                    <input
                      type="number"
                      class="variant-stock w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:outline-none focus:border-ok-green-700 bg-white"
                      value={String(v.stock || 50)}
                      required
                    />
                  </div>
                  <div class="pt-4">
                    <button
                      type="button"
                      onclick="this.closest('.variant-row').remove()"
                      class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center text-xs transition-colors"
                      title="Remove Variant"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE & MEDIA */}
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <h3 class="font-bold text-base mb-4 text-ok-charcoal border-b pb-2 flex items-center gap-2">
              <i class="fas fa-image text-ok-green-700"></i> প্রোডাক্ট ছবি ও মিডিয়া
            </h3>
            <div class="space-y-4">
              <FormField
                label="Primary Image URL"
                name="image"
                defaultValue={product.image}
                helpText="যেমন: /testo_king/jar.webp অথবা https://..."
                required
              />
              <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img id="image-preview" src={product.image} class="w-16 h-16 object-cover rounded-lg border bg-white" />
                <div class="text-xs text-ok-gray-500">
                  <p class="font-bold text-ok-charcoal">বর্তমান ছবি প্রিভিউ</p>
                  <p>ছবি লিঙ্ক পরিবর্তন করলে প্রিভিউ আপডেট হবে</p>
                </div>
              </div>
              <FormField
                label="Product Video URL (YouTube লিঙ্ক)"
                name="videoUrl"
                defaultValue={product.videoUrl || ''}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div class="flex items-center gap-3 pt-2">
            <button
              type="submit"
              id="submit-edit-btn"
              class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-8 py-3 rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <i class="fas fa-floppy-disk"></i>
              <span>Save Changes</span>
            </button>
            <a
              href="/admin/products"
              class="border border-gray-200 text-ok-charcoal font-semibold px-5 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              বাতিল
            </a>
          </div>
        </form>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var refInput = document.querySelector('[name=referencePrice]');
            var okInput = document.querySelector('[name=offerKiniPrice]');
            var savingsDisplay = document.getElementById('savings-display');
            var imageInput = document.querySelector('[name=image]');
            var imagePreview = document.getElementById('image-preview');
            var addVariantBtn = document.getElementById('add-variant-btn');
            var variantsContainer = document.getElementById('variants-container');
            var form = document.getElementById('admin-edit-product-form');
            var submitBtn = document.getElementById('submit-edit-btn');

            function updateSavings() {
              var ref = parseFloat(refInput.value) || 0;
              var ok = parseFloat(okInput.value) || 0;
              if (ref > 0 && ok > 0 && ref > ok) {
                var diff = ref - ok;
                var pct = Math.round((diff / ref) * 100);
                savingsDisplay.textContent = '৳ ' + diff + ' (' + pct + '% ছাড়)';
              } else {
                savingsDisplay.textContent = 'কোনো ছাড় নেই';
              }
            }

            refInput.addEventListener('input', updateSavings);
            okInput.addEventListener('input', updateSavings);

            imageInput.addEventListener('input', function() {
              if (imageInput.value.trim()) {
                imagePreview.src = imageInput.value.trim();
              }
            });

            addVariantBtn.addEventListener('click', function() {
              var vid = 'v-' + Date.now();
              var row = document.createElement('div');
              row.className = 'variant-row flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200';
              row.innerHTML = 
                '<div class="flex-1">' +
                  '<label class="text-[11px] font-bold text-ok-gray-500 block mb-0.5">ভ্যারিয়েন্ট নাম (Label)</label>' +
                  '<input type="text" class="variant-label w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:outline-none focus:border-ok-green-700 bg-white" placeholder="যেমন: 1 KG মেগা প্যাক" required />' +
                '</div>' +
                '<div class="w-28">' +
                  '<label class="text-[11px] font-bold text-ok-gray-500 block mb-0.5">স্টক (Stock)</label>' +
                  '<input type="number" class="variant-stock w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:outline-none focus:border-ok-green-700 bg-white" value="50" required />' +
                '</div>' +
                '<div class="pt-4">' +
                  '<button type="button" onclick="this.closest(\\'.variant-row\\').remove()" class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center text-xs transition-colors">' +
                    '<i class="fas fa-trash-alt"></i>' +
                  '</button>' +
                '</div>';
              variantsContainer.appendChild(row);
            });

            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              submitBtn.disabled = true;
              submitBtn.innerHTML = '<span class="ok-spinner"></span> সংরক্ষণ হচ্ছে...';

              var variantRows = variantsContainer.querySelectorAll('.variant-row');
              var variants = [];
              variantRows.forEach(function(r, idx) {
                var label = r.querySelector('.variant-label').value.trim();
                var stock = parseInt(r.querySelector('.variant-stock').value) || 0;
                if (label) {
                  variants.push({ id: 'v-' + (idx + 1), label: label, stock: stock });
                }
              });

              var payload = {
                name: form.name.value,
                nameEn: form.nameEn.value,
                category: form.category.value,
                sku: form.sku.value,
                shortDescription: form.shortDescription.value,
                description: form.description.value,
                image: form.image.value,
                videoUrl: form.videoUrl.value,
                referencePrice: parseFloat(form.referencePrice.value) || 0,
                offerKiniPrice: parseFloat(form.offerKiniPrice.value) || 0,
                stock: parseInt(form.stock.value) || 50,
                deliveryCharge: parseFloat(form.deliveryCharge.value) || 60,
                weightGrams: parseFloat(form.weightGrams.value) || 500,
                variants: variants
              };

              var productId = form.productId.value;

              try {
                var res = await fetch('/api/admin/products/' + productId, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
                var data = await res.json();
                if (data.success) {
                  alert('প্রোডাক্ট সফলভাবে আপডেট করা হয়েছে!');
                  window.location.href = '/admin/products';
                } else {
                  alert('ত্রুটি: ' + (data.error || 'আপডেট করা সম্ভব হয়নি'));
                  submitBtn.disabled = false;
                  submitBtn.innerHTML = '<i class="fas fa-floppy-disk"></i> Save Changes';
                }
              } catch(err) {
                alert('সার্ভার এরর: ' + err.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-floppy-disk"></i> Save Changes';
              }
            });
          })();
        `
      }} />
    </AdminLayout>
  )
}
