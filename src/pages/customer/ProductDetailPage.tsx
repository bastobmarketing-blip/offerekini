import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { Breadcrumb } from '../../components/customer/Breadcrumb'
import { ProductCard } from '../../components/ProductCard'
import { SavingsBadge } from '../../components/ui/SavingsBadge'
import { YouTubeEmbed } from '../../components/ui/YouTubeEmbed'
import { ReviewProofSlider } from '../../components/ui/ReviewProofSlider'
import { formatBDT } from '../../utils/format'
import { computeOrderPayment, stockStatusLabel } from '../../utils/pricing'
import { extractYouTubeId } from '../../utils/youtube'
import { getCategoryBySlug } from '../../data/categories'
import { products, PRICE_PROOF_IMAGE } from '../../data/products'
import type { Product } from '../../types'

export const ProductDetailPage: FC<{ product: Product }> = ({ product }) => {
  const category = getCategoryBySlug(product.category)
  const payment = computeOrderPayment(product.offerKiniPrice, 1, product.deliveryCharge)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const isOutOfStock = product.stockStatus === 'out_of_stock'
  const howToUseVideoId = extractYouTubeId(product.videoUrl)

  return (
    <CustomerLayout title={product.name} description={product.shortDescription}>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <Breadcrumb
          items={[
            ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
            { label: product.name }
          ]}
        />

        <div class="grid lg:grid-cols-2 gap-6 lg:gap-10 mt-4">
          {/* ============ GALLERY ============ */}
          <div>
            <div class="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100">
              <img src={product.image} alt={product.name} class="w-full h-full object-cover" id="pdp-main-image" />
              {product.badge && (
                <div class="absolute top-3 left-3">
                  <SavingsBadge badge={product.badge} />
                </div>
              )}
            </div>
            {product.gallery.length > 1 && (
              <div class="flex gap-2 mt-3">
                {product.gallery.map((img) => (
                  <button
                    class="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-ok-green-800"
                    onclick={`document.getElementById('pdp-main-image').src='${img}'`}
                  >
                    <img src={img} class="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* How-to-use video */}
            {howToUseVideoId && (
              <div class="mt-4">
                <p class="text-sm font-semibold mb-2 flex items-center gap-1.5">
                  <i class="fas fa-circle-play text-ok-green-700"></i> এই পণ্য কীভাবে ব্যবহার করবেন
                </p>
                <YouTubeEmbed videoId={howToUseVideoId} title={`${product.name} — ব্যবহার পদ্ধতি`} />
              </div>
            )}
          </div>

          {/* ============ INFO ============ */}
          <div>
            <h1 class="text-xl sm:text-2xl font-extrabold leading-snug mb-2">{product.name}</h1>

            <div class="flex items-center gap-3 text-sm mb-4">
              <div class="flex items-center gap-1 text-ok-lime-600">
                <i class="fas fa-star"></i>
                <span class="font-semibold text-ok-charcoal">{product.rating}</span>
              </div>
              <span class="text-ok-gray-400">|</span>
              <span class="text-ok-gray-500">{product.reviewCount} রিভিউ</span>
              <span class="text-ok-gray-400">|</span>
              <span class="text-ok-gray-500">SKU: {product.sku}</span>
            </div>

            {/* Price comparison block */}
            <div class="bg-ok-green-50 rounded-2xl p-4 sm:p-5 mb-5">
              <div class="flex items-end justify-between flex-wrap gap-3">
                <div class="flex items-end gap-4">
                  <div>
                    <p class="text-xs text-ok-gray-500 mb-0.5">অন্যান্য পেজে</p>
                    <p class="text-lg text-ok-gray-500 line-through font-semibold">{formatBDT(product.referencePrice)}</p>
                  </div>
                  <div>
                    <p class="text-xs text-ok-green-700 font-semibold mb-0.5">OfferKini</p>
                    <p class="text-3xl font-extrabold text-ok-green-800">{formatBDT(product.offerKiniPrice)}</p>
                  </div>
                </div>
                <div class="bg-ok-lime-500 text-ok-green-900 px-3 py-1.5 rounded-xl font-bold text-sm whitespace-nowrap">
                  <i class="fas fa-piggy-bank mr-1"></i> আপনার সাশ্রয় {formatBDT(product.savings)}
                </div>
              </div>
            </div>

            <p class="text-sm text-ok-gray-600 leading-relaxed mb-5">{product.shortDescription}</p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div class="mb-5" data-selected-variant={product.variants[0].id} data-selected-variant-label={product.variants[0].label}>
                <p class="text-sm font-semibold mb-2">ভ্যারিয়েন্ট বাছাই করুন</p>
                <div class="flex gap-2 flex-wrap">
                  {product.variants.map((v, i) => (
                    <button
                      data-variant-btn
                      data-vid={v.id}
                      data-vlabel={v.label}
                      class={`px-4 py-2 rounded-xl border text-sm font-semibold transition-colors ${
                        i === 0 ? 'border-ok-green-800 bg-ok-green-50 text-ok-green-800' : 'border-gray-200 hover:border-ok-green-800'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div class="flex items-center gap-2 mb-5 text-sm">
              <span
                class={`inline-flex items-center gap-1.5 font-semibold ${
                  product.stockStatus === 'out_of_stock'
                    ? 'text-ok-red'
                    : product.stockStatus === 'low_stock'
                    ? 'text-orange-600'
                    : 'text-ok-green-700'
                }`}
              >
                <i class={`fas ${product.stockStatus === 'in_stock' ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
                {stockStatusLabel(product.stockStatus)}
              </span>
              {product.stockStatus === 'low_stock' && <span class="text-ok-gray-500">— মাত্র {product.stock} টি বাকি</span>}
            </div>

            {/* Quantity + CTA */}
            {!isOutOfStock && (
              <div class="flex items-center gap-3 mb-5">
                <div data-qty-stepper class="flex items-center border border-gray-200 rounded-xl">
                  <button data-step="dec" class="w-10 h-11 flex items-center justify-center text-lg hover:bg-gray-50">−</button>
                  <input id="pdp-qty" type="text" value="1" readonly max={product.stock} class="w-12 text-center font-semibold border-0 focus:outline-none" />
                  <button data-step="inc" class="w-10 h-11 flex items-center justify-center text-lg hover:bg-gray-50">+</button>
                </div>
                <button
                  data-add-to-cart
                  data-pid={product.id}
                  data-qty-input="#pdp-qty"
                  class="flex-1 border-2 border-ok-green-800 text-ok-green-800 font-bold py-3 rounded-xl hover:bg-ok-green-50 transition-colors text-sm"
                >
                  <i class="fas fa-cart-plus mr-1"></i> কার্টে যুক্ত করুন
                </button>
              </div>
            )}

            <button
              data-buy-now
              data-pid={product.id}
              data-qty-input="#pdp-qty"
              disabled={isOutOfStock}
              class={`w-full font-bold py-3.5 rounded-xl transition-colors text-sm mb-6 ${
                isOutOfStock ? 'bg-ok-gray-300 text-ok-gray-500 cursor-not-allowed' : 'bg-ok-green-800 text-white hover:bg-ok-green-900'
              }`}
            >
              {isOutOfStock ? stockStatusLabel(product.stockStatus) : 'এখনই অর্ডার করুন'}
            </button>

            {/* Delivery / advance payment explanation */}
            <div class="bg-white border border-gray-100 rounded-2xl p-4 space-y-2.5">
              <div class="flex items-center justify-between text-sm">
                <span class="text-ok-gray-500 flex items-center gap-2"><i class="fas fa-truck text-ok-green-700"></i> ডেলিভারি চার্জ</span>
                <span class="font-semibold">{formatBDT(product.deliveryCharge)}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-ok-gray-500 flex items-center gap-2"><i class="fas fa-wallet text-ok-green-700"></i> এখন পরিশোধ করবেন</span>
                <span class="font-bold text-ok-green-800">{formatBDT(payment.payNow)}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-ok-gray-500 flex items-center gap-2"><i class="fas fa-hand-holding-dollar text-ok-green-700"></i> ডেলিভারির সময় পরিশোধ করবেন</span>
                <span class="font-bold">{formatBDT(payment.dueOnDelivery)}</span>
              </div>
              <p class="text-xs text-ok-gray-500 pt-1 border-t border-gray-100 mt-1 leading-relaxed">
                ডেলিভারি চার্জ আগে পরিশোধ করুন। বাকি টাকা পণ্য হাতে পাওয়ার সময় ক্যাশ অন ডেলিভারিতে পরিশোধ করবেন।
              </p>
            </div>
          </div>
        </div>

        {/* ============ DESCRIPTION / BENEFITS / SPECS ============ */}
        <div class="grid lg:grid-cols-3 gap-6 mt-10">
          <div class="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <h3 class="font-bold text-lg mb-3">পণ্যের বিস্তারিত</h3>
            <p class="text-sm text-ok-gray-600 leading-relaxed mb-5">{product.description}</p>

            <h4 class="font-bold text-sm mb-2">সুবিধা</h4>
            <ul class="space-y-2 mb-5">
              {product.benefits.map((b) => (
                <li class="flex items-start gap-2 text-sm text-ok-gray-600">
                  <i class="fas fa-circle-check text-ok-green-700 mt-0.5"></i> {b}
                </li>
              ))}
            </ul>

            <h4 class="font-bold text-sm mb-2">স্পেসিফিকেশন</h4>
            <div class="grid sm:grid-cols-2 gap-2">
              {product.specifications.map((s) => (
                <div class="flex justify-between text-sm border-b border-gray-50 py-2">
                  <span class="text-ok-gray-500">{s.label}</span>
                  <span class="font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 h-fit">
            <h3 class="font-bold text-sm mb-4 flex items-center gap-2">
              <i class="fas fa-shield-halved text-ok-green-800"></i> কেন OfferKini থেকে কিনবেন?
            </h3>
            <ul class="space-y-3 text-sm text-ok-gray-600">
              <li class="flex items-start gap-2"><i class="fas fa-check text-ok-green-700 mt-0.5"></i> True Price — কোনো ফেক ডিসকাউন্ট নয়</li>
              <li class="flex items-start gap-2"><i class="fas fa-check text-ok-green-700 mt-0.5"></i> স্বচ্ছ মূল্য নির্ধারণ</li>
              <li class="flex items-start gap-2"><i class="fas fa-check text-ok-green-700 mt-0.5"></i> ক্যাশ অন ডেলিভারি সুবিধা</li>
              <li class="flex items-start gap-2"><i class="fas fa-check text-ok-green-700 mt-0.5"></i> যাচাইকৃত মার্চেন্ট</li>
            </ul>
          </div>
        </div>

        {/* ============ PRICE PROOF ============ */}
        <div class="mt-10 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <h3 class="font-bold text-lg mb-1 flex items-center gap-2">
            <i class="fas fa-magnifying-glass-dollar text-ok-green-800"></i> প্রমাণ দেখুন — অন্যান্য পেজে দাম বেশি
          </h3>
          <p class="text-sm text-ok-gray-500 mb-4">OfferKini-তে দাম সবসময় স্বচ্ছ ও সত্যিকারের কম — এখানে যাচাই করে নিন।</p>
          <img
            src={PRICE_PROOF_IMAGE}
            alt="অন্যান্য পেজে দাম বেশি — প্রমাণ"
            class="w-40 sm:w-48 rounded-2xl border border-gray-100 shadow-ok-card"
          />
        </div>

        {/* ============ CUSTOMER REVIEWS (TRUST SLIDER) ============ */}
        {product.reviewProofs.length > 0 && (
          <div class="mt-6 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
            <h3 class="font-bold text-lg mb-1 flex items-center gap-2">
              <i class="fas fa-comments text-ok-green-800"></i> কাস্টমার রিভিউ
            </h3>
            <p class="text-sm text-ok-gray-500 mb-4">যারা আগে অর্ডার করেছেন তাদের রিভিউ দেখুন।</p>
            <ReviewProofSlider productId={product.id} proofs={product.reviewProofs} />
          </div>
        )}

        {/* ============ RELATED PRODUCTS ============ */}
        {related.length > 0 && (
          <div class="mt-10">
            <h3 class="font-bold text-lg mb-4">সম্পর্কিত পণ্য</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {related.map((p) => (
                <ProductCard product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
