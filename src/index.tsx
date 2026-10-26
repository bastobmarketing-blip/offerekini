import { Hono } from 'hono'

// ---- Data ----
import { products, getProductBySlug, getProductsByCategory, searchProducts } from './data/products'
import { getCategoryBySlug } from './data/categories'
import { getOrderById, getOrdersByMerchant, orders, createOrder } from './data/orders'
import { getCustomerByPhone, customers } from './data/customers'
import { merchants, getMerchantById } from './data/merchants'
import { getSettlementsByMerchant } from './data/settlements'

// ---- EPS Payment Gateway ----
import { initiateEpsPayment, verifyEpsPayment } from './utils/epsService'
import { EpsGatewayPage } from './pages/customer/EpsGatewayPage'

// ---- Customer pages ----
import { HomePage } from './pages/customer/HomePage'
import { ProductsPage } from './pages/customer/ProductsPage'
import { CategoryPage } from './pages/customer/CategoryPage'
import { ProductDetailPage } from './pages/customer/ProductDetailPage'
import { SearchPage } from './pages/customer/SearchPage'
import { CartPage } from './pages/customer/CartPage'
import { CheckoutPage } from './pages/customer/CheckoutPage'
import { OrderSuccessPage } from './pages/customer/OrderSuccessPage'
import { TrackOrderPage } from './pages/customer/TrackOrderPage'
import { LoginPage } from './pages/customer/LoginPage'
import { RegisterPage } from './pages/customer/RegisterPage'
import { AboutPage } from './pages/customer/AboutPage'
import { HowItWorksPage } from './pages/customer/HowItWorksPage'
import { ContactPage } from './pages/customer/ContactPage'
import { LegalPage, privacyContent, termsContent, deliveryPolicyContent, returnPolicyContent } from './pages/customer/LegalPage'
import { AccountPage } from './pages/customer/AccountPage'
import { AccountOrdersPage } from './pages/customer/AccountOrdersPage'
import { AccountOrderDetailPage } from './pages/customer/AccountOrderDetailPage'
import { FocusKingLandingPage } from './pages/customer/FocusKingLandingPage'

// ---- Merchant pages ----
import { MerchantLoginPage } from './pages/merchant/MerchantLoginPage'
import { MerchantDashboardPage } from './pages/merchant/MerchantDashboardPage'
import { MerchantProductsPage } from './pages/merchant/MerchantProductsPage'
import { MerchantAddProductPage } from './pages/merchant/MerchantAddProductPage'
import { MerchantProductDetailPage } from './pages/merchant/MerchantProductDetailPage'
import { MerchantOrdersPage } from './pages/merchant/MerchantOrdersPage'
import { MerchantOrderDetailPage } from './pages/merchant/MerchantOrderDetailPage'
import { MerchantEarningsPage } from './pages/merchant/MerchantEarningsPage'
import { MerchantSettlementsPage } from './pages/merchant/MerchantSettlementsPage'
import { MerchantStorePage } from './pages/merchant/MerchantStorePage'
import { MerchantProfilePage } from './pages/merchant/MerchantProfilePage'
import { MerchantSettingsPage } from './pages/merchant/MerchantSettingsPage'

import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

// ---- Admin pages ----
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminMerchantsPage } from './pages/admin/AdminMerchantsPage'
import { AdminProductsPage } from './pages/admin/AdminProductsPage'
import { AdminAddProductPage } from './pages/admin/AdminAddProductPage'
import { AdminEditProductPage } from './pages/admin/AdminEditProductPage'
import { AdminLandingPagesPage } from './pages/admin/AdminLandingPagesPage'
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage'
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage'
import { DynamicLandingPage } from './pages/customer/DynamicLandingPage'
import { addProduct, deleteProduct, updateProduct } from './data/products'
import { updateOrderStatus, updateOrderCourier } from './data/orders'
import { getAllLandingPages, getLandingPageBySlug, getLandingPageForProduct, getLandingPageUrl, createLandingPage, deleteLandingPage } from './data/landingPages'
import { sendOrderToSteadfast, getCourierSettings, saveCourierSettings } from './utils/courierService'
import { sendMetaServerEvent, getTrackingSettings, saveTrackingSettings } from './utils/tracking'

const app = new Hono()

// Demo "logged in" merchant for the prototype
const DEMO_MERCHANT_ID = 'mer-1'

// ==========================================================================
// SUBDOMAIN MIDDLEWARE
// Handles admin.offerekini.com & merchant.offerekini.com
// ==========================================================================
app.use('*', async (c, next) => {
  const host = (c.req.header('host') || '').toLowerCase()
  const path = c.req.path

  // Skip static assets & payment endpoints from subdomain redirecting
  if (path.startsWith('/static/') || path.startsWith('/api/') || path.startsWith('/payment/')) {
    return await next()
  }

  // Admin Subdomain: admin.offerekini.com
  if (host.startsWith('admin.')) {
    if (path === '/' || path === '') {
      return c.redirect('/admin/dashboard')
    }
    if (!path.startsWith('/admin')) {
      return c.redirect(`/admin${path}`)
    }
  }

  // Merchant Subdomain: merchant.offerekini.com or seller.offerekini.com
  if (host.startsWith('merchant.') || host.startsWith('seller.')) {
    if (path === '/' || path === '') {
      return c.redirect('/merchant/dashboard')
    }
    if (!path.startsWith('/merchant')) {
      return c.redirect(`/merchant${path}`)
    }
  }

  await next()
})

// ==========================================================================
// EPS PAYMENT GATEWAY API & ROUTES
// ==========================================================================
app.post('/api/eps/initiate', async (c) => {
  try {
    const body = await c.req.json()
    const host = c.req.header('host') || 'offerekini.com'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`

    const result = await initiateEpsPayment({
      orderId: body.orderId || `OK-${Math.floor(10000 + Math.random() * 89999)}`,
      amount: Number(body.amount) || 60,
      customerName: body.customerName || 'Customer',
      customerPhone: body.customerPhone || '01700000000',
      customerAddress: body.address || 'Dhaka',
      district: body.district || 'Dhaka',
      area: body.area || 'Dhaka',
      baseUrl,
    })

    return c.json(result)
  } catch (err: any) {
    console.error('EPS initiate error:', err)
    return c.json({ success: false, error: err.message }, 500)
  }
})

// ==========================================================================
// ORDER API (Landing pages like Testo King & Focus King)
// ==========================================================================
app.post('/api/orders', async (c) => {
  try {
    const body = await c.req.json()
    const { name, phone, address, package: pkgId, product, price, delivery, total } = body

    if (!name || !phone || !address) {
      return c.json({ success: false, error: 'Name, phone, and address are required' }, 400)
    }

    const order = createOrder({
      customerName: name,
      customerPhone: phone,
      address,
      productName: product || 'Testo King',
      productId: 'p-testo-king',
      productImage: '/testo_king/jar.webp',
      package: pkgId,
      quantity: pkgId === '2x' ? 2 : 1,
      price: Number(price) || (pkgId === '2x' ? 1490 : 990),
      delivery: Number(delivery) || 0,
      total: Number(total) || (Number(price) + Number(delivery))
    })

    // Fire Server-Side Meta CAPI Purchase event (non-blocking)
    sendMetaServerEvent({
      eventName: 'Purchase',
      orderId: order.id,
      productName: order.items[0]?.productName || 'Order Item',
      value: order.totalAmount,
      currency: 'BDT',
      phone: order.customerPhone,
      name: order.customerName,
      clientIp: c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip'),
      userAgent: c.req.header('user-agent'),
      sourceUrl: c.req.url
    }).catch((e) => console.error('CAPI trigger error:', e))

    return c.json({ success: true, orderId: order.id, order }, 200)
  } catch (err: any) {
    console.error('Order creation error:', err)
    return c.json({ success: false, error: err.message }, 500)
  }
})

app.post('/api/testo_king/order', async (c) => {
  try {
    const body = await c.req.json()
    const { name, phone, address, package: pkgId, product, price, delivery, total } = body

    if (!name || !phone || !address) {
      return c.json({ success: false, error: 'Name, phone, and address are required' }, 400)
    }

    const order = createOrder({
      customerName: name,
      customerPhone: phone,
      address,
      productName: product || 'Testo King',
      productId: 'p-testo-king',
      productImage: '/testo_king/jar.webp',
      package: pkgId,
      quantity: pkgId === '2x' ? 2 : 1,
      price: Number(price) || (pkgId === '2x' ? 1490 : 990),
      delivery: Number(delivery) || 0,
      total: Number(total) || (Number(price) + Number(delivery))
    })

    // Fire Server-Side Meta CAPI Purchase event (non-blocking)
    sendMetaServerEvent({
      eventName: 'Purchase',
      orderId: order.id,
      productName: order.items[0]?.productName || 'Order Item',
      value: order.totalAmount,
      currency: 'BDT',
      phone: order.customerPhone,
      name: order.customerName,
      clientIp: c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip'),
      userAgent: c.req.header('user-agent'),
      sourceUrl: c.req.url
    }).catch((e) => console.error('CAPI trigger error:', e))

    return c.json({ success: true, orderId: order.id, order }, 200)
  } catch (err: any) {
    console.error('Testo King order creation error:', err)
    return c.json({ success: false, error: err.message }, 500)
  }
})

app.get('/payment/eps-gateway', (c) => c.redirect('/checkout'))

app.get('/payment/success', async (c) => {
  const orderId = c.req.query('orderId') || ''
  const trxId = c.req.query('trxId') || ''

  // STRICT EPS VERIFICATION AGAINST REAL EPS API
  const isVerified = await verifyEpsPayment(trxId)

  if (!isVerified) {
    console.warn(`[EPS Security Alert] Unverified payment attempt for order ${orderId}, TrxId: ${trxId}`)
    return c.redirect(`/checkout?error=payment_unverified&trxId=${encodeURIComponent(trxId)}`)
  }

  return c.html(
    <html>
      <head><title>EPS Payment Successful</title></head>
      <body>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var pending = null;
              try { pending = JSON.parse(localStorage.getItem('offerkini_pending_order') || 'null'); } catch(e){}
              if (pending) {
                pending.paymentStatus = 'advance_paid';
                pending.epsTrxId = '${trxId}';
                localStorage.setItem('offerkini_last_order', JSON.stringify(pending));
                var existing = [];
                try { existing = JSON.parse(localStorage.getItem('offerkini_orders') || '[]'); } catch(e){}
                existing.unshift(pending);
                localStorage.setItem('offerkini_orders', JSON.stringify(existing));
                localStorage.removeItem('offerkini_pending_order');
              }
              if (window.OK && window.OK.clearCart) {
                window.OK.clearCart();
              }
              window.location.href = '/order-success';
            })();
          `
        }} />
      </body>
    </html>
  )
})

app.get('/payment/fail', (c) => c.redirect('/checkout?error=payment_failed'))
app.get('/payment/cancel', (c) => c.redirect('/checkout?error=payment_cancelled'))

// ==========================================================================
// CUSTOMER ROUTES
// ==========================================================================
app.get('/', (c) => c.html(<HomePage />))

app.get('/products', (c) => {
  const filter = c.req.query('filter')
  const sort = c.req.query('sort')
  return c.html(<ProductsPage filter={filter} sort={sort} />)
})

app.get('/category/:slug', (c) => {
  const category = getCategoryBySlug(c.req.param('slug'))
  if (!category) return c.notFound()
  const list = getProductsByCategory(category.slug)
  return c.html(<CategoryPage category={category} productList={list} />)
})

app.get('/product/:slug', (c) => {
  const slug = c.req.param('slug')
  const product = getProductBySlug(slug)
  if (!product) return c.notFound()

  // Auto-merge logic: If this product has an active landing page, open landing page!
  const lp = getLandingPageForProduct(product.id) || getLandingPageForProduct(product.slug)
  if (lp) {
    return c.redirect(getLandingPageUrl(lp), 302)
  }

  return c.html(<ProductDetailPage product={product} />)
})

app.get('/search', (c) => {
  const q = c.req.query('q') || ''
  const results = q ? searchProducts(q) : []
  return c.html(<SearchPage query={q} results={results} />)
})

app.get('/cart', (c) => c.html(<CartPage />))
app.get('/checkout', (c) => c.html(<CheckoutPage />))
app.get('/focus_king', (c) => c.html(<FocusKingLandingPage />))
app.get('/focus-king', (c) => c.redirect('/focus_king'))
app.get('/testo-king', (c) => c.redirect('/testo_king/'))
app.get('/testo_king', (c) => c.redirect('/testo_king/'))
app.get('/testo_king/', async (c) => {
  try {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const filePath = path.resolve(process.cwd(), 'public/testo_king/index.html')
    if (fs.existsSync(filePath)) {
      return c.html(fs.readFileSync(filePath, 'utf-8'))
    }
  } catch (e) {}
  return c.redirect('/testo_king/index.html')
})
app.get('/testo_king/jar.webp', async (c) => {
  try {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const filePath = path.resolve(process.cwd(), 'public/testo_king/jar.webp')
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath)
      return new Response(buffer, {
        headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=31536000' }
      })
    }
  } catch (e) {}
  return c.notFound()
})
app.get('/jar.webp', (c) => c.redirect('/testo_king/jar.webp'))
app.get('/order-success', (c) => c.html(<OrderSuccessPage />))

app.get('/track-order', (c) => {
  const orderId = c.req.query('orderId')
  const phone = c.req.query('phone')
  if (!orderId || !phone) return c.html(<TrackOrderPage />)
  const order = getOrderById(orderId)
  const match = order && order.customerPhone === phone ? order : undefined
  return c.html(<TrackOrderPage order={match} searched orderId={orderId} phone={phone} />)
})

app.get('/login', (c) => c.html(<LoginPage />))
app.get('/register', (c) => c.html(<RegisterPage />))

app.get('/about', (c) => c.html(<AboutPage />))
app.get('/how-it-works', (c) => c.html(<HowItWorksPage />))
app.get('/contact', (c) => c.html(<ContactPage />))
app.get('/privacy', (c) => c.html(<LegalPage {...privacyContent} />))
app.get('/terms', (c) => c.html(<LegalPage {...termsContent} />))
app.get('/delivery-policy', (c) => c.html(<LegalPage {...deliveryPolicyContent} />))
app.get('/return-policy', (c) => c.html(<LegalPage {...returnPolicyContent} />))

// Customer account routes
const DEMO_CUSTOMER_PHONE = '01711-112233'
app.get('/account', (c) => {
  const customer = getCustomerByPhone(DEMO_CUSTOMER_PHONE) || customers[0]
  const recent = orders.filter((o) => o.customerPhone === customer.phone).slice(0, 3)
  return c.html(<AccountPage customer={customer} recentOrders={recent} />)
})
app.get('/account/orders', (c) => {
  const customer = getCustomerByPhone(DEMO_CUSTOMER_PHONE) || customers[0]
  const list = orders.filter((o) => o.customerPhone === customer.phone)
  return c.html(<AccountOrdersPage orders={list} />)
})
app.get('/account/order/:id', (c) => {
  const order = getOrderById(c.req.param('id'))
  if (!order) return c.notFound()
  return c.html(<AccountOrderDetailPage order={order} />)
})

// Dynamic Landing Page Route (e.g. /my-offer or /l/my-offer)
const RESERVED_SLUGS = new Set([
  'cart', 'checkout', 'admin', 'merchant', 'api', 'static', 'product', 'category',
  'search', 'track-order', 'about', 'contact', 'how-it-works', 'order-success',
  'payment', 'login', 'register', 'jar.webp', 'favicon.ico', 'account', 'privacy',
  'terms', 'delivery-policy', 'return-policy'
])

app.get('/:slug', async (c, next) => {
  const slug = c.req.param('slug')
  if (RESERVED_SLUGS.has(slug.toLowerCase())) {
    return await next()
  }

  const lp = getLandingPageBySlug(slug)
  if (lp) {
    if (lp.slug === 'focus_king') return c.redirect('/focus_king')
    if (lp.slug === 'testo_king') return c.redirect('/testo_king/')
    return c.html(<DynamicLandingPage config={lp} />)
  }
  return await next()
})

// ==========================================================================
// MERCHANT SESSION & ISOLATION HELPERS
// ==========================================================================
function getMerchantIdFromContext(c: any): string {
  const cookieVal = getCookie(c, 'merchant_session')
  if (cookieVal && getMerchantById(cookieVal)) {
    return cookieVal
  }
  return 'mer-1'
}

// ==========================================================================
// MERCHANT ROUTES & APIS
// ==========================================================================
app.get('/merchant/login', (c) => c.html(<MerchantLoginPage />))

app.post('/api/merchant/login', async (c) => {
  try {
    const { identifier, password } = await c.req.json()
    const cleanId = (identifier || '').trim().toLowerCase()

    // Find merchant matching phone or email
    const match = merchants.find(
      (m) =>
        m.id.toLowerCase() === cleanId ||
        m.email.toLowerCase() === cleanId ||
        m.phone.replace(/[^0-9]/g, '') === cleanId.replace(/[^0-9]/g, '')
    )

    // Demo/prototype allows login for any registered merchant or demo credentials
    const targetMerchant = match || merchants[0]

    setCookie(c, 'merchant_session', targetMerchant.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 2592000 // 30 days
    })

    return c.json({ success: true, redirect: '/merchant/dashboard', merchant: targetMerchant })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 400)
  }
})

app.get('/merchant/logout', (c) => {
  deleteCookie(c, 'merchant_session', { path: '/' })
  return c.redirect('/merchant/login')
})

app.get('/merchant/dashboard', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const merchant = getMerchantById(merchantId) || merchants[0]
  const merchantOrders = getOrdersByMerchant(merchantId)
  const merchantProducts = products.filter((p) => p.merchantId === merchantId)
  return c.html(<MerchantDashboardPage merchant={merchant} orders={merchantOrders} products={merchantProducts} />)
})

app.get('/merchant/products', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const merchantProducts = products.filter((p) => p.merchantId === merchantId)
  return c.html(<MerchantProductsPage products={merchantProducts} />)
})
app.get('/merchant/products/new', (c) => c.html(<MerchantAddProductPage />))
app.get('/merchant/products/:id', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const product = products.find((p) => p.id === c.req.param('id') && p.merchantId === merchantId)
  if (!product) return c.notFound()
  return c.html(<MerchantProductDetailPage product={product} />)
})

app.get('/merchant/orders', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const merchantOrders = getOrdersByMerchant(merchantId)
  return c.html(<MerchantOrdersPage orders={merchantOrders} />)
})
app.get('/merchant/orders/:id', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const order = getOrderById(c.req.param('id'))
  // Isolation: verify merchant owns this order
  if (!order || order.merchantId !== merchantId) return c.notFound()
  return c.html(<MerchantOrderDetailPage order={order} />)
})

// Merchant Order Status Update API
app.post('/api/merchant/orders/:id/status', async (c) => {
  try {
    const merchantId = getMerchantIdFromContext(c)
    const orderId = c.req.param('id')
    const { status } = await c.req.json()
    const order = getOrderById(orderId)
    if (!order || order.merchantId !== merchantId) {
      return c.json({ success: false, error: 'Order not found or unauthorized' }, 403)
    }
    const updated = updateOrderStatus(orderId, status)
    return c.json({ success: true, order: updated })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

// Merchant Steadfast Courier Dispatch API
app.post('/api/merchant/orders/:id/send-courier', async (c) => {
  try {
    const merchantId = getMerchantIdFromContext(c)
    const orderId = c.req.param('id')
    const order = getOrderById(orderId)
    if (!order || order.merchantId !== merchantId) {
      return c.json({ success: false, error: 'Order not found or unauthorized' }, 403)
    }

    const courierRes = await sendOrderToSteadfast(order)
    if (courierRes.success) {
      const updated = updateOrderCourier(orderId, {
        consignmentId: courierRes.consignmentId,
        trackingCode: courierRes.trackingCode,
        courierProvider: 'Steadfast'
      })
      return c.json({
        success: true,
        consignmentId: courierRes.consignmentId,
        trackingCode: courierRes.trackingCode,
        order: updated
      })
    } else {
      return c.json({ success: false, error: courierRes.error }, 400)
    }
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

app.get('/merchant/earnings', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const merchantOrders = getOrdersByMerchant(merchantId)
  const merchantSettlements = getSettlementsByMerchant(merchantId)
  return c.html(<MerchantEarningsPage orders={merchantOrders} settlements={merchantSettlements} />)
})
app.get('/merchant/settlements', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const merchantSettlements = getSettlementsByMerchant(merchantId)
  return c.html(<MerchantSettlementsPage settlements={merchantSettlements} />)
})
app.get('/merchant/store', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const merchant = getMerchantById(merchantId) || merchants[0]
  return c.html(<MerchantStorePage merchant={merchant} />)
})
app.get('/merchant/profile', (c) => {
  const merchantId = getMerchantIdFromContext(c)
  const merchant = getMerchantById(merchantId) || merchants[0]
  return c.html(<MerchantProfilePage merchant={merchant} />)
})
app.get('/merchant/settings', (c) => c.html(<MerchantSettingsPage />))

// ==========================================================================
// ADMIN ROUTES & CONTROLS
// ==========================================================================
app.get('/admin', (c) => c.redirect('/admin/dashboard'))
app.get('/admin/', (c) => c.redirect('/admin/dashboard'))
app.get('/admin/login', (c) => c.html(<AdminLoginPage />))
app.get('/admin/dashboard', (c) => c.html(<AdminDashboardPage />))
app.get('/admin/merchants', (c) => c.html(<AdminMerchantsPage />))
app.get('/admin/products', (c) => c.html(<AdminProductsPage />))
app.get('/admin/products/new', (c) => c.html(<AdminAddProductPage />))
app.get('/admin/products/:id/edit', (c) => {
  const id = c.req.param('id')
  const product = products.find((p) => p.id === id)
  if (!product) return c.notFound()
  return c.html(<AdminEditProductPage product={product} />)
})
app.get('/admin/landing-pages', (c) => c.html(<AdminLandingPagesPage />))
app.get('/admin/orders', (c) => c.html(<AdminOrdersPage />))
app.get('/admin/settings', (c) => c.html(<AdminSettingsPage />))

// Admin Product APIs
app.get('/api/admin/products', (c) => c.json({ success: true, products }))
app.post('/api/admin/products', async (c) => {
  try {
    const body = await c.req.json()
    if (!body.name || !body.offerKiniPrice) {
      return c.json({ success: false, error: 'Product name and price are required' }, 400)
    }
    const newProduct = addProduct(body)
    return c.json({ success: true, product: newProduct }, 201)
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

app.put('/api/admin/products/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const updated = updateProduct(id, body)
    if (!updated) {
      return c.json({ success: false, error: 'Product not found' }, 404)
    }
    return c.json({ success: true, product: updated })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

app.delete('/api/admin/products/:id', (c) => {
  const id = c.req.param('id')
  const ok = deleteProduct(id)
  return c.json({ success: ok, error: ok ? undefined : 'Product not found' })
})

// Admin Landing Pages APIs
app.get('/api/admin/landing-pages', (c) => c.json({ success: true, landingPages: getAllLandingPages() }))
app.post('/api/admin/landing-pages', async (c) => {
  try {
    const body = await c.req.json()
    if (!body.slug || !body.productName) {
      return c.json({ success: false, error: 'Slug and product name are required' }, 400)
    }
    const newPage = createLandingPage(body)

    // Automatically ensure this landing page's product exists in the main product catalog!
    const existingProduct = products.find((p) => p.slug === newPage.slug || p.id === newPage.productId)
    if (!existingProduct) {
      addProduct({
        id: newPage.productId || `p-${newPage.slug}`,
        slug: newPage.slug,
        name: newPage.productName,
        referencePrice: newPage.regularPrice,
        offerKiniPrice: newPage.offerPrice,
        category: 'health-beauty',
        image: newPage.productImage,
        shortDescription: newPage.subheadline,
        description: `${newPage.headline} — ${newPage.subheadline}`,
        deliveryCharge: newPage.deliveryDhaka,
        variants: [
          { id: 'v-1', label: newPage.regularWeight, stock: 100 },
          { id: 'v-2', label: newPage.megaWeight || 'মেগা কম্বো', stock: 50 }
        ]
      })
    }

    return c.json({ success: true, landingPage: newPage }, 201)
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

app.delete('/api/admin/landing-pages/:id', (c) => {
  const id = c.req.param('id')
  const ok = deleteLandingPage(id)
  return c.json({ success: ok, error: ok ? undefined : 'Landing page not found' })
})

// Admin Settings APIs (Pixel & Courier)
app.post('/api/admin/settings/pixel', async (c) => {
  try {
    const body = await c.req.json()
    saveTrackingSettings(body)
    return c.json({ success: true })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

app.post('/api/admin/settings/courier', async (c) => {
  try {
    const body = await c.req.json()
    saveCourierSettings(body)
    return c.json({ success: true })
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500)
  }
})

// Dynamic Landing Page Route
app.get('/l/:slug', (c) => {
  const slug = c.req.param('slug')
  const lp = getLandingPageBySlug(slug)
  if (!lp) return c.notFound()
  return c.html(<DynamicLandingPage config={lp} />)
})

export default app
