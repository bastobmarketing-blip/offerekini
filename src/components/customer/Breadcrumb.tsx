import type { FC } from 'hono/jsx'

interface Crumb {
  label: string
  href?: string
}

export const Breadcrumb: FC<{ items: Crumb[] }> = ({ items }) => (
  <nav class="flex items-center gap-1.5 text-xs text-ok-gray-500 flex-wrap">
    <a href="/" class="hover:text-ok-green-800">হোম</a>
    {items.map((item) => (
      <>
        <i class="fas fa-chevron-right text-[9px]"></i>
        {item.href ? (
          <a href={item.href} class="hover:text-ok-green-800">{item.label}</a>
        ) : (
          <span class="text-ok-charcoal font-medium">{item.label}</span>
        )}
      </>
    ))}
  </nav>
)
