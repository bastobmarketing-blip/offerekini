import type { FC } from 'hono/jsx'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export const EmptyState: FC<EmptyStateProps> = ({ icon = 'fa-inbox', title, description, actionLabel, actionHref }) => (
  <div class="flex flex-col items-center justify-center text-center py-16 px-4">
    <div class="w-16 h-16 rounded-full bg-ok-green-50 flex items-center justify-center mb-4">
      <i class={`fas ${icon} text-2xl text-ok-green-800`}></i>
    </div>
    <h3 class="font-bold text-lg text-ok-charcoal mb-1">{title}</h3>
    {description && <p class="text-sm text-ok-gray-500 max-w-sm mb-5">{description}</p>}
    {actionLabel && actionHref && (
      <a href={actionHref} class="bg-ok-green-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-ok-green-900 transition-colors">
        {actionLabel}
      </a>
    )}
  </div>
)
