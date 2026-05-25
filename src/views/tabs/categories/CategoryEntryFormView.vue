<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/icons/AppIcon.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { navigateByTab } from '@/composables/useAppNavigation'
import { formatCurrency, parseCurrencyInput } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'
import type { NavKey } from '@/types/navigation'
import type { SourceType } from '@/types/transaction'

type BalanceSource = SourceType

const route = useRoute()
const router = useRouter()
const financeStore = useFinanceStore()
const amount = ref('')
const expenseTitle = ref('')
const message = ref('')
const activeSource = ref<BalanceSource>('bank')
const selectedAccount = ref('BCA')
const isCategoryMenuOpen = ref(false)
const selectedCategorySlug = ref('')
const formDate = ref(new Date().toISOString().slice(0, 10))
const errorMessage = ref('')
const categorySlug = computed(() => String(route.params.categorySlug ?? 'food'))
const category = computed(() => financeStore.categoryBySlug(categorySlug.value) ?? financeStore.expenseCategories[0]!)
const activeGoalSlug = computed(() => String(route.query.goal ?? ''))
const savingsFallbackGoal = computed(
  () => financeStore.savingsGoalViews.find((goal) => goal.slug === 'wedding') ?? financeStore.savingsGoalViews[0],
)
const activeGoal = computed(() =>
  categorySlug.value === 'savings'
    ? financeStore.savingsGoalBySlug(activeGoalSlug.value) ?? savingsFallbackGoal.value
    : undefined,
)
const isSavingsCategory = computed(() => categorySlug.value === 'savings')
const expenseCategoryOptions = computed(() =>
  financeStore.expenseCategories.filter((item) => item.slug !== 'savings'),
)
const selectedExpenseCategory = computed(
  () =>
    expenseCategoryOptions.value.find((item) => item.slug === selectedCategorySlug.value) ??
    expenseCategoryOptions.value[0],
)
const categoryDisplay = computed(() =>
  isSavingsCategory.value
    ? activeGoal.value?.label ?? category.value.label
    : selectedExpenseCategory.value?.label ?? category.value.label,
)
const balanceSourceLabel = computed(() =>
  isSavingsCategory.value ? 'Ambil dari saldo' : 'Keluar dari saldo',
)

const sourceLabels: Record<BalanceSource, string> = {
  bank: 'Bank',
  ewallet: 'E-Wallet',
  cash: 'Tunai',
}

const sourceOptions = computed(() => {
  const availableSources = new Set(financeStore.accountBalances.map((account) => account.sourceType))
  return Array.from(availableSources).map((source) => ({
    key: source,
    label: sourceLabels[source],
  }))
})

const accountOptions = computed(() =>
  financeStore.accountBalances.filter((account) => account.sourceType === activeSource.value),
)

const selectedAccountBalance = computed(() =>
  accountOptions.value.find((account) => account.accountName === selectedAccount.value)?.balance ?? 0,
)

const applySource = (source: BalanceSource) => {
  activeSource.value = source
  selectedAccount.value = accountOptions.value[0]?.accountName ?? ''
}

const selectExpenseCategory = (slug: string) => {
  selectedCategorySlug.value = slug
  isCategoryMenuOpen.value = false
}

watchEffect(() => {
  selectedCategorySlug.value = category.value.slug === 'savings' ? 'food' : category.value.slug

  if (isSavingsCategory.value) {
    expenseTitle.value = activeGoal.value?.addTitle ?? ''
  }
})

watchEffect(() => {
  if (financeStore.accountBalances.length === 0) {
    selectedAccount.value = ''
    return
  }

  if (!sourceOptions.value.some((option) => option.key === activeSource.value)) {
    activeSource.value = sourceOptions.value[0]?.key ?? 'bank'
  }

  if (!accountOptions.value.some((account) => account.accountName === selectedAccount.value)) {
    selectedAccount.value = accountOptions.value[0]?.accountName ?? ''
  }
})

const handleNavigate = (key: NavKey) => navigateByTab(router, key)

const saving = ref(false)

const handleSave = async () => {
  if (saving.value) return
  errorMessage.value = ''
  const parsedAmount = parseCurrencyInput(amount.value)

  if (!parsedAmount) {
    errorMessage.value = 'Nominal belum valid.'
    return
  }

  if (!selectedAccount.value) {
    errorMessage.value = 'Belum ada saldo masuk. Tambah saldo dulu sebelum bikin pengeluaran.'
    return
  }

  if (parsedAmount > selectedAccountBalance.value) {
    errorMessage.value = `Saldo ${selectedAccount.value} cuma ${formatCurrency(selectedAccountBalance.value)}.`
    return
  }

  saving.value = true
  const transactionAt = new Date(`${formDate.value}T12:00:00`).toISOString()

  try {
    if (isSavingsCategory.value) {
      await financeStore.addSavingEntry({
        goalSlug: activeGoal.value?.slug ?? financeStore.savingsGoalViews[0]?.slug ?? '',
        title: expenseTitle.value,
        note: message.value,
        amount: parsedAmount,
        sourceType: activeSource.value,
        accountName: selectedAccount.value,
        transactionAt,
      })

      await router.push(`/categories/savings?goal=${activeGoal.value?.slug}`)
      return
    }

    await financeStore.addExpense({
      categorySlug: selectedCategorySlug.value,
      title: expenseTitle.value,
      note: message.value,
      amount: parsedAmount,
      sourceType: activeSource.value,
      accountName: selectedAccount.value,
      transactionAt,
    })

    await router.push(`/categories/${selectedCategorySlug.value}`)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Gagal menyimpan pengeluaran.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)">
      <div class="px-6 pt-8 pb-6">
        <div class="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3">
          <button type="button" class="text-(--color-shell-text)" @click="router.push(`/categories/${category.slug}`)">
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>

          <h1 class="text-center text-2xl font-bold leading-tight text-(--color-shell-text)">
            {{ isSavingsCategory ? 'Tambah Tabungan' : 'Tambah Pengeluaran' }}
          </h1>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-glass-surface) text-(--color-shell-text) backdrop-blur-md"
            @click="router.push('/notifications')"
          >
            <AppIcon name="bell" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        class="relative mt-2 flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-5 pt-7"
      >
        <div class="space-y-6 pb-28">
          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Tanggal
            </label>
            <div class="flex h-11 items-center justify-between rounded-full bg-(--color-input-background) px-5">
              <input
                v-model="formDate"
                type="date"
                class="h-full w-full bg-transparent text-[0.95rem] text-(--color-input-text)/80 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Kategori
            </label>

            <div class="relative">
              <button
                type="button"
                class="flex h-11 w-full items-center justify-between rounded-full bg-(--color-input-background) px-5 text-[0.92rem] text-(--color-input-text)/70"
                :class="isSavingsCategory ? 'opacity-80' : ''"
                @click="!isSavingsCategory && (isCategoryMenuOpen = !isCategoryMenuOpen)"
              >
                <span>{{ categoryDisplay }}</span>
                <AppIcon
                  name="chevron-down"
                  class="h-4.5 w-4.5 text-(--color-main-green) transition"
                  :class="isCategoryMenuOpen ? 'rotate-180' : ''"
                />
              </button>

              <div
                v-if="isCategoryMenuOpen && !isSavingsCategory"
                class="absolute top-13 left-0 z-20 w-full rounded-[22px] bg-(--color-panel-background) p-3 shadow-[0_18px_45px_rgba(3,19,20,0.14)]"
              >
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="item in expenseCategoryOptions"
                    :key="item.slug"
                    type="button"
                    class="rounded-[16px] px-3 py-2.5 text-left text-[0.86rem] font-medium transition"
                    :class="
                      selectedCategorySlug === item.slug
                        ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)'
                        : 'bg-(--color-input-background) text-(--color-input-text)'
                    "
                    @click="selectExpenseCategory(item.slug)"
                  >
                    {{ item.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              {{ balanceSourceLabel }}
            </label>

            <div class="grid grid-cols-3 gap-2 rounded-[18px] bg-(--color-nav-background) p-1.5">
              <button
                v-for="option in sourceOptions"
                :key="option.key"
                type="button"
                class="rounded-[14px] py-2.5 text-[0.88rem] font-semibold transition"
                :class="
                  activeSource === option.key
                    ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)'
                    : 'text-(--color-primary-text)/75'
                "
                @click="applySource(option.key)"
              >
                {{ option.label }}
              </button>

              <div
                v-if="sourceOptions.length === 0"
                class="col-span-3 rounded-[14px] bg-(--color-input-background) px-4 py-3 text-center text-[0.82rem] font-semibold text-(--color-muted-text)"
              >
                Belum ada saldo masuk
              </div>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Nama Akun
            </label>

            <select
              v-model="selectedAccount"
              :disabled="accountOptions.length === 0"
              class="h-11 w-full appearance-none rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
            >
              <option v-for="account in accountOptions" :key="`${account.sourceType}-${account.accountName}`" :value="account.accountName">
                {{ account.accountName }} - {{ formatCurrency(account.balance) }}
              </option>
            </select>

            <p v-if="selectedAccount" class="mt-2 text-xs font-semibold text-(--color-muted-text)/85">
              Sisa saldo {{ selectedAccount }}: {{ formatCurrency(selectedAccountBalance) }}
            </p>
            <p v-else class="mt-2 text-xs font-semibold text-(--color-ocean-blue-button)">
              Tambah saldo dulu supaya akun sumber dana muncul di sini.
            </p>
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Nominal
            </label>
            <input
              v-model="amount"
              type="text"
              class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
            />
            <p class="mt-2 text-xs text-(--color-muted-text)/80">
              Preview: {{ formatCurrency(parseCurrencyInput(amount)) }}
            </p>
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Judul Catatan
            </label>
            <input
              v-model="expenseTitle"
              type="text"
              class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
            />
          </div>

          <div>
            <textarea
              v-model="message"
              rows="6"
              placeholder="Catatan tambahan kalau ada..."
              class="w-full rounded-[18px] bg-(--color-input-background) px-4 py-4 text-[0.95rem] text-(--color-input-text) placeholder:text-(--color-main-green) focus:outline-none"
            />
          </div>

          <p v-if="errorMessage" class="text-center text-sm font-medium text-(--color-ocean-blue-button)">
            {{ errorMessage }}
          </p>

          <AppButton class="mx-auto" min-width="9rem" :loading="saving" @click="handleSave">
            Simpan
          </AppButton>
        </div>

        <MobileBottomNav active="laporan" @navigate="handleNavigate" />
      </div>
    </section>
  </main>
</template>
