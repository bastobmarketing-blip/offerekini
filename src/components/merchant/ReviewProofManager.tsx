import type { FC } from 'hono/jsx'
import type { ReviewProof } from '../../types'

interface ReviewProofManagerProps {
  productId: string
  seedProofs: ReviewProof[]
}

// Lets a merchant (or admin) add/remove customer-review trust items —
// screenshots or YouTube video links — for one product. Server-seeded
// items (from src/data/products.ts) are passed in as `seedProofs`; anything
// the merchant adds/removes on top is tracked client-side in localStorage
// (see initReviewProofManagers() in public/static/js/app.js) since this is
// a frontend-only prototype with no backend to persist to.
export const ReviewProofManager: FC<ReviewProofManagerProps> = ({ productId, seedProofs }) => (
  <div data-review-proof-manager data-product-id={productId} data-seed-proofs={JSON.stringify(seedProofs)}>
    <div data-review-proof-track class="flex gap-3 overflow-x-auto pb-2"></div>

    <form data-review-proof-add-form class="flex flex-wrap items-end gap-2 mt-3 border-t border-gray-100 pt-3">
      <div>
        <label class="block text-xs font-semibold text-ok-gray-500 mb-1">টাইপ</label>
        <select name="proofType" class="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ok-lime-400">
          <option value="image">ছবি (Image URL)</option>
          <option value="video">ভিডিও (YouTube Link)</option>
        </select>
      </div>
      <div class="flex-1 min-w-[180px]">
        <label class="block text-xs font-semibold text-ok-gray-500 mb-1">লিংক</label>
        <input
          name="proofUrl"
          type="text"
          placeholder="ছবির URL অথবা YouTube লিংক দিন"
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ok-lime-400"
        />
      </div>
      <button type="submit" class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-semibold px-4 py-2 rounded-lg text-sm whitespace-nowrap">
        <i class="fas fa-plus mr-1"></i> যুক্ত করুন
      </button>
    </form>
    <p class="text-xs text-ok-gray-400 mt-2">কাস্টমার এই ছবি/ভিডিওগুলো প্রোডাক্ট পেজে "কাস্টমার রিভিউ" সেকশনে দেখতে পাবে।</p>
  </div>
)
