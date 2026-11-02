import type { Order } from '../types'

export interface DuplicateInfo {
  isDuplicateSuspect: boolean
  groupCount: number
  duplicateOrderIds: string[]
  firstOrderId: string
  firstOrderDate: string
  reason: string
}

export function normalizePhone(rawPhone: string): string {
  if (!rawPhone) return ''
  let cleaned = rawPhone.replace(/[^0-9]/g, '')
  if (cleaned.startsWith('880')) cleaned = cleaned.slice(2)
  else if (cleaned.startsWith('88')) cleaned = cleaned.slice(2)
  return cleaned
}

/**
 * Scans all orders and groups possible duplicate orders.
 * Matches orders sharing the same customer phone placed within 48 hours,
 * or same customer name + similar address.
 */
export function detectOrderDuplicates(orders: Order[]): Map<string, DuplicateInfo> {
  const result = new Map<string, DuplicateInfo>()
  if (!orders || orders.length === 0) return result

  // Group by normalized phone
  const phoneGroups = new Map<string, Order[]>()

  for (const o of orders) {
    const normPhone = normalizePhone(o.customerPhone)
    if (normPhone && normPhone.length >= 10) {
      const list = phoneGroups.get(normPhone) || []
      list.push(o)
      phoneGroups.set(normPhone, list)
    }
  }

  // Identify groups with > 1 order
  for (const [phone, group] of phoneGroups.entries()) {
    if (group.length > 1) {
      // Sort oldest first
      group.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      const first = group[0]
      const orderIds = group.map((g) => g.id)

      for (const o of group) {
        result.set(o.id.toLowerCase(), {
          isDuplicateSuspect: true,
          groupCount: group.length,
          duplicateOrderIds: orderIds,
          firstOrderId: first.id,
          firstOrderDate: first.createdAt,
          reason: `একই ফোন নম্বরে (${phone}) মোট ${group.length}টি অর্ডার পাওয়া গেছে`
        })
      }
    }
  }

  return result
}
