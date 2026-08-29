import type { FC } from 'hono/jsx'
import { Document } from '../../components/Document'

interface EpsGatewayPageProps {
  trxId: string
  orderId: string
  amount: number
  customerName: string
}

export const EpsGatewayPage: FC<EpsGatewayPageProps> = ({ trxId, orderId, amount, customerName }) => {
  return (
    <Document title="EPS Payment Gateway">
      <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {/* EPS Gateway Container */}
        <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* EPS Header */}
          <div class="bg-gradient-to-r from-blue-700 to-indigo-800 p-5 text-white flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2">
                <span class="bg-yellow-400 text-blue-900 text-xs font-black px-2 py-0.5 rounded tracking-wider">EPS</span>
                <span class="font-extrabold text-lg tracking-tight">Easy Payment System</span>
              </div>
              <p class="text-xs text-blue-200 mt-1">Bangladesh Bank Licensed PSO</p>
            </div>
            <div class="text-right">
              <span class="text-xs text-blue-200 block">অগ্রিম পরিশোধ</span>
              <span class="text-xl font-extrabold text-yellow-300">৳{amount}</span>
            </div>
          </div>

          {/* Merchant & Order Details */}
          <div class="bg-blue-50/70 px-5 py-3.5 border-b border-blue-100 flex items-center justify-between text-xs">
            <div>
              <span class="text-gray-500 block">মার্চেন্ট</span>
              <span class="font-bold text-gray-800 text-sm">Offerekini.com</span>
            </div>
            <div>
              <span class="text-gray-500 block">অর্ডার আইডি</span>
              <span class="font-mono font-bold text-blue-900">{orderId}</span>
            </div>
            <div>
              <span class="text-gray-500 block">গ্রাহক</span>
              <span class="font-semibold text-gray-800">{customerName}</span>
            </div>
          </div>

          {/* Payment Options Selection */}
          <div class="p-5">
            <label class="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
              পেমেন্ট মাধ্যম নির্বাচন করুন
            </label>

            <div class="space-y-3">
              {/* MFS Category */}
              <div class="border border-green-200 bg-green-50/50 rounded-xl p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-green-900 flex items-center gap-1.5">
                    <i class="fas fa-mobile-screen-button text-green-600"></i> মোবাইল ব্যাংকিং (MFS)
                  </span>
                  <span class="text-[10px] bg-green-200 text-green-800 font-bold px-2 py-0.5 rounded-full">ইনস্ট্যান্ট</span>
                </div>
                <div class="grid grid-cols-4 gap-2">
                  <button type="button" class="eps-channel-btn bg-pink-500 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer focus:ring-2 focus:ring-pink-400" data-channel="bKash">
                    bKash
                  </button>
                  <button type="button" class="eps-channel-btn bg-orange-500 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer focus:ring-2 focus:ring-orange-400" data-channel="Nagad">
                    Nagad
                  </button>
                  <button type="button" class="eps-channel-btn bg-purple-600 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer focus:ring-2 focus:ring-purple-400" data-channel="Rocket">
                    Rocket
                  </button>
                  <button type="button" class="eps-channel-btn bg-emerald-600 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer focus:ring-2 focus:ring-emerald-400" data-channel="CellFin">
                    CellFin
                  </button>
                </div>
              </div>

              {/* Cards & NetBanking */}
              <div class="border border-gray-200 bg-gray-50/50 rounded-xl p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <i class="fas fa-credit-card text-blue-600"></i> ডেবিট/ক্রেডিট কার্ড ও ইন্টারনেট ব্যাংকিং
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <button type="button" class="eps-channel-btn bg-blue-900 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer" data-channel="VISA/MC">
                    VISA / MC
                  </button>
                  <button type="button" class="eps-channel-btn bg-indigo-700 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer" data-channel="DBBL">
                    DBBL NexPay
                  </button>
                  <button type="button" class="eps-channel-btn bg-cyan-700 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer" data-channel="CityTouch">
                    City Touch
                  </button>
                </div>
              </div>
            </div>

            {/* Phone number input for MFS */}
            <div id="eps-mfs-input" class="mt-4 hidden">
              <label class="block text-xs font-bold text-gray-600 mb-1.5" id="eps-mfs-label">bKash নম্বর দিন</label>
              <input
                type="tel"
                id="eps-mfs-phone"
                placeholder="01XXXXXXXXX"
                maxlength={11}
                class="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
              <p id="eps-mfs-error" class="text-red-500 text-xs mt-1 hidden">সঠিক মোবাইল নম্বর দিন (11 ডিজিট)</p>
            </div>

            {/* EPS Action Buttons */}
            <div class="mt-6 space-y-2">
              <button
                type="button"
                id="eps-confirm-pay"
                disabled
                class="w-full bg-gray-300 text-gray-500 font-bold py-3.5 px-4 rounded-xl text-center block shadow-lg transition-all text-sm cursor-not-allowed"
              >
                <i class="fas fa-hand-pointer mr-1.5"></i> প্রথমে পেমেন্ট মাধ্যম নির্বাচন করুন
              </button>
              <a
                href={`/payment/cancel?trxId=${trxId}&orderId=${orderId}`}
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2.5 px-4 rounded-xl text-center block transition-colors text-xs"
              >
                পেমেন্ট বাতিল করুন
              </a>
            </div>

            {/* EPS Trust Footer */}
            <div class="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span class="flex items-center gap-1">
                <i class="fas fa-shield-cat text-blue-600"></i> 256-bit SSL Encrypted
              </span>
              <span>Powered by EPS Gateway</span>
            </div>
          </div>
        </div>
      </div>

      {/* EPS Gateway interaction logic */}
      <script dangerouslySetInnerHTML={{
        __html: `
        (function() {
          var trxId = '${trxId}';
          var orderId = '${orderId}';
          var amount = ${amount};
          var selectedChannel = null;
          var confirmBtn = document.getElementById('eps-confirm-pay');
          var mfsInput = document.getElementById('eps-mfs-input');
          var mfsLabel = document.getElementById('eps-mfs-label');
          var mfsPhone = document.getElementById('eps-mfs-phone');
          var mfsError = document.getElementById('eps-mfs-error');

          // Channel selection
          var channelBtns = document.querySelectorAll('.eps-channel-btn');
          channelBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
              // Remove previous selection
              channelBtns.forEach(function(b) {
                b.style.outline = 'none';
                b.style.outlineOffset = '0';
              });
              // Highlight selected
              btn.style.outline = '3px solid #2563eb';
              btn.style.outlineOffset = '2px';
              selectedChannel = btn.getAttribute('data-channel');

              // Show MFS input for mobile banking options
              var mfsChannels = ['bKash', 'Nagad', 'Rocket', 'CellFin'];
              if (mfsChannels.indexOf(selectedChannel) !== -1) {
                mfsInput.classList.remove('hidden');
                mfsLabel.textContent = selectedChannel + ' নম্বর দিন';
                mfsPhone.focus();
              } else {
                mfsInput.classList.add('hidden');
              }

              // Enable confirm button
              confirmBtn.disabled = false;
              confirmBtn.className = 'w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl text-center block shadow-lg shadow-blue-700/25 transition-all text-sm cursor-pointer';
              confirmBtn.innerHTML = '<i class=\"fas fa-lock mr-1.5\"></i> ৳' + amount + ' ' + selectedChannel + ' দিয়ে পরিশোধ করুন';
            });
          });

          // Confirm payment
          confirmBtn.addEventListener('click', function() {
            if (!selectedChannel) return;

            // Validate MFS phone if needed
            var mfsChannels = ['bKash', 'Nagad', 'Rocket', 'CellFin'];
            if (mfsChannels.indexOf(selectedChannel) !== -1) {
              var phone = mfsPhone.value.replace(/[^0-9]/g, '');
              if (phone.length !== 11 || phone.charAt(0) !== '0') {
                mfsError.classList.remove('hidden');
                mfsPhone.style.borderColor = '#ef4444';
                mfsPhone.focus();
                return;
              }
              mfsError.classList.add('hidden');
              mfsPhone.style.borderColor = '#d1d5db';
            }

            // Show processing state
            confirmBtn.disabled = true;
            confirmBtn.className = 'w-full bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl text-center block text-sm cursor-wait opacity-80';
            confirmBtn.innerHTML = '<span class=\"inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2\"></span> পেমেন্ট প্রসেসিং হচ্ছে...';

            // Call server-side verification endpoint
            fetch('/api/eps/verify-and-complete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                trxId: trxId,
                orderId: orderId,
                amount: amount,
                channel: selectedChannel,
                mfsPhone: mfsPhone.value || ''
              })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
              if (data && data.verified) {
                // Payment verified — redirect to success
                window.location.href = '/payment/success?trxId=' + trxId + '&orderId=' + orderId + '&verified=true';
              } else {
                // Payment not verified
                confirmBtn.disabled = false;
                confirmBtn.className = 'w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl text-center block shadow-lg text-sm cursor-pointer';
                confirmBtn.innerHTML = '<i class=\"fas fa-triangle-exclamation mr-1.5\"></i> পেমেন্ট ব্যর্থ হয়েছে — আবার চেষ্টা করুন';
                setTimeout(function() {
                  confirmBtn.className = 'w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl text-center block shadow-lg shadow-blue-700/25 transition-all text-sm cursor-pointer';
                  confirmBtn.innerHTML = '<i class=\"fas fa-lock mr-1.5\"></i> ৳' + amount + ' ' + selectedChannel + ' দিয়ে পরিশোধ করুন';
                }, 3000);
              }
            })
            .catch(function(err) {
              console.error('EPS verify error:', err);
              confirmBtn.disabled = false;
              confirmBtn.className = 'w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl text-center block shadow-lg text-sm cursor-pointer';
              confirmBtn.innerHTML = '<i class=\"fas fa-triangle-exclamation mr-1.5\"></i> সার্ভার এরর — আবার চেষ্টা করুন';
            });
          });
        })();
        `
      }} />
    </Document>
  )
}
