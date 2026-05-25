export type CalendarViewMode = 'spends' | 'categories'

export type CalendarSpendItem = {
  title: string
  day: number
  month: number
  year: number
  time: string
  category: string
  amount: string
  icon: 'groceries' | 'stack'
  iconBackground: string
  amountTone: 'default' | 'accent'
}

export const calendarDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

export const calendarSpendItems: CalendarSpendItem[] = [
  {
    title: 'Belanja',
    day: 17,
    month: 4,
    year: 2026,
    time: '08:15 - 17 Mei',
    category: 'Dapur',
    amount: '-Rp73.500',
    icon: 'groceries',
    iconBackground: 'bg-(--color-blue-button)',
    amountTone: 'accent',
  },
  {
    title: 'Lain-lain',
    day: 17,
    month: 4,
    year: 2026,
    time: '13:40 - 17 Mei',
    category: 'Pembayaran',
    amount: 'Rp180.000',
    icon: 'stack',
    iconBackground: 'bg-(--color-light-blue-button)',
    amountTone: 'default',
  },
  {
    title: 'Belanja',
    day: 18,
    month: 4,
    year: 2026,
    time: '19:20 - 18 Mei',
    category: 'Makan Malam',
    amount: '-Rp95.000',
    icon: 'groceries',
    iconBackground: 'bg-(--color-blue-button)',
    amountTone: 'accent',
  },
  {
    title: 'Belanja',
    day: 24,
    month: 3,
    year: 2023,
    time: '17:00 - 24 April',
    category: 'Dapur',
    amount: '-Rp100.000',
    icon: 'groceries',
    iconBackground: 'bg-(--color-blue-button)',
    amountTone: 'accent',
  },
  {
    title: 'Lain-lain',
    day: 24,
    month: 3,
    year: 2023,
    time: '17:00 - 24 April',
    category: 'Pembayaran',
    amount: 'Rp120.000',
    icon: 'stack',
    iconBackground: 'bg-(--color-light-blue-button)',
    amountTone: 'default',
  },
  {
    title: 'Belanja',
    day: 30,
    month: 3,
    year: 2023,
    time: '18:45 - 30 April',
    category: 'Dapur',
    amount: '-Rp86.500',
    icon: 'groceries',
    iconBackground: 'bg-(--color-blue-button)',
    amountTone: 'accent',
  },
  {
    title: 'Lain-lain',
    day: 15,
    month: 4,
    year: 2023,
    time: '10:20 - 15 Mei',
    category: 'Pembayaran',
    amount: 'Rp250.000',
    icon: 'stack',
    iconBackground: 'bg-(--color-light-blue-button)',
    amountTone: 'default',
  },
  {
    title: 'Belanja',
    day: 7,
    month: 0,
    year: 2024,
    time: '09:10 - 07 Januari',
    category: 'Dapur',
    amount: '-Rp52.000',
    icon: 'groceries',
    iconBackground: 'bg-(--color-blue-button)',
    amountTone: 'accent',
  },
]

export const calendarCategoryLegend = [
  { label: 'Belanja', color: '#0068FF' },
  { label: 'Lain-lain', color: '#3C8FE8' },
]
