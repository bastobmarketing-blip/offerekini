import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { merchants } from '../../data/merchants'
import { products } from '../../data/products'
import { orders } from '../../data/orders'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'

export const AdminMerchantsPage: FC = () => {
  const totalMerchants = merchants.length
  const activeMerchants = merchants.filter((m) => m.status === 'active').length

  return (
    <AdminLayout title="Merchants" active="merchants">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">মার্চেন্ট ও প্রোডাক্ট অটো-বাইন্ডিং প্যানেল</h1>
          <p class="text-xs text-ok-gray-500">প্রোডাক্ট সিলেক্ট করে মার্চেন্টে পার্মানেন্টলি অ্যাসাইন করুন ও অর্ডার ট্র্যাক করুন</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            id="btn-open-bind-product-modal"
            class="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all"
          >
            <i class="fas fa-link"></i> প্রোডাক্ট মার্চেন্টে বাইন্ড করুন
          </button>
          <button
            type="button"
            id="btn-open-add-merchant"
            class="bg-ok-green-800 hover:bg-ok-green-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all"
          >
            <i class="fas fa-plus"></i> নতুন মার্চেন্ট
          </button>
        </div>
      </div>

      {/* QUICK BIND BANNER */}
      <div class="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-5 text-white mb-6 shadow-md">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="font-bold text-base flex items-center gap-2">
              <i class="fas fa-wand-magic-sparkles text-ok-lime-400"></i> ১-ক্লিকে অটো-অ্যাসাইন সিস্টেম
            </h3>
            <p class="text-xs text-emerald-100 mt-1 max-w-xl">
              ওয়েবসাইটের যেকোনো প্রোডাক্ট একবার কোনো মার্চেন্টের সাথে বাইন্ড (Bind) করে দিলে, ওই প্রোডাক্টের অতীত ও ভবিষ্যতের সকল অর্ডার স্বয়ংক্রিয়ভাবে ওই মার্চেন্টের প্যানেলে চলে যাবে।
            </p>
          </div>
          <button
            type="button"
            onclick="document.getElementById('modal-bind-product').classList.remove('hidden')"
            class="bg-ok-lime-400 hover:bg-ok-lime-500 text-ok-green-900 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all whitespace-nowrap self-start md:self-center"
          >
            অটো-বাইন্ড শুরু করুন →
          </button>
        </div>
      </div>

      {/* MERCHANTS DETAILED CARDS & STATS */}
      <div class="space-y-4">
        {merchants.map((m) => {
          const assignedProducts = products.filter((p) => p.merchantId === m.id)
          const mOrders = orders.filter((o) => o.merchantId === m.id)

          const pendingCount = mOrders.filter((o) => o.status === 'pending').length
          const calledCount = mOrders.filter((o) => o.status === 'called').length
          const inTransitCount = mOrders.filter((o) => o.status === 'shipped' || o.status === 'ready').length
          const deliveredCount = mOrders.filter((o) => o.status === 'delivered').length
          const cancelledCount = mOrders.filter((o) => o.status === 'cancelled' || o.status === 'returned').length

          const totalRevenue = mOrders
            .filter((o) => o.status !== 'cancelled')
            .reduce((sum, o) => sum + (o.totalAmount || 0), 0)

          return (
            <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                {/* MERCHANT INFO */}
                <div class="flex items-start sm:items-center gap-3.5">
                  <div class="w-12 h-12 rounded-2xl bg-ok-green-800 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                    {m.storeName.charAt(0)}
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h2 class="font-bold text-base text-ok-charcoal">{m.storeName}</h2>
                      <span class="text-[11px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        ID: {m.id}
                      </span>
                      <StatusBadge status={m.status} />
                    </div>
                    <div class="flex items-center gap-3 text-xs text-ok-gray-500 mt-1 flex-wrap">
                      <span><i class="fas fa-user text-gray-400 mr-1"></i>{m.ownerName}</span>
                      <span><i class="fas fa-phone text-gray-400 mr-1 font-mono"></i>{m.phone}</span>
                      <span><i class="fas fa-location-dot text-gray-400 mr-1"></i>{m.address}</span>
                    </div>
                  </div>
                </div>

                {/* LOGIN CREDENTIALS & ACTIONS */}
                <div class="flex items-center gap-3 self-end lg:self-center flex-wrap">
                  <div class="text-xs bg-slate-50 px-3 py-1.5 rounded-xl border border-gray-200">
                    <span class="text-gray-400 font-bold uppercase text-[10px]">Pass: </span>
                    <span class="font-mono font-bold text-slate-800 select-all">{m.password || 'password123'}</span>
                  </div>
                  <a
                    href={`/admin/merchants/${m.id}/impersonate`}
                    target="_blank"
                    class="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-200 transition-colors inline-flex items-center gap-1.5"
                  >
                    <i class="fas fa-arrow-right-to-bracket text-[11px]"></i> মার্চেন্ট লগইন
                  </a>
                  <button
                    type="button"
                    onclick={`openEditMerchantModal(${JSON.stringify(JSON.stringify(m))})`}
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold p-2 rounded-xl transition-colors"
                    title="এডিট"
                  >
                    <i class="fas fa-pen"></i>
                  </button>
                  <button
                    type="button"
                    onclick={`deleteMerchantAction('${m.id}', '${m.storeName}')`}
                    class="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold p-2 rounded-xl transition-colors"
                    title="ডিলিট"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              {/* METRICS TILES */}
              <div class="grid grid-cols-2 sm:grid-cols-6 gap-2.5 mt-4">
                <div class="bg-gray-50/80 rounded-xl p-2.5 text-center border border-gray-100">
                  <p class="text-[10px] text-gray-400 font-bold uppercase">মোট অর্ডার</p>
                  <p class="text-lg font-black text-slate-800 mt-0.5">{mOrders.length}</p>
                </div>
                <div class="bg-amber-50/70 rounded-xl p-2.5 text-center border border-amber-100">
                  <p class="text-[10px] text-amber-700 font-bold uppercase">পেন্ডিং</p>
                  <p class="text-lg font-black text-amber-700 mt-0.5">{pendingCount}</p>
                </div>
                <div class="bg-blue-50/70 rounded-xl p-2.5 text-center border border-blue-100">
                  <p class="text-[10px] text-blue-700 font-bold uppercase">কল দেওয়া হয়েছে</p>
                  <p class="text-lg font-black text-blue-700 mt-0.5">{calledCount}</p>
                </div>
                <div class="bg-sky-50/70 rounded-xl p-2.5 text-center border border-sky-100">
                  <p class="text-[10px] text-sky-700 font-bold uppercase">ট্রানজিটে / কুরিয়ার</p>
                  <p class="text-lg font-black text-sky-700 mt-0.5">{inTransitCount}</p>
                </div>
                <div class="bg-emerald-50/70 rounded-xl p-2.5 text-center border border-emerald-100">
                  <p class="text-[10px] text-emerald-700 font-bold uppercase">ডেলিভার্ড</p>
                  <p class="text-lg font-black text-emerald-700 mt-0.5">{deliveredCount}</p>
                </div>
                <div class="bg-rose-50/70 rounded-xl p-2.5 text-center border border-rose-100">
                  <p class="text-[10px] text-rose-700 font-bold uppercase">বাতিল / রিটার্ন</p>
                  <p class="text-lg font-black text-rose-700 mt-0.5">{cancelledCount}</p>
                </div>
              </div>

              {/* ASSIGNED PRODUCTS LIST */}
              <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-bold text-slate-700">অ্যাসাইন করা প্রোডাক্ট ({assignedProducts.length}):</span>
                  {assignedProducts.length === 0 ? (
                    <span class="text-gray-400 italic">কোনো প্রোডাক্ট অ্যাসাইন করা নেই</span>
                  ) : (
                    assignedProducts.map((p) => (
                      <span class="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
                        📦 {p.name}
                        <a href={`/admin/products/${p.id}/edit`} class="text-emerald-600 hover:text-emerald-900 ml-1">
                          <i class="fas fa-arrow-up-right-from-square text-[10px]"></i>
                        </a>
                      </span>
                    ))
                  )}
                </div>

                <div class="text-right">
                  <span class="text-gray-400">মোট বিক্রয়: </span>
                  <span class="font-extrabold text-ok-green-800 text-sm">{formatBDT(totalRevenue)}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* AUTO-BIND PRODUCT TO MERCHANT MODAL */}
      <div id="modal-bind-product" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
          <button
            type="button"
            onclick="document.getElementById('modal-bind-product').classList.add('hidden')"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
          <div class="mb-5">
            <h3 class="text-lg font-bold text-ok-charcoal flex items-center gap-2">
              <i class="fas fa-link text-emerald-600"></i> প্রোডাক্ট ও মার্চেন্ট অটো-বাইন্ডিং
            </h3>
            <p class="text-xs text-ok-gray-500 mt-1">
              প্রোডাক্ট সিলেক্ট করে মার্চেন্ট নির্ধারণ করুন। এরপর থেকে এই প্রোডাক্টের সকল অর্ডার সরাসরি এই মার্চেন্টের কাছে চলে যাবে।
            </p>
          </div>

          <form id="form-bind-product" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-ok-charcoal mb-1">প্রোডাক্ট নির্বাচন বা নাম খুঁজুন *</label>
              <select
                name="productId"
                id="bind-select-product"
                required
                class="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 bg-white"
              >
                <option value="">-- প্রোডাক্ট নির্বাচন করুন --</option>
                {products.map((p) => (
                  <option value={p.id}>
                    {p.name} ({formatBDT(p.offerKiniPrice)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-ok-charcoal mb-1">নির্ধারিত মার্চেন্ট নির্বাচন করুন *</label>
              <select
                name="merchantId"
                id="bind-select-merchant"
                required
                class="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 bg-white"
              >
                <option value="">-- মার্চেন্ট নির্বাচন করুন --</option>
                {merchants.map((m) => (
                  <option value={m.id}>
                    {m.storeName} ({m.ownerName} - {m.phone})
                  </option>
                ))}
              </select>
            </div>

            <div class="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800">
              <p class="font-bold flex items-center gap-1.5">
                <i class="fas fa-info-circle"></i> স্বয়ংক্রিয় রি-অ্যাসাইন:
              </p>
              <p class="mt-0.5 text-[11px] text-amber-700">
                এই প্রোডাক্টের অতীতের যত অর্ডার সিস্টেমে আছে এবং ভবিষ্যতে যত নতুন অর্ডার আসবে—সবগুলো অটোমেটিক এই মার্চেন্টের অধীনে যুক্ত হবে।
              </p>
            </div>

            <div class="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                onclick="document.getElementById('modal-bind-product').classList.add('hidden')"
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="btn-submit-bind"
                class="px-5 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 shadow-sm"
              >
                প্রোডাক্ট লিঙ্ক ও অটো-অ্যাসাইন করুন
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ADD MERCHANT MODAL */}
      <div id="modal-add-merchant" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
          <button
            type="button"
            id="btn-close-add-modal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
          <div class="mb-5">
            <h3 class="text-lg font-bold text-ok-charcoal flex items-center gap-2">
              <i class="fas fa-store text-ok-green-700"></i> নতুন মার্চেন্ট অ্যাকাউন্ট তৈরি করুন
            </h3>
            <p class="text-xs text-ok-gray-500">মার্চেন্টের জন্য আলাদা ফোন ও পাসওয়ার্ড নির্ধারণ করুন</p>
          </div>

          <form id="form-add-merchant" class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">স্টোরের নাম (Store Name) *</label>
                <input
                  type="text"
                  name="storeName"
                  required
                  placeholder="যেমন: Testo Health Care"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">মালিকের নাম (Owner Name) *</label>
                <input
                  type="text"
                  name="ownerName"
                  required
                  placeholder="যেমন: ইকবাল হোসেন"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">লগইন ফোন নম্বর (Phone) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="017XXXXXXXX"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 font-mono"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">লগইন পাসওয়ার্ড (Password) *</label>
                <input
                  type="text"
                  name="password"
                  required
                  value="123456"
                  placeholder="পাসওয়ার্ড দিন"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 font-mono"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">ইমেইল (ঐচ্ছিক)</label>
                <input
                  type="email"
                  name="email"
                  placeholder="merchant@example.com"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">ঠিকানা / জেলা</label>
                <input
                  type="text"
                  name="address"
                  placeholder="যেমন: ঢাকা, বাংলাদেশ"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
            </div>

            <div class="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                id="btn-cancel-add-modal"
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="btn-submit-add-merchant"
                class="px-5 py-2 bg-ok-green-800 text-white rounded-xl text-xs font-bold hover:bg-ok-green-900 shadow-sm"
              >
                মার্চেন্ট তৈরি করুন
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* EDIT MERCHANT MODAL */}
      <div id="modal-edit-merchant" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
          <button
            type="button"
            id="btn-close-edit-modal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            ✕
          </button>
          <div class="mb-5">
            <h3 class="text-lg font-bold text-ok-charcoal flex items-center gap-2">
              <i class="fas fa-edit text-ok-green-700"></i> মার্চেন্ট তথ্য আপডেট করুন
            </h3>
            <p class="text-xs text-ok-gray-500">পাসওয়ার্ড বা যোগাযোগের তথ্য পরিবর্তন করুন</p>
          </div>

          <form id="form-edit-merchant" class="space-y-4">
            <input type="hidden" name="merchantId" id="edit-merchant-id" />

            <div class="grid sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">স্টোরের নাম *</label>
                <input
                  type="text"
                  name="storeName"
                  id="edit-storeName"
                  required
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">মালিকের নাম *</label>
                <input
                  type="text"
                  name="ownerName"
                  id="edit-ownerName"
                  required
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">লগইন ফোন নম্বর *</label>
                <input
                  type="tel"
                  name="phone"
                  id="edit-phone"
                  required
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 font-mono"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">লগইন পাসওয়ার্ড *</label>
                <input
                  type="text"
                  name="password"
                  id="edit-password"
                  required
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700 font-mono"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">স্ট্যাটাস</label>
                <select
                  name="status"
                  id="edit-status"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                >
                  <option value="active">Active (সক্রিয়)</option>
                  <option value="pending">Pending (অপেক্ষমাণ)</option>
                  <option value="inactive">Inactive (নিষ্ক্রিয়)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-ok-charcoal mb-1">ঠিকানা</label>
                <input
                  type="text"
                  name="address"
                  id="edit-address"
                  class="w-full text-xs p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-ok-green-700"
                />
              </div>
            </div>

            <div class="pt-3 border-t flex justify-end gap-2">
              <button
                type="button"
                id="btn-cancel-edit-modal"
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="btn-submit-edit-merchant"
                class="px-5 py-2 bg-ok-green-800 text-white rounded-xl text-xs font-bold hover:bg-ok-green-900 shadow-sm"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Open Bind Modal
          var bindBtn = document.getElementById('btn-open-bind-product-modal');
          if (bindBtn) {
            bindBtn.addEventListener('click', function() {
              document.getElementById('modal-bind-product').classList.remove('hidden');
            });
          }

          // Submit Bind Product Form
          document.getElementById('form-bind-product').addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = document.getElementById('btn-submit-bind');
            btn.disabled = true;
            btn.innerHTML = '<span class="ok-spinner"></span> বাইন্ড হচ্ছে...';

            var productId = document.getElementById('bind-select-product').value;
            var merchantId = document.getElementById('bind-select-merchant').value;

            try {
              var res = await fetch('/api/admin/products/bind', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: productId, merchantId: merchantId })
              });
              var data = await res.json();
              if (data.success) {
                alert('সফলভাবে প্রোডাক্টটি এই মার্চেন্টের সাথে বাইন্ড করা হয়েছে এবং অতীতের ' + (data.reassignedOrders || 0) + ' টি অর্ডার অটো-অ্যাসাইন করা হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
                btn.disabled = false;
                btn.innerHTML = 'প্রোডাক্ট লিঙ্ক ও অটো-অ্যাসাইন করুন';
              }
            } catch(err) {
              alert('Error: ' + err.message);
              btn.disabled = false;
              btn.innerHTML = 'প্রোডাক্ট লিঙ্ক ও অটো-অ্যাসাইন করুন';
            }
          });

          // Open Add Modal
          document.getElementById('btn-open-add-merchant').addEventListener('click', function() {
            document.getElementById('modal-add-merchant').classList.remove('hidden');
          });
          document.getElementById('btn-close-add-modal').addEventListener('click', function() {
            document.getElementById('modal-add-merchant').classList.add('hidden');
          });
          document.getElementById('btn-cancel-add-modal').addEventListener('click', function() {
            document.getElementById('modal-add-merchant').classList.add('hidden');
          });

          // Add Merchant Form Submit
          document.getElementById('form-add-merchant').addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = document.getElementById('btn-submit-add-merchant');
            btn.disabled = true;
            btn.innerHTML = '<span class="ok-spinner"></span> তৈরি হচ্ছে...';

            var form = e.target;
            var payload = {
              storeName: form.storeName.value.trim(),
              ownerName: form.ownerName.value.trim(),
              phone: form.phone.value.trim(),
              password: form.password.value.trim(),
              email: form.email.value.trim(),
              address: form.address.value.trim(),
              status: 'active'
            };

            try {
              var res = await fetch('/api/admin/merchants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              var data = await res.json();
              if (data.success) {
                alert('মার্চেন্ট সফলভাবে তৈরি হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'তৈরি করা সম্ভব হয়নি'));
                btn.disabled = false;
                btn.innerHTML = 'মার্চেন্ট তৈরি করুন';
              }
            } catch(err) {
              alert('সার্ভার এরর: ' + err.message);
              btn.disabled = false;
              btn.innerHTML = 'মার্চেন্ট তৈরি করুন';
            }
          });

          // Open Edit Modal
          window.openEditMerchantModal = function(rawMerchant) {
            var m = typeof rawMerchant === 'string' ? JSON.parse(rawMerchant) : rawMerchant;
            document.getElementById('edit-merchant-id').value = m.id;
            document.getElementById('edit-storeName').value = m.storeName || '';
            document.getElementById('edit-ownerName').value = m.ownerName || '';
            document.getElementById('edit-phone').value = m.phone || '';
            document.getElementById('edit-password').value = m.password || '123456';
            document.getElementById('edit-status').value = m.status || 'active';
            document.getElementById('edit-address').value = m.address || '';
            document.getElementById('modal-edit-merchant').classList.remove('hidden');
          };

          document.getElementById('btn-close-edit-modal').addEventListener('click', function() {
            document.getElementById('modal-edit-merchant').classList.add('hidden');
          });
          document.getElementById('btn-cancel-edit-modal').addEventListener('click', function() {
            document.getElementById('modal-edit-merchant').classList.add('hidden');
          });

          // Edit Merchant Form Submit
          document.getElementById('form-edit-merchant').addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = document.getElementById('btn-submit-edit-merchant');
            btn.disabled = true;
            btn.innerHTML = '<span class="ok-spinner"></span> সংরক্ষণ হচ্ছে...';

            var form = e.target;
            var merchantId = form.merchantId.value;
            var payload = {
              storeName: form.storeName.value.trim(),
              ownerName: form.ownerName.value.trim(),
              phone: form.phone.value.trim(),
              password: form.password.value.trim(),
              status: form.status.value,
              address: form.address.value.trim()
            };

            try {
              var res = await fetch('/api/admin/merchants/' + merchantId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              var data = await res.json();
              if (data.success) {
                alert('মার্চেন্ট তথ্য সফলভাবে আপডেট হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'আপডেট করা সম্ভব হয়নি'));
                btn.disabled = false;
                btn.innerHTML = 'সংরক্ষণ করুন';
              }
            } catch(err) {
              alert('সার্ভার এরর: ' + err.message);
              btn.disabled = false;
              btn.innerHTML = 'সংরক্ষণ করুন';
            }
          });

          // Delete Merchant Action
          window.deleteMerchantAction = async function(id, name) {
            if (!confirm('আপনি কি নিশ্চিতভাবে "' + name + '" মার্চেন্ট অ্যাকাউন্ট মুছে ফেলতে চান?')) return;
            try {
              var res = await fetch('/api/admin/merchants/' + id, { method: 'DELETE' });
              var data = await res.json();
              if (data.success) {
                alert('মার্চেন্ট সফলভাবে মুছে ফেলা হয়েছে!');
                window.location.reload();
              } else {
                alert('ত্রুটি: ' + (data.error || 'Delete failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            }
          };
        `
      }} />
    </AdminLayout>
  )
}
