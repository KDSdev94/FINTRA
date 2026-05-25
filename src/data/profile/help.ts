export type HelpTabKey = 'faq' | 'contact'
export type SupportViewKey = 'list' | 'chat'
export type SupportTabKey = 'assistant' | 'help'

export type SupportChatItem = {
  title: string
  subtitle: string
  time: string
}

export type ChatBubble = {
  text: string
  side: 'left' | 'right'
  tone: 'soft' | 'accent'
  time?: string
}

export const helpFaqItems = [
  'Cara pakai Fintra gimana sih?',
  'Pakai Fintra bayar nggak?',
  'Kalau mau hubungi support lewat mana?',
  'Kalau lupa password, resetnya gimana?',
  'Data gue aman nggak di sini?',
  'Pengaturan aplikasi bisa diubah-ubah nggak?',
  'Kalau mau hapus akun caranya gimana?',
  'Riwayat pengeluaran bisa dicek di mana?',
  'App ini bisa dipakai offline nggak?',
]

export const helpContactItems = [
  'CS Fintra',
  'Website',
  'Facebook',
  'Whatsapp',
  'Instagram',
]

export const activeSupportChats: SupportChatItem[] = [
  {
    title: 'Asisten Support',
    subtitle: 'Halo, gue siap bantuin lu.',
    time: '2 Menit Lalu',
  },
]

export const endedSupportChats: SupportChatItem[] = [
  { title: 'Pusat Bantuan', subtitle: 'Akun lu udah siap dipakai ya...', time: '08 Feb 2024' },
  { title: 'Asisten Support', subtitle: 'Halo, gue siap bantuin lu.', time: '24 Des 2023' },
  { title: 'Asisten Support', subtitle: 'Halo, gue siap bantuin lu.', time: '10 Sep 2023' },
  { title: 'Pusat Bantuan', subtitle: 'Halo, ada yang bisa dibantu hari ini?', time: '12 Jun 2023' },
]

export const supportConversation: ChatBubble[] = [
  { text: 'Halo, gue asisten virtual Fintra.', side: 'left', tone: 'soft' },
  { text: 'Ada yang bisa gue bantu hari ini?', side: 'left', tone: 'soft', time: '14:00' },
  {
    text: 'Halo! Mau nanya, gimana cara catat pengeluaran berdasarkan tanggal?',
    side: 'right',
    tone: 'accent',
    time: '14:01',
  },
  {
    text: 'Bisa banget. Lu tinggal catat pengeluaran dari menu atas di halaman utama.',
    side: 'left',
    tone: 'soft',
  },
  {
    text: 'Masukin aja detail belanjanya, termasuk tanggal dan nominalnya.',
    side: 'left',
    tone: 'soft',
    time: '14:03',
  },
  { text: 'Sip, makasih banyak ya.', side: 'right', tone: 'accent', time: '14:05' },
  {
    text: 'Sama-sama. Kalau ada apa-apa, tinggal chat lagi ya!',
    side: 'left',
    tone: 'soft',
    time: '14:06',
  },
]
