import type { FC } from 'hono/jsx'
import type { OrderTimelineStep } from '../types'
import { formatDateShort } from '../utils/format'

interface OrderTimelineProps {
  timeline: OrderTimelineStep[]
  isCancelled?: boolean
}

// Vertical (mobile) / horizontal (desktop) order progress timeline.
export const OrderTimeline: FC<OrderTimelineProps> = ({ timeline, isCancelled }) => (
  <div class="flex flex-col gap-0">
    {timeline.map((step, i) => {
      const isLast = i === timeline.length - 1
      const cancelledStep = isCancelled && isLast
      return (
        <div class="flex gap-4">
          <div class="flex flex-col items-center">
            <div
              class={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                cancelledStep
                  ? 'bg-ok-red text-white'
                  : step.done
                  ? 'bg-ok-green-800 text-white'
                  : 'bg-gray-100 text-ok-gray-400'
              }`}
            >
              <i class={`fas ${cancelledStep ? 'fa-xmark' : step.done ? 'fa-check' : 'fa-circle'} text-xs`}></i>
            </div>
            {!isLast && <div class={`w-0.5 flex-1 min-h-[28px] ${step.done ? 'bg-ok-green-800' : 'bg-gray-200'}`}></div>}
          </div>
          <div class="pb-6 -mt-0.5">
            <p class={`font-semibold text-sm ${step.done ? 'text-ok-charcoal' : 'text-ok-gray-400'}`}>{step.label}</p>
            {step.timestamp && <p class="text-xs text-ok-gray-500 mt-0.5">{formatDateShort(step.timestamp)}</p>}
          </div>
        </div>
      )
    })}
  </div>
)
