import fs from 'node:fs'
import path from 'node:path'

export type HomepageType = 'default' | 'landing' | 'product'

export interface HomepageSetting {
  type: HomepageType
  target: string // slug or id, e.g. 'testo_king', 'focus_king', or product id/slug
  updatedAt: string
}

const SETTINGS_FILE = path.resolve(process.cwd(), 'data/homepage_settings.json')

const DEFAULT_SETTING: HomepageSetting = {
  type: 'default',
  target: '',
  updatedAt: new Date().toISOString()
}

function loadHomepageSetting(): HomepageSetting {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'))
      if (data && data.type) {
        return data
      }
    }
  } catch (e) {}
  return { ...DEFAULT_SETTING }
}

let currentSetting: HomepageSetting = loadHomepageSetting()

export function getHomepageSetting(): HomepageSetting {
  return currentSetting
}

export function saveHomepageSetting(setting: Partial<HomepageSetting>): HomepageSetting {
  currentSetting = {
    type: setting.type || 'default',
    target: setting.target || '',
    updatedAt: new Date().toISOString()
  }

  try {
    const dir = path.dirname(SETTINGS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(currentSetting, null, 2), 'utf-8')
  } catch (e) {}

  return currentSetting
}
