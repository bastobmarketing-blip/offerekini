import type { FC } from 'hono/jsx'
import { AdminLayout } from '../../layouts/AdminLayout'
import { getTrackingSettings } from '../../utils/tracking'
import { getCourierSettings } from '../../utils/courierService'

export const AdminSettingsPage: FC = () => {
  const tracking = getTrackingSettings()
  const courier = getCourierSettings()

  return (
    <AdminLayout title="Settings" active="settings">
      <div class="max-w-3xl space-y-6">
        <div>
          <h1 class="text-xl font-bold text-ok-charcoal">প্ল্যাটফর্ম সেটিংস</h1>
          <p class="text-xs text-ok-gray-500">মেটা পিক্সেল, সার্ভার-সাইড ট্র্যাকিং ও কুরিয়ার ইন্টিগ্রেশন</p>
        </div>

        {/* META PIXEL & CAPI */}
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center gap-3 border-b pb-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <i class="fab fa-facebook-f"></i>
            </div>
            <div>
              <h2 class="font-bold text-base text-slate-900">Meta Pixel & Conversions API (CAPI)</h2>
              <p class="text-xs text-slate-500">Facebook Ad ট্র্যাকিং ও সার্ভার-সাইড পারচেজ ইভেন্ট সেন্ডার</p>
            </div>
          </div>

          <form id="pixel-settings-form" class="space-y-4">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Meta Pixel ID *</label>
              <input
                type="text"
                name="pixelId"
                defaultValue={tracking.pixelId}
                placeholder="যেমন: 123456789012345"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:border-ok-green-700 focus:outline-none"
              />
              <p class="text-[11px] text-gray-400 mt-1">সব পেজে ব্রাউজার পিক্সেল স্বয়ংক্রিয়ভাবে ফায়ার হবে</p>
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Conversions API Access Token (Server-Side) *</label>
              <textarea
                name="accessToken"
                rows={3}
                placeholder="EAA..."
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:border-ok-green-700 focus:outline-none"
              >{tracking.accessToken}</textarea>
              <p class="text-[11px] text-gray-400 mt-1">ক্যাশ অন ডেলিভারি অর্ডার হওয়ার সাথে সাথে সার্ভার থেকে Meta Graph API-তে ১০০% সুরক্ষিত Purchase ইভেন্ট যাবে</p>
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Test Event Code (ঐচ্ছিক - টেস্ট করার জন্য)</label>
              <input
                type="text"
                name="testEventCode"
                defaultValue={tracking.testEventCode || ''}
                placeholder="TEST12345"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:border-ok-green-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              id="save-pixel-btn"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <i class="fas fa-check"></i> Save Pixel Settings
            </button>
          </form>
        </div>

        {/* STEADFAST COURIER SETTINGS */}
        <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div class="flex items-center gap-3 border-b pb-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
              <i class="fas fa-truck-fast"></i>
            </div>
            <div>
              <h2 class="font-bold text-base text-slate-900">Steadfast Courier API</h2>
              <p class="text-xs text-slate-500">মার্চেন্ট ও অ্যাডমিন প্যানেল থেকে ১-ক্লিকে পার্সেল বুকিং</p>
            </div>
          </div>

          <form id="courier-settings-form" class="space-y-4">
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Steadfast API Key *</label>
              <input
                type="text"
                name="apiKey"
                defaultValue={courier.apiKey}
                placeholder="Steadfast API Key"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:border-ok-green-700 focus:outline-none"
              />
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Steadfast Secret Key *</label>
              <input
                type="password"
                name="secretKey"
                defaultValue={courier.secretKey}
                placeholder="Steadfast Secret Key"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:border-ok-green-700 focus:outline-none"
              />
              <p class="text-[11px] text-gray-400 mt-1">Steadfast মার্চেন্ট পোর্টালে (Settings &gt; API) এই কীগুলো পাবেন</p>
            </div>

            <button
              type="submit"
              id="save-courier-btn"
              class="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <i class="fas fa-check"></i> Save Courier Settings
            </button>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('pixel-settings-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = document.getElementById('save-pixel-btn');
            btn.disabled = true;
            btn.innerHTML = 'সংরক্ষণ হচ্ছে...';

            var payload = {
              pixelId: this.pixelId.value.trim(),
              accessToken: this.accessToken.value.trim(),
              testEventCode: this.testEventCode.value.trim(),
              enabled: true
            };

            try {
              var res = await fetch('/api/admin/settings/pixel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              var data = await res.json();
              if (data.success) {
                alert('মেটা পিক্সেল ও CAPI সেটিংস সফলভাবে আপডেট হয়েছে!');
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            } finally {
              btn.disabled = false;
              btn.innerHTML = '<i class="fas fa-check"></i> Save Pixel Settings';
            }
          });

          document.getElementById('courier-settings-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = document.getElementById('save-courier-btn');
            btn.disabled = true;
            btn.innerHTML = 'সংরক্ষণ হচ্ছে...';

            var payload = {
              apiKey: this.apiKey.value.trim(),
              secretKey: this.secretKey.value.trim(),
              provider: 'steadfast',
              enabled: true
            };

            try {
              var res = await fetch('/api/admin/settings/courier', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              var data = await res.json();
              if (data.success) {
                alert('Steadfast কুরিয়ার সেটিংস সফলভাবে আপডেট হয়েছে!');
              } else {
                alert('ত্রুটি: ' + (data.error || 'Failed'));
              }
            } catch(e) {
              alert('Error: ' + e.message);
            } finally {
              btn.disabled = false;
              btn.innerHTML = '<i class="fas fa-check"></i> Save Courier Settings';
            }
          });
        `
      }} />
    </AdminLayout>
  )
}
