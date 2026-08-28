import type { FC } from 'hono/jsx'
import { formatBDT } from '../../utils/format'

interface PriceDisplayProps {
  referencePrice: number
  offerKiniPrice: number
  savings: number
  size?: 'sm' | 'md' | 'lg'
  layout?: 'row' | 'stack'
}

// Reusable strong price-comparison block used on product cards, product
// detail pages and checkout. Never compute pricing inline in JSX — values
// are passed in already derived from src/utils/pricing.ts.
export const PriceDisplay: FC<PriceDisplayProps> = ({
  referencePrice,
  offerKiniPrice,
  savings,
  size = 'md',
  layout = 'row'
}) => {
  const priceSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-base' : 'text-xl'
  const refSize = size === 'lg' ? 'text-base' : 'text-xs'

  return (
    <div class={layout === 'row' ? 'flex items-end gap-3 flex-wrap' : 'flex flex-col gap-1'}>
      <div>
        <div class={`text-ok-gray-500 ${refSize} leading-none`}>অন্যান্য পেজে</div>
        <div class={`text-ok-gray-500 line-through ${refSize === 'text-base' ? 'text-lg' : 'text-sm'} font-medium`}>
          {formatBDT(referencePrice)}
        </div>
      </div>
      <div>
        <div class={`text-ok-green-800 ${refSize} leading-none font-medium`}>OfferKini</div>
        <div class={`${priceSize} font-extrabold text-ok-green-800 leading-tight`}>{formatBDT(offerKiniPrice)}</div>
      </div>
      {savings > 0 && (
        <div class="bg-ok-lime-500/20 text-ok-green-800 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap">
          আপনি বাঁচাচ্ছেন {formatBDT(savings)}
        </div>
      )}
    </div>
  )
}
