<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppIcon from '@/components/icons/AppIcon.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { formatCurrency, formatDateTimeLabel, parseCurrencyInput } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'
import type { SourceType } from '@/types/transaction'

const route = useRoute()
const router = useRouter()
const financeStore = useFinanceStore()

const transactionId = computed(() => String(route.params.id ?? ''))
const transaction = computed(() => financeStore.transactions.find((t) => t.id === transactionId.value))

const isEditing = ref(false)
const saving = ref(false)
const showDeleteConfirm = ref(false)
const editTitle = ref('')
const editNote = ref('')
const editAmount = ref('')
const editDate = ref('')
const editSource = ref<SourceType>('bank')
const editAccount = ref('')
const errorMessage = ref('')

const sourceOptions: Array<{ key: SourceType; label: string }> = [
  { key: 'bank', label: 'Bank' },
  { key: 'ewallet', label: 'E-Wallet' },
  { key: 'cash', label: 'Tunai' },
]

const defaultAccountOptions = computed(() => {
  if (editSource.value === 'bank') {
    return ['BCA', 'Mandiri', 'BRI', 'BNI', 'BSI', 'CIMB Niaga', 'Danamon', 'Permata', 'OCBC NISP', 'Mega', 'BTN', 'Sea Bank', 'Jago', 'Blu by BCA', 'Neo Commerce', 'Allo Bank', 'Bank Muamalat', 'Jenius (BTPN)']
  }
  if (editSource.value === 'ewallet') {
    return ['GoPay', 'OVO', 'DANA', 'ShopeePay', 'LinkAja', 'Sakuku', 'i.saku', 'DOKU', 'Kredivo', 'Akulaku']
  }
  return ['Dompet Utama', 'Kas Harian', 'Uang Jajan']
})

const isSpendingTransaction = computed(() =>
  transaction.value?.transactionType === 'expense' || transaction.value?.transactionType === 'saving',
)

const spendingAccountOptions = computed(() => {
  const accounts = financeStore.accountBalances.filter((account) => account.sourceType === editSource.value)
  const current = transaction.value

  if (
    current &&
    isSpendingTransaction.value &&
    current.sourceType === editSource.value &&
    !accounts.some((account) => account.accountName === current.accountName)
  ) {
    return [
      ...accounts,
      {
        sourceType: current.sourceType,
        accountName: current.accountName,
        income: 0,
        outcome: current.amount,
        balance: current.amount,
      },
    ]
  }

  return accounts
})

const accountOptions = computed(() =>
  isSpendingTransaction.value
    ? spendingAccountOptions.value.map((account) => account.accountName)
    : defaultAccountOptions.value,
)

const selectedEditAccountBalance = computed(() => {
  const current = transaction.value
  const currentBalance = financeStore.accountBalanceByKey(editSource.value, editAccount.value)

  if (
    current &&
    isSpendingTransaction.value &&
    current.sourceType === editSource.value &&
    current.accountName === editAccount.value
  ) {
    return currentBalance + current.amount
  }

  return currentBalance
})

const typeLabel = computed(() => {
  if (!transaction.value) return ''
  if (transaction.value.transactionType === 'income') return 'Pemasukan'
  if (transaction.value.transactionType === 'expense') return 'Pengeluaran'
  return 'Tabungan'
})

watchEffect(() => {
  if (transaction.value) {
    editTitle.value = transaction.value.title
    editNote.value = transaction.value.note
    editAmount.value = String(transaction.value.amount)
    editDate.value = transaction.value.transactionAt.slice(0, 10)
    editSource.value = transaction.value.sourceType
    editAccount.value = transaction.value.accountName
  }
})

const startEdit = () => { isEditing.value = true }

const applyEditSource = (source: SourceType) => {
  editSource.value = source
  editAccount.value = accountOptions.value[0] ?? ''
}

const cancelEdit = () => {
  errorMessage.value = ''
  isEditing.value = false
}

const handleSave = async () => {
  if (saving.value) return
  errorMessage.value = ''

  const parsedAmount = parseCurrencyInput(editAmount.value)
  if (!parsedAmount) {
    errorMessage.value = 'Nominal belum valid.'
    return
  }

  if (isSpendingTransaction.value && parsedAmount > selectedEditAccountBalance.value) {
    errorMessage.value = `Saldo ${editAccount.value} cuma ${formatCurrency(selectedEditAccountBalance.value)}.`
    return
  }

  saving.value = true

  try {
    await financeStore.updateTransaction(transactionId.value, {
      title: editTitle.value,
      note: editNote.value,
      amount: parsedAmount,
      sourceType: editSource.value,
      accountName: editAccount.value,
      transactionAt: new Date(`${editDate.value}T12:00:00`).toISOString(),
    })

    isEditing.value = false
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Gagal menyimpan transaksi.'
  } finally {
    saving.value = false
  }
}

const handleDelete = async () => {
  await financeStore.deleteTransaction(transactionId.value)
  router.push('/transaction')
}
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)">
      <div class="px-6 pt-8 pb-6">
        <div class="flex items-center justify-between">
          <button type="button" class="text-(--color-shell-text)" @click="router.push('/transaction')">
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>
          <h1 class="text-2xl font-bold text-(--color-shell-text)">Detail Transaksi</h1>
          <div class="h-10 w-10" />
        </div>
      </div>

      <div class="relative flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-6 pt-7">
        <template v-if="!transaction">
          <p class="text-center text-(--color-muted-text)">Transaksi tidak ditemukan.</p>
        </template>

        <template v-else-if="!isEditing">
          <div class="space-y-5 pb-10">
            <div class="flex items-center gap-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-light-blue-button) text-white">
                <AppIcon :name="transaction.categoryIcon" class="h-6 w-6" />
              </div>
              <div>
                <p class="text-lg font-bold text-(--color-primary-text)">{{ transaction.title }}</p>
                <p class="text-xs text-(--color-muted-text)">{{ typeLabel }} · {{ transaction.categoryLabel }}</p>
              </div>
            </div>

            <div class="rounded-[20px] bg-(--color-surface-background) p-5 space-y-4">
              <div class="flex justify-between">
                <span class="text-sm text-(--color-muted-text)">Nominal</span>
                <span class="text-sm font-bold text-(--color-primary-text)">{{ formatCurrency(transaction.amount) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-(--color-muted-text)">Waktu</span>
                <span class="text-sm font-medium text-(--color-primary-text)">{{ formatDateTimeLabel(transaction.transactionAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-(--color-muted-text)">Sumber</span>
                <span class="text-sm font-medium text-(--color-primary-text)">{{ transaction.accountName }} ({{ transaction.sourceType }})</span>
              </div>
              <div v-if="transaction.note" class="flex justify-between">
                <span class="text-sm text-(--color-muted-text)">Catatan</span>
                <span class="text-sm font-medium text-(--color-primary-text)">{{ transaction.note }}</span>
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <AppButton class="flex-1" @click="startEdit">Edit</AppButton>
              <AppButton class="flex-1" variant="soft" @click="showDeleteConfirm = true">Hapus</AppButton>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="space-y-5 pb-10">
            <div>
              <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Judul</label>
              <input v-model="editTitle" type="text" class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none" />
            </div>

            <div>
              <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Nominal</label>
              <input v-model="editAmount" type="text" class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none" />
              <p class="mt-1 text-xs text-(--color-muted-text)/80">Preview: {{ formatCurrency(parseCurrencyInput(editAmount)) }}</p>
            </div>

            <div>
              <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Tanggal</label>
              <input v-model="editDate" type="date" class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none" />
            </div>

            <div>
              <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Sumber Dana</label>
              <div class="grid grid-cols-3 gap-2 rounded-[18px] bg-(--color-nav-background) p-1.5">
                <button
                  v-for="opt in sourceOptions"
                  :key="opt.key"
                  type="button"
                  class="rounded-[14px] py-2.5 text-[0.88rem] font-semibold transition"
                  :class="editSource === opt.key ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'text-(--color-primary-text)/75'"
                  @click="applyEditSource(opt.key)"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>

            <div>
              <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Nama Akun</label>
              <select v-model="editAccount" class="h-11 w-full appearance-none rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none">
                <option v-for="account in accountOptions" :key="account" :value="account">{{ account }}</option>
              </select>
              <p v-if="isSpendingTransaction" class="mt-2 text-xs font-semibold text-(--color-muted-text)/85">
                Saldo bisa dipakai: {{ formatCurrency(selectedEditAccountBalance) }}
              </p>
            </div>

            <div>
              <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Catatan</label>
              <textarea v-model="editNote" rows="3" class="w-full rounded-[18px] bg-(--color-input-background) px-4 py-3 text-[0.95rem] text-(--color-input-text) focus:outline-none" />
            </div>

            <p v-if="errorMessage" class="text-center text-sm font-medium text-(--color-ocean-blue-button)">
              {{ errorMessage }}
            </p>

            <div class="flex gap-3 pt-2">
              <AppButton class="flex-1" :loading="saving" @click="handleSave">Simpan</AppButton>
              <AppButton class="flex-1" variant="soft" @click="cancelEdit">Batal</AppButton>
            </div>
          </div>
        </template>

        <!-- Delete confirmation modal -->
        <div
          v-if="showDeleteConfirm"
          class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,19,20,0.38)] px-10"
        >
          <div class="w-full max-w-76 rounded-[24px] bg-(--color-panel-background) px-7 py-8 text-center shadow-xl">
            <h2 class="text-[1.3rem] font-bold text-(--color-primary-text)">Hapus Transaksi?</h2>
            <p class="mt-2 text-sm text-(--color-muted-text)">Data yang dihapus tidak bisa dikembalikan.</p>
            <AppButton class="mt-5" full @click="handleDelete">Ya, Hapus</AppButton>
            <AppButton class="mt-3" variant="soft" full @click="showDeleteConfirm = false">Batal</AppButton>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
