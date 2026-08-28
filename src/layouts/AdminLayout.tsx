import type { FC } from 'hono/jsx'
import { Document } from '../components/Document'
import { AdminSidebar } from '../components/admin/AdminSidebar'
import { AdminTopbar } from '../components/admin/AdminTopbar'

export const AdminLayout: FC<{ title: string; active: string; children: any }> = ({ title, active, children }) => (
  <Document title={`Admin · ${title}`}>
    <div class="flex min-h-screen bg-ok-offwhite" style="background:#f6f8f6;">
      <AdminSidebar active={active} />
      <div class="flex-1 min-w-0">
        <AdminTopbar title={title} active={active} />
        <main class="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  </Document>
)
