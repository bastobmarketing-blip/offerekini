import type { FC } from 'hono/jsx'
import type { Category } from '../types'

export const CategoryCard: FC<{ category: Category }> = ({ category }) => (
  <a
    href={`/category/${category.slug}`}
    class="group flex flex-col items-center gap-2 sm:gap-3 shrink-0 w-[84px] sm:w-[110px]"
  >
    <div class="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-ok-green-50 border-2 border-transparent group-hover:border-ok-lime-500 transition-all duration-200 shadow-sm">
      <img src={category.image} alt={category.nameEn} class="w-full h-full object-cover" loading="lazy" />
    </div>
    <span class="text-xs sm:text-sm font-semibold text-ok-charcoal text-center leading-tight">{category.name}</span>
  </a>
)
