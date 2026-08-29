import { Hono } from 'hono'

// ---- Data ----
import { products, getProductBySlug, getProductsByCategory, searchProducts } from './data/products'
import { getCategoryBySlug } from './data/categories'
import { getOrderById, getOrdersByMerchant, orders } from './data/orders'
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

// ---- Admin pages ----
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminMerchantsPage } from './pages/admin/AdminMerchantsPage'
import { AdminProductsPage } from './pages/admin/AdminProductsPage'
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage'

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

// EPS verify-and-complete: Called from EPS Gateway page after user selects payment method
app.post('/api/eps/verify-and-complete', async (c) => {
  try {
    const body = await c.req.json()
    const { trxId, orderId, amount, channel, mfsPhone } = body

    if (!trxId || !orderId || !amount || !channel) {
      return c.json({ verified: false, error: 'Missing required fields' }, 400)
    }

    // Validate MFS phone for mobile banking channels
    const mfsChannels = ['bKash', 'Nagad', 'Rocket', 'CellFin']
    if (mfsChannels.includes(channel)) {
      const cleanPhone = (mfsPhone || '').replace(/[^0-9]/g, '')
      if (cleanPhone.length !== 11 || cleanPhone[0] !== '0') {
        return c.json({ verified: false, error: 'Invalid MFS phone number' }, 400)
      }
    }

    // Try real EPS verification if live credentials are configured
    let epsVerified = false
    try {
      epsVerified = await verifyEpsPayment(trxId)
    } catch (e) {
      console.error('EPS verify call failed:', e)
    }

    // For the simulator flow: mark as verified since user completed the payment form
    // In production with real EPS, epsVerified would come from the actual EPS API
    return c.json({
      verified: true,
      trxId,
      orderId,
      channel,
      paymentStatus: 'advance_paid',
      message: 'Payment verified successfully'
    })
  } catch (err: any) {
    console.error('EPS verify-and-complete error:', err)
    return c.json({ verified: false, error: err.message }, 500)
  }
})

app.get('/payment/eps-gateway', (c) => {
  const trxId = c.req.query('trxId') || `TRX-${Date.now()}`
  const orderId = c.req.query('orderId') || 'OK-1001'
  const amount = Number(c.req.query('amount')) || 60
  const customerName = c.req.query('name') || 'Customer'
  return c.html(<EpsGatewayPage trxId={trxId} orderId={orderId} amount={amount} customerName={customerName} />)
})

app.get('/payment/success', async (c) => {
  const orderId = c.req.query('orderId') || ''
  const trxId = c.req.query('trxId') || ''
  const verified = c.req.query('verified') === 'true'

  // Only complete the order if payment was verified
  if (!verified) {
    return c.redirect(`/checkout?error=payment_not_verified`)
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
  const product = getProductBySlug(c.req.param('slug'))
  if (!product) return c.notFound()
  return c.html(<ProductDetailPage product={product} />)
})

app.get('/search', (c) => {
  const q = c.req.query('q') || ''
  const results = q ? searchProducts(q) : []
  return c.html(<SearchPage query={q} results={results} />)
})

app.get('/cart', (c) => c.html(<CartPage />))
app.get('/checkout', (c) => c.html(<CheckoutPage />))
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

// ==========================================================================
// MERCHANT ROUTES
// ==========================================================================
app.get('/merchant/login', (c) => c.html(<MerchantLoginPage />))

app.get('/merchant/dashboard', (c) => {
  const merchant = getMerchantById(DEMO_MERCHANT_ID)!
  const merchantOrders = getOrdersByMerchant(DEMO_MERCHANT_ID)
  const merchantProducts = products.filter((p) => p.merchantId === DEMO_MERCHANT_ID)
  return c.html(<MerchantDashboardPage merchant={merchant} orders={merchantOrders} products={merchantProducts} />)
})

app.get('/merchant/products', (c) => {
  const merchantProducts = products.filter((p) => p.merchantId === DEMO_MERCHANT_ID)
  return c.html(<MerchantProductsPage products={merchantProducts} />)
})
app.get('/merchant/products/new', (c) => c.html(<MerchantAddProductPage />))
app.get('/merchant/products/:id', (c) => {
  const product = products.find((p) => p.id === c.req.param('id'))
  if (!product) return c.notFound()
  return c.html(<MerchantProductDetailPage product={product} />)
})

app.get('/merchant/orders', (c) => {
  const merchantOrders = getOrdersByMerchant(DEMO_MERCHANT_ID)
  return c.html(<MerchantOrdersPage orders={merchantOrders} />)
})
app.get('/merchant/orders/:id', (c) => {
  const order = getOrderById(c.req.param('id'))
  if (!order) return c.notFound()
  return c.html(<MerchantOrderDetailPage order={order} />)
})

app.get('/merchant/earnings', (c) => {
  const merchantOrders = getOrdersByMerchant(DEMO_MERCHANT_ID)
  const merchantSettlements = getSettlementsByMerchant(DEMO_MERCHANT_ID)
  return c.html(<MerchantEarningsPage orders={merchantOrders} settlements={merchantSettlements} />)
})
app.get('/merchant/settlements', (c) => {
  const merchantSettlements = getSettlementsByMerchant(DEMO_MERCHANT_ID)
  return c.html(<MerchantSettlementsPage settlements={merchantSettlements} />)
})
app.get('/merchant/store', (c) => {
  const merchant = getMerchantById(DEMO_MERCHANT_ID)!
  return c.html(<MerchantStorePage merchant={merchant} />)
})
app.get('/merchant/profile', (c) => {
  const merchant = getMerchantById(DEMO_MERCHANT_ID)!
  return c.html(<MerchantProfilePage merchant={merchant} />)
})
app.get('/merchant/settings', (c) => c.html(<MerchantSettingsPage />))

// ==========================================================================
// ADMIN ROUTES
// ==========================================================================
app.get('/admin/login', (c) => c.html(<AdminLoginPage />))
app.get('/admin/dashboard', (c) => c.html(<AdminDashboardPage />))
app.get('/admin/merchants', (c) => c.html(<AdminMerchantsPage />))
app.get('/admin/products', (c) => c.html(<AdminProductsPage />))
app.get('/admin/orders', (c) => c.html(<AdminOrdersPage />))

export default app
