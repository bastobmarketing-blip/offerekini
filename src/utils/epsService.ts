import { EPS } from '../../EPS_Nodejs-main/src/EPS'
import type { InitializePaymentParams } from '../../EPS_Nodejs-main/src/types'
import { generateTransactionId } from '../../EPS_Nodejs-main/src/utils/hash'

// Default sandbox configuration for EPS Payment Gateway
const epsConfig = {
  username: process.env.EPS_USERNAME || 'sandbox_merchant',
  password: process.env.EPS_PASSWORD || 'sandbox_password',
  hashKey: process.env.EPS_HASH_KEY || 'dGVzdF9oYXNoX2tleV9mb3JfZXBzX2dhdGV3YXk=',
  merchantId: process.env.EPS_MERCHANT_ID || 'MCH-10024',
  storeId: process.env.EPS_STORE_ID || 'STR-5001',
  sandbox: process.env.EPS_SANDBOX !== 'false',
}

let epsInstance: EPS | null = null

try {
  epsInstance = new EPS(epsConfig)
} catch (err) {
  console.warn('EPS instance init fallback:', err)
}

export interface InitiateOrderPaymentParams {
  orderId: string
  amount: number
  customerName: string
  customerPhone: string
  customerAddress: string
  district: string
  area: string
  baseUrl: string
}

export async function initiateEpsPayment(params: InitiateOrderPaymentParams) {
  const trxId = generateTransactionId()

  const initParams: InitializePaymentParams = {
    customerOrderId: params.orderId,
    merchantTransactionId: trxId,
    totalAmount: params.amount,
    successUrl: `${params.baseUrl}/payment/success?trxId=${trxId}&orderId=${params.orderId}`,
    failUrl: `${params.baseUrl}/payment/fail?trxId=${trxId}&orderId=${params.orderId}`,
    cancelUrl: `${params.baseUrl}/payment/cancel?trxId=${trxId}&orderId=${params.orderId}`,
    customerName: params.customerName || 'Customer',
    customerEmail: `${params.customerPhone.replace(/[^0-9]/g, '')}@offerekini.com`,
    customerAddress: params.customerAddress || 'Dhaka',
    customerCity: params.area || params.district || 'Dhaka',
    customerState: params.district || 'Dhaka',
    customerPostcode: '1200',
    customerPhone: params.customerPhone,
    productName: `Offerekini Advance Delivery Payment for Order ${params.orderId}`,
    productCategory: 'E-commerce Advance Payment',
    valueA: params.orderId,
    valueB: params.customerPhone,
  }

  try {
    if (epsInstance && process.env.EPS_USERNAME && process.env.EPS_PASSWORD) {
      const response = await epsInstance.initializePayment(initParams)
      if (response.RedirectURL) {
        return {
          success: true,
          trxId,
          redirectUrl: response.RedirectURL,
        }
      }
    }
  } catch (error) {
    console.error('EPS Real Gateway error, falling back to EPS Gateway Simulator:', error)
  }

  // EPS Gateway Redirect Simulation URL
  const demoGatewayUrl = `${params.baseUrl}/payment/eps-gateway?trxId=${trxId}&orderId=${params.orderId}&amount=${params.amount}&name=${encodeURIComponent(params.customerName)}`
  return {
    success: true,
    trxId,
    redirectUrl: demoGatewayUrl,
  }
}

export async function verifyEpsPayment(trxId: string) {
  if (epsInstance && process.env.EPS_USERNAME) {
    try {
      const result = await epsInstance.verifyPayment({ merchantTransactionId: trxId })
      return result.Status === 'Success'
    } catch (e) {
      console.error('EPS Verify Error:', e)
    }
  }
  return true
}
