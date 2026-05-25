<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { navigateByTab } from '@/composables/useAppNavigation'
import { formatCurrency } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'
import type { NavKey } from '@/types/navigation'
import type { TransactionMode } from '@/types/transaction'

const router = useRouter()
const activeMode = ref<TransactionMode>('all')
const financeStore = useFinanceStore()
const { incomeGroups, expenseGroups, allGroups, balance, totalIncome, totalExpense } = storeToRefs(financeStore)

const currentGroups = computed(() => {
  if (activeMode.value === 'income') return incomeGroups.value
  if (activeMode.value === 'expense') return expenseGroups.value
  return allGroups.value
})

const handleNavigate = (key: NavKey) => navigateByTab(router, key)
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section
      class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)"
    >
      <div class="px-6 pt-8 pb-5">
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
            Transaksi
          </h1>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-glass-surface) text-(--color-shell-text) backdrop-blur-md"
            @click="router.push('/notifications')"
          >
            <AppIcon name="bell" class="h-5 w-5" />
          </button>
        </div>

        <div
          class="mt-7 rounded-[18px] bg-(--color-panel-background) px-5 py-3.5 text-center"
        >
          <p
            class="text-[0.95rem] font-medium text-(--color-primary-text)"
          >
            Sisa Duit Lu
          </p>
          <p
            class="mt-1 whitespace-nowrap text-[1.9rem] font-bold leading-none text-(--color-primary-text)"
          >
            {{ formatCurrency(balance) }}
          </p>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-3.5">
          <button
            type="button"
            class="rounded-[18px] px-3 py-3.5 text-center transition"
            :class="
              activeMode === 'income'
                ? 'bg-(--color-ocean-blue-button) text-white'
                : 'bg-(--color-panel-background) text-(--color-primary-text)'
            "
            @click="activeMode = 'income'"
          >
            <div class="mx-auto flex h-7 w-7 items-center justify-center">
              <AppIcon name="income" class="h-6 w-6" />
            </div>
            <p class="mt-1.5 text-[0.85rem]">Duit Masuk</p>
            <p class="whitespace-nowrap text-[0.9rem] font-bold">
              {{ formatCurrency(totalIncome) }}
            </p>
          </button>

          <button
            type="button"
            class="rounded-[18px] px-3 py-3.5 text-center transition"
            :class="
              activeMode === 'expense'
                ? 'bg-(--color-ocean-blue-button) text-white'
                : 'bg-(--color-panel-background) text-(--color-primary-text)'
            "
            @click="activeMode = 'expense'"
          >
            <div class="mx-auto flex h-7 w-7 items-center justify-center">
              <AppIcon name="expense" class="h-6 w-6" />
            </div>
            <p class="mt-1.5 text-[0.85rem]">Duit Keluar</p>
            <p
              class="whitespace-nowrap text-[0.9rem] font-bold"
              :class="
                activeMode === 'expense'
                  ? 'text-white'
                  : 'text-(--color-ocean-blue-button)'
              "
            >
              -{{ formatCurrency(totalExpense) }}
            </p>
          </button>
        </div>
      </div>

      <div
        class="relative mt-2 flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-5 pt-6"
      >
        <div v-if="currentGroups.length > 0" class="mb-4 flex items-center justify-between">
          <h2
            class="text-[1.35rem] font-medium text-(--color-primary-text)"
          >
            {{ currentGroups[0]?.month }}
          </h2>

          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)"
            @click="router.push('/calendar')"
          >
            <AppIcon name="calendar" class="h-4.5 w-4.5" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto pb-26">
          <div v-if="currentGroups.length === 0" class="flex flex-col items-center py-12 text-center">
            <AppIcon name="layers" class="h-16 w-16 text-(--color-light-blue-button)" />
            <p class="mt-4 text-[1rem] font-semibold text-(--color-primary-text)">Belum ada transaksi</p>
            <p class="mt-1 text-sm text-(--color-muted-text)/70">Mulai catat pemasukan atau pengeluaran kamu.</p>
          </div>
          <section
            v-for="(group, index) in currentGroups"
            :key="group.month"
            class="mb-6"
          >
            <h3
              v-if="index > 0"
              class="mb-3 text-[1.35rem] font-medium text-(--color-primary-text)"
            >
              {{ group.month }}
            </h3>

            <div class="flex flex-col gap-5">
              <button
                v-for="item in group.items"
                :key="`${group.month}-${item.id}`"
                type="button"
                class="flex w-full items-center gap-2"
                @click="router.push(`/transaction/${item.id}`)"
              >
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                  :style="{ backgroundColor: item.iconBg }"
                >
                  <AppIcon :name="item.icon" class="h-5 w-5" />
                </div>

                <div class="flex min-w-0 flex-1 flex-col justify-center pr-1">
                  <p
                    class="truncate text-left text-[0.85rem] font-bold text-(--color-primary-text)"
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
                      item.amount.startsWith('-')
                        ? 'text-(--color-ocean-blue-button)'
                        : 'text-(--color-primary-text)'
                    "
                  >
                    {{ item.amount }}
                  </p>
                </div>
              </button>
            </div>
          </section>

          <div class="mt-8 flex justify-center">
            <AppButton
              min-width="11rem"
              @click="router.push(activeMode === 'income' ? '/transaction/add-balance' : '/categories')"
            >
              {{ activeMode === 'income' ? 'Tambah Saldo' : 'Tambah Pengeluaran' }}
            </AppButton>
          </div>
        </div>

        <MobileBottomNav active="transfer" @navigate="handleNavigate" />
      </div>
    </section>
  </main>
</template>
