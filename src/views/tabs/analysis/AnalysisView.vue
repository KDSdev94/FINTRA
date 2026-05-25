<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import AnalysisDailyPanel from '@/components/analysis/AnalysisDailyPanel.vue'
import AnalysisMonthlyPanel from '@/components/analysis/AnalysisMonthlyPanel.vue'
import AnalysisWeeklyPanel from '@/components/analysis/AnalysisWeeklyPanel.vue'
import AnalysisYearlyPanel from '@/components/analysis/AnalysisYearlyPanel.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import { navigateByTab } from '@/composables/useAppNavigation'
import { formatCurrency } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'
import type { NavKey } from '@/types/navigation'

type PeriodKey = 'harian' | 'mingguan' | 'bulanan' | 'tahunan'

const router = useRouter()
const activePeriod = ref<PeriodKey>('harian')
const financeStore = useFinanceStore()
const { balance, totalExpense, totalIncome } = storeToRefs(financeStore)

const periods: Array<{ key: PeriodKey; label: string }> = [
  { key: 'harian', label: 'Today' },
  { key: 'mingguan', label: 'Weekly' },
  { key: 'bulanan', label: 'Monthly' },
  { key: 'tahunan', label: 'Yearly' },
]

const currentPanel = computed(() => {
  switch (activePeriod.value) {
    case 'mingguan':
      return AnalysisWeeklyPanel
    case 'bulanan':
      return AnalysisMonthlyPanel
    case 'tahunan':
      return AnalysisYearlyPanel
    default:
      return AnalysisDailyPanel
  }
})

const handleNavigate = (key: NavKey) => navigateByTab(router, key)
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section
      class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)"
    >
      <div class="px-6 pt-8 pb-7">
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="text-(--color-shell-text)"
            @click="router.push('/home')"
          >
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>

          <h1
            class="text-2xl font-bold text-(--color-shell-text)"
          >
            Cek Ombak Duit
          </h1>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-glass-surface) text-(--color-shell-text) backdrop-blur-md"
            @click="router.push('/notifications')"
          >
            <AppIcon name="bell" class="h-5 w-5" />
          </button>
        </div>

        <div class="mt-10 flex items-center">
          <div class="flex-1 min-w-0">
            <p
              class="mb-1 text-xs font-semibold text-(--color-shell-text)/78"
            >
              Sisa Saldo Lu
            </p>
            <h2
              class="whitespace-nowrap text-[22px] sm:text-[28px] font-extrabold tracking-tight text-white"
            >
              {{ formatCurrency(balance) }}
            </h2>
          </div>

          <div class="mx-3 h-10 w-[2px] shrink-0 bg-white/40 sm:mx-4" />

          <div class="flex-1 min-w-0">
            <p
              class="mb-1 text-xs font-semibold text-(--color-shell-text)/78"
            >
              Udah Kepake
            </p>
            <h2
              class="whitespace-nowrap text-[20px] sm:text-[22px] font-extrabold tracking-tight text-(--color-shell-text)"
            >
              -{{ formatCurrency(totalExpense) }}
            </h2>
          </div>
        </div>

        <div
          class="mt-6 flex h-[26px] w-full items-center overflow-hidden rounded-full text-[11px] font-bold"
        >
          <div
            class="flex h-full w-[30%] items-center justify-center bg-(--color-dark-mode-green-black) text-white"
          >
            {{ totalIncome ? Math.min(100, Math.round((totalExpense / totalIncome) * 100)) : 0 }}%
          </div>
          <div
            class="flex h-full w-[70%] items-center justify-end bg-(--color-input-background) px-4 text-(--color-dark-mode-green-black)"
          >
            {{ formatCurrency(totalIncome) }}
          </div>
        </div>

        <p
          class="mt-3 flex items-center gap-2 text-xs font-semibold text-(--color-shell-text)/78"
        >
          <span
            class="flex h-4 w-4 items-center justify-center rounded-[4px] border border-(--color-shell-text)/55 text-[10px]"
          >
            ✓
          </span>
          Data pengeluaran diambil langsung dari transaksi Firebase.
        </p>
      </div>

      <div
        class="relative mt-2 flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-6 pt-9"
      >
        <div class="flex rounded-full bg-(--color-segmented-background) p-1">
          <button
            v-for="period in periods"
            :key="period.key"
            type="button"
            class="flex-1 rounded-full py-3 text-center text-sm font-medium transition"
            :class="
              activePeriod === period.key
                ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters) shadow-sm'
                : 'text-(--color-segmented-inactive-text)'
            "
            @click="activePeriod = period.key"
          >
            {{ period.label }}
          </button>
        </div>

        <div class="mt-8 flex-1 overflow-y-auto pb-28">
          <component :is="currentPanel" />

          <section class="mt-8">
            <h3
              class="text-[1.05rem] font-semibold text-(--color-primary-text)"
            >
              Wishlist / Target Lu
            </h3>

            <div v-if="financeStore.topPriorityGoals.length === 0" class="mt-4 flex flex-col items-center py-8 text-center">
              <AppIcon name="savings" class="h-12 w-12 text-(--color-light-blue-button)" />
              <p class="mt-3 text-sm text-(--color-muted-text)/70">Belum ada target prioritas. Set prioritas di halaman tabungan.</p>
            </div>

            <div v-else class="mt-4 grid grid-cols-2 gap-4">
              <div
                v-for="goal in financeStore.topPriorityGoals"
                :key="goal.id"
                class="rounded-[28px] bg-(--color-light-blue-button) px-4 py-5 text-center text-white"
              >
                <div
                  class="mx-auto flex h-[100px] w-[100px] items-center justify-center rounded-full"
                  :style="{
                    background: `conic-gradient(#0040AA 0deg ${goal.progress * 3.6}deg, rgba(255,255,255,0.7) ${goal.progress * 3.6}deg 360deg)`,
                  }"
                >
                  <div
                    class="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-(--color-light-blue-button)"
                  >
                    <AppIcon :name="goal.icon" class="h-9 w-9" />
                  </div>
                </div>
                <p class="mt-3 text-[0.95rem] font-medium">{{ goal.label }}</p>
              </div>
            </div>
          </section>
        </div>

        <MobileBottomNav active="statistik" @navigate="handleNavigate" />
      </div>
    </section>
  </main>
</template>
