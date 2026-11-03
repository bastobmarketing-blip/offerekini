import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { orders } from '../../data/orders'
import { merchants, getMerchantById } from '../../data/merchants'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { detectOrderDuplicates } from '../../utils/duplicateDetector'
import { getJobByOrderId } from '../../services/metaTrackingService'

function formatOrderDateTime(isoString: string): string {
  try {
    const d = new Date(isoString)
    const dateStr = d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' })
    const timeStr = d.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true })
    return `${dateStr} • ${timeStr}`
  } catch (e) {
    return isoString
  }
}

export const AdminOrdersPage: FC = () => {
  const duplicateMap = detectOrderDuplicates(orders)
  const duplicateSuspectCount = Array.from(duplicateMap.values()).filter((d) => d.isDuplicateSuspect).length

  return (
    <AdminLayout title="Orders" active="orders">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">All Orders ({orders.length})</h1>
          <p class="text-xs text-ok-gray-500">
            প্ল্যাটফর্মের সকল কাস্টমার অর্ডার, তারিখ ও অথরিটেটিভ মেটা ট্র্যাকিং
            {duplicateSuspectCount > 0 && (
              <span class="ml-2 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ⚠️ {duplicateSuspectCount}টি সম্ভাব্য ডুপ্লিকেট শনাক্ত
              </span>
            )}
          </p>
        </div>

        {/* ACTIONS & FILTERS */}
        <div class="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            id="btn-open-create-order"
            class="bg-ok-green-800 hover:bg-ok-green-900 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <i class="fas fa-plus-circle"></i> নতুন অর্ডার যোগ করুন
          </button>

          {/* DATE FILTER */}
          <div class="flex items-center gap-1.5">
            <label class="text-xs font-bold text-ok-charcoal">তারিখ:</label>
            <select
              id="filter-date-select"
              class="text-xs font-medium px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 shadow-sm"
            >
              <option value="all">সকল সময় (All Time)</option>
              <option value="today">আজকের অর্ডার (Today)</option>
              <option value="yesterday">গতকালের অর্ডার (Yesterday)</option>
              <option value="last7">গত ৭ দিন (Last 7 Days)</option>
              <option value="thisMonth">এই মাস (This Month)</option>
              <option value="custom">কাস্টম তারিখ (Custom Date)</option>
            </select>
          </div>

          <input
            type="date"
            id="filter-custom-date"
            class="hidden text-xs font-medium px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 shadow-sm"
          />

          {/* MERCHANT FILTER */}
          <div class="flex items-center gap-1.5">
            <label class="text-xs font-bold text-ok-charcoal">মার্চেন্ট:</label>
            <select
              id="filter-merchant-select"
              class="text-xs font-medium px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 shadow-sm"
            >
              <option value="all">সকল মার্চেন্ট (All)</option>
              <option value="unassigned">⚠️ কোনো মার্চেন্ট নেই (Unassigned)</option>
              {merchants.map((m) => (
                <option value={m.id}>{m.storeName} ({m.phone})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">Order ID & Date</th>
                <th class="p-4">Customer & Product</th>
                <th class="p-4">Assigned Merchant</th>
                <th class="p-4">Total Amount</th>
                <th class="p-4">Advance Paid</th>
                <th class="p-4">Status</th>
                <th class="p-4">Meta CAPI</th>
                <th class="p-4">Courier</th>
                <th class="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody id="admin-orders-tbody" class="divide-y divide-gray-100">
              {orders.map((o) => {
                const merchant = o.merchantId && o.merchantId !== 'unassigned' ? getMerchantById(o.merchantId) : undefined
                const orderDateISO = o.createdAt || new Date().toISOString()
                const formattedDate = formatOrderDateTime(orderDateISO)
                const dateYMD = orderDateISO.split('T')[0]
                const dupInfo = duplicateMap.get(o.id.toLowerCase())
                const metaJob = getJobByOrderId(o.id)

                return (
                  <tr
                    class={`hover:bg-gray-50/60 transition-colors order-row ${dupInfo?.isDuplicateSuspect ? 'bg-amber-50/20' : ''}`}
                    data-order-id={o.id}
                    data-customer-name={o.customerName}
                    data-merchant-id={o.merchantId || 'unassigned'}
                    data-date-ymd={dateYMD}
                    id={`order-row-${o.id}`}
                  >
                    <td class="p-4">
                      <p class="font-bold text-ok-green-800 text-sm font-mono">{o.id}</p>
                      <p class="text-[11px] text-ok-gray-500 mt-1 flex items-center gap-1 font-medium">
                        <i class="far fa-calendar-alt text-gray-400 text-[10px]"></i>
                        <span>{formattedDate}</span>
                      </p>
                    </td>

                    <td class="p-4 font-semibold text-ok-charcoal">
                      <p>{o.customerName}</p>
                      <p class="text-xs text-ok-gray-500 font-mono">{o.customerPhone}</p>
                      <p class="text-[11px] text-ok-gray-400 font-normal">{o.address}, {o.district}</p>
                      {o.items && o.items.length > 0 && (
                        <p class="text-[11px] font-normal text-ok-green-800 bg-emerald-50/80 px-2 py-0.5 rounded mt-1 inline-block border border-emerald-100">
                          📦 {o.items.map((it) => `${it.productName} (x${it.quantity})`).join(', ')}
                        </p>
                      )}
                      {dupInfo?.isDuplicateSuspect && (
                        <div class="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                          <i class="fas fa-triangle-exclamation text-amber-600"></i>
                          <span>{dupInfo.suspectReason}</span>
                        </div>
                      )}
                    </td>

                    <td class="p-4">
                      {merchant ? (
                        <div class="space-y-1">
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-ok-green-50 text-ok-green-900 border border-ok-green-100">
                            <i class="fas fa-store text-ok-green-600 text-[10px]"></i> {merchant.storeName}
                          </span>
                          <p class="text-[11px] text-ok-gray-400 font-mono">{merchant.phone}</p>
                          <button
                            type="button"
                            onclick={`openAssignMerchantModal('${o.id}')`}
                            class="text-[11px] font-bold text-ok-green-800 hover:underline block cursor-pointer"
                          >
                            <i class="fas fa-arrows-rotate text-[10px] mr-1"></i>মার্চেন্ট পরিবর্তন
                          </button>
                        </div>
                      ) : (
                        <div class="space-y-1">
                          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            ⚠️ কোনো মার্চেন্ট নেই
                          </span>
                          <button
                            type="button"
                            onclick={`openAssignMerchantModal('${o.id}')`}
                            class="text-xs font-bold text-blue-600 hover:underline block cursor-pointer"
                          >
                            + মার্চেন্ট নির্ধারণ করুন
                          </button>
                        </div>
                      )}
                    </td>

                    <td class="p-4 font-bold text-ok-charcoal">{formatBDT(o.totalAmount)}</td>
                    <td class="p-4 text-xs font-bold text-ok-lime-600">{formatBDT(o.advancePaid)}</td>

                    <td class="p-4">
                      <StatusBadge status={o.status} />
                    </td>

                    <td class="p-4 whitespace-nowrap">
                      {metaJob?.status === 'sent' ? (
                        <span
                          class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"
                          title={`Meta Event ID: ${metaJob.eventId}\nTrace ID: ${metaJob.fbtraceId || 'N/A'}\nSent: ${metaJob.sentAt}`}
                        >
                          <i class="fas fa-check-circle text-emerald-600"></i> Meta Sent ✓
                        </span>
                      ) : metaJob?.status === 'failed' ? (
                        <button
                          type="button"
                          onclick={`retryMetaJob('${o.id}')`}
                          class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100 cursor-pointer"
                          title={`ত্রুটি: ${metaJob.lastError}\nক্লিক করে পুনরায় পাঠান`}
                        >
                          <i class="fas fa-rotate-right text-rose-600"></i> Meta Failed (রিট্রাই)
                        </button>
                      ) : metaJob?.status === 'skipped' ? (
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-500" title={metaJob.skipReason}>
                          Meta Skipped
                        </span>
                      ) : metaJob?.status === 'processing' ? (
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700">
                          <i class="fas fa-spinner fa-spin"></i> Sending...
                        </span>
                      ) : (
                        <span class="text-xs text-gray-400 italic">Not Confirmed</span>
                      )}
                    </td>

                    <td class="p-4">
                      {o.trackingCode ? (
                        <span class="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          🚚 {o.trackingCode}
                        </span>
                      ) : (
                        <span class="text-xs text-gray-400 italic">নট সেন্ট</span>
                      )}
                    </td>

                    <td class="p-4 text-right whitespace-nowrap">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        {metaJob?.status === 'sent' ? (
                          <span class="text-emerald-700 font-bold text-xs px-2.5 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200 inline-flex items-center gap-1">
                            <i class="fas fa-check-double text-[10px]"></i> কনফার্মড
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              onclick={`confirmAdminOrder('${o.id}')`}
                              class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 shadow-xs cursor-pointer"
                              title="অর্ডার কনফার্ম করুন ও Meta CAPI Purchase পাঠান"
                            >
                              <i class="fas fa-check text-[10px]"></i> কনফার্ম
                            </button>
                            <button
                              type="button"
                              onclick={`markDuplicateAdminOrder('${o.id}')`}
                              class="bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1.5 rounded-lg border border-purple-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="ডুপ্লিকেট অর্ডার (মেটা ট্র্যাকিং বাদ থাকবে)"
                            >
                              <i class="fas fa-clone text-[10px]"></i> ডুপ্লিকেট
                            </button>
                            <button
                              type="button"
                              onclick={`rejectAdminOrder('${o.id}')`}
                              class="bg-gray-100 hover:bg-rose-50 text-gray-600 hover:text-rose-700 text-xs font-bold px-2 py-1.5 rounded-lg border border-gray-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="অর্ডার বাতিল করুন"
                            >
                              <i class="fas fa-xmark text-[10px]"></i> বাতিল
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          onclick={`openAssignMerchantModal('${o.id}')`}
                          class="bg-gray-100 hover:bg-ok-green-50 hover:text-ok-green-800 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                          title="মার্চেন্ট অ্যাসাইন / পরিবর্তন করুন"
                        >
                          <i class="fas fa-store text-[11px]"></i>
                        </button>
                        <button
                          type="button"
                          onclick={`deleteAdminOrder('${o.id}')`}
                          class="bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-800 text-xs font-bold px-2 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                          title="অর্ডারটি স্থায়ীভাবে ডিলিট করুন"
                        >
                          <i class="fas fa-trash-alt text-[11px]"></i>
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

      {/* CREATE MANUAL ORDER MODAL */}
      <div id="modal-create-order" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
          <button
            type="button"
            id="btn-close-create-order-modal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
          <div class="mb-4">
            <h3 class="text-base font-bold text-ok-charcoal flex items-center gap-2">
              <i class="fas fa-plus-circle text-ok-green-800"></i> নতুন ম্যানুয়াল অর্ডার তৈরি করুন
            </h3>
            <p class="text-xs text-ok-gray-500 mt-1">
              গ্রাহকের তথ্য, পণ্য এবং মার্চেন্ট নির্বাচন করে সরাসরি সিস্টেমে অর্ডার যোগ করুন
            </p>
          </div>

          <form id="form-admin-create-order" class="space-y-3.5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">গ্রাহকের নাম *</label>
                <input
                  type="text"
                  name="customerName"
                  required
                  placeholder="যেমন: তানভীর আহমেদ"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  required
                  placeholder="01XXXXXXXXX"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 font-mono"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-ok-charcoal mb-1">সম্পূর্ণ ঠিকানা *</label>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="বাসা/রোড, এলাকা, থানা, জেলা"
                class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">জেলা</label>
                <select
                  name="district"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                >
                  <option value="ঢাকা" selected>ঢাকা (Dhaka)</option>
                  <option value="চট্টগ্রাম">চট্টগ্রাম (Chittagong)</option>
                  <option value="সিলেট">সিলেট (Sylhet)</option>
                  <option value="রাজশাহী">রাজশাহী (Rajshahi)</option>
                  <option value="খুলনা">খুলনা (Khulna)</option>
                  <option value="বরিশাল">বরিশাল (Barisal)</option>
                  <option value="রংপুর">রংপুর (Rangpur)</option>
                  <option value="ময়মনসিংহ">ময়মনসিংহ (Mymensingh)</option>
                  <option value="কুমিল্লা">কুমিল্লা (Cumilla)</option>
                  <option value="গাজীপুর">গাজীপুর (Gazipur)</option>
                  <option value="নারায়ণগঞ্জ">নারায়ণগঞ্জ (Narayanganj)</option>
                  <option value="বগুড়া">বগুড়া (Bogura)</option>
                  <option value="অন্যান্য">অন্যান্য জেলা</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">অর্ডার স্ট্যাটাস</label>
                <select
                  name="status"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 font-medium"
                >
                  <option value="pending" selected>⏳ পেন্ডিং / নতুন অর্ডার</option>
                  <option value="called">📞 কল দেওয়া হয়েছে</option>
                  <option value="confirmed">✅ কনফার্মড</option>
                  <option value="processing">📦 প্যাকিং চলছে</option>
                  <option value="ready">🚚 প্রস্তুত</option>
                </select>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-3">
              <label class="block text-xs font-bold text-ok-charcoal mb-1">প্রোডাক্ট নির্বাচন *</label>
              <select
                id="admin-select-product"
                name="productId"
                class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 mb-2"
              >
                <option value="p-testo-king" data-name="Testo King — 500g" data-price="990">Testo King — 500g (৳৯৯০)</option>
                <option value="p-testo-king-2x" data-name="Testo King ২ট জার (১০০০ গ্রাম)" data-price="1490">Testo King ২ট জার — ১০০০ গ্রাম (৳১,৪৯০)</option>
                <option value="p-focus-king" data-name="Focus King — 500g" data-price="890">Focus King — 500g (৳৮৯০)</option>
                <option value="custom" data-name="" data-price="">✍️ কাস্টম প্রোডাক্ট (অন্যান্য)</option>
              </select>
              <div id="admin-custom-product-wrapper" class="hidden space-y-2 mt-2">
                <input
                  type="text"
                  id="admin-custom-product-name"
                  name="customProductName"
                  placeholder="প্রোডাক্টের নাম লিখুন"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">পরিমাণ</label>
                <input
                  type="number"
                  name="quantity"
                  id="admin-input-quantity"
                  min="1"
                  value="1"
                  required
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">পণ্যের দাম (৳)</label>
                <input
                  type="number"
                  name="price"
                  id="admin-input-price"
                  value="990"
                  required
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">ডেলিভারি (৳)</label>
                <input
                  type="number"
                  name="delivery"
                  id="admin-input-delivery"
                  value="0"
                  required
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
            </div>

            <div class="flex items-center gap-1.5 text-[11px]">
              <span class="text-gray-400">কুইক ডেলিভারি:</span>
              <button type="button" id="btn-admin-del-free" class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 cursor-pointer">ফ্রি (৳০)</button>
              <button type="button" id="btn-admin-del-dhaka" class="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 cursor-pointer">ঢাকা (৳৬০)</button>
              <button type="button" id="btn-admin-del-outside" class="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 cursor-pointer">ঢাকার বাইরে (৳১২০)</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">অগ্রিম গ্রহণ (৳)</label>
                <input
                  type="number"
                  name="advancePaid"
                  id="admin-input-advance"
                  value="0"
                  min="0"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">মার্চেন্ট নির্ধারণ *</label>
                <select
                  name="merchantId"
                  id="admin-create-merchant-select"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                >
                  {merchants.map((m) => (
                    <option value={m.id} selected={m.id === 'mer-587277' || m.id === 'testoking'}>
                      {m.storeName} ({m.phone})
                    </option>
                  ))}
                  <option value="unassigned">⚠️ কোনো মার্চেন্ট নেই (Unassigned)</option>
                </select>
              </div>
            </div>

            <div class="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs font-bold">
              <span class="text-ok-gray-500">গ্রাহক থেকে সর্বমোট প্রদেয়:</span>
              <span id="admin-create-order-total-display" class="text-base text-ok-green-800 font-mono">৳৯৯০</span>
            </div>

            <div class="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                id="btn-cancel-create-order-modal"
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="btn-submit-create-order"
                class="px-5 py-2 bg-ok-green-800 text-white rounded-xl text-xs font-bold hover:bg-ok-green-900 shadow-sm cursor-pointer"
              >
                অর্ডার তৈরি করুন
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ASSIGN / REASSIGN MERCHANT MODAL */}
      <div id="modal-assign-merchant" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
          <button
            type="button"
            id="btn-close-assign-modal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer"
          >
            ✕
          </button>
          <div class="mb-5">
            <h3 class="text-base font-bold text-ok-charcoal flex items-center gap-2">
              <i class="fas fa-store text-ok-green-700"></i> অর্ডারের মার্চেন্ট নির্ধারণ / পরিবর্তন
            </h3>
            <p class="text-xs text-ok-gray-500 mt-1">
              অর্ডার: <span id="assign-order-id" class="font-mono font-bold text-ok-green-800"></span> (<span id="assign-cust-name"></span>)
            </p>
          </div>

          <form id="form-assign-merchant" class="space-y-4">
            <input type="hidden" name="orderId" id="assign-input-order-id" />

            <div>
              <label class="block text-xs font-bold text-ok-charcoal mb-1">মার্চেন্ট নির্বাচন করুন *</label>
              <select
                name="merchantId"
                id="assign-select-merchant"
                required
                class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
              >
                <option value="unassigned">⚠️ কোনো মার্চেন্ট নেই (Unassigned)</option>
                {merchants.map((m) => (
                  <option value={m.id}>
                    {m.storeName} ({m.ownerName} - {m.phone})
                  </option>
                ))}
              </select>
              <p class="text-[11px] text-gray-400 mt-1">নির্বাচিত মার্চেন্ট তার নিজস্ব প্যানেল থেকে এই অর্ডারটি দেখতে ও কুরিয়ারে পাঠাতে পারবেন।</p>
            </div>

            <div class="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                id="btn-cancel-assign-modal"
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="btn-submit-assign"
                class="px-5 py-2 bg-ok-green-800 text-white rounded-xl text-xs font-bold hover:bg-ok-green-900 shadow-sm cursor-pointer"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // -------------------------------------------------------------
          // 1. FILTER LOGIC
          // -------------------------------------------------------------
          function applyFilters() {
            var selectedMerchant = document.getElementById('filter-merchant-select').value;
            var dateOption = document.getElementById('filter-date-select').value;
            var customDate = document.getElementById('filter-custom-date').value;

            var todayYMD = new Date().toISOString().split('T')[0];
            var yesterday = new Date(Date.now() - 86400000);
            var yesterdayYMD = yesterday.toISOString().split('T')[0];
            var sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
            var thisMonthPrefix = todayYMD.slice(0, 7);

            var rows = document.querySelectorAll('.order-row');
            rows.forEach(function(r) {
              var mId = r.getAttribute('data-merchant-id') || 'unassigned';
              var rowDate = r.getAttribute('data-date-ymd') || '';

              var matchesMerchant = (selectedMerchant === 'all') || (mId === selectedMerchant);

              var matchesDate = true;
              if (dateOption === 'today') {
                matchesDate = (rowDate === todayYMD);
              } else if (dateOption === 'yesterday') {
                matchesDate = (rowDate === yesterdayYMD);
              } else if (dateOption === 'last7') {
                matchesDate = (rowDate >= sevenDaysAgo.toISOString().split('T')[0]);
              } else if (dateOption === 'thisMonth') {
                matchesDate = rowDate.startsWith(thisMonthPrefix);
              } else if (dateOption === 'custom' && customDate) {
                matchesDate = (rowDate === customDate);
              }

              if (matchesMerchant && matchesDate) {
                r.style.display = '';
              } else {
                r.style.display = 'none';
              }
            });
          }

          document.getElementById('filter-merchant-select').addEventListener('change', applyFilters);
          document.getElementById('filter-date-select').addEventListener('change', function(e) {
            var customInput = document.getElementById('filter-custom-date');
            if (e.target.value === 'custom') {
              customInput.classList.remove('hidden');
            } else {
              customInput.classList.add('hidden');
            }
            applyFilters();
          });
          document.getElementById('filter-custom-date').addEventListener('change', applyFilters);

          // -------------------------------------------------------------
          // 2. ASSIGN MERCHANT MODAL
          // -------------------------------------------------------------
          var assignModal = document.getElementById('modal-assign-merchant');
          window.openAssignMerchantModal = function(orderId) {
            var row = document.getElementById('order-row-' + orderId);
            var custName = row ? row.getAttribute('data-customer-name') : '';
            var currentMerchantId = row ? row.getAttribute('data-merchant-id') : 'unassigned';

            document.getElementById('assign-order-id').textContent = orderId;
            document.getElementById('assign-cust-name').textContent = custName || '';
            document.getElementById('assign-input-order-id').value = orderId;
            document.getElementById('assign-select-merchant').value = currentMerchantId || 'unassigned';
            assignModal.classList.remove('hidden');
          };

          document.getElementById('btn-close-assign-modal').addEventListener('click', function() {
            assignModal.classList.add('hidden');
          });
          document.getElementById('btn-cancel-assign-modal').addEventListener('click', function() {
            assignModal.classList.add('hidden');
          });

          document.getElementById('form-assign-merchant').addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = document.getElementById('btn-submit-assign');
            btn.disabled = true;
            btn.innerHTML = '<span class="ok-spinner"></span> সংরক্ষণ হচ্ছে...';

            var orderId = document.getElementById('assign-input-order-id').value;
            var merchantId = document.getElementById('assign-select-merchant').value;

            try {
              var res = await fetch('/api/admin/orders/' + orderId + '/merchant', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ merchantId: merchantId })
              });
              var data = await res.json();
              if (data.success) {
                alert('মার্চেন্ট সফলভাবে আপডেট হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
                btn.disabled = false;
                btn.innerHTML = 'সংরক্ষণ করুন';
              }
            } catch(err) {
              alert('Error: ' + err.message);
              btn.disabled = false;
              btn.innerHTML = 'সংরক্ষণ করুন';
            }
          });

          // -------------------------------------------------------------
          // 3. CREATE MANUAL ORDER MODAL
          // -------------------------------------------------------------
          var createOrderModal = document.getElementById('modal-create-order');
          document.getElementById('btn-open-create-order').addEventListener('click', function() {
            createOrderModal.classList.remove('hidden');
          });
          document.getElementById('btn-close-create-order-modal').addEventListener('click', function() {
            createOrderModal.classList.add('hidden');
          });
          document.getElementById('btn-cancel-create-order-modal').addEventListener('click', function() {
            createOrderModal.classList.add('hidden');
          });

          function calculateAdminCreateTotal() {
            var qty = parseInt(document.getElementById('admin-input-quantity').value) || 1;
            var price = parseFloat(document.getElementById('admin-input-price').value) || 0;
            var del = parseFloat(document.getElementById('admin-input-delivery').value) || 0;
            var total = (price * qty) + del;
            document.getElementById('admin-create-order-total-display').textContent = '৳' + total.toLocaleString('bn-BD');
          }

          document.getElementById('admin-input-quantity').addEventListener('input', calculateAdminCreateTotal);
          document.getElementById('admin-input-price').addEventListener('input', calculateAdminCreateTotal);
          document.getElementById('admin-input-delivery').addEventListener('input', calculateAdminCreateTotal);

          document.getElementById('admin-select-product').addEventListener('change', function() {
            var sel = this;
            var opt = sel.options[sel.selectedIndex];
            var customWrap = document.getElementById('admin-custom-product-wrapper');
            if (sel.value === 'custom') {
              customWrap.classList.remove('hidden');
              document.getElementById('admin-input-price').value = 0;
            } else {
              customWrap.classList.add('hidden');
              var p = opt.getAttribute('data-price');
              if (p) document.getElementById('admin-input-price').value = p;
            }
            calculateAdminCreateTotal();
          });

          document.getElementById('btn-admin-del-free').addEventListener('click', function() {
            document.getElementById('admin-input-delivery').value = 0;
            calculateAdminCreateTotal();
          });
          document.getElementById('btn-admin-del-dhaka').addEventListener('click', function() {
            document.getElementById('admin-input-delivery').value = 60;
            calculateAdminCreateTotal();
          });
          document.getElementById('btn-admin-del-outside').addEventListener('click', function() {
            document.getElementById('admin-input-delivery').value = 120;
            calculateAdminCreateTotal();
          });

          document.getElementById('form-admin-create-order').addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = document.getElementById('btn-submit-create-order');
            btn.disabled = true;
            btn.innerHTML = '<span class="ok-spinner"></span> তৈরি হচ্ছে...';

            var form = e.target;
            var selProd = document.getElementById('admin-select-product');
            var opt = selProd.options[selProd.selectedIndex];
            var productName = (selProd.value === 'custom')
              ? (document.getElementById('admin-custom-product-name').value.trim() || 'কাস্টম প্রোডাক্ট')
              : opt.getAttribute('data-name');

            var payload = {
              customerName: form.customerName.value.trim(),
              customerPhone: form.customerPhone.value.trim(),
              address: form.address.value.trim(),
              district: form.district.value,
              status: form.status.value,
              productId: selProd.value === 'custom' ? undefined : selProd.value,
              productName: productName,
              quantity: parseInt(form.quantity.value) || 1,
              price: parseFloat(form.price.value) || 0,
              delivery: parseFloat(form.delivery.value) || 0,
              advancePaid: parseFloat(form.advancePaid.value) || 0,
              merchantId: form.merchantId.value
            };

            try {
              var res = await fetch('/api/admin/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              var data = await res.json();
              if (data.success) {
                alert('ম্যানুয়াল অর্ডার সফলভাবে তৈরি হয়েছে! Order ID: ' + (data.order ? data.order.id : ''));
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
                btn.disabled = false;
                btn.innerHTML = 'অর্ডার তৈরি করুন';
              }
            } catch(err) {
              alert('Error: ' + err.message);
              btn.disabled = false;
              btn.innerHTML = 'অর্ডার তৈরি করুন';
            }
          });

          // -------------------------------------------------------------
          // 4. DELETE ORDER
          // -------------------------------------------------------------
          window.deleteAdminOrder = async function(orderId) {
            if (!confirm('আপনি কি নিশ্চিতভাবে অর্ডার #' + orderId + ' স্থায়ীভাবে ডিলিট করতে চান? এই কাজটি আর পূর্বাবস্থায় ফেরানো যাবে না!')) {
              return;
            }
            try {
              var res = await fetch('/api/admin/orders/' + orderId, { method: 'DELETE' });
              var data = await res.json();
              if (data.success) {
                alert('অর্ডারটি সফলভাবে ডিলিট করা হয়েছে!');
                var row = document.getElementById('order-row-' + orderId);
                if (row) row.remove();
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          };

          // -------------------------------------------------------------
          // 5. CONFIRM ORDER & DISPATCH META CAPI PURCHASE
          // -------------------------------------------------------------
          window.confirmAdminOrder = async function(orderId) {
            if (!confirm('আপনি কি নিশ্চিতভাবে অর্ডার #' + orderId + ' কনফার্ম করতে চান? কনফার্ম করলে মেটাতে ১টি অনুমোদিত Purchase ইভেন্ট পাঠানো হবে।')) {
              return;
            }
            try {
              var res = await fetch('/api/admin/orders/' + orderId + '/confirm', { method: 'POST' });
              var data = await res.json();
              if (data.success) {
                alert(data.message || 'অর্ডার সফলভাবে কনফার্ম হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Confirmation failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          };

          // -------------------------------------------------------------
          // 6. MARK ORDER AS DUPLICATE
          // -------------------------------------------------------------
          window.markDuplicateAdminOrder = async function(orderId) {
            if (!confirm('আপনি কি এই অর্ডারটিকে ডুপ্লিকেট হিসেবে চিহ্নিত করতে চান? ডুপ্লিকেট অর্ডারে কোনো মেটা পার্চেস যাবে না।')) {
              return;
            }
            try {
              var res = await fetch('/api/admin/orders/' + orderId + '/duplicate', { method: 'POST' });
              var data = await res.json();
              if (data.success) {
                alert(data.message || 'অর্ডার ডুপ্লিকেট মার্ক করা হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          };

          // -------------------------------------------------------------
          // 7. REJECT / CANCEL ORDER
          // -------------------------------------------------------------
          window.rejectAdminOrder = async function(orderId) {
            if (!confirm('আপনি কি অর্ডারটি বাতিল করতে চান?')) {
              return;
            }
            try {
              var res = await fetch('/api/admin/orders/' + orderId + '/reject', { method: 'POST' });
              var data = await res.json();
              if (data.success) {
                alert(data.message || 'অর্ডার বাতিল করা হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          };

          // -------------------------------------------------------------
          // 8. RETRY META CAPI JOB
          // -------------------------------------------------------------
          window.retryMetaJob = async function(orderId) {
            try {
              var res = await fetch('/api/admin/tracking/jobs/' + orderId + '/retry', { method: 'POST' });
              var data = await res.json();
              alert(data.message || (data.success ? 'সফল হয়েছে' : 'ব্যর্থ হয়েছে'));
              if (data.success) window.location.reload();
            } catch(e) {
              alert('Error: ' + e.message);
            }
          };
        `
      }} />
    </AdminLayout>
  )
}
