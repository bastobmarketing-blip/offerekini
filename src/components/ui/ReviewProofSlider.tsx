import type { FC } from 'hono/jsx'
import type { ReviewProof } from '../../types'
import { extractYouTubeId } from '../../utils/youtube'
import { YouTubeEmbed } from './YouTubeEmbed'

interface ReviewProofSliderProps {
  productId: string
  proofs: ReviewProof[]
  className?: string
}

// Horizontal, swipeable slider of customer-trust proofs (screenshots and/or
// short review videos) shown under a product's details. `proofs` is the
// server-seeded list from Product.reviewProofs (src/data/products.ts).
// The slider is server-rendered with that seed list, then re-rendered
// client-side (see initReviewProofManagers()/renderPdpReviewProofs() in
// public/static/js/app.js) merged with any items a merchant/admin has
// added or removed via the merchant product edit page — this is a
// frontend-only prototype, so that merchant state lives in localStorage
// rather than a real backend, same pattern as the shopping cart.
export const ReviewProofSlider: FC<ReviewProofSliderProps> = ({ productId, proofs, className = '' }) => {
  if (!proofs || proofs.length === 0) return null

  return (
    <div
      data-review-proof-viewer
      data-product-id={productId}
      data-seed-proofs={JSON.stringify(proofs.map((p) => ({ ...p, videoId: p.type === 'video' ? extractYouTubeId(p.url) : undefined })))}
      class={`flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory ${className}`}
    >
      {proofs.map((proof) => {
        const videoId = proof.type === 'video' ? extractYouTubeId(proof.url) : null
        return (
          <div class="w-40 sm:w-48 shrink-0 snap-start">
            {proof.type === 'video' && videoId ? (
              <YouTubeEmbed videoId={videoId} title="কাস্টমার রিভিউ ভিডিও" />
            ) : (
              <img
                src={proof.url}
                alt="কাস্টমার রিভিউ"
                class="w-full aspect-square object-cover rounded-2xl border border-gray-100 shadow-ok-card"
                loading="lazy"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
