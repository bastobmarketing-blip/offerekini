import { Hono } from 'hono'

// ---- Data ----
import { products, getProductBySlug, getProductsByCategory, searchProducts } from './data/products'
import { getCategoryBySlug } from './data/categories'
import { getOrderById, getOrdersByMerchant, orders } from './data/orders'
import { getCustomerByPhone, customers } from './data/customers'
import { merchants, getMerchantById } from './data/merchants'
import { getSettlementsByMerchant } from './data/settlements'

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

const app = new Hono()

// Demo "logged in" merchant for the frontend-only prototype
const DEMO_MERCHANT_ID = 'mer-1'

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

// Demo customer account (frontend-only — no real auth/session)
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
// MERCHANT ROUTES (demo merchant = mer-1, no real auth)
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

// Remaining admin sub-pages (merchants, products, orders, categories, deals,
// homepage, banners, settlements, customers, reports, settings) are part of
// the planned-but-not-yet-built scope — see README "Not Yet Implemented".

export default app
