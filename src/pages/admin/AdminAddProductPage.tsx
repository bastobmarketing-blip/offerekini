import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { FormField } from '../../components/ui/FormField'
import { categories } from '../../data/categories'
import { merchants } from '../../data/merchants'

export const AdminAddProductPage: FC = () => (
  <AdminLayout title="Add Product" active="products">
    <div class="max-w-3xl">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">নতুন প্রোডাক্ট যোগ করুন</h1>
          <p class="text-xs text-ok-gray-500">প্রোডাক্টের তথ্য ও প্রাইসিং পূরণ করে প্রকাশ করুন</p>
        </div>
        <a href="/admin/products" class="text-xs font-semibold text-ok-gray-500 hover:text-ok-charcoal flex items-center gap-1">
          <i class="fas fa-arrow-left"></i> সকল প্রোডাক্টে ফিরুন
        </a>
      </div>

      <form id="admin-add-product-form" class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
          <h3 class="font-bold text-base mb-4 text-ok-charcoal border-b pb-2 flex items-center gap-2">
            <i class="fas fa-info-circle text-ok-green-700"></i> মূল তথ্য
          </h3>
          <div class="grid sm:grid-cols-2 gap-4">
            <FormField label="Product Name (বাংলা)" name="name" placeholder="যেমন: টেস্টো কিং — ৫০০ গ্রাম জার" required className="sm:col-span-2" />
            <FormField label="Product Name (English / Optional)" name="nameEn" placeholder="e.g. Testo King 500g" className="sm:col-span-2" />
            <FormField
              label="Category"
              name="category"
              type="select"
              required
              options={categories.map((c) => ({ value: c.slug, label: `${c.name} (${c.nameEn})` }))}
            />
            <FormField
              label="নির্ধারিত মার্চেন্ট (Assigned Merchant)"
              name="merchantId"
              type="select"
              required
              helpText="এই প্রোডাক্টের অর্ডারগুলো সরাসরি এই মার্চেন্টের প্যানেলে যাবে"
              options={merchants.map((m) => ({ value: m.id, label: `${m.storeName} (${m.ownerName} - ${m.phone})` }))}
            />
            <FormField label="SKU" name="sku" placeholder="OK-PR-001" />
            <FormField label="Short Description" name="shortDescription" placeholder="এক লাইনে মূল ফিচার বা সুবিধা" required className="sm:col-span-2" />
            <FormField label="Full Description" name="description" type="textarea" rows={4} placeholder="পণ্যের বিস্তারিত বিবরণ ও উপকারিতা" required className="sm:col-span-2" />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
          <h3 class="font-bold text-base mb-4 text-ok-charcoal border-b pb-2 flex items-center gap-2">
            <i class="fas fa-image text-ok-green-700"></i> প্রোডাক্ট ইমেজ ও মিডিয়া
          </h3>
          <div class="space-y-4">
            <FormField
              label="Primary Image URL"
              name="image"
              placeholder="/static/images/products/... বা https://..."
              helpText="আপনি লোকাল পাথ (যেমন: /testo_king/jar.webp) অথবা কোনো সরাসরি ইমেজ লিঙ্ক দিতে পারেন"
              required
            />
            <div id="image-preview-box" class="hidden flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <img id="image-preview" src="" class="w-16 h-16 object-cover rounded-lg border bg-white" />
              <div class="text-xs text-ok-gray-500">
                <p class="font-bold text-ok-charcoal">ইমেজ প্রিভিউ</p>
                <p>ছবিটি সঠিকভাবে লোড হয়েছে</p>
              </div>
            </div>
            <FormField label="Product Video URL (ঐচ্ছিক YouTube লিঙ্ক)" name="videoUrl" placeholder="https://www.youtube.com/watch?v=..." />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
          <h3 class="font-bold text-base mb-4 text-ok-charcoal border-b pb-2 flex items-center gap-2">
            <i class="fas fa-tags text-ok-green-700"></i> প্রাইসিং ও ইনভেন্টরি
          </h3>
          <div class="grid sm:grid-cols-3 gap-4">
            <FormField label="Reference Price (মার্কেট মূল্য)" name="referencePrice" type="number" placeholder="1290" required helpText="পূর্বের বা বাজারের রেগুলার দাম" />
            <FormField label="OfferKini Price (অফারেকিনি দাম)" name="offerKiniPrice" type="number" placeholder="990" required helpText="যে দামে গ্রাহক কিনবেন" />
            <FormField label="Stock Quantity" name="stock" type="number" placeholder="100" required />
          </div>
          <div class="grid sm:grid-cols-2 gap-4 mt-4">
            <FormField label="Delivery Charge (ঢাকা)" name="deliveryCharge" type="number" placeholder="60" required />
            <FormField label="Weight (গ্রাম / ঐচ্ছিক)" name="weightGrams" type="number" placeholder="500" />
          </div>

          <div id="price-preview-calc" class="mt-4 bg-ok-green-50/80 border border-ok-green-200 rounded-xl p-4 text-sm hidden">
            <div class="flex items-center justify-between">
              <span class="text-ok-gray-600 font-medium">গ্রাহকের সাশ্রয় (Savings): </span>
              <span id="savings-display" class="font-extrabold text-ok-green-800 text-base"></span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 pt-2">
          <button
            type="submit"
            id="submit-btn"
            class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-7 py-3 rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <i class="fas fa-check"></i>
            <span>Publish Product</span>
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
          var previewBox = document.getElementById('price-preview-calc');
          var savingsDisplay = document.getElementById('savings-display');
          var imageInput = document.querySelector('[name=image]');
          var imagePreviewBox = document.getElementById('image-preview-box');
          var imagePreview = document.getElementById('image-preview');

          function updateSavings() {
            var ref = parseFloat(refInput.value) || 0;
            var ok = parseFloat(okInput.value) || 0;
            if (ref > 0 && ok > 0 && ref > ok) {
              previewBox.classList.remove('hidden');
              var diff = ref - ok;
              var pct = Math.round((diff / ref) * 100);
              savingsDisplay.textContent = '৳ ' + diff + ' (' + pct + '% ছাড়)';
            } else {
              previewBox.classList.add('hidden');
            }
          }

          refInput.addEventListener('input', updateSavings);
          okInput.addEventListener('input', updateSavings);

          imageInput.addEventListener('input', function() {
            var url = imageInput.value.trim();
            if (url) {
              imagePreview.src = url;
              imagePreviewBox.classList.remove('hidden');
            } else {
              imagePreviewBox.classList.add('hidden');
            }
          });

          var form = document.getElementById('admin-add-product-form');
          var submitBtn = document.getElementById('submit-btn');

          form.addEventListener('submit', async function(e) {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="ok-spinner"></span> পাবলিশ হচ্ছে...';

            var payload = {
              name: form.querySelector('[name=name]').value,
              nameEn: form.querySelector('[name=nameEn]').value,
              category: form.querySelector('[name=category]').value,
              merchantId: form.querySelector('[name=merchantId]') ? form.querySelector('[name=merchantId]').value : 'mer-1',
              sku: form.querySelector('[name=sku]').value,
              shortDescription: form.querySelector('[name=shortDescription]').value,
              description: form.querySelector('[name=description]').value,
              image: form.querySelector('[name=image]').value,
              videoUrl: form.querySelector('[name=videoUrl]').value,
              referencePrice: parseFloat(form.querySelector('[name=referencePrice]').value) || 0,
              offerKiniPrice: parseFloat(form.querySelector('[name=offerKiniPrice]').value) || 0,
              stock: parseInt(form.querySelector('[name=stock]').value) || 50,
              deliveryCharge: parseFloat(form.querySelector('[name=deliveryCharge]').value) || 60,
              weightGrams: parseFloat(form.querySelector('[name=weightGrams]').value) || 500
            };

            try {
              var res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              var data = await res.json();
              if (data.success) {
                alert('সফলভাবে প্রোডাক্ট যোগ করা হয়েছে!');
                window.location.href = '/admin/products';
              } else {
                alert('ত্রুটি: ' + (data.error || 'প্রোডাক্ট যোগ করা যায়নি'));
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Publish Product';
              }
            } catch (err) {
              alert('সার্ভার এরর: ' + err.message);
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-check"></i> Publish Product';
            }
          });
        })();
      `
    }} />
  </AdminLayout>
)
