import fs from 'node:fs'
import path from 'node:path'

export interface DetectedSection {
  id: string
  title: string
  enabled: boolean
}

const SECTIONS_FILE = path.resolve(process.cwd(), 'data/landing_page_sections.json')

function loadStoredVisibility(): Record<string, Record<string, boolean>> {
  try {
    if (fs.existsSync(SECTIONS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SECTIONS_FILE, 'utf-8'))
      if (typeof data === 'object' && data !== null) {
        return data
      }
    }
  } catch (e) {}
  return {}
}

function saveStoredVisibility(data: Record<string, Record<string, boolean>>): void {
  try {
    const dir = path.dirname(SECTIONS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(SECTIONS_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (e) {}
}

export function getSectionVisibility(slug: string): Record<string, boolean> {
  const all = loadStoredVisibility()
  return all[slug] || {}
}

export function saveSectionVisibility(slug: string, visibility: Record<string, boolean>): Record<string, boolean> {
  const all = loadStoredVisibility()
  all[slug] = { ...(all[slug] || {}), ...visibility }
  saveStoredVisibility(all)
  return all[slug]
}

/**
 * Automatically scans a landing page's code/HTML to discover all sections.
 * Any new section added to the landing page in the future will automatically
 * appear in the admin section list!
 */
export function scanLandingPageSections(slug: string): DetectedSection[] {
  const visibility = getSectionVisibility(slug)

  // 1. Check if there is an HTML file for this slug (e.g. public/testo_king/index.html)
  const candidateHtmlPaths = [
    path.resolve(process.cwd(), `public/${slug}/index.html`),
    path.resolve(process.cwd(), `public/${slug.replace(/-/g, '_')}/index.html`),
    path.resolve(process.cwd(), `public/${slug.replace(/_/g, '-')}/index.html`)
  ]

  let htmlContent = ''
  for (const p of candidateHtmlPaths) {
    if (fs.existsSync(p)) {
      htmlContent = fs.readFileSync(p, 'utf-8')
      break
    }
  }

  if (htmlContent) {
    const sections: DetectedSection[] = []
    const sectionRegex = /<section([^>]*)>(.*?)(?=<\/section>|$)/gis
    let match: RegExpExecArray | null
    let index = 1

    while ((match = sectionRegex.exec(htmlContent)) !== null) {
      const attrs = match[1] || ''
      const body = match[2] || ''

      // Extract ID or generate one
      const idMatch = attrs.match(/id=["']([^"']+)["']/i)
      const dataTitleMatch = attrs.match(/data-title=["']([^"']+)["']/i)
      const classMatch = attrs.match(/class=["']([^"']+)["']/i)
      const h2Match = body.match(/<h2[^>]*>(.*?)<\/h2>/i)
      const h3Match = body.match(/<h3[^>]*>(.*?)<\/h3>/i)

      let secId = idMatch ? idMatch[1] : (classMatch ? classMatch[1].split(' ')[0] : `sec-${index}`)
      secId = secId.trim()

      let title = ''
      if (dataTitleMatch) {
        title = dataTitleMatch[1]
      } else if (h2Match) {
        title = h2Match[1].replace(/<[^>]+>/g, '').trim()
      } else if (h3Match) {
        title = h3Match[1].replace(/<[^>]+>/g, '').trim()
      } else if (classMatch) {
        title = classMatch[1].split(' ')[0]
      } else {
        title = `সেকশন ${index}`
      }

      // Friendly fallback names
      if (secId === 'top' || secId === 'hero') {
        title = '১. হিরো ব্যানার ও তাৎক্ষণিক অফার (Hero)'
      } else if (secId === 'reviews') {
        title = '৫. কাস্টমার ভিডিও রিভিউ (Video Reviews)'
      } else if (secId === 'order') {
        title = '৬. প্যাকেজ ও অর্ডার ফর্ম (Packages & Order Form)'
      }

      // Check current visibility (default true, except 'reviews' defaults to false if not set)
      let isEnabled = true
      if (visibility[secId] !== undefined) {
        isEnabled = Boolean(visibility[secId])
      } else if (secId === 'reviews') {
        isEnabled = false // Default reviews to false until admin enables it
      }

      sections.push({
        id: secId,
        title,
        enabled: isEnabled
      })

      index++
    }

    return sections
  }

  // 2. Fallback for TSX / Dynamic Landing Pages (e.g. Focus King)
  const defaultDynamicSections: DetectedSection[] = [
    { id: 'hero', title: '১. হিরো ব্যানার ও অফার বিবরণ', enabled: visibility['hero'] ?? true },
    { id: 'pillars', title: '২. মূল কার্যকারিতা ও বেনিফিট পিলারস', enabled: visibility['pillars'] ?? true },
    { id: 'comparison', title: '৩. সাধারণ বনাম প্রিমিয়াম তুলনা', enabled: visibility['comparison'] ?? true },
    { id: 'reviews', title: '৪. কাস্টমার রিভিউ ও টেস্টিমোনিয়াল', enabled: visibility['reviews'] ?? false },
    { id: 'order', title: '৫. প্যাকেজ সিলেক্টর ও অর্ডার ফর্ম', enabled: visibility['order'] ?? true },
    { id: 'faq', title: '৬. সচরাচর জিজ্ঞাসা (FAQ)', enabled: visibility['faq'] ?? true },
    { id: 'sticky', title: '৭. মোবাইল স্টিকি বটম বার', enabled: visibility['sticky'] ?? true }
  ]

  return defaultDynamicSections
}

/**
 * Injects display:none !important on sections that are toggled off by admin,
 * and ensures enabled sections are visible.
 */
export function applySectionVisibilityToHtml(html: string, visibility: Record<string, boolean>): string {
  let result = html

  for (const [secId, enabled] of Object.entries(visibility)) {
    if (!enabled) {
      // Hide this section: find <section ... id="secId" ...> and add style="display:none !important;"
      const idPattern = new RegExp(`(<section[^>]*id=["']${secId}["'][^>]*)>`, 'gi')
      result = result.replace(idPattern, (match, prefix) => {
        if (/style=["']/i.test(prefix)) {
          return prefix.replace(/style=["']([^"']*)["']/i, 'style="$1; display:none !important;"') + '>'
        }
        return `${prefix} style="display:none !important;">`
      })
    } else {
      // Ensure section is visible: remove any display:none if present
      const idPattern = new RegExp(`(<section[^>]*id=["']${secId}["'][^>]*)>`, 'gi')
      result = result.replace(idPattern, (match, prefix) => {
        return prefix.replace(/style=["'][^"']*display\s*:\s*none[^"']*["']/gi, '') + '>'
      })
    }
  }

  return result
}
