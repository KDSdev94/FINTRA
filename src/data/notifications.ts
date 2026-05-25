import type { NotificationGroup } from '@/types/notification'

export const notificationGroups: NotificationGroup[] = [
  {
    label: 'Hari Ini',
    items: [
      {
        title: 'Pengingat!',
        subtitle: 'Yuk aktifin nabung otomatis biar target tabungan lu makin deket...',
        time: '17:00 - 24 April',
        icon: 'bell',
      },
      {
        title: 'Update Baru',
        subtitle: 'Ada fitur baru nih, coba cek biar ngatur duit makin sat set.',
        time: '17:00 - 24 April',
        icon: 'settings',
      },
    ],
  },
  {
    label: 'Kemarin',
    items: [
      {
        title: 'Transaksi',
        subtitle: 'Transaksi baru barusan kecatet ya.',
        meta: 'Belanja | Dapur | - $100,00',
        time: '17:00 - 24 April',
        icon: 'savings',
      },
      {
        title: 'Pengingat!',
        subtitle: 'Jangan lupa sisihin duit buat target tabungan lu ya.',
        time: '17:00 - 24 April',
        icon: 'bell',
      },
    ],
  },
  {
    label: 'Weekend Ini',
    items: [
      {
        title: 'Catatan Pengeluaran',
        subtitle: 'Pengeluaran lu agak rame, coba direm dikit biar nggak boncos.',
        time: '17:00 - 24 April',
        icon: 'arrows',
      },
      {
        title: 'Transaksi',
        subtitle: 'Ada transaksi baru yang udah masuk catatan.',
        meta: 'Makan | Makan Malam | - $70,40',
        time: '17:00 - 24 April',
        icon: 'savings',
      },
    ],
  },
]
