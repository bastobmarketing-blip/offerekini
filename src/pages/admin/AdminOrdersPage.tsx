import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { orders } from '../../data/orders'
import { merchants, getMerchantById } from '../../data/merchants'
import { formatBDT } from '../../utils/format'
import { StatusBadge } from '../../components/ui/StatusBadge'

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
  return (
    <AdminLayout title="Orders" active="orders">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">All Orders ({orders.length})</h1>
          <p class="text-xs text-ok-gray-500">প্ল্যাটফর্মের সকল কাস্টমার অর্ডার, তারিখ ও মার্চেন্ট অ্যাসাইনমেন্ট</p>
        </div>

        {/* FILTERS */}
        <div class="flex items-center gap-3 flex-wrap">
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

                return (
                  <tr
                    class="hover:bg-gray-50/60 transition-colors order-row"
                    data-order-id={o.id}
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
                    </td>

                    <td class="p-4" id={`merchant-cell-${o.id}`}>
                      {merchant ? (
                        <div class="space-y-1">
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            🏪 {merchant.storeName}
                          </span>
                          <p class="text-[10px] text-gray-400 font-mono">{merchant.phone}</p>
                          <button
                            type="button"
                            onclick={`openAssignMerchantModal('${o.id}', '${o.customerName}', '${merchant.id}')`}
                            class="text-[11px] font-bold text-ok-green-800 hover:underline block"
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
                            onclick={`openAssignMerchantModal('${o.id}', '${o.customerName}', 'unassigned')`}
                            class="text-xs font-bold text-blue-600 hover:underline block"
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

                    <td class="p-4">
                      {o.trackingCode ? (
                        <span class="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          🚚 {o.trackingCode}
                        </span>
                      ) : (
                        <span class="text-xs text-gray-400 italic">নট সেন্ট</span>
                      )}
                    </td>

                    <td class="p-4 text-right">
                      <button
                        type="button"
                        onclick={`openAssignMerchantModal('${o.id}', '${o.customerName}', '${o.merchantId || "unassigned"}')`}
                        class="bg-gray-100 hover:bg-ok-green-50 hover:text-ok-green-800 text-gray-700 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                        title="মার্চেন্ট অ্যাসাইন / পরিবর্তন করুন"
                      >
                        <i class="fas fa-store text-[11px]"></i> অ্যাসাইন
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ASSIGN / REASSIGN MERCHANT MODAL */}
      <div id="modal-assign-merchant" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
          <button
            type="button"
            id="btn-close-assign-modal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
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
                class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                id="btn-submit-assign"
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
          // Filter Logic
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

          // Assign Modal
          var assignModal = document.getElementById('modal-assign-merchant');
          window.openAssignMerchantModal = function(orderId, custName, currentMerchantId) {
            document.getElementById('assign-order-id').textContent = orderId;
            document.getElementById('assign-cust-name').textContent = custName;
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

          // Submit Assign Merchant
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
        `
      }} />
    </AdminLayout>
  )
}
