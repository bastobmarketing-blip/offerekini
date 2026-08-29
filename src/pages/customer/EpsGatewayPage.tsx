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
                  <button type="button" class="eps-channel-btn bg-pink-500 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer focus:ring-2 focus:ring-pink-400">
                    bKash
                  </button>
                  <button type="button" class="eps-channel-btn bg-orange-500 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer focus:ring-2 focus:ring-orange-400">
                    Nagad
                  </button>
                  <button type="button" class="eps-channel-btn bg-purple-600 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer focus:ring-2 focus:ring-purple-400">
                    Rocket
                  </button>
                  <button type="button" class="eps-channel-btn bg-emerald-600 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer focus:ring-2 focus:ring-emerald-400">
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
                  <button type="button" class="eps-channel-btn bg-blue-900 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer">
                    VISA / MC
                  </button>
                  <button type="button" class="eps-channel-btn bg-indigo-700 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer">
                    DBBL NexPay
                  </button>
                  <button type="button" class="eps-channel-btn bg-cyan-700 text-white rounded-lg p-2 text-center text-xs font-bold shadow-sm hover:scale-105 transition-transform cursor-pointer">
                    City Touch
                  </button>
                </div>
              </div>
            </div>

            {/* EPS Action Buttons */}
            <div class="mt-6 space-y-2">
              <a
                id="eps-confirm-pay"
                href={`/payment/success?trxId=${trxId}&orderId=${orderId}`}
                class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl text-center block shadow-lg shadow-blue-700/25 transition-all text-sm cursor-pointer"
              >
                <i class="fas fa-lock mr-1.5"></i> ৳{amount} পেমেন্ট সম্পন্ন করুন (EPS Secured)
              </a>
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
    </Document>
  )
}
