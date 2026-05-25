import { defineStore } from 'pinia'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

import {
  buildSavingsGoalView,
  defaultSavingsCategory,
  formatCurrency,
  groupCategoryExpenses,
  groupTransactions,
  slugify,
} from '@/lib/finance'
import { db } from '@/lib/firebase'
import { useAuthStore } from '@/stores/auth'
import type { CategoryIcon, CategoryItem, CategoryMonthGroup, SavingsGoal } from '@/types/category'
import type { SourceType, TransactionGroup, TransactionRecord } from '@/types/transaction'

type CategoryDoc = {
  slug: string
  label: string
  icon: CategoryIcon
  kind: 'expense' | 'saving'
}

type SavingsGoalDoc = {
  slug: string
  label: string
  icon: CategoryIcon
  targetAmount: number
  priority?: number
}

type TransactionDoc = {
  title: string
  note: string
  transactionType: 'income' | 'expense' | 'saving'
  categorySlug: string
  categoryLabel: string
  categoryIcon: CategoryIcon
  sourceType: 'bank' | 'ewallet' | 'cash'
  accountName: string
  amount: number
  transactionAt: string
  savingsGoalId: string | null
}

export type AccountBalance = {
  sourceType: SourceType
  accountName: string
  income: number
  outcome: number
  balance: number
}

const toCategoryItem = (id: string, row: CategoryDoc): CategoryItem => ({
  id,
  slug: row.slug,
  label: row.label,
  icon: row.icon,
  kind: row.kind,
})

const toSavingsGoalRow = (id: string, row: SavingsGoalDoc) => ({
  id,
  slug: row.slug,
  label: row.label,
  icon: row.icon,
  target_amount: row.targetAmount,
  priority: row.priority ?? 0,
})

const toTransactionRecord = (id: string, row: TransactionDoc): TransactionRecord => ({
  id,
  title: row.title,
  note: row.note ?? '',
  transactionType: row.transactionType,
  categorySlug: row.categorySlug,
  categoryLabel: row.categoryLabel,
  categoryIcon: row.categoryIcon,
  sourceType: row.sourceType,
  accountName: row.accountName,
  amount: Number(row.amount),
  transactionAt: row.transactionAt,
  savingsGoalId: row.savingsGoalId,
})

export const useFinanceStore = defineStore('finance', {
  state: () => ({
    categories: [] as CategoryItem[],
    savingsGoals: [] as Array<{
      id: string
      slug: string
      label: string
      icon: CategoryIcon
      target_amount: number
      priority: number
    }>,
    transactions: [] as TransactionRecord[],
    initialized: false,
    loading: false,
    errorMessage: '',
  }),

  getters: {
    expenseCategories: (state) => state.categories.filter((item) => item.kind === 'expense'),
    savingsCategory: (state) => state.categories.find((item) => item.slug === 'savings'),
    incomeGroups(): TransactionGroup[] {
      return groupTransactions(this.transactions, (transaction) => transaction.transactionType === 'income')
    },
    expenseGroups(): TransactionGroup[] {
      return groupTransactions(this.transactions, (transaction) => transaction.transactionType === 'expense')
    },
    allGroups(): TransactionGroup[] {
      return groupTransactions(this.transactions, () => true)
    },
    latestTransactions(): TransactionRecord[] {
      return [...this.transactions].slice(0, 8)
    },
    totalIncome(): number {
      return this.transactions
        .filter((transaction) => transaction.transactionType === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    },
    totalExpense(): number {
      return this.transactions
        .filter((transaction) => transaction.transactionType === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    },
    totalSaving(): number {
      return this.transactions
        .filter((transaction) => transaction.transactionType === 'saving')
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    },
    balance(): number {
      return this.totalIncome - this.totalExpense - this.totalSaving
    },
    accountBalances(): AccountBalance[] {
      const balances = new Map<string, AccountBalance>()

      for (const transaction of this.transactions) {
        const key = `${transaction.sourceType}:${transaction.accountName}`
        const current = balances.get(key) ?? {
          sourceType: transaction.sourceType,
          accountName: transaction.accountName,
          income: 0,
          outcome: 0,
          balance: 0,
        }

        if (transaction.transactionType === 'income') {
          current.income += transaction.amount
          current.balance += transaction.amount
        } else {
          current.outcome += transaction.amount
          current.balance -= transaction.amount
        }

        balances.set(key, current)
      }

      return Array.from(balances.values())
        .filter((account) => account.balance > 0)
        .sort((a, b) => {
          if (a.sourceType !== b.sourceType) return a.sourceType.localeCompare(b.sourceType)
          return a.accountName.localeCompare(b.accountName)
        })
    },
    accountBalanceByKey(): (sourceType: SourceType, accountName: string) => number {
      return (sourceType, accountName) =>
        this.accountBalances.find(
          (account) => account.sourceType === sourceType && account.accountName === accountName,
        )?.balance ?? 0
    },
    savingsGoalViews(): SavingsGoal[] {
      return this.savingsGoals.map((goal) =>
        buildSavingsGoalView(
          {
            id: goal.id,
            slug: goal.slug,
            label: goal.label,
            icon: goal.icon,
            targetAmount: goal.target_amount,
          },
          this.transactions,
        ),
      )
    },
    primaryGoal(): SavingsGoal | null {
      const primary = this.savingsGoals.find((g) => g.priority === 1)
      if (!primary) return null
      return buildSavingsGoalView({ id: primary.id, slug: primary.slug, label: primary.label, icon: primary.icon, targetAmount: primary.target_amount }, this.transactions)
    },
    topPriorityGoals(): SavingsGoal[] {
      const sorted = [...this.savingsGoals].filter((g) => g.priority > 0).sort((a, b) => a.priority - b.priority)
      return sorted.slice(0, 2).map((goal) =>
        buildSavingsGoalView({ id: goal.id, slug: goal.slug, label: goal.label, icon: goal.icon, targetAmount: goal.target_amount }, this.transactions),
      )
    },
  },

  actions: {
    reset() {
      this.categories = []
      this.savingsGoals = []
      this.transactions = []
      this.initialized = false
      this.loading = false
      this.errorMessage = ''
    },

    async initialize(force = false) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) {
        this.reset()
        return
      }

      if (this.initialized && !force) {
        return
      }

      this.loading = true
      this.errorMessage = ''

      try {
        const userRef = doc(db, 'users', authStore.user.uid)
        await this.ensureSeedData(userRef.path)

        const categoriesQuery = query(collection(db, userRef.path, 'categories'), orderBy('label'))
        const goalsQuery = query(collection(db, userRef.path, 'savingsGoals'), orderBy(documentId()))
        const transactionsQuery = query(collection(db, userRef.path, 'transactions'), orderBy('transactionAt', 'desc'))

        const [categoriesSnapshot, goalsSnapshot, transactionsSnapshot] = await Promise.all([
          getDocs(categoriesQuery),
          getDocs(goalsQuery),
          getDocs(transactionsQuery),
        ])

        this.categories = categoriesSnapshot.docs.map((snapshot) =>
          toCategoryItem(snapshot.id, snapshot.data() as CategoryDoc),
        )
        this.savingsGoals = goalsSnapshot.docs.map((snapshot) =>
          toSavingsGoalRow(snapshot.id, snapshot.data() as SavingsGoalDoc),
        )
        this.transactions = transactionsSnapshot.docs.map((snapshot) =>
          toTransactionRecord(snapshot.id, snapshot.data() as TransactionDoc),
        )
        this.initialized = true
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Gagal memuat data keuangan.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async ensureSeedData(userPath: string) {
      const categoriesRef = collection(db, userPath, 'categories')

      const [categorySeedSnapshot] = await Promise.all([
        getDocs(query(categoriesRef, limit(1))),
      ])

      if (categorySeedSnapshot.empty) {
        await setDoc(doc(categoriesRef, defaultSavingsCategory.slug), {
          slug: defaultSavingsCategory.slug,
          label: defaultSavingsCategory.label,
          icon: defaultSavingsCategory.icon,
          kind: defaultSavingsCategory.kind,
          createdAt: serverTimestamp(),
        })
      }
    },

    categoryBySlug(slug: string) {
      return this.categories.find((item) => item.slug === slug)
    },

    categoryGroups(slug: string): CategoryMonthGroup[] {
      return groupCategoryExpenses(this.transactions, slug)
    },

    savingsGoalBySlug(slug: string) {
      return this.savingsGoalViews.find((item) => item.slug === slug)
    },

    async addCategory(label: string, icon: CategoryIcon = 'stack') {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) {
        throw new Error('Sesi login tidak ditemukan.')
      }

      const trimmed = label.trim()
      if (!trimmed) {
        throw new Error('Nama kategori wajib diisi.')
      }

      const existingSlugs = new Set(this.expenseCategories.map((item) => item.slug))
      const baseSlug = slugify(trimmed) || 'kategori-baru'
      let nextSlug = baseSlug
      let suffix = 2

      while (existingSlugs.has(nextSlug)) {
        nextSlug = `${baseSlug}-${suffix}`
        suffix += 1
      }

      try {
        await setDoc(doc(db, 'users', authStore.user.uid, 'categories', nextSlug), {
          slug: nextSlug,
          label: trimmed,
          icon,
          kind: 'expense',
          createdAt: serverTimestamp(),
        })

        await this.initialize(true)
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Gagal menambah kategori.'
        throw error
      }
    },

    async updateCategory(categoryId: string, payload: { label: string; icon: CategoryIcon }) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) throw new Error('Sesi login tidak ditemukan.')

      const trimmed = payload.label.trim()
      if (!trimmed) {
        throw new Error('Nama kategori wajib diisi.')
      }

      try {
        await updateDoc(doc(db, 'users', authStore.user.uid, 'categories', categoryId), {
          label: trimmed,
          icon: payload.icon,
        })

        await this.initialize(true)
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Gagal mengubah kategori.'
        throw error
      }
    },

    async deleteCategory(categoryId: string) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) throw new Error('Sesi login tidak ditemukan.')

      try {
        await deleteDoc(doc(db, 'users', authStore.user.uid, 'categories', categoryId))
        await this.initialize(true)
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Gagal menghapus kategori.'
        throw error
      }
    },

    async addIncome(payload: {
      title: string
      note: string
      amount: number
      sourceType: 'bank' | 'ewallet' | 'cash'
      accountName: string
      transactionAt: string
    }) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) {
        throw new Error('Sesi login tidak ditemukan.')
      }

      await addDoc(collection(db, 'users', authStore.user.uid, 'transactions'), {
        title: payload.title,
        note: payload.note,
        transactionType: 'income',
        categorySlug: 'income',
        categoryLabel: 'Pemasukan',
        categoryIcon: 'salary',
        sourceType: payload.sourceType,
        accountName: payload.accountName,
        amount: payload.amount,
        transactionAt: payload.transactionAt,
        savingsGoalId: null,
        createdAt: serverTimestamp(),
      })

      this.initialize(true)
    },

    async addExpense(payload: {
      categorySlug: string
      title: string
      note: string
      amount: number
      sourceType: 'bank' | 'ewallet' | 'cash'
      accountName: string
      transactionAt: string
    }) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) {
        throw new Error('Sesi login tidak ditemukan.')
      }

      const category = this.categoryBySlug(payload.categorySlug)
      if (!category) {
        throw new Error('Kategori tidak ditemukan.')
      }

      const sourceBalance = this.accountBalanceByKey(payload.sourceType, payload.accountName)
      if (payload.amount > sourceBalance) {
        throw new Error(`Saldo ${payload.accountName} cuma ${formatCurrency(sourceBalance)}.`)
      }

      await addDoc(collection(db, 'users', authStore.user.uid, 'transactions'), {
        title: payload.title,
        note: payload.note,
        transactionType: 'expense',
        categorySlug: category.slug,
        categoryLabel: category.label,
        categoryIcon: category.icon,
        sourceType: payload.sourceType,
        accountName: payload.accountName,
        amount: payload.amount,
        transactionAt: payload.transactionAt,
        savingsGoalId: null,
        createdAt: serverTimestamp(),
      })

      this.initialize(true)
    },

    async addSavingEntry(payload: {
      goalSlug: string
      title: string
      note: string
      amount: number
      sourceType: 'bank' | 'ewallet' | 'cash'
      accountName: string
      transactionAt: string
    }) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) {
        throw new Error('Sesi login tidak ditemukan.')
      }

      const goal = this.savingsGoals.find((item) => item.slug === payload.goalSlug)
      if (!goal) {
        throw new Error('Target tabungan tidak ditemukan.')
      }

      const sourceBalance = this.accountBalanceByKey(payload.sourceType, payload.accountName)
      if (payload.amount > sourceBalance) {
        throw new Error(`Saldo ${payload.accountName} cuma ${formatCurrency(sourceBalance)}.`)
      }

      await addDoc(collection(db, 'users', authStore.user.uid, 'transactions'), {
        title: payload.title,
        note: payload.note,
        transactionType: 'saving',
        categorySlug: 'savings',
        categoryLabel: goal.label,
        categoryIcon: goal.icon,
        sourceType: payload.sourceType,
        accountName: payload.accountName,
        amount: payload.amount,
        transactionAt: payload.transactionAt,
        savingsGoalId: goal.id,
        createdAt: serverTimestamp(),
      })

      this.initialize(true)
    },

    async updateTransaction(transactionId: string, payload: {
      title: string
      note: string
      amount: number
      sourceType: 'bank' | 'ewallet' | 'cash'
      accountName: string
      transactionAt: string
    }) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) return

      const existingTransaction = this.transactions.find((transaction) => transaction.id === transactionId)

      if (
        existingTransaction &&
        (existingTransaction.transactionType === 'expense' || existingTransaction.transactionType === 'saving')
      ) {
        const currentAccountBalance = this.accountBalanceByKey(payload.sourceType, payload.accountName)
        const replacedAmount =
          existingTransaction.sourceType === payload.sourceType && existingTransaction.accountName === payload.accountName
            ? existingTransaction.amount
            : 0
        const availableBalance = currentAccountBalance + replacedAmount

        if (payload.amount > availableBalance) {
          throw new Error(`Saldo ${payload.accountName} cuma ${formatCurrency(availableBalance)}.`)
        }
      }

      await updateDoc(doc(db, 'users', authStore.user.uid, 'transactions', transactionId), {
        title: payload.title,
        note: payload.note,
        amount: payload.amount,
        sourceType: payload.sourceType,
        accountName: payload.accountName,
        transactionAt: payload.transactionAt,
      })

      this.initialize(true)
    },

    async deleteTransaction(transactionId: string) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) return

      await deleteDoc(doc(db, 'users', authStore.user.uid, 'transactions', transactionId))
      this.initialize(true)
    },

    async addSavingsGoal(payload: { label: string; icon: CategoryIcon; targetAmount: number; priority?: number }) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) return

      const slug = slugify(payload.label) || 'goal'
      await setDoc(doc(db, 'users', authStore.user.uid, 'savingsGoals', slug), {
        slug,
        label: payload.label,
        icon: payload.icon,
        targetAmount: payload.targetAmount,
        priority: payload.priority ?? 0,
        createdAt: serverTimestamp(),
      })

      this.initialize(true)
    },

    async updateSavingsGoal(goalId: string, payload: { label: string; icon: CategoryIcon; targetAmount: number; priority?: number }) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) return

      await updateDoc(doc(db, 'users', authStore.user.uid, 'savingsGoals', goalId), {
        label: payload.label,
        icon: payload.icon,
        targetAmount: payload.targetAmount,
        priority: payload.priority ?? 0,
      })

      this.initialize(true)
    },

    async deleteSavingsGoal(goalId: string) {
      const authStore = useAuthStore()
      if (!authStore.user?.uid) return

      await deleteDoc(doc(db, 'users', authStore.user.uid, 'savingsGoals', goalId))
      this.initialize(true)
    },

    summaryForRange(days: number) {
      const now = new Date()
      const start = new Date(now)
      start.setDate(now.getDate() - (days - 1))

      const filtered = this.transactions.filter((transaction) => new Date(transaction.transactionAt) >= start)

      const income = filtered
        .filter((transaction) => transaction.transactionType === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0)

      const expense = filtered
        .filter((transaction) => transaction.transactionType === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0)

      return {
        income,
        expense,
        incomeLabel: formatCurrency(income),
        expenseLabel: `-${formatCurrency(expense)}`,
      }
    },
  },
})
