import type { FC } from 'hono/jsx'

export const StaticPageHeader: FC<{ title: string; subtitle?: string; icon?: string }> = ({ title, subtitle, icon }) => (
  <div class="bg-ok-green-900 text-white py-10 sm:py-14">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      {icon && <i class={`fas ${icon} text-3xl text-ok-lime-400 mb-4`}></i>}
      <h1 class="text-2xl sm:text-3xl font-extrabold">{title}</h1>
      {subtitle && <p class="text-white/70 text-sm sm:text-base mt-2 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  </div>
)
