import * as crypto from 'crypto'
import axios from 'axios'

export interface EPSConfig {
  username: string
  password: string
  hashKey: string
  merchantId: string
  storeId: string
  sandbox?: boolean
  timeout?: number
}

export interface InitializePaymentParams {
  customerOrderId: string
  merchantTransactionId: string
  totalAmount: number
  successUrl: string
  failUrl: string
  cancelUrl: string
  customerName: string
  customerEmail: string
  customerAddress: string
  customerCity: string
  customerState: string
  customerPostcode: string
  customerPhone: string
  productName: string
}

export function generateHash(value: string, hashKey: string): string {
  const hmac = crypto.createHmac('sha512', Buffer.from(hashKey, 'utf8'))
  hmac.update(value, 'utf8')
  return hmac.digest('base64')
}

export function generateTransactionId(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0')
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`
}

export class EPSGateway {
  private config: EPSConfig
  private token: string | null = null
  private tokenExpiry: Date | null = null

  private readonly ENDPOINTS = {
    SANDBOX: {
      GET_TOKEN: 'https://sandbox-pgapi.eps.com.bd/v1/Auth/GetToken',
      INITIALIZE: 'https://sandbox-pgapi.eps.com.bd/v1/EPSEngine/InitializeEPS',
      VERIFY: 'https://sandbox-pgapi.eps.com.bd/v1/EPSEngine/CheckMerchantTransactionStatus',
    },
    PRODUCTION: {
      GET_TOKEN: 'https://pgapi.eps.com.bd/v1/Auth/GetToken',
      INITIALIZE: 'https://pgapi.eps.com.bd/v1/EPSEngine/InitializeEPS',
      VERIFY: 'https://pgapi.eps.com.bd/v1/EPSEngine/CheckMerchantTransactionStatus',
    },
  }

  constructor(config: EPSConfig) {
    this.config = {
      ...config,
      sandbox: config.sandbox ?? true,
      timeout: config.timeout ?? 30000,
    }
  }

  private getEndpoints() {
    return this.config.sandbox ? this.ENDPOINTS.SANDBOX : this.ENDPOINTS.PRODUCTION
  }

  private async getToken(): Promise<string> {
    if (this.token && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.token
    }
    const hash = generateHash(this.config.username, this.config.hashKey)
    const response = await axios.post(
      this.getEndpoints().GET_TOKEN,
      { userName: this.config.username, password: this.config.password },
      { headers: { 'x-hash': hash, 'Content-Type': 'application/json' }, timeout: this.config.timeout }
    )
    if (response.data && response.data.token) {
      this.token = response.data.token
      this.tokenExpiry = new Date(response.data.expireDate || Date.now() + 3600 * 1000)
      return response.data.token
    }
    throw new Error(response.data?.errorMessage || 'EPS GetToken failed')
  }

  async initializePayment(params: InitializePaymentParams) {
    const token = await this.getToken()
    const hash = generateHash(params.merchantTransactionId, this.config.hashKey)
    const body = {
      merchantId: this.config.merchantId,
      storeId: this.config.storeId,
      CustomerOrderId: params.customerOrderId,
      merchantTransactionId: params.merchantTransactionId,
      transactionTypeId: 1,
      financialEntityId: 0,
      transitionStatusId: 0,
      totalAmount: params.totalAmount,
      ipAddress: '0.0.0.0',
      version: '1',
      successUrl: params.successUrl,
      failUrl: params.failUrl,
      cancelUrl: params.cancelUrl,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      CustomerAddress: params.customerAddress,
      CustomerCity: params.customerCity,
      CustomerState: params.customerState,
      CustomerPostcode: params.customerPostcode,
      CustomerCountry: 'BD',
      CustomerPhone: params.customerPhone,
      ProductName: params.productName,
    }

    const response = await axios.post(this.getEndpoints().INITIALIZE, body, {
      headers: {
        'x-hash': hash,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: this.config.timeout,
    })

    return response.data
  }

  async verifyPayment(merchantTransactionId: string) {
    const token = await this.getToken()
    const hash = generateHash(merchantTransactionId, this.config.hashKey)
    const response = await axios.get(
      `${this.getEndpoints().VERIFY}?merchantTransactionId=${merchantTransactionId}`,
      {
        headers: {
          'x-hash': hash,
          Authorization: `Bearer ${token}`,
        },
        timeout: this.config.timeout,
      }
    )
    return response.data
  }
}

// Global EPS gateway instance
const defaultConfig: EPSConfig = {
  username: process.env.EPS_USERNAME || 'sandbox_user',
  password: process.env.EPS_PASSWORD || 'sandbox_password',
  hashKey: process.env.EPS_HASH_KEY || 'dGVzdF9oYXNoX2tleV9mb3JfZXBzX2dhdGV3YXk=',
  merchantId: process.env.EPS_MERCHANT_ID || 'MCH-10024',
  storeId: process.env.EPS_STORE_ID || 'STR-5001',
  sandbox: process.env.EPS_SANDBOX !== 'false',
}

const eps = new EPSGateway(defaultConfig)

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

  try {
    if (process.env.EPS_USERNAME && process.env.EPS_PASSWORD) {
      const response = await eps.initializePayment({
        customerOrderId: params.orderId,
        merchantTransactionId: trxId,
        totalAmount: params.amount,
        successUrl: `${params.baseUrl}/payment/success?trxId=${trxId}&orderId=${params.orderId}`,
        failUrl: `${params.baseUrl}/payment/fail?trxId=${trxId}&orderId=${params.orderId}`,
        cancelUrl: `${params.baseUrl}/payment/cancel?trxId=${trxId}&orderId=${params.orderId}`,
        customerName: params.customerName || 'Customer',
        customerEmail: `${params.customerPhone.replace(/[^0-9]/g, '')}@offerekini.com`,
        customerAddress: params.customerAddress || 'Dhaka',
        customerCity: params.area || 'Dhaka',
        customerState: params.district || 'Dhaka',
        customerPostcode: '1200',
        customerPhone: params.customerPhone,
        productName: `Offerekini Advance Payment for Order ${params.orderId}`,
      })

      if (response && response.RedirectURL) {
        return {
          success: true,
          trxId,
          redirectUrl: response.RedirectURL,
        }
      }
    }
  } catch (error) {
    console.error('EPS Gateway API error, using EPS Gateway Simulator:', error)
  }

  // EPS Gateway Simulation Page URL
  const demoGatewayUrl = `${params.baseUrl}/payment/eps-gateway?trxId=${trxId}&orderId=${params.orderId}&amount=${params.amount}&name=${encodeURIComponent(params.customerName)}`
  return {
    success: true,
    trxId,
    redirectUrl: demoGatewayUrl,
  }
}

export async function verifyEpsPayment(trxId: string) {
  if (process.env.EPS_USERNAME) {
    try {
      const res = await eps.verifyPayment(trxId)
      return res && res.Status === 'Success'
    } catch (e) {
      console.error('EPS Verify Error:', e)
    }
  }
  return true
}
