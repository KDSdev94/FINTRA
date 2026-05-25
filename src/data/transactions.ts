import type { TransactionGroup } from '@/types/transaction'

export const incomeTransactionGroups: TransactionGroup[] = [
  {
    month: 'April',
    items: [
      {
        id: 'income-april-1',
        title: 'Gajian',
        time: '18:27 - 30 April',
        category: 'Bulanan',
        amount: 'Rp4.000.000',
        icon: 'salary',
        iconBg: 'var(--color-light-blue-button)',
        transactionAt: '2026-04-30T18:27:00.000Z',
      },
      {
        id: 'income-april-2',
        title: 'Lain-lain',
        time: '17:00 - 24 April',
        category: 'Pembayaran',
        amount: 'Rp120.000',
        icon: 'stack',
        iconBg: 'var(--color-light-blue-button)',
        transactionAt: '2026-04-24T17:00:00.000Z',
      },
    ],
  },
  {
    month: 'March',
    items: [
      {
        id: 'income-march-1',
        title: 'Gajian',
        time: '18:39 - 31 Maret',
        category: 'Bulanan',
        amount: 'Rp4.000.000',
        icon: 'salary',
        iconBg: 'var(--color-light-blue-button)',
        transactionAt: '2026-03-31T18:39:00.000Z',
      },
      {
        id: 'income-march-2',
        title: 'Lain-lain',
        time: '9:30 - 12 April',
        category: 'Upwork',
        amount: 'Rp340.000',
        icon: 'stack',
        iconBg: 'var(--color-light-blue-button)',
        transactionAt: '2026-04-12T09:30:00.000Z',
      },
    ],
  },
  {
    month: 'February',
    items: [
      {
        id: 'income-feb-1',
        title: 'Lain-lain',
        time: '19:30 - 31 Maret',
        category: 'Upwork',
        amount: 'Rp340.000',
        icon: 'stack',
        iconBg: 'var(--color-light-blue-button)',
        transactionAt: '2026-03-31T19:30:00.000Z',
      },
    ],
  },
]

export const expenseTransactionGroups: TransactionGroup[] = [
  {
    month: 'April',
    items: [
      {
        id: 'expense-april-1',
        title: 'Belanja',
        time: '17:00 - 24 April',
        category: 'Dapur',
        amount: '-Rp100.000',
        icon: 'groceries',
        iconBg: 'var(--color-blue-button)',
        transactionAt: '2026-04-24T17:00:00.000Z',
      },
      {
        id: 'expense-april-2',
        title: 'Sewa',
        time: '8:30 - 15 April',
        category: 'Sewa',
        amount: '-Rp674.400',
        icon: 'rent',
        iconBg: 'var(--color-ocean-blue-button)',
        transactionAt: '2026-04-15T08:30:00.000Z',
      },
      {
        id: 'expense-april-3',
        title: 'Transport',
        time: '7:30 - 08 April',
        category: 'Bensin',
        amount: '-Rp41.300',
        icon: 'transport',
        iconBg: 'var(--color-blue-button)',
        transactionAt: '2026-04-08T07:30:00.000Z',
      },
    ],
  },
  {
    month: 'March',
    items: [
      {
        id: 'expense-march-1',
        title: 'Makan',
        time: '19:30 - 31 Maret',
        category: 'Makan Malam',
        amount: '-Rp70.400',
        icon: 'food',
        iconBg: 'var(--color-light-blue-button)',
        transactionAt: '2026-03-31T19:30:00.000Z',
      },
      {
        id: 'expense-march-2',
        title: 'Sewa',
        time: '18:39 - 31 Maret',
        category: 'Sewa',
        amount: '-Rp674.400',
        icon: 'rent',
        iconBg: 'var(--color-ocean-blue-button)',
        transactionAt: '2026-03-31T18:39:00.000Z',
      },
    ],
  },
]
