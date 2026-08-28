import type { Settlement } from '../types'

export const settlements: Settlement[] = [
  { id: 'STL-2026-001', merchantId: 'mer-1', date: '2026-07-05', orderCount: 24, grossAmount: 32400, adjustments: -400, netAmount: 32000, status: 'paid' },
  { id: 'STL-2026-002', merchantId: 'mer-1', date: '2026-07-19', orderCount: 31, grossAmount: 41850, adjustments: 0, netAmount: 41850, status: 'paid' },
  { id: 'STL-2026-003', merchantId: 'mer-1', date: '2026-08-02', orderCount: 18, grossAmount: 24200, adjustments: -200, netAmount: 24000, status: 'approved' },
  { id: 'STL-2026-004', merchantId: 'mer-1', date: '2026-08-16', orderCount: 12, grossAmount: 16800, adjustments: 0, netAmount: 16800, status: 'pending' },
  { id: 'STL-2026-005', merchantId: 'mer-2', date: '2026-07-12', orderCount: 15, grossAmount: 19500, adjustments: -150, netAmount: 19350, status: 'paid' },
  { id: 'STL-2026-006', merchantId: 'mer-2', date: '2026-07-26', orderCount: 20, grossAmount: 26800, adjustments: 0, netAmount: 26800, status: 'paid' },
  { id: 'STL-2026-007', merchantId: 'mer-2', date: '2026-08-09', orderCount: 11, grossAmount: 14300, adjustments: -100, netAmount: 14200, status: 'disputed' },
  { id: 'STL-2026-008', merchantId: 'mer-2', date: '2026-08-23', orderCount: 8, grossAmount: 10900, adjustments: 0, netAmount: 10900, status: 'pending' },
  { id: 'STL-2026-009', merchantId: 'mer-3', date: '2026-07-08', orderCount: 42, grossAmount: 61200, adjustments: -600, netAmount: 60600, status: 'paid' },
  { id: 'STL-2026-010', merchantId: 'mer-3', date: '2026-07-22', orderCount: 38, grossAmount: 55400, adjustments: 0, netAmount: 55400, status: 'paid' },
  { id: 'STL-2026-011', merchantId: 'mer-3', date: '2026-08-05', orderCount: 29, grossAmount: 42100, adjustments: -300, netAmount: 41800, status: 'approved' },
  { id: 'STL-2026-012', merchantId: 'mer-3', date: '2026-08-19', orderCount: 21, grossAmount: 30500, adjustments: 0, netAmount: 30500, status: 'pending' }
]

export function getSettlementsByMerchant(merchantId: string): Settlement[] {
  return settlements.filter((s) => s.merchantId === merchantId)
}
