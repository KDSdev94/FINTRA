import type {
  CategoryItem,
  CategoryMonthGroup,
  SavingsGoal,
} from '@/types/category'

export const categories: CategoryItem[] = [
  { id: 'mock-food', slug: 'food', label: 'Makan', icon: 'food', kind: 'expense' },
  { id: 'mock-transport', slug: 'transport', label: 'Transport', icon: 'transport', kind: 'expense' },
  { id: 'mock-medicine', slug: 'medicine', label: 'Obat', icon: 'medicine', kind: 'expense' },
  { id: 'mock-groceries', slug: 'groceries', label: 'Belanja', icon: 'groceries', kind: 'expense' },
  { id: 'mock-rent', slug: 'rent', label: 'Sewa', icon: 'rent', kind: 'expense' },
  { id: 'mock-gifts', slug: 'gifts', label: 'Kado', icon: 'gift', kind: 'expense' },
  { id: 'mock-savings', slug: 'savings', label: 'Tabungan', icon: 'savings', kind: 'saving' },
  { id: 'mock-entertainment', slug: 'entertainment', label: 'Hiburan', icon: 'ticket', kind: 'expense' },
]

export const categoryExpenses: Record<string, CategoryMonthGroup[]> = {
  food: [
    {
      month: 'April',
      items: [
        { title: 'Makan Malam', time: '18:27 - 30 April', amount: '-$26,00' },
        { title: 'Pizza Delivery', time: '15:00 - 24 April', amount: '-$18,35' },
        { title: 'Makan Siang', time: '12:30 - 15 April', amount: '-$15,40' },
        { title: 'Ngemil Pagi', time: '9:30 - 08 April', amount: '-$12,13' },
      ],
    },
    {
      month: 'March',
      items: [{ title: 'Makan Malam', time: '20:50 - 31 Maret', amount: '-$27,20' }],
    },
  ],
  transport: [
    {
      month: 'April',
      items: [
        { title: 'Ojol Pulang', time: '20:10 - April 29', amount: '-$4,50' },
        { title: 'Bensin Tipis', time: '08:45 - April 22', amount: '-$12,20' },
        { title: 'Parkir Mall', time: '17:30 - April 14', amount: '-$2,00' },
      ],
    },
    {
      month: 'March',
      items: [{ title: 'Naik KRL', time: '07:15 - March 28', amount: '-$3,40' }],
    },
  ],
  medicine: [
    {
      month: 'April',
      items: [
        { title: 'Vitamin Bulanan', time: '11:05 - April 28', amount: '-$14,00' },
        { title: 'Obat Flu', time: '19:10 - April 10', amount: '-$6,80' },
      ],
    },
    {
      month: 'March',
      items: [{ title: 'Masker', time: '09:25 - March 25', amount: '-$4,20' }],
    },
  ],
  groceries: [
    {
      month: 'April',
      items: [
        { title: 'Belanja Mingguan', time: '17:00 - April 24', amount: '-$100,00' },
        { title: 'Buah & Susu', time: '18:20 - April 13', amount: '-$28,60' },
      ],
    },
    {
      month: 'March',
      items: [{ title: 'Top Up Dapur', time: '15:10 - March 30', amount: '-$76,20' }],
    },
  ],
  rent: [
    {
      month: 'April',
      items: [
        { title: 'Bayar Kosan', time: '08:30 - April 15', amount: '-$674,40' },
      ],
    },
    {
      month: 'March',
      items: [{ title: 'Listrik Kamar', time: '09:30 - March 31', amount: '-$72,00' }],
    },
  ],
  gifts: [
    {
      month: 'April',
      items: [
        { title: 'Kado Bestie', time: '14:05 - April 18', amount: '-$35,00' },
        { title: 'Amplop Nikahan', time: '10:20 - April 05', amount: '-$50,00' },
      ],
    },
  ],
  savings: [
    {
      month: 'April',
      items: [
        { title: 'Nabung Liburan', time: '21:00 - 30 April', amount: '$150,00' },
        { title: 'Dana Darurat', time: '08:00 - 10 April', amount: '$200,00' },
      ],
    },
    {
      month: 'March',
      items: [{ title: 'Nabung Tipis Dulu', time: '08:40 - 22 Maret', amount: '$90,00' }],
    },
  ],
  entertainment: [
    {
      month: 'April',
      items: [
        { title: 'Nonton Bioskop', time: '19:40 - April 27', amount: '-$11,50' },
        { title: 'Streaming Bulanan', time: '07:00 - April 01', amount: '-$5,99' },
      ],
    },
    {
      month: 'March',
      items: [{ title: 'Game Pass', time: '20:00 - March 14', amount: '-$9,99' }],
    },
  ],
}

export const savingsGoals: SavingsGoal[] = [
  {
    id: 'goal-travel',
    slug: 'travel',
    label: 'Liburan',
    icon: 'plane',
    savedAmount: '$653.31',
    targetAmount: '$1,962.93',
    progress: 40,
    addAmount: '$217.77',
    addTitle: 'Setoran Liburan',
    addCategory: 'Impian',
    entries: [
      { title: 'Setoran Liburan', time: '19:56 - 30 April', amount: '$217.77' },
      { title: 'Setoran Liburan', time: '17:42 - 14 April', amount: '$217.77' },
      { title: 'Setoran Liburan', time: '12:30 - 02 April', amount: '$217.77' },
    ],
  },
  {
    id: 'goal-new-house',
    slug: 'new-house',
    label: 'Rumah Baru',
    icon: 'home',
    savedAmount: '$1,240.00',
    targetAmount: '$8,400.00',
    progress: 15,
    addAmount: '$310.00',
    addTitle: 'Setoran Rumah',
    addCategory: 'Impian',
    entries: [
      { title: 'Setoran Rumah', time: '09:20 - 25 April', amount: '$310.00' },
      { title: 'Setoran Rumah', time: '09:15 - 10 April', amount: '$310.00' },
    ],
  },
  {
    id: 'goal-car',
    slug: 'car',
    label: 'Mobil',
    icon: 'car',
    savedAmount: '$2,800.00',
    targetAmount: '$12,000.00',
    progress: 23,
    addAmount: '$450.00',
    addTitle: 'Setoran Mobil',
    addCategory: 'Kendaraan',
    entries: [
      { title: 'Setoran Mobil', time: '20:12 - 28 April', amount: '$450.00' },
      { title: 'Setoran Mobil', time: '18:10 - 08 April', amount: '$450.00' },
    ],
  },
  {
    id: 'goal-wedding',
    slug: 'wedding',
    label: 'Nikahan',
    icon: 'wedding',
    savedAmount: '$890.00',
    targetAmount: '$6,500.00',
    progress: 13,
    addAmount: '$87.32',
    addTitle: 'Setoran Nikahan',
    addCategory: 'Acara',
    entries: [
      { title: 'Dana Nikahan', time: '11:10 - 12 April', amount: '$180.00' },
    ],
  },
]

export const getCategoryBySlug = (slug: string) =>
  categories.find((category) => category.slug === slug)

export const getSavingsGoalBySlug = (slug: string) =>
  savingsGoals.find((goal) => goal.slug === slug)
