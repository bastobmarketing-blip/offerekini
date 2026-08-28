import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { FormField } from '../../components/ui/FormField'
import { StatusBadge, productStatusLabel, productStatusTone } from '../../components/ui/StatusBadge'
import { ReviewProofManager } from '../../components/merchant/ReviewProofManager'
import { categories } from '../../data/categories'
import { formatBDT } from '../../utils/format'
import type { Product } from '../../types'

export const MerchantProductDetailPage: FC<{ product: Product }> = ({ product }) => (
  <MerchantLayout title="Edit Product" active="products">
    <div class="max-w-3xl">
      <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div class="flex items-center gap-3">
          <img src={product.image} class="w-14 h-14 rounded-xl object-cover bg-gray-50" />
          <div>
            <h2 class="font-bold text-base">{product.name}</h2>
            <p class="text-xs text-ok-gray-500">SKU: {product.sku}</p>
          </div>
        </div>
        <StatusBadge label={productStatusLabel(product.status)} tone={productStatusTone(product.status)} />
      </div>

      <div class="grid sm:grid-cols-3 gap-3 mb-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p class="text-xl font-extrabold text-ok-green-800">{formatBDT(product.offerKiniPrice)}</p>
          <p class="text-xs text-ok-gray-500 mt-1">OfferKini Price</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p class="text-xl font-extrabold text-ok-charcoal">{product.stock}</p>
          <p class="text-xs text-ok-gray-500 mt-1">Stock</p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p class="text-xl font-extrabold text-ok-charcoal">{product.reviewCount}</p>
          <p class="text-xs text-ok-gray-500 mt-1">Orders</p>
        </div>
      </div>

      <form class="space-y-6">
        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <h3 class="font-bold text-base mb-4">মূল তথ্য</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            <FormField label="Product Name" name="name" value={product.name} required className="sm:col-span-2" />
            <FormField
              label="Category"
              name="category"
              type="select"
              value={product.category}
              options={categories.map((c) => ({ value: c.slug, label: c.name }))}
            />
            <FormField label="SKU" name="sku" value={product.sku} required />
            <FormField label="Description" name="description" type="textarea" rows={4} value={product.description} className="sm:col-span-2" />
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <h3 class="font-bold text-base mb-4">Product Video</h3>
          <FormField
            label="এই পণ্য কীভাবে ব্যবহার করবেন — YouTube Video URL (ঐচ্ছিক)"
            name="videoUrl"
            value={product.videoUrl}
            placeholder="https://youtube.com/watch?v=..."
            helpText="প্রোডাক্ট পেজে ছবির নিচে এই ভিডিও দেখানো হবে, যাতে কাস্টমার সহজে বুঝতে পারে পণ্যটি কীভাবে ব্যবহার করতে হয়।"
          />
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <h3 class="font-bold text-base mb-4">Pricing & Inventory</h3>
          <div class="grid sm:grid-cols-3 gap-4">
            <FormField label="Supply Price" name="supplyPrice" type="number" value={String(product.supplyPrice)} />
            <FormField label="Reference Price" name="referencePrice" type="number" value={String(product.referencePrice)} />
            <FormField label="OfferKini Price" name="offerKiniPrice" type="number" value={String(product.offerKiniPrice)} />
            <FormField label="Stock" name="stock" type="number" value={String(product.stock)} />
            <FormField label="Weight (গ্রাম)" name="weight" type="number" value={String(product.weightGrams)} />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button type="submit" id="save-product-btn" class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-6 py-3 rounded-xl text-sm">
            সংরক্ষণ করুন
          </button>
          <a href="/merchant/products" class="border border-gray-200 text-ok-charcoal font-semibold px-6 py-3 rounded-xl text-sm hover:bg-gray-50">
            বাতিল করুন
          </a>
        </div>
      </form>

      <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 mt-6">
        <h3 class="font-bold text-base mb-1 flex items-center gap-2">
          <i class="fas fa-comments text-ok-green-800"></i> কাস্টমার রিভিউ (Trust Slider)
        </h3>
        <p class="text-xs text-ok-gray-500 mb-4">প্রোডাক্ট পেজে দেখানো রিভিউ ছবি/ভিডিও এখান থেকে যুক্ত বা মুছে ফেলুন।</p>
        <ReviewProofManager productId={product.id} seedProofs={product.reviewProofs} />
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        document.querySelector('form').addEventListener('submit', function (e) {
          e.preventDefault();
          window.OK.toast('পণ্যের তথ্য সংরক্ষণ করা হয়েছে (ডেমো)', 'success');
        });
      `
    }} />
  </MerchantLayout>
)
