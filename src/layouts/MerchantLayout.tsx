import type { FC } from 'hono/jsx'
import { Document } from '../components/Document'
import { MerchantSidebar } from '../components/merchant/MerchantSidebar'
import { MerchantTopbar } from '../components/merchant/MerchantTopbar'

interface MerchantLayoutProps {
  title: string
  active: string
  merchantName?: string
  children: any
}

export const MerchantLayout: FC<MerchantLayoutProps> = ({ title, active, merchantName, children }) => (
  <Document title={`Merchant · ${title}`}>
    <div class="flex min-h-screen bg-ok-offwhite" style="background:#f6f8f6;">
      <MerchantSidebar active={active} />
      <div class="flex-1 min-w-0">
        <MerchantTopbar title={title} active={active} merchantName={merchantName} />
        <main class="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  </Document>
)
