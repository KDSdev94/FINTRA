export type TransactionMode = 'all' | 'income' | 'expense'
export type TransactionType = TransactionMode | 'saving'
export type SourceType = 'bank' | 'ewallet' | 'cash'

export type TransactionIcon =
  | 'salary'
  | 'groceries'
  | 'rent'
  | 'transport'
  | 'food'
  | 'stack'
  | 'medicine'
  | 'gift'
  | 'savings'
  | 'ticket'
  | 'plane'
  | 'wedding'
  | 'home'
  | 'car'

export type TransactionItem = {
  id: string
  title: string
  time: string
  category: string
  amount: string
  icon: TransactionIcon
  iconBg: string
  expense?: boolean
  transactionAt: string
}

export type TransactionGroup = {
  month: string
  items: TransactionItem[]
}

export type TransactionRecord = {
  id: string
  title: string
  note: string
  transactionType: TransactionType
  categorySlug: string
  categoryLabel: string
  categoryIcon: TransactionIcon
  sourceType: SourceType
  accountName: string
  amount: number
  transactionAt: string
  savingsGoalId: string | null
}
