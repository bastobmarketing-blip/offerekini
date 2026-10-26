import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

export interface TrackingSettings {
  pixelId: string
  accessToken: string
  testEventCode?: string
  enabled: boolean
}

const SETTINGS_FILE = path.resolve(process.cwd(), 'data/tracking_settings.json')
const ENV_FILE = path.resolve(process.cwd(), '.env')

const DEFAULT_SETTINGS: TrackingSettings = {
  pixelId: process.env.META_PIXEL_ID || '1592469171544877',
  accessToken: process.env.META_ACCESS_TOKEN || 'EAAEW7ngIMZB4BS9PiMkopwZBvCGgySngNZBhEpIkKjXKgCh7Ni5ZA6h7D6H1ZBy47aZC0ZB7oTjojRbjB4EE01uZAVn55KSszwYtuxZCBWv4p2DUrrMZAo5W9njnjHCocVmZAxwGrj0qT7oj4X08rb4s4qmAd5t6pZCmRTCW2oviFGApwfEGBAluCZBWigMuZAaYJlvaOenQZDZD',
  testEventCode: process.env.META_TEST_EVENT_CODE || 'TEST24540',
  enabled: true
}

export function syncTrackingToEnv(settings: TrackingSettings): void {
  try {
    let content = ''
    if (fs.existsSync(ENV_FILE)) {
      content = fs.readFileSync(ENV_FILE, 'utf-8')
    }

    const setOrReplace = (key: string, val: string) => {
      const reg = new RegExp(`^${key}=.*$`, 'm')
      if (reg.test(content)) {
        content = content.replace(reg, `${key}=${val}`)
      } else {
        content = (content.trim() ? content.trim() + '\n' : '') + `${key}=${val}\n`
      }
      process.env[key] = val
    }

    if (settings.pixelId) setOrReplace('META_PIXEL_ID', settings.pixelId)
    if (settings.accessToken) setOrReplace('META_ACCESS_TOKEN', settings.accessToken)
    if (settings.testEventCode) setOrReplace('META_TEST_EVENT_CODE', settings.testEventCode)

    fs.writeFileSync(ENV_FILE, content, 'utf-8')
  } catch (e) {
    console.error('Failed to sync tracking to .env:', e)
  }
}

export function getTrackingSettings(): TrackingSettings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'))
      if (parsed && parsed.pixelId) {
        return {
          pixelId: parsed.pixelId || DEFAULT_SETTINGS.pixelId,
          accessToken: parsed.accessToken || DEFAULT_SETTINGS.accessToken,
          testEventCode: parsed.testEventCode ?? DEFAULT_SETTINGS.testEventCode,
          enabled: parsed.enabled ?? true
        }
      }
    }
  } catch (e) {}
  return DEFAULT_SETTINGS
}

export function saveTrackingSettings(settings: TrackingSettings): void {
  try {
    const dir = path.dirname(SETTINGS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8')
    syncTrackingToEnv(settings)
  } catch (e) {
    console.error('Failed to save tracking settings:', e)
  }
}

export function hashSha256(val: string): string {
  if (!val) return ''
  const clean = val.trim().toLowerCase()
  return crypto.createHash('sha256').update(clean).digest('hex')
}

export function renderPixelBaseScript(): string {
  const settings = getTrackingSettings()
  if (!settings.enabled || !settings.pixelId) return ''

  return `
    <!-- Meta Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${settings.pixelId}');
      fbq('track', 'PageView');
    </script>
    <noscript>
      <img height="1" width="1" style="display:none"
           src="https://www.facebook.com/tr?id=${settings.pixelId}&ev=PageView&noscript=1"/>
    </noscript>
    <!-- End Meta Pixel Code -->
  `
}

export interface MetaCapiEventParams {
  eventName: 'Purchase' | 'InitiateCheckout' | 'AddToCart' | 'Lead' | 'ViewContent'
  orderId?: string
  productName?: string
  value?: number
  currency?: string
  phone?: string
  name?: string
  clientIp?: string
  userAgent?: string
  sourceUrl?: string
}

export async function sendMetaServerEvent(params: MetaCapiEventParams): Promise<boolean> {
  const settings = getTrackingSettings()
  if (!settings.enabled || !settings.pixelId || !settings.accessToken) {
    return false
  }

  try {
    const cleanPhone = (params.phone || '').replace(/[^0-9]/g, '')
    // Format Bangladesh number to +8801...
    let formattedPhone = cleanPhone
    if (formattedPhone.startsWith('01')) formattedPhone = '88' + formattedPhone

    const eventTime = Math.floor(Date.now() / 1000)

    const payload: any = {
      data: [
        {
          event_name: params.eventName,
          event_time: eventTime,
          action_source: 'website',
          event_source_url: params.sourceUrl || 'https://offerekini.com',
          user_data: {
            ph: formattedPhone ? [hashSha256(formattedPhone)] : [],
            fn: params.name ? [hashSha256(params.name.split(' ')[0])] : [],
            client_ip_address: params.clientIp || undefined,
            client_user_agent: params.userAgent || undefined
          },
          custom_data: {
            currency: params.currency || 'BDT',
            value: params.value || 0,
            order_id: params.orderId || undefined,
            content_name: params.productName || undefined
          }
        }
      ]
    }

    if (settings.testEventCode) {
      payload.test_event_code = settings.testEventCode
    }

    const response = await fetch(`https://graph.facebook.com/v19.0/${settings.pixelId}/events?access_token=${settings.accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const resData: any = await response.json()
    return response.ok && resData.events_received > 0
  } catch (err) {
    console.error('Meta CAPI Error:', err)
    return false
  }
}
