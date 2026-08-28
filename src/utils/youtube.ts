// Centralized YouTube URL parsing so components never need to hand-roll
// regexes. Accepts a full YouTube URL (watch/shorts/youtu.be/embed) or a
// bare 11-char video ID and always returns just the video ID (or null).

export function extractYouTubeId(input?: string | null): string | null {
  if (!input) return null
  const trimmed = input.trim()
  if (!trimmed) return null

  // Already looks like a bare video ID (11 chars, YouTube's alphabet)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed

  try {
    const url = new URL(trimmed)
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '') || null
    }
    if (url.hostname.includes('youtube.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v')
      const match = url.pathname.match(/\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/)
      if (match) return match[2]
    }
  } catch {
    // Not a valid URL — fall through to null
  }
  return null
}
