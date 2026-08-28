import type { FC } from 'hono/jsx'

interface DocumentProps {
  title: string
  description?: string
  children: any
  bodyClass?: string
}

// Shared HTML document shell. Sets up Tailwind (CDN/Play), brand color
// tokens, Google Fonts, FontAwesome and the global stylesheet + scripts.
// Every layout (Customer / Merchant / Admin) renders through this.
export const Document: FC<DocumentProps> = ({ title, description, children, bodyClass }) => {
  return (
    <html lang="bn">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} | OfferKini</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" type="image/png" href="/static/images/brand/offerkini-logo.png" />

        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />

        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Hind Siliguri', 'Inter', 'sans-serif'],
                  },
                  colors: {
                    'ok-green': {
                      50: '#eaf5f0', 100: '#cfe9dc', 300: '#7fbf9f', 500: '#1f7a56',
                      600: '#186449', 700: '#145c45', 800: '#0f4c3a', 900: '#0b3d2e'
                    },
                    'ok-lime': {
                      300: '#ccf474', 400: '#b9ec4f', 500: '#a6e22e', 600: '#8fc925'
                    },
                    'ok-charcoal': '#1c1f1e',
                    'ok-red': '#d9362f'
                  },
                  boxShadow: {
                    'ok-card': '0 2px 10px rgba(11,61,46,0.06)',
                    'ok-card-hover': '0 8px 24px rgba(11,61,46,0.12)'
                  }
                }
              }
            }
          `
        }} />
        <script src="/static/js/app.js"></script>
      </head>
      <body class={bodyClass || 'bg-ok-offwhite text-ok-charcoal'} style="background:#f6f8f6;">
        {children}
        <div id="toast-root"></div>
      </body>
    </html>
  )
}
