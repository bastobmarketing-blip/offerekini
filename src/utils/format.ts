// Formatting helpers — centralized so UI components never hard-code
// currency/number formatting logic.

export function formatBDT(amount: number): string {
  const rounded = Math.round(amount)
  return '৳' + rounded.toLocaleString('en-US')
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

export function formatDateBn(iso: string): string {
  const d = new Date(iso)
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ]
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function timeAgoBn(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'এখনই'
  if (mins < 60) return `${mins} মিনিট আগে`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} ঘন্টা আগে`
  const days = Math.floor(hrs / 24)
  return `${days} দিন আগে`
}
