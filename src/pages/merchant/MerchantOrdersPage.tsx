import type { FC } from 'hono/jsx'
import { MerchantLayout } from '../../layouts/MerchantLayout'
import { StatusBadge, orderStatusLabel, orderStatusTone } from '../../components/ui/StatusBadge'
import { EmptyState } from '../../components/ui/EmptyState'
import { formatBDT, formatDateBn } from '../../utils/format'
import type { Order, Merchant, Product } from '../../types'

export const MerchantOrdersPage: FC<{ orders: Order[]; merchant?: Merchant; products?: Product[] }> = ({ orders, merchant, products = [] }) => {
  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const calledCount = orders.filter((o) => o.status === 'called').length
  const inTransitCount = orders.filter((o) => o.status === 'shipped' || o.status === 'ready').length
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length
  const cancelledCount = orders.filter((o) => o.status === 'cancelled' || o.status === 'returned').length

  const storeDisplayName = merchant?.storeName || 'মার্চেন্ট স্টোর'

  return (
    <MerchantLayout title="Orders" active="orders" merchantName={storeDisplayName}>
      <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">মার্চেন্ট অর্ডার ও পার্সেল ম্যানেজমেন্ট ({orders.length})</h1>
          <p class="text-xs text-ok-gray-500">আপনার স্টোরের ({storeDisplayName}) সকল গ্রাহক অর্ডার ও কুরিয়ার ডিসপ্যাচ</p>
        </div>
        <button
          type="button"
          onclick="openCreateOrderModal()"
          class="bg-ok-green-800 hover:bg-ok-green-900 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
        >
          <i class="fas fa-plus-circle"></i> ম্যানুয়াল অর্ডার যোগ করুন
        </button>
      </div>

      {/* KPI TILES */}
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] text-gray-400 font-bold uppercase">পেন্ডিং অর্ডার</p>
          <p class="text-xl font-black text-amber-600 mt-0.5">{pendingCount}</p>
        </div>
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] text-gray-400 font-bold uppercase">কল দেওয়া হয়েছে</p>
          <p class="text-xl font-black text-blue-600 mt-0.5">{calledCount}</p>
        </div>
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] text-gray-400 font-bold uppercase">কুরিয়ার / ট্রানজিট</p>
          <p class="text-xl font-black text-sky-600 mt-0.5">{inTransitCount}</p>
        </div>
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center">
          <p class="text-[10px] text-gray-400 font-bold uppercase">ডেলিভারি সম্পন্ন</p>
          <p class="text-xl font-black text-emerald-600 mt-0.5">{deliveredCount}</p>
        </div>
        <div class="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm text-center col-span-2 sm:col-span-1">
          <p class="text-[10px] text-gray-400 font-bold uppercase">বাতিল / রিটার্ন</p>
          <p class="text-xl font-black text-rose-600 mt-0.5">{cancelledCount}</p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 mb-4 text-xs font-bold scrollbar-none">
        <button
          type="button"
          onclick="filterMerchantOrders('all')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-ok-green-800 text-white transition-all whitespace-nowrap active"
          data-tab="all"
        >
          সকল অর্ডার ({orders.length})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('pending')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="pending"
        >
          পেন্ডিং ({pendingCount})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('called')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="called"
        >
          কল দেওয়া হয়েছে ({calledCount})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('in_transit')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="in_transit"
        >
          ট্রানজিটে / কুরিয়ারে ({inTransitCount})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('delivered')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="delivered"
        >
          ডেলিভার্ড ({deliveredCount})
        </button>
        <button
          type="button"
          onclick="filterMerchantOrders('cancelled')"
          class="merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap"
          data-tab="cancelled"
        >
          বাতিল ({cancelledCount})
        </button>
      </div>

      {orders.length === 0 ? (
        <EmptyState icon="fa-receipt" title="কোনো অর্ডার পাওয়া যায়নি" />
      ) : (
        <>
          <div class="hidden sm:block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-ok-gray-500 text-xs border-b border-gray-100 bg-gray-50">
                  <th class="px-4 py-3 font-medium">Order ID & Date</th>
                  <th class="px-4 py-3 font-medium">Product Details</th>
                  <th class="px-4 py-3 font-medium">Customer & Address</th>
                  <th class="px-4 py-3 font-medium">Amount</th>
                  <th class="px-4 py-3 font-medium">Status Update</th>
                  <th class="px-4 py-3 font-medium">Courier</th>
                  <th class="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                {orders.map((o) => (
                  <tr
                    class="hover:bg-gray-50/70 transition-colors merchant-order-row"
                    data-status={o.status}
                    id={`m-order-row-${o.id}`}
                  >
                    <td class="px-4 py-3 font-bold text-ok-green-800">
                      <a href={`/merchant/orders/${o.id}`} class="hover:underline font-mono">
                        {o.id}
                      </a>
                      <p class="text-[11px] text-gray-400 font-normal mt-0.5">{formatDateBn(o.createdAt)}</p>
                    </td>

                    <td class="px-4 py-3 max-w-[200px]">
                      <p class="font-bold text-ok-charcoal line-clamp-1">{o.items[0]?.productName || 'Product'}</p>
                      <p class="text-xs text-ok-gray-500">পরিমাণ: {o.items[0]?.quantity || 1} টি</p>
                    </td>

                    <td class="px-4 py-3">
                      <p class="font-semibold text-slate-800">{o.customerName}</p>
                      <p class="text-xs text-ok-gray-500 font-mono">{o.customerPhone}</p>
                      <p class="text-[11px] text-ok-gray-400 line-clamp-1">{o.address}, {o.district}</p>
                    </td>

                    <td class="px-4 py-3">
                      <p class="font-bold text-slate-900">{formatBDT(o.totalAmount)}</p>
                      <p class="text-[11px] text-ok-green-700">Due: {formatBDT(o.dueOnDelivery || o.totalAmount)}</p>
                    </td>

                    <td class="px-4 py-3">
                      <select
                        onchange={`changeMerchantOrderStatus('${o.id}', this.value)`}
                        class="text-xs font-bold px-2 py-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-ok-green-700 shadow-xs"
                      >
                        <option value="pending" selected={o.status === 'pending'}>⏳ পেন্ডিং</option>
                        <option value="called" selected={o.status === 'called'}>📞 কল দেওয়া হয়েছে</option>
                        <option value="processing" selected={o.status === 'processing'}>📦 প্যাকিং চলছে</option>
                        <option value="ready" selected={o.status === 'ready'}>🚚 প্রস্তুত</option>
                        <option value="shipped" selected={o.status === 'shipped'}>🚚 কুরিয়ারে পাঠানো</option>
                        <option value="delivered" selected={o.status === 'delivered'}>✅ ডেলিভার্ড</option>
                        <option value="cancelled" selected={o.status === 'cancelled'}>❌ বাতিল</option>
                        <option value="returned" selected={o.status === 'returned'}>↩️ রিটার্ন</option>
                      </select>
                    </td>

                    <td class="px-4 py-3">
                      {o.trackingCode ? (
                        <span class="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          🚚 {o.trackingCode}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onclick={`quickSendCourier('${o.id}')`}
                          class="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-lg border border-sky-200 transition-colors inline-flex items-center gap-1 shadow-xs"
                        >
                          <i class="fas fa-paper-plane text-[10px]"></i> Send Courier
                        </button>
                      )}
                    </td>

                    <td class="px-4 py-3 text-right whitespace-nowrap">
                      <div class="flex items-center justify-end gap-1.5">
                        <a
                          href={`/merchant/orders/${o.id}`}
                          class="bg-gray-100 hover:bg-ok-green-50 hover:text-ok-green-800 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <i class="fas fa-eye text-[11px]"></i> Details
                        </a>
                        <button
                          type="button"
                          onclick={`deleteMerchantOrder('${o.id}')`}
                          class="bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-800 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                          title="অর্ডারটি স্থায়ীভাবে ডিলিট করুন"
                        >
                          <i class="fas fa-trash-alt text-[11px]"></i> ডিলিট
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="sm:hidden space-y-3">
            {orders.map((o) => (
              <div
                class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm merchant-order-row"
                data-status={o.status}
                id={`m-order-card-${o.id}`}
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="font-bold text-sm text-ok-green-800 font-mono">#{o.id}</span>
                  <StatusBadge label={orderStatusLabel(o.status)} tone={orderStatusTone(o.status)} />
                </div>
                <p class="text-sm font-bold text-slate-900 line-clamp-1">{o.items[0]?.productName}</p>
                <div class="text-xs text-ok-gray-500 mt-1 space-y-0.5">
                  <p>কাস্টমার: {o.customerName} ({o.customerPhone})</p>
                  <p>ঠিকানা: {o.address}, {o.district}</p>
                </div>
                <div class="flex items-center justify-between mt-3 pt-2.5 border-t text-xs">
                  <span class="font-bold text-slate-900">{formatBDT(o.totalAmount)}</span>
                  <div class="flex items-center gap-1.5">
                    {o.trackingCode ? (
                      <span class="text-[10px] font-mono bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-bold">
                        {o.trackingCode}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onclick={`quickSendCourier('${o.id}')`}
                        class="text-xs bg-sky-600 text-white font-bold px-2 py-1 rounded-lg cursor-pointer"
                      >
                        Send
                      </button>
                    )}
                    <a href={`/merchant/orders/${o.id}`} class="text-xs font-bold text-ok-green-800 underline">
                      Details
                    </a>
                    <button
                      type="button"
                      onclick={`deleteMerchantOrder('${o.id}')`}
                      class="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 px-2 py-1 rounded-lg cursor-pointer"
                    >
                      ডিলিট
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MANUAL CREATE ORDER MODAL */}
      <div id="modal-create-order" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            type="button"
            onclick="closeCreateOrderModal()"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer"
          >
            ✕
          </button>
          <div class="mb-4">
            <h3 class="text-base font-bold text-ok-charcoal flex items-center gap-2">
              <i class="fas fa-plus-circle text-ok-green-800"></i> ম্যানুয়াল অর্ডার তৈরি করুন
            </h3>
            <p class="text-xs text-ok-gray-500 mt-1">
              গ্রাহকের তথ্য ও প্রোডাক্ট নির্বাচন করে সরাসরি নতুন অর্ডার যোগ করুন ({storeDisplayName})
            </p>
          </div>

          <form id="form-merchant-create-order" class="space-y-3.5">
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
                  <option value="processing">📦 প্যাকিং চলছে</option>
                  <option value="ready">🚚 প্রস্তুত</option>
                </select>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-3">
              <label class="block text-xs font-bold text-ok-charcoal mb-1">প্রোডাক্ট নির্বাচন *</label>
              <select
                id="modal-select-product"
                name="productId"
                class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 mb-2"
                onchange="onProductSelectChange(this)"
              >
                <option value="p-testo-king" data-name="Testo King — 500g" data-price="990">Testo King — 500g (৳৯৯০)</option>
                <option value="p-testo-king" data-name="Testo King ২ট জার (১০০০ গ্রাম)" data-price="1490">Testo King ২ট জার — ১০০০ গ্রাম (৳১,৪৯০)</option>
                <option value="p-focus-king" data-name="Focus King — 500g" data-price="890">Focus King — 500g (৳৮৯০)</option>
                <option value="custom" data-name="" data-price="">✍️ কাস্টম প্রোডাক্ট (অন্যান্য)</option>
              </select>
              <div id="modal-custom-product-wrapper" class="hidden space-y-2 mt-2">
                <input
                  type="text"
                  id="modal-custom-product-name"
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
                  id="modal-input-quantity"
                  min="1"
                  value="1"
                  required
                  oninput="calculateTotal()"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">পণ্যের দাম (৳)</label>
                <input
                  type="number"
                  name="price"
                  id="modal-input-price"
                  value="990"
                  required
                  oninput="calculateTotal()"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">ডেলিভারি (৳)</label>
                <input
                  type="number"
                  name="delivery"
                  id="modal-input-delivery"
                  value="0"
                  required
                  oninput="calculateTotal()"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
            </div>

            <div class="flex items-center gap-1.5 text-[11px]">
              <span class="text-gray-400">কুইক ডেলিভারি:</span>
              <button type="button" onclick="setDelivery(0)" class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 cursor-pointer">ফ্রি (৳০)</button>
              <button type="button" onclick="setDelivery(60)" class="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 cursor-pointer">ঢাকা (৳৬০)</button>
              <button type="button" onclick="setDelivery(120)" class="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 cursor-pointer">ঢাকার বাইরে (৳১২০)</button>
            </div>

            <div class="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">অগ্রিম পরিশোধ (৳)</label>
                <input
                  type="number"
                  name="advancePaid"
                  id="modal-input-advance"
                  value="0"
                  oninput="calculateTotal()"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">কাস্টমার বকেয়া (৳)</label>
                <input
                  type="text"
                  id="modal-display-due"
                  readonly
                  value="৳৯৯০"
                  class="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-ok-green-800"
                />
              </div>
            </div>

            <div class="bg-ok-green-50/60 p-3 rounded-xl border border-ok-green-100 flex items-center justify-between text-xs">
              <span class="font-bold text-ok-green-900">সর্বমোট অর্ডার মূল্য:</span>
              <span id="modal-display-total" class="font-black text-sm text-ok-green-900">৳৯৯০</span>
            </div>

            <div class="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onclick="closeCreateOrderModal()"
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="btn-submit-create-order"
                class="px-5 py-2 bg-ok-green-800 text-white rounded-xl text-xs font-bold hover:bg-ok-green-900 shadow-sm cursor-pointer"
              >
                অর্ডার সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Modal logic
          window.openCreateOrderModal = function() {
            var modal = document.getElementById('modal-create-order');
            if (modal) modal.classList.remove('hidden');
          };

          window.closeCreateOrderModal = function() {
            var modal = document.getElementById('modal-create-order');
            if (modal) modal.classList.add('hidden');
          };

          window.onProductSelectChange = function(sel) {
            var opt = sel.options[sel.selectedIndex];
            var customWrap = document.getElementById('modal-custom-product-wrapper');
            if (sel.value === 'custom') {
              if (customWrap) customWrap.classList.remove('hidden');
            } else {
              if (customWrap) customWrap.classList.add('hidden');
              var price = opt.getAttribute('data-price');
              if (price) {
                document.getElementById('modal-input-price').value = price;
                calculateTotal();
              }
            }
          };

          window.setDelivery = function(amt) {
            var delInput = document.getElementById('modal-input-delivery');
            if (delInput) {
              delInput.value = amt;
              calculateTotal();
            }
          };

          window.calculateTotal = function() {
            var price = Number(document.getElementById('modal-input-price').value) || 0;
            var delivery = Number(document.getElementById('modal-input-delivery').value) || 0;
            var advance = Number(document.getElementById('modal-input-advance').value) || 0;
            var total = price + delivery;
            var due = Math.max(0, total - advance);
            var totalEl = document.getElementById('modal-display-total');
            var dueEl = document.getElementById('modal-display-due');
            if (totalEl) totalEl.innerText = '৳' + total;
            if (dueEl) dueEl.value = '৳' + due;
          };

          // Filter Tabs
          window.filterMerchantOrders = function(tab) {
            var tabs = document.querySelectorAll('.merchant-filter-tab');
            tabs.forEach(function(t) {
              if (t.getAttribute('data-tab') === tab) {
                t.className = 'merchant-filter-tab px-4 py-2 rounded-xl bg-ok-green-800 text-white transition-all whitespace-nowrap active';
              } else {
                t.className = 'merchant-filter-tab px-4 py-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all whitespace-nowrap';
              }
            });

            var rows = document.querySelectorAll('.merchant-order-row');
            rows.forEach(function(r) {
              var s = r.getAttribute('data-status');
              if (tab === 'all') {
                r.style.display = '';
              } else if (tab === 'in_transit') {
                if (s === 'shipped' || s === 'ready') r.style.display = '';
                else r.style.display = 'none';
              } else if (tab === 'cancelled') {
                if (s === 'cancelled' || s === 'returned') r.style.display = '';
                else r.style.display = 'none';
              } else {
                if (s === tab) r.style.display = '';
                else r.style.display = 'none';
              }
            });
          };

          // Delete Order
          window.deleteMerchantOrder = async function(orderId) {
            if (!confirm('আপনি কি নিশ্চিতভাবে অর্ডার #' + orderId + ' স্থায়ীভাবে ডিলিট করতে চান? এই কাজটি আর পূর্বাবস্থায় ফেরানো যাবে না!')) {
              return;
            }
            try {
              var res = await fetch('/api/merchant/orders/' + orderId, { method: 'DELETE' });
              var data = await res.json();
              if (data.success) {
                alert('অর্ডারটি সফলভাবে ডিলিট করা হয়েছে!');
                var row = document.getElementById('m-order-row-' + orderId);
                if (row) row.remove();
                var card = document.getElementById('m-order-card-' + orderId);
                if (card) card.remove();
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'ডিলিট ব্যর্থ হয়েছে'));
              }
            } catch(e) {
              alert('সার্ভার এরর: ' + e.message);
            }
          };

          // Create Order Form Submit
          document.getElementById('form-merchant-create-order')?.addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = document.getElementById('btn-submit-create-order');
            btn.disabled = true;
            btn.innerHTML = '<span class="ok-spinner"></span> সংরক্ষণ হচ্ছে...';

            var form = e.target;
            var sel = document.getElementById('modal-select-product');
            var opt = sel.options[sel.selectedIndex];
            var productName = sel.value === 'custom' ? form.customProductName.value.trim() : opt.getAttribute('data-name');
            var productId = sel.value === 'custom' ? undefined : sel.value;

            var payload = {
              customerName: form.customerName.value.trim(),
              customerPhone: form.customerPhone.value.trim(),
              address: form.address.value.trim(),
              district: form.district.value,
              status: form.status.value,
              productName: productName || 'ম্যানুয়াল অর্ডার',
              productId: productId,
              quantity: Number(form.quantity.value) || 1,
              price: Number(form.price.value) || 0,
              delivery: Number(form.delivery.value) || 0,
              advancePaid: Number(form.advancePaid.value) || 0
            };

            try {
              var res = await fetch('/api/merchant/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              var data = await res.json();
              if (data.success) {
                alert('ম্যানুয়াল অর্ডার সফলভাবে তৈরি হয়েছে! Order ID: ' + (data.order ? data.order.id : ''));
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'অর্ডার তৈরি করা যায়নি'));
                btn.disabled = false;
                btn.innerHTML = 'অর্ডার সংরক্ষণ করুন';
              }
            } catch(err) {
              alert('সার্ভার এরর: ' + err.message);
              btn.disabled = false;
              btn.innerHTML = 'অর্ডার সংরক্ষণ করুন';
            }
          });

          // Change Order Status
          window.changeMerchantOrderStatus = async function(orderId, newStatus) {
            try {
              var res = await fetch('/api/merchant/orders/' + orderId + '/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
              });
              var data = await res.json();
              if (data.success) {
                alert('অর্ডার স্ট্যাটাস সফলভাবে পরিবর্তিত হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          };

          // Courier Dispatch
          async function quickSendCourier(orderId) {
            if (!confirm('আপনি কি নিশ্চিতভাবে এই অর্ডারটি Steadfast কুরিয়ারে বুক করতে চান?')) return;
            try {
              var res = await fetch('/api/merchant/orders/' + orderId + '/send-courier', { method: 'POST' });
              var data = await res.json();
              if (data.success) {
                alert('সফলভাবে Steadfast কুরিয়ারে বুক হয়েছে! Tracking: ' + data.trackingCode);
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          }
        `
      }} />
    </MerchantLayout>
  )
}
