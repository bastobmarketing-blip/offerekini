import type { Product } from '../types'

// Centralized pricing logic. UI components should call these helpers
// instead of computing prices/savings inline in JSX. This keeps business
// logic swappable when a real backend/pricing-engine is introduced.

export function calcSavings(referencePrice: number, offerKiniPrice: number): number {
  return Math.max(0, referencePrice - offerKiniPrice)
}

export function calcSavingsPercent(referencePrice: number, offerKiniPrice: number): number {
  if (referencePrice <= 0) return 0
  return Math.round((calcSavings(referencePrice, offerKiniPrice) / referencePrice) * 100)
}

export interface OrderPaymentBreakdown {
  productTotal: number
  deliveryCharge: number
  payNow: number // delivery charge, paid in advance
  dueOnDelivery: number // remaining product price
  grandTotal: number
}

/**
 * OfferKini's core payment model:
 * - Customer pays the delivery charge in advance at checkout.
 * - The full product price is paid in cash on delivery.
 */
export function computeOrderPayment(
  unitPrice: number,
  quantity: number,
  deliveryCharge: number
): OrderPaymentBreakdown {
  const productTotal = unitPrice * quantity
  return {
    productTotal,
    deliveryCharge,
    payNow: deliveryCharge,
    dueOnDelivery: productTotal,
    grandTotal: productTotal + deliveryCharge
  }
}

export function stockStatusLabel(status: Product['stockStatus']): string {
  switch (status) {
    case 'in_stock':
      return 'স্টকে আছে'
    case 'low_stock':
      return 'সীমিত স্টক'
    case 'out_of_stock':
      return 'স্টক আউট'
  }
}

export function badgeLabel(badge?: Product['badge']): string {
  switch (badge) {
    case 'true_price':
      return 'True Price'
    case 'best_deal':
      return 'Best Deal'
    case 'featured':
      return 'Featured'
    case 'new':
      return 'New'
    case 'limited_deal':
      return 'Limited Deal'
    default:
      return ''
  }
}
