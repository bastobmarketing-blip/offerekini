import type { FC } from 'hono/jsx'

interface YouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
}

// Lightweight "facade" YouTube embed: renders only a thumbnail + play button
// on first load (no iframe, no YouTube JS), and swaps in the real iframe
// only after the user clicks — keeps the homepage fast while still giving a
// one-click, in-page video experience.
export const YouTubeEmbed: FC<YouTubeEmbedProps> = ({ videoId, title, className = '' }) => (
  <div
    class={`yt-facade relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black cursor-pointer group ${className}`}
    style={`aspect-ratio:16/9; background-image:url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg'); background-size:cover; background-position:center;`}
    data-yt-facade
    data-video-id={videoId}
    data-video-title={title}
    role="button"
    tabindex={0}
    aria-label={`ভিডিও চালু করুন: ${title}`}
  >
    <div class="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center">
      <span class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-ok-lime-500 text-ok-green-900 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
        <i class="fas fa-play text-2xl sm:text-3xl ml-0.5"></i>
      </span>
    </div>
    <span class="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white text-xs sm:text-sm font-semibold drop-shadow">
      <i class="fas fa-circle-play mr-1.5"></i>{title}
    </span>
  </div>
)
