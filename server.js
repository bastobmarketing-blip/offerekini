import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import app from './src/index.tsx'

// Serve static files from /public directory
app.use('/static/*', serveStatic({ root: './public' }))

// Serve favicon and well-known
app.use('/favicon.ico', serveStatic({ path: './public/static/images/brand/offerkini-logo.png' }))

const port = parseInt(process.env.PORT || '3000')

console.log(`🚀 Server running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
