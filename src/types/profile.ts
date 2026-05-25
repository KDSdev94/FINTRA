import type { CategoryIcon } from '@/types/category'

export type ProfileMenuIcon = 'profile-edit' | 'shield' | 'settings' | 'support' | 'logout'
export type ProfileSettingsIcon = 'bell' | 'key' | 'trash-user' | 'layers'
export type ProfileFingerprintIcon = 'fingerprint' | 'plus'

export type ProfileMenuItem<TIcon extends string = string> = {
  label: string
  icon: TIcon
  route?: string
}

export type ToggleSettingItem = {
  label: string
  enabled: boolean
}

export type FingerprintEntry = {
  label: string
  icon: ProfileFingerprintIcon
  route: string
}

export type CategoryGridItem = {
  label: string
  icon: CategoryIcon
}
