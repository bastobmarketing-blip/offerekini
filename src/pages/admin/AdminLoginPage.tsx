import type { FC } from 'hono/jsx'
import { Document } from '../../components/Document'

export const AdminLoginPage: FC = () => (
  <Document title="Admin Login" noPixel={true}>
    <div class="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <img src="/static/images/brand/offerkini-logo.png" alt="OfferKini" class="h-9 mx-auto mb-4" />
          <p class="text-ok-lime-400 font-bold text-xs tracking-wider uppercase">OfferKini Security Portal</p>
          <h1 class="text-white text-2xl font-black mt-2">অ্যাডমিন প্যানেলে লগইন</h1>
          <p class="text-slate-400 text-xs mt-1">প্ল্যাটফর্ম পরিচালনার জন্য সঠিক তথ্য দিন</p>
        </div>

        <form id="admin-login-form" class="bg-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">অ্যাডমিন ইমেইল *</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm">
                <i class="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                id="admin-email"
                value="admin@offerkini.com"
                required
                placeholder="admin@offerkini.com"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ok-green-700"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-bold text-slate-700">পাসওয়ার্ড *</label>
              <button
                type="button"
                id="btn-open-forgot-modal"
                class="text-xs text-ok-green-800 hover:underline font-semibold"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm">
                <i class="fas fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                id="admin-password"
                required
                placeholder="••••••••••••"
                class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-ok-green-700 font-mono"
              />
              <button
                type="button"
                id="btn-toggle-pass"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-sm"
              >
                <i class="fas fa-eye" id="pass-eye-icon"></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="admin-login-btn"
            class="w-full bg-ok-green-800 hover:bg-ok-green-900 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-2"
          >
            <i class="fas fa-arrow-right-to-bracket"></i>
            <span>অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন</span>
          </button>

          <div class="pt-3 border-t border-gray-100 bg-slate-50 p-3 rounded-xl text-center">
            <p class="text-[11px] text-slate-500 font-medium">
              ডিফল্ট অ্যাক্সেস: <span class="font-mono font-bold text-slate-700">admin@offerkini.com</span> | পাসওয়ার্ড: <span class="font-mono font-bold text-slate-700">adminpassword123</span>
            </p>
          </div>
        </form>
      </div>
    </div>

    {/* FORGOT / RESET PASSWORD MODAL */}
    <div id="modal-forgot-password" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          type="button"
          id="btn-close-forgot-modal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          ✕
        </button>
        <div class="mb-4">
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
            <i class="fas fa-key text-amber-600"></i> অ্যাডমিন পাসওয়ার্ড রিসেট করুন
          </h3>
          <p class="text-xs text-slate-500 mt-1">আপনার রিকভারি কি দিয়ে নতুন পাসওয়ার্ড সেট করুন</p>
        </div>

        <form id="form-reset-password" class="space-y-3.5">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">অ্যাডমিন রিকভারি কি (Master Key) *</label>
            <input
              type="text"
              name="recoveryKey"
              id="reset-recovery-key"
              required
              value="OFFERKINI-RESET-2026"
              placeholder="যেমন: OFFERKINI-RESET-2026"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono uppercase focus:outline-none focus:border-ok-green-700"
            />
            <p class="text-[10px] text-gray-400 mt-0.5">মাস্টার কি: OFFERKINI-RESET-2026</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">নতুন পাসওয়ার্ড দিন *</label>
            <input
              type="password"
              name="newPassword"
              id="reset-new-password"
              required
              minlength={6}
              placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:outline-none focus:border-ok-green-700"
            />
          </div>

          <div class="pt-2 flex justify-end gap-2">
            <button
              type="button"
              id="btn-cancel-forgot"
              class="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50"
            >
              বাতিল
            </button>
            <button
              type="submit"
              id="btn-submit-reset"
              class="px-5 py-2 bg-ok-green-800 text-white rounded-xl text-xs font-bold hover:bg-ok-green-900 shadow-sm"
            >
              পাসওয়ার্ড রিসেট করুন
            </button>
          </div>
        </form>
      </div>
    </div>

    <script dangerouslySetInnerHTML={{
      __html: `
        // Toggle Password Visibility
        var passInput = document.getElementById('admin-password');
        var eyeIcon = document.getElementById('pass-eye-icon');
        document.getElementById('btn-toggle-pass').addEventListener('click', function() {
          if (passInput.type === 'password') {
            passInput.type = 'text';
            eyeIcon.className = 'fas fa-eye-slash';
          } else {
            passInput.type = 'password';
            eyeIcon.className = 'fas fa-eye';
          }
        });

        // Login Submit
        document.getElementById('admin-login-form').addEventListener('submit', async function(e) {
          e.preventDefault();
          var btn = document.getElementById('admin-login-btn');
          btn.disabled = true;
          btn.innerHTML = '<span class="ok-spinner"></span> যাচাই করা হচ্ছে...';

          var email = document.getElementById('admin-email').value.trim();
          var password = document.getElementById('admin-password').value;

          try {
            var res = await fetch('/api/admin/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: email, password: password })
            });
            var data = await res.json();
            if (data.success) {
              window.location.href = data.redirect || '/admin/dashboard';
            } else {
              alert('লগইন ব্যর্থ হয়েছে: ' + (data.error || 'ভুল ইমেইল বা পাসওয়ার্ড'));
              btn.disabled = false;
              btn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i><span>অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন</span>';
            }
          } catch(err) {
            alert('সার্ভার এরর: ' + err.message);
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i><span>অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন</span>';
          }
        });

        // Forgot Password Modal
        var forgotModal = document.getElementById('modal-forgot-password');
        document.getElementById('btn-open-forgot-modal').addEventListener('click', function() {
          forgotModal.classList.remove('hidden');
        });
        document.getElementById('btn-close-forgot-modal').addEventListener('click', function() {
          forgotModal.classList.add('hidden');
        });
        document.getElementById('btn-cancel-forgot').addEventListener('click', function() {
          forgotModal.classList.add('hidden');
        });

        // Reset Password Submit
        document.getElementById('form-reset-password').addEventListener('submit', async function(e) {
          e.preventDefault();
          var btn = document.getElementById('btn-submit-reset');
          btn.disabled = true;
          btn.innerHTML = '<span class="ok-spinner"></span> রিসেট হচ্ছে...';

          var recoveryKey = document.getElementById('reset-recovery-key').value.trim();
          var newPassword = document.getElementById('reset-new-password').value;

          try {
            var res = await fetch('/api/admin/reset-password', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ recoveryKey: recoveryKey, newPassword: newPassword })
            });
            var data = await res.json();
            if (data.success) {
              alert('অ্যাডমিন পাসওয়ার্ড সফলভাবে রিসেট হয়েছে! নতুন পাসওয়ার্ড দিয়ে লগইন করুন।');
              forgotModal.classList.add('hidden');
              document.getElementById('admin-password').value = newPassword;
            } else {
              alert('ত্রুটি: ' + (data.error || 'পাসওয়ার্ড রিসেট করা সম্ভব হয়নি'));
            }
          } catch(err) {
            alert('সার্ভার এরর: ' + err.message);
          } finally {
            btn.disabled = false;
            btn.innerHTML = 'পাসওয়ার্ড রিসেট করুন';
          }
        });
      `
    }} />
  </Document>
)
