import type { FC } from 'hono/jsx'

interface DataCardProps {
  label: string
  value: string
  icon: string
  tone?: 'green' | 'lime' | 'red' | 'blue' | 'orange' | 'gray'
  trend?: { value: string; positive: boolean }
}

const TONE_BG: Record<string, string> = {
  green: 'bg-ok-green-50 text-ok-green-800',
  lime: 'bg-ok-lime-500/15 text-ok-green-800',
  red: 'bg-red-50 text-ok-red',
  blue: 'bg-blue-50 text-blue-700',
  orange: 'bg-orange-50 text-orange-700',
  gray: 'bg-gray-100 text-ok-gray-700'
}

export const DataCard: FC<DataCardProps> = ({ label, value, icon, tone = 'green', trend }) => (
  <div class="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5">
    <div class="flex items-center justify-between mb-3">
      <div class={`w-10 h-10 rounded-xl flex items-center justify-center ${TONE_BG[tone]}`}>
        <i class={`fas ${icon}`}></i>
      </div>
      {trend && (
        <span class={`text-xs font-bold flex items-center gap-1 ${trend.positive ? 'text-ok-green-700' : 'text-ok-red'}`}>
          <i class={`fas ${trend.positive ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`}></i>
          {trend.value}
        </span>
      )}
    </div>
    <p class="text-xl sm:text-2xl font-extrabold text-ok-charcoal leading-tight">{value}</p>
    <p class="text-xs text-ok-gray-500 mt-1">{label}</p>
  </div>
)
