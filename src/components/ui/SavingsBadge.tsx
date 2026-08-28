import type { FC } from 'hono/jsx'
import type { ProductBadge } from '../../types'
import { badgeLabel } from '../../utils/pricing'

const BADGE_STYLES: Record<ProductBadge, string> = {
  true_price: 'bg-ok-green-800 text-white',
  best_deal: 'bg-ok-lime-500 text-ok-green-900',
  featured: 'bg-ok-charcoal text-white',
  new: 'bg-blue-600 text-white',
  limited_deal: 'bg-ok-red text-white'
}

export const SavingsBadge: FC<{ badge?: ProductBadge; className?: string }> = ({ badge, className = '' }) => {
  if (!badge) return null
  return (
    <span class={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold tracking-wide ${BADGE_STYLES[badge]} ${className}`}>
      {badgeLabel(badge)}
    </span>
  )
}
