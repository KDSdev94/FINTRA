<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import { navigateByTab } from '@/composables/useAppNavigation'
import { formatCurrency, toTransactionItem } from '@/lib/finance'
import { useAuthStore } from '@/stores/auth'
import { useFinanceStore } from '@/stores/finance'
import type { NavKey } from '@/types/navigation'
import type { TransactionItem } from '@/types/transaction'

type PeriodKey = 'harian' | 'mingguan' | 'bulanan'

const activePeriod = ref<PeriodKey>('bulanan')
const router = useRouter()
const authStore = useAuthStore()
const financeStore = useFinanceStore()
const { profile } = storeToRefs(authStore)
const { balance, totalExpense, latestTransactions } = storeToRefs(financeStore)

const allHomeTransactions = computed<
  Array<TransactionItem & { expense?: boolean }>
>(() => latestTransactions.value.map(toTransactionItem))

const expenses = computed<Array<TransactionItem & { expense?: boolean }>>(() => {
  if (activePeriod.value === 'harian') {
    return allHomeTransactions.value.slice(0, 2)
  }

  if (activePeriod.value === 'mingguan') {
    return allHomeTransactions.value.slice(0, 4)
  }

  return allHomeTransactions.value.slice(0, 6)
})

const periodInsight = computed(() => {
  if (activePeriod.value === 'harian') {
    const summary = financeStore.summaryForRange(1)
    return {
      incomeLabel: 'Cuan Hari Ini',
      incomeValue: summary.incomeLabel,
      expenseLabel: 'Keluar Hari Ini',
      expenseValue: summary.expenseLabel,
    }
  }

  if (activePeriod.value === 'mingguan') {
    const summary = financeStore.summaryForRange(7)
    return {
      incomeLabel: 'Cuan Minggu Ini',
      incomeValue: summary.incomeLabel,
      expenseLabel: 'Keluar Minggu Ini',
      expenseValue: summary.expenseLabel,
    }
  }

  const summary = financeStore.summaryForRange(30)
  return {
    incomeLabel: 'Cuan Bulan Ini',
    incomeValue: summary.incomeLabel,
    expenseLabel: 'Keluar Bulan Ini',
    expenseValue: summary.expenseLabel,
  }
})

const expenseRatio = computed(() => {
  const incomeBase = Math.max(financeStore.totalIncome, 1)
  return Math.min(100, Math.round((financeStore.totalExpense / incomeBase) * 100))
})

const remainingRatio = computed(() => 100 - expenseRatio.value)

const periods: Array<{ key: PeriodKey; label: string }> = [
  { key: 'harian', label: 'Harian' },
  { key: 'mingguan', label: 'Mingguan' },
  { key: 'bulanan', label: 'Bulanan' },
]

const handleNavigate = (key: NavKey) => navigateByTab(router, key)
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section
      class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)"
    >
      <div class="px-6 pt-8 pb-8">
        <div class="mb-6 flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold leading-none text-(--color-shell-text)">
              Halo, {{ profile?.fullName?.split(' ')[0] ?? 'Bos' }}
            </h1>
            <p class="mt-1 text-sm font-medium text-(--color-shell-text)/75">Fintra</p>
          </div>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-glass-surface) text-(--color-shell-text) shadow-sm backdrop-blur-md"
            @click="router.push('/notifications')"
          >
            <AppIcon name="bell" class="h-5 w-5" />
          </button>
        </div>

        <div class="mb-5 flex items-center">
          <div class="flex-1 min-w-0">
            <p class="mb-1 text-xs font-semibold text-(--color-shell-text)/78">Sisa Duit Lu</p>
            <h2
              class="whitespace-nowrap text-[22px] sm:text-[28px] font-extrabold tracking-tight text-white"
            >
              {{ formatCurrency(balance) }}
            </h2>
          </div>

          <div class="mx-3 h-10 w-[2px] shrink-0 bg-white/24 sm:mx-4" />

          <div class="flex-1 min-w-0">
            <p class="mb-1 text-xs font-semibold text-(--color-shell-text)/78">Duit Keluar</p>
            <h2
              class="whitespace-nowrap text-[20px] sm:text-[22px] font-extrabold tracking-tight text-(--color-shell-text)"
            >
              -{{ formatCurrency(totalExpense) }}
            </h2>
          </div>
        </div>

        <div
          class="mb-3 flex h-[26px] w-full items-center overflow-hidden rounded-full text-[11px] font-bold"
        >
          <div
            class="flex h-full items-center justify-center bg-(--color-dark-mode-green-black) text-white"
            :style="{ width: `${expenseRatio}%` }"
          >
            {{ expenseRatio }}%
          </div>
          <div
            class="flex h-full items-center justify-end bg-(--color-background-green-white-and-letter) px-4 text-(--color-dark-mode-green-black)"
            :style="{ width: `${remainingRatio}%` }"
          >
            {{ formatCurrency(financeStore.totalIncome || 0) }}
          </div>
        </div>

        <p class="flex items-center gap-2 text-xs font-semibold text-(--color-shell-text)/78">
          <span
            class="flex h-4 w-4 items-center justify-center rounded-[4px] border border-(--color-shell-text)/55 text-[10px]"
          >
            ✓
          </span>
          {{ expenseRatio }}% duit kepake dari total pemasukan yang tercatat.
        </p>
      </div>

      <div
        class="relative mt-2 flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-6 pt-6"
      >
        <div
          v-if="financeStore.primaryGoal"
          class="mb-6 flex items-center justify-between rounded-[24px] bg-(--color-main-green) p-5 shadow-sm"
        >
          <div class="flex w-[40%] flex-col items-center justify-center gap-2">
            <div
              class="relative flex h-16 w-16 items-center justify-center rounded-full text-(--color-primary-button-text)"
              :style="{
                background: financeStore.primaryGoal!.progress > 0
                  ? `conic-gradient(var(--color-ocean-blue-button) 0deg ${financeStore.primaryGoal!.progress * 3.6}deg, rgba(255,255,255,0.3) ${financeStore.primaryGoal!.progress * 3.6}deg 360deg)`
                  : 'rgba(255,255,255,0.3)',
              }"
            >
              <div class="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-(--color-main-green)">
                <AppIcon :name="financeStore.primaryGoal!.icon" class="h-7 w-7" />
              </div>
            </div>
            <p
              class="text-center text-xs font-semibold leading-tight text-(--color-primary-button-text)"
            >
              {{ financeStore.primaryGoal.label }}
            </p>
          </div>

          <div class="mx-2 h-16 w-[2px] bg-(--color-primary-button-text)/30" />

          <div class="flex w-[55%] flex-col gap-4 pl-2">
            <div class="flex items-center gap-3">
              <AppIcon
                name="stack"
                class="h-5 w-5 text-(--color-primary-button-text)/70"
              />
              <div>
                <p class="text-[10px] font-semibold text-(--color-primary-button-text)/70">
                  {{ periodInsight.incomeLabel }}
                </p>
                <p class="text-sm font-bold text-(--color-primary-button-text)">
                  {{ periodInsight.incomeValue }}
                </p>
              </div>
            </div>

            <div class="h-px w-full bg-(--color-primary-button-text)/30" />

            <div class="flex items-center gap-3">
              <AppIcon
                name="food"
                class="h-5 w-5 text-(--color-primary-button-text)/70"
              />
              <div>
                <p class="text-[10px] font-semibold text-(--color-primary-button-text)/70">
                  {{ periodInsight.expenseLabel }}
                </p>
                <p
                  class="text-sm font-bold text-(--color-primary-button-text)"
                >
                  {{ periodInsight.expenseValue }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="mb-6 flex flex-col items-center rounded-[24px] bg-(--color-surface-background) px-5 py-6 text-center shadow-sm"
        >
          <AppIcon name="savings" class="h-10 w-10 text-(--color-primary-text)/75" />
          <p class="mt-2 text-sm font-semibold text-(--color-primary-text)">Belum ada target utama</p>
          <p class="mt-1 text-xs text-(--color-muted-text)/75">Buat target tabungan dan set sebagai prioritas utama.</p>
          <button
            type="button"
            class="mt-3 rounded-full bg-(--color-blue-button) px-5 py-2 text-xs font-semibold text-white"
            @click="router.push('/categories/savings')"
          >
            Ke Tabungan
          </button>
        </div>

        <div class="mb-6 flex rounded-full bg-(--color-nav-background) p-1">
          <button
            v-for="period in periods"
            :key="period.key"
            type="button"
            class="flex-1 rounded-full py-3 text-center text-sm font-semibold transition"
            :class="
              activePeriod === period.key
                ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters) shadow-sm'
                : 'text-(--color-muted-text)/80'
            "
            @click="activePeriod = period.key"
          >
            {{ period.label }}
          </button>
        </div>

        <div class="flex flex-1 flex-col gap-5 overflow-y-auto pb-28">
          <div v-if="expenses.length === 0" class="flex flex-col items-center py-10 text-center">
            <AppIcon name="layers" class="h-14 w-14 text-(--color-light-blue-button)" />
            <p class="mt-3 text-sm font-semibold text-(--color-primary-text)">Belum ada transaksi</p>
            <p class="mt-1 text-xs text-(--color-muted-text)/70">Mulai catat keuangan kamu.</p>
          </div>
          <div
            v-for="item in expenses"
            :key="`${item.title}-${item.time}`"
            class="flex w-full items-center gap-2"
          >
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
              :style="{ backgroundColor: item.iconBg }"
            >
              <AppIcon :name="item.icon" class="h-5 w-5" />
            </div>

            <div class="flex min-w-0 flex-1 flex-col justify-center">
              <p class="truncate text-[0.8rem] font-bold text-(--color-primary-text)">
                {{ item.title }}
              </p>
              <p
                class="mt-[2px] whitespace-nowrap text-[10px] font-semibold tracking-tighter text-(--color-ocean-blue-button)"
              >
                {{ item.time }}
              </p>
            </div>

            <div
              class="flex w-16 shrink-0 items-center border-l-2 border-[rgb(0_208_158/0.3)] pl-2"
            >
              <p
                class="w-full text-center text-[10px] font-medium text-(--color-muted-text)/70"
              >
                {{ item.category }}
              </p>
            </div>

            <div
              class="flex w-22 shrink-0 items-center border-l-2 border-[rgb(0_208_158/0.3)] pl-2"
            >
              <p
                class="w-full whitespace-nowrap text-right text-[0.75rem] font-bold"
                :class="
                  item.expense
                    ? 'text-(--color-ocean-blue-button)'
                    : 'text-(--color-primary-text)'
                "
              >
                {{ item.amount }}
              </p>
            </div>
          </div>
        </div>

        <MobileBottomNav active="home" @navigate="handleNavigate" />
      </div>
    </section>
  </main>
</template>
