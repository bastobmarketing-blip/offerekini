import fs from 'node:fs'
import path from 'node:path'

export interface AdminCredentials {
  email: string
  password: string
  recoveryKey: string
  name: string
  lastLogin?: string
}

const ADMIN_FILE = path.resolve(process.cwd(), 'data/admin_store.json')

const DEFAULT_ADMIN: AdminCredentials = {
  email: 'admin@offerkini.com',
  password: 'adminpassword123',
  recoveryKey: 'OFFERKINI-RESET-2026',
  name: 'Super Admin'
}

function loadAdminData(): AdminCredentials {
  try {
    if (fs.existsSync(ADMIN_FILE)) {
      const data = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf-8'))
      if (data && data.email && data.password) return data
    }
  } catch (e) {}
  return { ...DEFAULT_ADMIN }
}

function saveAdminData(data: AdminCredentials): void {
  try {
    const dir = path.dirname(ADMIN_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(ADMIN_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (e) {}
}

let currentAdmin: AdminCredentials = loadAdminData()

export function getAdminCredentials(): AdminCredentials {
  return currentAdmin
}

export function verifyAdminPassword(input: string): boolean {
  return currentAdmin.password === input
}

export function updateAdminPassword(newPassword: string, newEmail?: string): boolean {
  currentAdmin.password = newPassword
  if (newEmail) currentAdmin.email = newEmail
  saveAdminData(currentAdmin)
  return true
}

export function resetAdminPassword(recoveryKey: string, newPassword: string): { success: boolean; error?: string } {
  if (recoveryKey.trim().toUpperCase() !== currentAdmin.recoveryKey.trim().toUpperCase()) {
    return { success: false, error: 'ভুল রিকভারি কি (Invalid Recovery Key)!' }
  }
  currentAdmin.password = newPassword
  saveAdminData(currentAdmin)
  return { success: true }
}

export function updateAdminLastLogin(): void {
  currentAdmin.lastLogin = new Date().toISOString()
  saveAdminData(currentAdmin)
}
