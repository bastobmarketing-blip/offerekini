# OfferKini.com — True Price Commerce Platform (Frontend/UI Prototype)

## Project Overview
- **Name**: OfferKini
- **Positioning**: True Price Commerce Platform — "দাম কম, কথা পরিষ্কার।"
- **Goal**: A high-fidelity **frontend-only UI prototype** for a Bangladeshi e-commerce marketplace built around transparent, genuinely low prices (no fake discounts), with a distinctive payment model: **delivery charge paid in advance, remaining product price paid on delivery (COD)**.
- **Stack**: Hono (JSX, server-rendered) + TypeScript + Tailwind CSS (CDN) + vanilla client JS, deployed to Cloudflare Pages/Workers. No backend, no database, no real auth/payment/courier integration — all data is centralized mock data (`src/data/`) and client-side `localStorage` state (cart, last order).

## Live URL (sandbox preview)
https://3000-idzsc38hlfries95zncuv-b237eb32.sandbox.novita.ai

## What's Completed

### Customer-facing site (Bangla-first UI)
- `/` — Homepage: Hero, Today's Best Deals, Categories, True Price section, Featured Products, New Arrivals, How It Works, "Why delivery advance?" explainer, Trust section, CTA
- `/products` — All products with sort + category/filter sidebar
- `/category/:slug` — Category listing (7 categories: ফ্যাশন, বিউটি, হোম & কিচেন, ইলেকট্রনিক্স, লাইফস্টাইল, কিডস, অন্যান্য)
- `/product/:slug` — Full product detail: gallery, strong price-comparison block, variants, qty stepper, add-to-cart/buy-now, delivery/advance payment breakdown, specs, benefits, click-to-play "how to use this product" YouTube video, "প্রমাণ দেখুন" price-proof screenshot, customer-review trust slider (image/video cards), related products
- `/search` — Live query search over mock catalog
- `/cart`, `/checkout` — Client-rendered from `localStorage` cart; checkout shows product total / delivery charge / pay-now (advance) / due-on-delivery breakdown; demo-only order submission
- `/order-success`, `/track-order` — Order confirmation + order timeline tracking (demo: try `OK-10245` + phone `01711-112233`)
- `/account`, `/account/orders`, `/account/order/:id` — Demo customer dashboard (fixed demo customer, no real session)
- `/login`, `/register` — Demo-only forms (no real auth)
- `/about`, `/how-it-works`, `/contact`, `/privacy`, `/terms`, `/delivery-policy`, `/return-policy` — All static/informational pages complete

### Merchant panel (`/merchant/*`)
- `/merchant/login` — Demo login (any input accepted)
- `/merchant/dashboard` — Order-status cards, sales/settlement KPIs, 7-day sales chart (Chart.js), recent orders, quick actions
- `/merchant/products`, `/merchant/products/new` (full form: images, specs, variants, pricing w/ live savings preview), `/merchant/products/:id` (edit — includes "how to use" video URL field + a customer-review trust-slider manager where the merchant adds/removes image or YouTube-video proof cards per product)
- `/merchant/orders`, `/merchant/orders/:id` (with demo status-transition action buttons)
- `/merchant/earnings` (gross/delivered/pending/paid + chart + settlement history)
- `/merchant/settlements`, `/merchant/store`, `/merchant/profile`, `/merchant/settings`

### Admin panel (`/admin/*`)
- `/admin/login` — Demo login
- `/admin/dashboard` — Full KPI grid (today's orders/revenue, delivered/cancelled/returned, active merchants/products, pending settlements), revenue trend + delivered-vs-cancelled charts, top product/merchant

### Shared architecture (backend-ready)
- `src/types/` — Central TypeScript interfaces (Product, Order, Merchant, Customer, Settlement, etc.)
- `src/data/` — Mock data modules (3 merchants, 12 products, 7 categories, 20 orders, 12 settlements, 6 customers) — each exposes getter functions so pages never inline fake data
- `src/utils/pricing.ts`, `src/utils/format.ts` — All price/savings/payment-split math centralized here, never computed inline in JSX
- `src/components/` — Reusable UI kit: Button, PriceDisplay, SavingsBadge, StatusBadge, ProductCard, CategoryCard, OrderTimeline, EmptyState, FormField, DataCard, ChartCard, Document (HTML shell)
- `src/layouts/` — `CustomerLayout`, `MerchantLayout`, `AdminLayout`
- `public/static/js/app.js` — Client cart engine (localStorage), toasts, mobile drawers, variant/qty selectors, click-to-play YouTube facade embeds (delegated, works for dynamic content too), and a merchant review-proof add/delete manager (localStorage-backed, layered on top of server-seeded `Product.reviewProofs`) — single source of truth for client state, exposed as `window.OK`
- `src/utils/youtube.ts` — Parses a YouTube URL (watch/shorts/youtu.be/embed) or bare video ID into just the video ID, used by `YouTubeEmbed`/`ReviewProofSlider`
- `src/components/ui/YouTubeEmbed.tsx` — Lightweight click-to-play YouTube "facade" (thumbnail + play button only until clicked, no iframe/YT JS loaded upfront) — used for the homepage "how OfferKini works" video and each product's "how to use" video
- `src/components/ui/ReviewProofSlider.tsx` — Customer-facing trust slider on the PDP; server-renders the seed `reviewProofs`, then re-renders client-side merged with any merchant-added/removed items from localStorage
- `src/components/merchant/ReviewProofManager.tsx` — Merchant-side add/delete UI for a product's review-proof slider (image URL or YouTube link)
- Generated/sourced product, category and hero imagery in `public/static/images/`

## Not Yet Implemented (remaining scope from the original spec)
The following admin routes are **not yet built** (time-boxed out of this pass) and currently 404:
- `/admin/merchants`, `/admin/merchants/:id`
- `/admin/products`, `/admin/products/pending`, `/admin/products/:id` (product approval workflow)
- `/admin/orders`, `/admin/orders/:id`
- `/admin/categories`, `/admin/deals` (drag-and-drop best-deal manager), `/admin/homepage` (section enable/reorder), `/admin/banners`
- `/admin/settlements`, `/admin/customers`, `/admin/reports`, `/admin/settings`

All mock data these pages need (`merchants`, `products`, `orders`, `settlements`, `customers`) already exists in `src/data/` — building these pages is primarily "wire existing data into AdminLayout + table/board UI," following the same pattern as the merchant pages already built.

## Recommended Next Steps
1. Build the remaining `/admin/*` pages listed above (merchant approval, product approval queue, best-deal reorder UI, homepage section toggler) — data layer is ready.
2. Add empty/loading/error state polish pass across list pages (skeletons exist as a component pattern but aren't wired into every page yet).
3. When ready for production: replace `src/data/*.ts` getters with real API calls (Antigravity/custom backend + DB), keeping the same function signatures so pages don't need to change.
4. Wire real authentication for customer/merchant/admin (currently all "login" forms are UI-only and redirect after a fake delay).

## Data Architecture
- **Mock data models**: `Product`, `Category`, `Merchant`, `Order`, `Customer`, `Settlement` (see `src/types/index.ts`)
- **Storage (prototype)**: In-memory mock arrays (`src/data/`) for server-rendered pages; `localStorage` for cart + last-placed-order on the client
- **Future storage**: Designed to be swapped for Cloudflare D1 (or Supabase/Postgres) without changing component/page code — only the `src/data/*.ts` functions need real fetch calls

## User Guide
- Browse deals on the homepage → tap a product → add to cart or "এখনই অর্ডার করুন" → checkout with name/phone/address → pay only the delivery charge now (demo, no real payment) → see order confirmation with the advance-paid vs. due-on-delivery split → track the order anytime at `/track-order` (demo IDs like `OK-10245` + phone `01711-112233` work).
- Merchant demo: visit `/merchant/login`, any input logs in → explore dashboard, products, orders, earnings.
- Admin demo: visit `/admin/login`, any input logs in → dashboard KPIs and charts.

## Deployment
- **Platform**: Cloudflare Pages (Hono + Vite build → `dist/_worker.js`)
- **Status**: Running in sandbox preview via PM2 + `wrangler pages dev`; not yet deployed to a public Cloudflare Pages project
- **Tech Stack**: Hono (JSX SSR) + TypeScript + Tailwind CSS (CDN) + vanilla JS + Chart.js (CDN)
- **Last Updated**: 2026-08-28
