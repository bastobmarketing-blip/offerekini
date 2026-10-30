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
          <h1 class="text-xl font-bold text-ok-charcoal">মার্চেন্ট ম্যানেজমেন্ট</h1>
          <p class="text-xs text-ok-gray-500">প্ল্যাটফর্মে নিবন্ধিত মার্চেন্ট, আইডি, পাসওয়ার্ড ও প্রোডাক্ট অ্যাসাইনমেন্ট</p>
        </div>
        <button
          type="button"
          id="btn-open-add-merchant"
          class="bg-ok-green-800 hover:bg-ok-green-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all"
        >
          <i class="fas fa-plus"></i> নতুন মার্চেন্ট যোগ করুন
        </button>
      </div>

      {/* STATS TILES */}
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">মোট মার্চেন্ট</p>
          <p class="text-2xl font-black text-ok-charcoal mt-1">{totalMerchants}</p>
        </div>
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">সক্রিয় মার্চেন্ট</p>
          <p class="text-2xl font-black text-emerald-600 mt-1">{activeMerchants}</p>
        </div>
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">মোট প্রোডাক্ট সংখ্যা</p>
          <p class="text-2xl font-black text-ok-green-800 mt-1">{products.length}</p>
        </div>
        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p class="text-xs text-ok-gray-400 font-semibold">মোট অর্ডার</p>
          <p class="text-2xl font-black text-indigo-600 mt-1">{orders.length}</p>
        </div>
      </div>

      {/* MERCHANTS TABLE */}
      <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-ok-card">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-ok-gray-500 font-semibold border-b border-gray-100 text-xs">
              <tr>
                <th class="p-4">মার্চেন্ট / স্টোর</th>
                <th class="p-4">মালিক ও ফোন</th>
                <th class="p-4">লগইন ক্রেডেনশিয়াল</th>
                <th class="p-4">এসাইন করা প্রোডাক্ট</th>
                <th class="p-4">অর্ডার / বিক্রয়</th>
                <th class="p-4">স্ট্যাটাস</th>
                <th class="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {merchants.map((m) => {
                const assignedProducts = products.filter((p) => p.merchantId === m.id)
                const merchantOrders = orders.filter((o) => o.merchantId === m.id)
                const totalSales = merchantOrders
                  .filter((o) => o.status !== 'cancelled')
                  .reduce((sum, o) => sum + (o.totalAmount || 0), 0)

                return (
                  <tr class="hover:bg-gray-50/60 transition-colors">
                    <td class="p-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-ok-green-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {m.storeName.charAt(0)}
                        </div>
                        <div>
                          <p class="font-bold text-ok-charcoal">{m.storeName}</p>
                          <span class="inline-block text-[11px] font-mono text-ok-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            {m.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="p-4">
                      <p class="font-bold text-ok-charcoal">{m.ownerName}</p>
                      <p class="text-xs text-ok-gray-500 font-mono">{m.phone}</p>
                      <p class="text-[11px] text-ok-gray-400">{m.address}</p>
                    </td>
                    <td class="p-4">
                      <div class="space-y-1">
                        <div class="flex items-center gap-1.5">
                          <span class="text-[10px] uppercase font-bold text-gray-400">User:</span>
                          <span class="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded select-all">
                            {m.phone}
                          </span>
                        </div>
                        <div class="flex items-center gap-1.5">
                          <span class="text-[10px] uppercase font-bold text-gray-400">Pass:</span>
                          <span
                            class="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded select-all"
                            id={`pass-text-${m.id}`}
                          >
                            {m.password || 'password123'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="p-4">
                      <div class="flex items-center gap-1.5">
                        <span class="px-2 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-lg text-xs border border-emerald-200">
                          {assignedProducts.length} টি প্রোডাক্ট
                        </span>
                      </div>
                      {assignedProducts.length > 0 && (
                        <p class="text-[11px] text-gray-500 mt-1 line-clamp-1 max-w-[200px]" title={assignedProducts.map(p => p.name).join(', ')}>
                          {assignedProducts.map((p) => p.name).join(', ')}
                        </p>
                      )}
                    </td>
                    <td class="p-4">
                      <p class="font-bold text-ok-green-800">{formatBDT(totalSales || m.totalSales || 0)}</p>
                      <p class="text-xs text-ok-gray-500">{merchantOrders.length || m.totalOrders || 0} টি অর্ডার</p>
                    </td>
                    <td class="p-4">
                      <StatusBadge status={m.status} />
                    </td>
                    <td class="p-4 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <a
                          href={`/admin/merchants/${m.id}/impersonate`}
                          target="_blank"
                          title="মার্চেন্ট হিসেবে লগইন করে প্যানেল দেখুন"
                          class="bg-ok-green-50 hover:bg-ok-green-100 text-ok-green-800 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-ok-green-200 transition-colors inline-flex items-center gap-1"
                        >
                          <i class="fas fa-arrow-right-to-bracket text-[10px]"></i> লগইন করুন
                        </a>
                        <button
                          type="button"
                          onclick={`openEditMerchantModal(${JSON.stringify(JSON.stringify(m))})`}
                          title="মার্চেন্ট এডিট করুন"
                          class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <i class="fas fa-pen"></i>
                        </button>
                        <button
                          type="button"
                          onclick={`deleteMerchantAction('${m.id}', '${m.storeName}')`}
                          title="মার্চেন্ট মুছে ফেলুন"
                          class="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <i class="fas fa-trash"></i>
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

      {/* ADD MERCHANT MODAL */}
      <div id="modal-add-merchant" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
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
                  placeholder="যেমন: Testo Care BD"
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
                <p class="text-[10px] text-gray-400 mt-0.5">মার্চেন্ট এই নম্বর দিয়ে লগইন করবেন</p>
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
                <p class="text-[10px] text-gray-400 mt-0.5">ডিফল্ট: 123456</p>
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
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
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
