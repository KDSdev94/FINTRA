<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import { calendarDays, type CalendarViewMode } from '@/data/analysis/calendar'
import { toTransactionItem } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'

const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()
const currentDate = now.getDate()
const financeStore = useFinanceStore()
const { latestTransactions } = storeToRefs(financeStore)

const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]

const activeView = ref<CalendarViewMode>('spends')
const selectedYear = ref(currentYear)
const selectedMonth = ref(currentMonth)
const selectedDate = ref(currentDate)
const isMonthMenuOpen = ref(false)
const isYearMenuOpen = ref(false)

const transactionItems = computed(() => latestTransactions.value.map(toTransactionItem))

const availableYears = Array.from(
  new Set(transactionItems.value.map((item) => new Date(item.transactionAt).getFullYear()).concat(currentYear)),
).sort((a, b) => a - b)

const yearOptions = computed(() => {
  const minYear = Math.min(...availableYears) - 2
  const maxYear = Math.max(...availableYears) + 2

  return Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index)
})

const selectedMonthLabel = computed(() => monthNames[selectedMonth.value])

const daysInMonth = computed(
  () => new Date(selectedYear.value, selectedMonth.value + 1, 0).getDate(),
)

const firstWeekday = computed(() => {
  const day = new Date(selectedYear.value, selectedMonth.value, 1).getDay()
  return (day + 6) % 7
})

const calendarCells = computed(() => {
  const leadingEmptyCells = Array.from({ length: firstWeekday.value }, () => null)
  const dateCells = Array.from({ length: daysInMonth.value }, (_, index) => index + 1)
  const cells = [...leadingEmptyCells, ...dateCells]

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
})

const filteredSpendItems = computed(() =>
  transactionItems.value.filter((item) => {
    const date = new Date(item.transactionAt)
    return (
      date.getFullYear() === selectedYear.value &&
      date.getMonth() === selectedMonth.value &&
      date.getDate() === selectedDate.value
    )
  }),
)

const selectedDateLabel = computed(
  () =>
    `${selectedDate.value} ${monthNames[selectedMonth.value]} ${selectedYear.value}`,
)

const categoryLegend = computed(() => {
  const counts = new Map<string, { label: string; color: string; total: number }>()

  for (const item of filteredSpendItems.value) {
    const existing = counts.get(item.category) ?? {
      label: item.category,
      color: item.expense ? '#0068FF' : '#3C8FE8',
      total: 0,
    }
    existing.total += 1
    counts.set(item.category, existing)
  }

  return Array.from(counts.values())
})

const goToPreviousMonth = () => {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11
    selectedYear.value -= 1
    return
  }

  selectedMonth.value -= 1
}

const goToNextMonth = () => {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0
    selectedYear.value += 1
    return
  }

  selectedMonth.value += 1
}

const selectMonth = (monthIndex: number) => {
  selectedMonth.value = monthIndex
  isMonthMenuOpen.value = false
}

const selectYear = (year: number) => {
  selectedYear.value = year
  isYearMenuOpen.value = false
}

const toggleMonthMenu = () => {
  isMonthMenuOpen.value = !isMonthMenuOpen.value
  if (isMonthMenuOpen.value) {
    isYearMenuOpen.value = false
  }
}

const toggleYearMenu = () => {
  isYearMenuOpen.value = !isYearMenuOpen.value
  if (isYearMenuOpen.value) {
    isMonthMenuOpen.value = false
  }
}

const isToday = (date: number | null) =>
  date !== null &&
  selectedYear.value === currentYear &&
  selectedMonth.value === currentMonth &&
  date === currentDate

watch([selectedMonth, selectedYear], () => {
  if (selectedDate.value > daysInMonth.value) {
    selectedDate.value = daysInMonth.value
  }

  isMonthMenuOpen.value = false
  isYearMenuOpen.value = false
})
</script>

<template>
  <MobilePageShell
    title="Kalender"
    active-nav="laporan"
    header-class="px-5 pt-8 pb-5"
    panel-inner-class="flex flex-1 flex-col px-5 pt-7 pb-28"
  >
    <div @click.self="isMonthMenuOpen = false; isYearMenuOpen = false">
      <div class="relative flex items-center justify-between gap-3 px-3">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-segmented-background) text-(--color-main-green) transition hover:bg-(--color-input-background)"
          @click="goToPreviousMonth"
        >
          <AppIcon name="arrow-left" class="h-4 w-4" />
        </button>

        <div class="flex items-center gap-2">
          <div class="relative">
            <button
              type="button"
              class="flex h-11 min-w-[8.5rem] items-center justify-between rounded-full bg-(--color-segmented-background) px-4 text-[1.02rem] font-semibold text-(--color-main-green) shadow-sm"
              @click.stop="toggleMonthMenu"
            >
              {{ selectedMonthLabel }}
              <AppIcon
                name="chevron-down"
                class="h-4 w-4 transition"
                :class="isMonthMenuOpen ? 'rotate-180' : ''"
              />
            </button>

            <div
              v-if="isMonthMenuOpen"
              class="absolute top-13 left-0 z-20 w-[15rem] rounded-[1.35rem] bg-(--color-panel-background) p-3 shadow-[0_18px_45px_rgba(3,19,20,0.14)]"
            >
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="(monthName, index) in monthNames"
                  :key="monthName"
                  type="button"
                  class="rounded-2xl px-2 py-2 text-[0.82rem] font-medium transition"
                  :class="
                    index === selectedMonth
                      ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)'
                      : 'bg-(--color-input-background) text-(--color-input-text)'
                  "
                  @click.stop="selectMonth(index)"
                >
                  {{ monthName.slice(0, 3) }}
                </button>
              </div>
            </div>
          </div>

          <div class="relative">
            <button
              type="button"
              class="flex h-11 min-w-[6.4rem] items-center justify-between rounded-full bg-(--color-segmented-background) px-4 text-[1.02rem] font-semibold text-(--color-main-green) shadow-sm"
              @click.stop="toggleYearMenu"
            >
              {{ selectedYear }}
              <AppIcon
                name="chevron-down"
                class="h-4 w-4 transition"
                :class="isYearMenuOpen ? 'rotate-180' : ''"
              />
            </button>

            <div
              v-if="isYearMenuOpen"
              class="absolute top-13 right-0 z-20 flex max-h-56 w-[7rem] flex-col gap-2 overflow-y-auto rounded-[1.35rem] bg-(--color-panel-background) p-3 shadow-[0_18px_45px_rgba(3,19,20,0.14)]"
            >
              <button
                v-for="year in yearOptions"
                :key="year"
                type="button"
                class="rounded-2xl px-2 py-2 text-[0.9rem] font-medium transition"
                :class="
                  year === selectedYear
                    ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)'
                    : 'bg-(--color-input-background) text-(--color-input-text)'
                "
                @click.stop="selectYear(year)"
              >
                {{ year }}
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-segmented-background) text-(--color-main-green) transition hover:bg-(--color-input-background)"
          @click="goToNextMonth"
        >
          <AppIcon name="arrow-left" class="h-4 w-4 rotate-180" />
        </button>
      </div>

      <div
        class="mx-auto mt-8 mb-10 grid w-full max-w-lg gap-x-2 gap-y-7 px-2 text-center"
        style="grid-template-columns: repeat(7, minmax(0, 1fr))"
      >
        <span
          v-for="day in calendarDays"
          :key="day"
          class="text-[0.85rem] font-medium text-(--color-ocean-blue-button)"
        >
          {{ day }}
        </span>

        <button
          v-for="(date, index) in calendarCells"
          :key="`${selectedYear}-${selectedMonth}-${index}`"
          type="button"
          class="flex h-9 items-center justify-center rounded-full border text-[1rem] font-medium transition"
          :class="
            date === null
              ? 'pointer-events-none opacity-0'
              : date === selectedDate && isToday(date)
                ? 'border-(--color-main-green) bg-(--color-main-green) text-(--color-background-dark-mode-and-letters) shadow-[0_0_0_2px_rgba(0,208,158,0.2)]'
                : date === selectedDate
                  ? 'border-(--color-main-green) bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)'
                  : isToday(date)
                    ? 'border-(--color-main-green) bg-(--color-input-background) text-(--color-main-green)'
                    : 'border-transparent text-(--color-primary-text)'
          "
          @click="date && (selectedDate = date)"
        >
          {{ date }}
        </button>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-3.5">
        <button
          type="button"
          class="h-11 rounded-full text-[0.95rem] font-medium transition"
          :class="
            activeView === 'spends'
              ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters) shadow-sm'
              : 'bg-(--color-soft-button-background) text-(--color-soft-button-text)'
          "
          @click="activeView = 'spends'"
        >
          Pengeluaran
        </button>

        <button
          type="button"
          class="h-11 rounded-full text-[0.95rem] font-medium transition"
          :class="
            activeView === 'categories'
              ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters) shadow-sm'
              : 'bg-(--color-soft-button-background) text-(--color-soft-button-text)'
          "
          @click="activeView = 'categories'"
        >
          Kategori
        </button>
      </div>

      <div v-if="activeView === 'spends'" class="mt-8 flex flex-col gap-5">
        <p
          class="text-[0.92rem] font-medium text-(--color-muted-text)/85"
        >
          Transaksi buat {{ selectedDateLabel }}
        </p>

        <div
          v-for="item in filteredSpendItems"
          :key="item.title + item.time"
          class="flex w-full items-center gap-2"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
            :style="{ backgroundColor: item.iconBg }"
          >
            <AppIcon :name="item.icon" class="h-5 w-5" />
          </div>
          <div class="flex min-w-0 flex-1 flex-col justify-center pr-1">
            <p
              class="truncate text-[0.85rem] font-bold text-(--color-background-dark-mode-and-letters)"
            >
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
              class="w-full text-center text-[10px] font-medium text-(--color-muted-text)/80"
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
                  : 'text-(--color-background-dark-mode-and-letters)'
              "
            >
              {{ item.amount }}
            </p>
          </div>
        </div>

        <div
          v-if="filteredSpendItems.length === 0"
          class="rounded-[1.6rem] bg-(--color-surface-background) px-5 py-6 text-center"
        >
          <p class="text-[1rem] font-semibold text-(--color-primary-text)">
            Belum ada transaksi
          </p>
          <p
            class="mt-1 text-[0.86rem] text-(--color-muted-text)/85"
          >
            Tanggal ini masih santai, belum ada duit yang masuk atau cabut.
          </p>
        </div>
      </div>

      <div v-else class="mt-10">
        <div class="mx-auto flex w-full max-w-[260px] justify-center">
          <svg
            viewBox="0 0 240 150"
            class="h-[170px] w-[240px]"
            aria-hidden="true"
          >
            <path d="M120 120 L120 10 A110 110 0 0 1 228 143 Z" fill="#3C8FE8" />
            <path d="M120 120 L228 143 A110 110 0 0 1 14 143 Z" fill="#0068FF" />
            <path d="M120 120 L14 143 A110 110 0 0 1 120 10 Z" fill="#6DB6FE" />

            <path d="M120 120 L120 10" stroke="#F1FFF3" stroke-width="4" />
            <path d="M120 120 L228 143" stroke="#F1FFF3" stroke-width="4" />
            <path d="M120 120 L14 143" stroke="#F1FFF3" stroke-width="4" />

            <text x="164" y="72" fill="white" font-size="18" font-weight="700">{{ categoryLegend[0] ? Math.round((categoryLegend[0].total / Math.max(filteredSpendItems.length, 1)) * 100) : 0 }}%</text>
            <text x="80" y="50" fill="white" font-size="16" font-weight="700">{{ categoryLegend[1] ? Math.round((categoryLegend[1].total / Math.max(filteredSpendItems.length, 1)) * 100) : 0 }}%</text>
            <text x="45" y="92" fill="white" font-size="18" font-weight="700">{{ categoryLegend[2] ? Math.round((categoryLegend[2].total / Math.max(filteredSpendItems.length, 1)) * 100) : 0 }}%</text>
          </svg>
        </div>

        <div class="mt-3 flex items-center justify-center gap-8">
          <div
            v-for="legend in categoryLegend"
            :key="legend.label"
            class="flex items-center gap-2"
          >
            <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: legend.color }" />
            <span
              class="text-[0.96rem] font-medium text-(--color-primary-text)"
            >
              {{ legend.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </MobilePageShell>
</template>
