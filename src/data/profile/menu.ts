import type {
  FingerprintEntry,
  ProfileMenuItem,
  ProfileMenuIcon,
  ProfileSettingsIcon,
  ToggleSettingItem,
} from '@/types/profile'

export const profileMenuItems: ProfileMenuItem<ProfileMenuIcon>[] = [
  { label: 'Edit Profil', icon: 'profile-edit', route: '/profile/edit' },
  { label: 'Keamanan', icon: 'shield', route: '/profile/security' },
  { label: 'Pengaturan', icon: 'settings', route: '/profile/settings' },
  { label: 'Bantuan', icon: 'support', route: '/profile/help' },
  { label: 'Keluar', icon: 'logout' },
]

export const securityMenuItems = [
  { label: 'Ganti PIN', route: '/profile/security/change-pin' },
  { label: 'Syarat & Ketentuan', route: '/profile/security/terms' },
]

export const settingsMenuItems: ProfileMenuItem<ProfileSettingsIcon>[] = [
  { label: 'Tema Aplikasi', icon: 'layers', route: '/profile/settings/theme' },
  { label: 'Atur Notifikasi', icon: 'bell', route: '/profile/settings/notifications' },
  { label: 'Atur Kata Sandi', icon: 'key', route: '/profile/settings/password' },
  { label: 'Hapus Akun', icon: 'trash-user', route: '/profile/settings/delete-account' },
]

export const fingerprintEntries: FingerprintEntry[] = [
  {
    label: 'Sidik Jari Jhon',
    icon: 'fingerprint',
    route: '/profile/security/fingerprint/jhon',
  },
  {
    label: 'Tambah Sidik Jari',
    icon: 'plus',
    route: '/profile/security/fingerprint/add',
  },
]

export const notificationSettingToggles: ToggleSettingItem[] = [
  { label: 'Notifikasi Umum', enabled: true },
  { label: 'Suara', enabled: true },
  { label: 'Nada Panggilan', enabled: true },
  { label: 'Getar', enabled: true },
  { label: 'Update Transaksi', enabled: false },
  { label: 'Pengingat Pengeluaran', enabled: false },
  { label: 'Notifikasi Budget', enabled: false },
  { label: 'Peringatan Saldo Tipis', enabled: false },
]
