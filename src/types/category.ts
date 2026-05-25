export type CategoryIcon =
  | 'food'
  | 'transport'
  | 'medicine'
  | 'groceries'
  | 'rent'
  | 'gift'
  | 'savings'
  | 'ticket'
  | 'plane'
  | 'wedding'
  | 'home'
  | 'car'
  | 'stack'

export type CategoryItem = {
  id: string
  slug: string
  label: string
  icon: CategoryIcon
  kind: 'expense' | 'saving'
}

export type CategoryExpense = {
  title: string
  time: string
  amount: string
}

export type CategoryMonthGroup = {
  month: string
  items: CategoryExpense[]
}

export type SavingsGoal = {
  id: string
  slug: string
  label: string
  icon: CategoryIcon
  savedAmount: string
  targetAmount: string
  progress: number
  addAmount: string
  addTitle: string
  addCategory: string
  entries: CategoryExpense[]
}
