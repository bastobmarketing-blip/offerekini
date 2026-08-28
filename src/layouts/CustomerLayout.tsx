import type { FC } from 'hono/jsx'
import { Document } from '../components/Document'
import { Header } from '../components/customer/Header'
import { Footer } from '../components/customer/Footer'
import { MobileNav } from '../components/customer/MobileNav'
import { CartDrawer } from '../components/customer/CartDrawer'
import { products } from '../data/products'

interface CustomerLayoutProps {
  title: string
  description?: string
  activeNav?: 'deals' | 'categories' | 'products' | 'how'
  activeMobileNav?: 'home' | 'categories' | 'cart' | 'account'
  showMobileNav?: boolean
  children: any
}

// Wraps every public/customer page. Also injects a lightweight product
// catalog (id -> pricing/name/image) into `window.__OK_CATALOG__` so the
// client-side cart script (app.js) can compute totals without duplicating
// mock data or hard-coding prices in markup.
export const CustomerLayout: FC<CustomerLayoutProps> = ({
  title,
  description,
  activeNav,
  activeMobileNav,
  showMobileNav = true,
  children
}) => {
  const catalog = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    image: p.image,
    price: p.offerKiniPrice,
    referencePrice: p.referencePrice,
    deliveryCharge: p.deliveryCharge,
    stock: p.stock
  }))

  return (
    <Document title={title} description={description}>
      <script dangerouslySetInnerHTML={{ __html: `window.__OK_CATALOG__ = ${JSON.stringify(catalog)};` }} />
      <Header activeNav={activeNav} />
      <main class={showMobileNav ? 'pb-20 lg:pb-0' : ''}>{children}</main>
      <Footer />
      {showMobileNav && <MobileNav active={activeMobileNav} />}
      <CartDrawer />
    </Document>
  )
}
