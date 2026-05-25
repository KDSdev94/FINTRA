import type {
  CategoryExpense,
  CategoryIcon,
  CategoryMonthGroup,
  SavingsGoal,
} from '@/types/category'
import type { TransactionGroup, TransactionIcon, TransactionItem, TransactionRecord } from '@/types/transaction'

const dateTimeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  day: 'numeric',
  month: 'long',
})

const monthFormatter = new Intl.DateTimeFormat('id-ID', {
  month: 'long',
})

const weekdayFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'short',
})

const dayFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
})

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export const iconBackgroundMap: Record<TransactionIcon | CategoryIcon, string> = {
  salary: 'var(--color-light-blue-button)',
  groceries: 'var(--color-blue-button)',
  rent: 'var(--color-ocean-blue-button)',
  transport: 'var(--color-blue-button)',
  food: 'var(--color-light-blue-button)',
  stack: 'var(--color-light-blue-button)',
  medicine: 'var(--color-light-blue-button)',
  gift: 'var(--color-blue-button)',
  savings: 'var(--color-light-blue-button)',
  ticket: 'var(--color-light-blue-button)',
  plane: 'var(--color-ocean-blue-button)',
  wedding: 'var(--color-blue-button)',
  home: 'var(--color-light-blue-button)',
  car: 'var(--color-ocean-blue-button)',
}

export const defaultExpenseCategories: Array<{
  slug: string
  label: string
  icon: CategoryIcon
  kind: 'expense'
}> = [
  { slug: 'food', label: 'Makan', icon: 'food', kind: 'expense' },
  { slug: 'transport', label: 'Transport', icon: 'transport', kind: 'expense' },
  { slug: 'medicine', label: 'Obat', icon: 'medicine', kind: 'expense' },
  { slug: 'groceries', label: 'Belanja', icon: 'groceries', kind: 'expense' },
  { slug: 'rent', label: 'Sewa', icon: 'rent', kind: 'expense' },
  { slug: 'gifts', label: 'Kado', icon: 'gift', kind: 'expense' },
  { slug: 'entertainment', label: 'Hiburan', icon: 'ticket', kind: 'expense' },
]

export const defaultSavingsCategory = {
  slug: 'savings',
  label: 'Tabungan',
  icon: 'savings' as const,
  kind: 'saving' as const,
}

export const defaultSavingsGoals: Array<{
  slug: string
  label: string
  icon: CategoryIcon
  targetAmount: number
}> = [
  { slug: 'travel', label: 'Liburan', icon: 'plane', targetAmount: 20000000 },
  { slug: 'new-house', label: 'Rumah Baru', icon: 'home', targetAmount: 125000000 },
  { slug: 'nabung-buat-rubicon', label: 'Nabung Buat Rubicon', icon: 'car', targetAmount: 850000000 },
  { slug: 'wedding', label: 'Nikahan', icon: 'wedding', targetAmount: 50000000 },
]

export const formatCurrency = (value: number) => currencyFormatter.format(value)

export const formatSignedCurrency = (value: number, negative = false) =>
  `${negative ? '-' : ''}${formatCurrency(value)}`

export const formatDateTimeLabel = (value: string) => {
  const date = new Date(value)
  const formatted = dateTimeFormatter.format(date).replace('.', ':')
  const [time, dateLabel] = formatted.split(' ')
  return `${time} - ${dateLabel}`
}

export const formatMonthLabel = (value: string) => {
  const date = new Date(value)
  const month = monthFormatter.format(date)
  return month.charAt(0).toUpperCase() + month.slice(1)
}

export const formatDayLabel = (value: string) => {
  const date = new Date(value)
  return `${weekdayFormatter.format(date)}, ${dayFormatter.format(date)}`
}

export const toTransactionItem = (record: TransactionRecord): TransactionItem => {
  const isExpense = record.transactionType === 'expense'
  const icon = record.categoryIcon

  return {
    id: record.id,
    title: record.title,
    time: formatDateTimeLabel(record.transactionAt),
    category: record.categoryLabel,
    amount: formatSignedCurrency(record.amount, isExpense),
    icon,
    iconBg: iconBackgroundMap[icon],
    expense: isExpense,
    transactionAt: record.transactionAt,
  }
}

export const groupTransactions = (
  transactions: TransactionRecord[],
  predicate: (transaction: TransactionRecord) => boolean,
) => {
  const grouped = new Map<string, TransactionItem[]>()

  for (const transaction of transactions.filter(predicate)) {
    const month = formatMonthLabel(transaction.transactionAt)
    const item = toTransactionItem(transaction)
    const existing = grouped.get(month) ?? []

    existing.push(item)
    grouped.set(month, existing)
  }

  return Array.from(grouped.entries()).map<TransactionGroup>(([month, items]) => ({
    month,
    items,
  }))
}

export const groupCategoryExpenses = (
  transactions: TransactionRecord[],
  categorySlug: string,
) => {
  const groups = groupTransactions(
    transactions,
    (transaction) => transaction.transactionType === 'expense' && transaction.categorySlug === categorySlug,
  )

  return groups.map<CategoryMonthGroup>((group) => ({
    month: group.month,
    items: group.items.map<CategoryExpense>((item) => ({
      title: item.title,
      time: item.time,
      amount: item.amount,
    })),
  }))
}

export const buildSavingsGoalView = (
  goal: {
    id: string
    slug: string
    label: string
    icon: CategoryIcon
    targetAmount: number
  },
  transactions: TransactionRecord[],
) => {
  const entries = transactions
    .filter((transaction) => transaction.transactionType === 'saving' && transaction.savingsGoalId === goal.id)
    .map<CategoryExpense>((transaction) => ({
      title: transaction.title,
      time: formatDateTimeLabel(transaction.transactionAt),
      amount: formatCurrency(transaction.amount),
    }))

  const savedAmountNumber = transactions
    .filter((transaction) => transaction.transactionType === 'saving' && transaction.savingsGoalId === goal.id)
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const progress = goal.targetAmount > 0 ? Math.min(100, Math.round((savedAmountNumber / goal.targetAmount) * 100)) : 0

  return {
    id: goal.id,
    slug: goal.slug,
    label: goal.label,
    icon: goal.icon,
    targetAmount: formatCurrency(goal.targetAmount),
    savedAmount: formatCurrency(savedAmountNumber),
    progress,
    addAmount: formatCurrency(Math.max(50000, Math.round(goal.targetAmount * 0.05))),
    addTitle: `Setoran ${goal.label}`,
    addCategory: 'Target',
    entries,
  } satisfies SavingsGoal
}

export type ChartData = {
  labels: string[]
  incomeByLabel: number[]
  expenseByLabel: number[]
  totalIncome: number
  totalExpense: number
}

export const computeDailyChart = (transactions: TransactionRecord[]): ChartData => {
  const labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
  const now = new Date()
  const startOfWeek = new Date(now)
  const dayOfWeek = now.getDay()
  startOfWeek.setDate(now.getDate() - ((dayOfWeek + 6) % 7))
  startOfWeek.setHours(0, 0, 0, 0)

  const income = Array(7).fill(0)
  const expense = Array(7).fill(0)

  for (const t of transactions) {
    const d = new Date(t.transactionAt)
    if (d < startOfWeek) continue
    const idx = (d.getDay() + 6) % 7 // Mon=0 ... Sun=6
    if (t.transactionType === 'income') income[idx] += t.amount
    else if (t.transactionType === 'expense') expense[idx] += t.amount
  }

  return { labels, incomeByLabel: income, expenseByLabel: expense, totalIncome: income.reduce((a, b) => a + b, 0), totalExpense: expense.reduce((a, b) => a + b, 0) }
}

export const computeWeeklyChart = (transactions: TransactionRecord[]): ChartData => {
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()
  const labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']
  const income = Array(4).fill(0)
  const expense = Array(4).fill(0)

  for (const t of transactions) {
    const d = new Date(t.transactionAt)
    if (d.getMonth() !== month || d.getFullYear() !== year) continue
    const weekIdx = Math.min(3, Math.floor((d.getDate() - 1) / 7))
    if (t.transactionType === 'income') income[weekIdx] += t.amount
    else if (t.transactionType === 'expense') expense[weekIdx] += t.amount
  }

  return { labels, incomeByLabel: income, expenseByLabel: expense, totalIncome: income.reduce((a, b) => a + b, 0), totalExpense: expense.reduce((a, b) => a + b, 0) }
}

export const computeMonthlyChart = (transactions: TransactionRecord[]): ChartData => {
  const now = new Date()
  const year = now.getFullYear()
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const currentMonth = now.getMonth()
  const startMonth = Math.max(0, currentMonth - 5)
  const labels = monthNames.slice(startMonth, currentMonth + 1)
  const income = Array(labels.length).fill(0)
  const expense = Array(labels.length).fill(0)

  for (const t of transactions) {
    const d = new Date(t.transactionAt)
    if (d.getFullYear() !== year) continue
    const mIdx = d.getMonth() - startMonth
    if (mIdx < 0 || mIdx >= labels.length) continue
    if (t.transactionType === 'income') income[mIdx] += t.amount
    else if (t.transactionType === 'expense') expense[mIdx] += t.amount
  }

  return { labels, incomeByLabel: income, expenseByLabel: expense, totalIncome: income.reduce((a, b) => a + b, 0), totalExpense: expense.reduce((a, b) => a + b, 0) }
}

export const computeYearlyChart = (transactions: TransactionRecord[]): ChartData => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const labels = Array.from({ length: 5 }, (_, i) => String(currentYear - 4 + i))
  const income = Array(5).fill(0)
  const expense = Array(5).fill(0)

  for (const t of transactions) {
    const d = new Date(t.transactionAt)
    const yIdx = d.getFullYear() - (currentYear - 4)
    if (yIdx < 0 || yIdx >= 5) continue
    if (t.transactionType === 'income') income[yIdx] += t.amount
    else if (t.transactionType === 'expense') expense[yIdx] += t.amount
  }

  return { labels, incomeByLabel: income, expenseByLabel: expense, totalIncome: income.reduce((a, b) => a + b, 0), totalExpense: expense.reduce((a, b) => a + b, 0) }
}

export const chartBarsPercent = (values: number[]): number[] => {
  const max = Math.max(...values, 1)
  return values.map((v) => Math.round((v / max) * 100))
}

export const chartTicks = (values: number[]): string[] => {
  const max = Math.max(...values, 1000)
  if (max >= 1000000) return ['', `${Math.round(max * 0.75 / 1000000)}jt`, `${Math.round(max * 0.5 / 1000000)}jt`, `${Math.round(max * 0.25 / 1000000)}jt`].reverse()
  if (max >= 1000) return ['', `${Math.round(max * 0.25 / 1000)}rb`, `${Math.round(max * 0.5 / 1000)}rb`, `${Math.round(max * 0.75 / 1000)}rb`].reverse()
  return [`${Math.round(max * 0.75)}`, `${Math.round(max * 0.5)}`, `${Math.round(max * 0.25)}`, '0'].reverse()
}

export const parseCurrencyInput = (value: string) => {
  const sanitized = value.replace(/[^\d]/g, '')
  return sanitized ? Number.parseInt(sanitized, 10) : 0
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
