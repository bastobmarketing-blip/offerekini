import type { FC } from 'hono/jsx'
import { Document } from '../../components/Document'
import { FormField } from '../../components/ui/FormField'

export const AdminLoginPage: FC = () => (
  <Document title="Admin Login">
    <div class="min-h-screen bg-ok-charcoal flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <img src="/static/images/brand/offerkini-logo.svg" alt="OfferKini" class="h-9 mx-auto mb-4" />
          <p class="text-ok-lime-500 font-bold text-sm tracking-wide">OFFERKINI ADMIN</p>
          <h1 class="text-white text-xl font-extrabold mt-2">সিকিউর অ্যাডমিন প্যানেল</h1>
        </div>
        <form id="admin-login-form" class="bg-white rounded-2xl p-6 space-y-4 shadow-2xl">
          <FormField label="Email" name="email" type="email" placeholder="admin@offerkini.com" required />
          <FormField label="Password" name="password" type="password" placeholder="••••••••" required />
          <button type="submit" id="admin-login-btn" class="w-full bg-ok-charcoal hover:bg-black text-white font-bold py-3 rounded-xl transition-colors">
            Login
          </button>
          <p class="text-xs text-ok-gray-400 text-center"><i class="fas fa-shield-halved mr-1"></i> ডেমো: যেকোনো তথ্য দিয়ে লগইন করা যাবে।</p>
        </form>
      </div>
    </div>
    <script dangerouslySetInnerHTML={{ __html: `document.getElementById('admin-login-form').addEventListener('submit', function(e){e.preventDefault(); document.getElementById('admin-login-btn').innerHTML='<span class="ok-spinner"></span>'; setTimeout(function(){window.location.href='/admin/dashboard';}, 700);});` }} />
  </Document>
)
