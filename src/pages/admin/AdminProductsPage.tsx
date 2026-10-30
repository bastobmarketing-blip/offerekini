import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { products } from '../../data/products'
import { merchants, getMerchantById } from '../../data/merchants'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { getLandingPageForProduct, getLandingPageUrl } from '../../data/landingPages'

export const AdminProductsPage: FC = () => {
  return (
    <AdminLayout title="Products" active="products">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">All Products ({products.length})</h1>
          <p class="text-xs text-ok-gray-500">প্ল্যাটফর্মের সকল প্রোডাক্টের তালিকা ও নির্ধারিত মার্চেন্ট ম্যানেজমেন্ট</p>
        </div>
        <div class="flex items-center gap-3">
          <a
            href="/admin/products/new"
            class="bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold px-4 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <i class="fas fa-plus"></i>
            <span>Add New Product</span>
          </a>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm" id="products-table">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Product</th>
                <th class="p-4">Category</th>
                <th class="p-4">Assigned Merchant</th>
                <th class="p-4">Price & Savings</th>
                <th class="p-4">Stock</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {products.map((p) => {
                const lp = getLandingPageForProduct(p.id) || getLandingPageForProduct(p.slug)
                const viewUrl = lp ? getLandingPageUrl(lp) : `/product/${p.slug}`
                const assignedMerchant = getMerchantById(p.merchantId || '')

                return (
                  <tr id={`row-${p.id}`} class="hover:bg-gray-50/60 transition-colors">
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <img src={p.image} class="w-12 h-12 rounded-xl object-cover bg-gray-50 shrink-0 border border-gray-100" />
                        <div>
                          <div class="flex items-center gap-2 flex-wrap">
                            <p class="font-bold text-ok-charcoal line-clamp-1">{p.name}</p>
                            {lp && (
                              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200" title="Dedicated Landing Page Active">
                                <i class="fas fa-bolt text-amber-600 text-[9px]"></i> Landing Page
                              </span>
                            )}
                          </div>
                          <p class="text-xs text-ok-gray-400">SKU: {p.sku || p.id}</p>
                        </div>
                      </div>
                    </td>

                    <td class="p-4 text-xs font-medium text-ok-gray-600">{p.category}</td>

                    {/* ASSIGNED MERCHANT WITH QUICK BIND DROPDOWN */}
                    <td class="p-4">
                      <div class="space-y-1">
                        {assignedMerchant ? (
                          <div class="flex items-center gap-1.5">
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              🏪 {assignedMerchant.storeName}
                            </span>
                          </div>
                        ) : (
                          <span class="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            ⚠️ Unassigned
                          </span>
                        )}
                        <select
                          onchange={`quickAssignProductMerchant('${p.id}', this.value)`}
                          class="text-[11px] font-medium p-1 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-ok-green-700 block mt-1"
                        >
                          <option value="">-- মার্চেন্ট পরিবর্তন / বাইন্ড --</option>
                          {merchants.map((m) => (
                            <option value={m.id} selected={m.id === p.merchantId}>
                              {m.storeName} ({m.phone})
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td class="p-4">
                      <p class="font-extrabold text-ok-green-800">{formatBDT(p.offerKiniPrice)}</p>
                      <p class="text-xs line-through text-ok-gray-400">{formatBDT(p.referencePrice)}</p>
                      <p class="text-[11px] font-bold text-ok-lime-600">বাঁচছে {formatBDT(p.savings)}</p>
                    </td>

                    <td class="p-4 text-xs font-bold text-slate-700">
                      {p.stock || 50} টি
                    </td>

                    <td class="p-4">
                      <StatusBadge status={p.status} />
                    </td>

                    <td class="p-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <a
                          href={viewUrl}
                          target="_blank"
                          class={lp
                            ? "bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 shadow-xs"
                            : "bg-ok-green-50 text-ok-green-800 hover:bg-ok-green-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                          }
                          title={lp ? "Open Sales Landing Page" : "View Product Page"}
                        >
                          <i class={lp ? "fas fa-bolt text-[11px]" : "fas fa-eye text-[11px]"}></i> {lp ? "View Landing Page" : "View"}
                        </a>
                        <a
                          href={`/admin/products/${p.id}/edit`}
                          class="bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <i class="fas fa-pen-to-square text-[11px]"></i> Edit
                        </a>
                        <button
                          type="button"
                          onclick={`deleteProductRow('${p.id}', '${p.name.replace(/'/g, "\\'")}')`}
                          class="bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                          title="Delete Product"
                        >
                          <i class="fas fa-trash-alt text-[11px]"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          async function quickAssignProductMerchant(productId, merchantId) {
            if (!merchantId) return;
            try {
              const res = await fetch('/api/admin/products/' + productId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ merchantId: merchantId })
              });
              const data = await res.json();
              if (data.success) {
                alert('প্রোডাক্টটি সফলভাবে এই মার্চেন্টের সাথে বাইন্ড হয়েছে এবং অতীতের সকল অর্ডার অটো-অ্যাসাইন হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch (e) {
              alert('Error: ' + e.message);
            }
          }

          async function deleteProductRow(id, name) {
            if (!confirm('আপনি কি নিশ্চিতভাবে "' + name + '" প্রোডাক্টটি ডিলিট করতে চান?')) {
              return;
            }
            try {
              const res = await fetch('/api/admin/products/' + id, { method: 'DELETE' });
              const data = await res.json();
              if (data.success) {
                const row = document.getElementById('row-' + id);
                if (row) {
                  row.style.opacity = '0.3';
                  row.style.backgroundColor = '#fee2e2';
                  setTimeout(() => row.remove(), 400);
                }
              } else {
                alert('ডিলিট করতে সমস্যা হয়েছে: ' + (data.error || 'Unknown error'));
              }
            } catch (err) {
              alert('সার্ভার এরর: ' + err.message);
            }
          }
        `
      }} />
    </AdminLayout>
  )
}
