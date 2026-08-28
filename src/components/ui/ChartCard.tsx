import type { FC } from 'hono/jsx'

interface ChartCardProps {
  title: string
  canvasId: string
  height?: number
  className?: string
}

// Thin wrapper around a <canvas> for Chart.js. The actual chart config/data
// is passed via an inline script from the page (keeps this component dumb —
// business/reporting data stays in the page, not hard-coded in the component).
export const ChartCard: FC<ChartCardProps> = ({ title, canvasId, height = 260, className = '' }) => (
  <div class={`bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 ${className}`}>
    <h3 class="font-bold text-sm mb-4">{title}</h3>
    <div class="chart-wrap" style={`height:${height}px`}>
      <canvas id={canvasId}></canvas>
    </div>
  </div>
)
