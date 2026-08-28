import type { FC } from 'hono/jsx'

interface StatusBadgeProps {
  label: string
  tone?: 'green' | 'lime' | 'red' | 'gray' | 'blue' | 'orange'
  className?: string
}

const TONE_STYLES: Record<string, string> = {
  green: 'bg-ok-green-50 text-ok-green-800 border border-ok-green-100',
  lime: 'bg-ok-lime-500/20 text-ok-green-800 border border-ok-lime-500/30',
  red: 'bg-red-50 text-ok-red border border-red-100',
  gray: 'bg-gray-100 text-ok-gray-700 border border-gray-200',
  blue: 'bg-blue-50 text-blue-700 border border-blue-100',
  orange: 'bg-orange-50 text-orange-700 border border-orange-100'
}

export const StatusBadge: FC<StatusBadgeProps> = ({ label, tone = 'gray', className = '' }) => (
  <span class={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${TONE_STYLES[tone]} ${className}`}>
    {label}
  </span>
)

// Helper maps so pages don't hard-code status → tone/label mapping repeatedly
export function orderStatusTone(status: string): 'green' | 'lime' | 'red' | 'gray' | 'blue' | 'orange' {
  switch (status) {
    case 'delivered':
      return 'green'
    case 'shipped':
    case 'ready':
      return 'blue'
    case 'processing':
    case 'accepted':
      return 'lime'
    case 'pending':
      return 'orange'
    case 'cancelled':
    case 'returned':
      return 'red'
    default:
      return 'gray'
  }
}

export function orderStatusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: 'পেন্ডিং',
    accepted: 'গ্রহণ করা হয়েছে',
    processing: 'প্রসেসিং',
    ready: 'প্রস্তুত',
    shipped: 'শিপড',
    delivered: 'ডেলিভারড',
    cancelled: 'বাতিল',
    returned: 'রিটার্ন'
  }
  return map[status] || status
}

export function productStatusTone(status: string): 'green' | 'lime' | 'red' | 'gray' | 'blue' | 'orange' {
  switch (status) {
    case 'approved':
      return 'green'
    case 'pending_review':
      return 'orange'
    case 'draft':
      return 'gray'
    case 'rejected':
      return 'red'
    case 'out_of_stock':
      return 'red'
    case 'hidden':
      return 'gray'
    default:
      return 'gray'
  }
}

export function productStatusLabel(status: string): string {
  const map: Record<string, string> = {
    draft: 'Draft',
    pending_review: 'Pending Review',
    approved: 'Approved',
    rejected: 'Rejected',
    out_of_stock: 'Out of Stock',
    hidden: 'Hidden'
  }
  return map[status] || status
}

export function settlementStatusTone(status: string): 'green' | 'lime' | 'red' | 'gray' | 'blue' | 'orange' {
  switch (status) {
    case 'paid':
      return 'green'
    case 'approved':
      return 'blue'
    case 'pending':
      return 'orange'
    case 'disputed':
      return 'red'
    default:
      return 'gray'
  }
}
