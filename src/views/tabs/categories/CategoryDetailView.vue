<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { navigateByTab } from '@/composables/useAppNavigation'
import { formatCurrency } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'
import type { NavKey } from '@/types/navigation'

const route = useRoute()
const router = useRouter()
const financeStore = useFinanceStore()
const { balance, totalExpense, totalIncome, savingsGoalViews } = storeToRefs(financeStore)

const categorySlug = computed(() => String(route.params.categorySlug ?? 'food'))
const category = computed(() => financeStore.categoryBySlug(categorySlug.value) ?? financeStore.expenseCategories[0])
const monthGroups = computed(() => financeStore.categoryGroups(categorySlug.value))
const activeMonthLabel = computed(() => monthGroups.value[0]?.month ?? 'Belum Ada Data')
const isSavingsCategory = computed(() => categorySlug.value === 'savings')
const activeGoalSlug = computed(() => String(route.query.goal ?? ''))
const activeGoal = computed(() =>
  financeStore.savingsGoalBySlug(activeGoalSlug.value) ?? savingsGoalViews.value[0],
)
const isSavingsGoalDetail = computed(
  () => isSavingsCategory.value && activeGoalSlug.value.length > 0,
)
const pageTitle = computed(() =>
  isSavingsGoalDetail.value ? activeGoal.value?.label : category.value?.label,
)

const handleNavigate = (key: NavKey) => navigateByTab(router, key)

const openSavingsGoal = (goalSlug: string) => {
  router.push(`/categories/savings?goal=${goalSlug}`)
}

const openAddSavings = () => {
  router.push('/categories/savings/add')
}

const openEditSavings = (slug: string) => {
  router.push(`/categories/savings/edit/${slug}`)
}

const handleBack = () => {
  if (isSavingsGoalDetail.value) {
    router.push('/categories/savings')
    return
  }

  router.push('/categories')
}
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section
      class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)"
    >
      <div class="px-6 pt-8" :class="isSavingsGoalDetail ? 'pb-4' : 'pb-6'">
        <div class="flex items-center justify-between">
          <button type="button" class="text-(--color-shell-text)" @click="handleBack">
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>

          <h1
            class="text-2xl font-bold text-(--color-shell-text)"
          >
            {{ pageTitle }}
          </h1>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-glass-surface) text-(--color-shell-text) backdrop-blur-md"
            @click="router.push('/notifications')"
          >
            <AppIcon name="bell" class="h-5 w-5" />
          </button>
        </div>

        <template v-if="!isSavingsGoalDetail">
          <div class="mt-8 flex items-center">
            <div class="flex-1 min-w-0">
              <p
                class="mb-1 text-xs font-semibold text-(--color-primary-text)"
              >
                Total Saldo
              </p>
              <h2
                class="whitespace-nowrap text-[22px] font-extrabold tracking-tight text-white"
              >
                {{ formatCurrency(balance) }}
              </h2>
            </div>

            <div class="mx-3 h-10 w-[2px] shrink-0 bg-white/40" />

            <div class="flex-1 min-w-0">
              <p
                class="mb-1 text-xs font-semibold text-(--color-primary-text)"
              >
                Total Keluar
              </p>
              <h2
                class="whitespace-nowrap text-[20px] font-extrabold tracking-tight text-(--color-ocean-blue-button)"
              >
                -{{ formatCurrency(totalExpense) }}
              </h2>
            </div>
          </div>

          <div
            class="mt-6 flex h-[26px] w-full items-center overflow-hidden rounded-full text-[11px] font-bold"
          >
            <div
              v-if="totalIncome ? Math.min(100, Math.round((totalExpense / totalIncome) * 100)) : 0"
              class="flex h-full items-center justify-center bg-(--color-dark-mode-green-black) text-white"
              :style="{ width: `${totalIncome ? Math.min(100, Math.round((totalExpense / totalIncome) * 100)) : 0}%` }"
            >
              {{ totalIncome ? Math.min(100, Math.round((totalExpense / totalIncome) * 100)) : 0 }}%
            </div>
            <div
              class="flex h-full flex-1 items-center justify-end bg-(--color-input-background) px-4 text-(--color-dark-mode-green-black)"
            >
              {{ formatCurrency(totalIncome) }}
            </div>
          </div>

          <p
            class="mt-3 flex items-center gap-2 text-xs font-semibold text-(--color-primary-text)"
          >
            <span
              class="flex h-4 w-4 items-center justify-center rounded-[4px] border border-(--color-primary-text) text-[10px]"
            >
              ✓
            </span>
            {{ totalIncome ? Math.min(100, Math.round((totalExpense / totalIncome) * 100)) : 0 }}% pengeluaran lu udah kepake.
          </p>
        </template>
      </div>

      <div
        class="relative flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-5"
        :class="isSavingsGoalDetail ? 'mt-4 pt-7' : 'mt-2 pt-6'"
      >
        <template v-if="isSavingsCategory && !activeGoalSlug">
          <div v-if="savingsGoalViews.length === 0" class="flex flex-col items-center py-12 text-center">
            <AppIcon name="savings" class="h-16 w-16 text-(--color-light-blue-button)" />
            <p class="mt-4 text-[1rem] font-semibold text-(--color-primary-text)">Belum ada target tabungan</p>
            <p class="mt-1 text-sm text-(--color-muted-text)/70">Yuk buat target pertama kamu!</p>
          </div>

          <div v-else class="grid grid-cols-3 gap-x-5 gap-y-8 pb-8">
            <div
              v-for="goal in savingsGoalViews"
              :key="goal.slug"
              class="relative flex flex-col items-center"
            >
              <button
                type="button"
                class="flex h-[96px] w-full items-center justify-center rounded-[24px] bg-(--color-light-blue-button) text-white transition"
                @click="openSavingsGoal(goal.slug)"
              >
                <AppIcon :name="goal.icon" class="h-12 w-12" />
              </button>
              <button
                type="button"
                class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-(--color-main-green) text-[0.7rem] font-bold text-(--color-background-dark-mode-and-letters) shadow"
                @click.stop="openEditSavings(goal.slug)"
              >
                ✎
              </button>
              <span class="mt-2 text-[0.95rem] font-medium text-(--color-primary-text)">
                {{ goal.label }}
              </span>
            </div>
          </div>

          <div class="flex-1 pb-26">
            <AppButton class="mx-auto mt-8" min-width="10rem" @click="openAddSavings">
              {{ savingsGoalViews.length === 0 ? 'Buat Target' : 'Tambah Target' }}
            </AppButton>
          </div>
        </template>

        <template v-else-if="isSavingsCategory">
          <div class="flex-1 overflow-y-auto pb-26">
            <div class="flex flex-col items-center pt-2">
              <div
                class="flex h-[140px] w-[140px] items-center justify-center rounded-[32px] bg-(--color-light-blue-button)"
              >
                <div
                  class="flex h-[110px] w-[110px] items-center justify-center rounded-full"
                  :style="{
                    background: `conic-gradient(#0040AA 0deg ${(activeGoal?.progress ?? 0) * 3.6}deg, rgba(255,255,255,0.7) ${(activeGoal?.progress ?? 0) * 3.6}deg 360deg)`,
                  }"
                >
                  <div class="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-(--color-light-blue-button) text-white">
                    <AppIcon :name="activeGoal?.icon ?? 'savings'" class="h-10 w-10" />
                  </div>
                </div>
              </div>
              <p class="mt-3 text-[0.95rem] font-medium text-(--color-primary-text)">{{ activeGoal?.label }}</p>
            </div>

            <div class="mt-6 rounded-[20px] bg-(--color-surface-background) p-5 space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-(--color-muted-text)">Target</span>
                <span class="text-sm font-bold text-(--color-primary-text)">{{ activeGoal?.targetAmount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-(--color-muted-text)">Terkumpul</span>
                <span class="text-sm font-bold text-(--color-main-green)">{{ activeGoal?.savedAmount }}</span>
              </div>
            </div>

            <div
              class="mt-5 flex h-[24px] w-full items-center overflow-hidden rounded-full text-[10px] font-bold"
            >
              <div
                v-if="(activeGoal?.progress ?? 0) > 0"
                class="flex h-full items-center justify-center bg-(--color-dark-mode-green-black) text-white"
                :style="{ width: `${activeGoal?.progress ?? 0}%` }"
              >
                {{ activeGoal?.progress ?? 0 }}%
              </div>
              <div
                class="flex h-full items-center justify-end bg-(--color-surface-background) px-4 text-(--color-main-green)"
                :style="{ width: `${100 - (activeGoal?.progress ?? 0)}%` }"
              >
                {{ activeGoal?.targetAmount }}
              </div>
            </div>

            <p
              class="mt-3 flex items-center gap-2 text-xs font-semibold text-(--color-primary-text)"
            >
              <span
                class="flex h-4 w-4 items-center justify-center rounded-[4px] border border-(--color-primary-text) text-[10px]"
              >
                ✓
              </span>
              {{ activeGoal?.progress ?? 0 }}% target lu udah kekumpul, lanjut gas.
            </p>

            <div class="mt-7 mb-4 flex items-center justify-between">
              <h2
                class="text-[1.1rem] font-medium text-(--color-primary-text)"
              >
                {{ activeGoal?.entries[0]?.time.split(' - ')[1] ?? 'Riwayat' }}
              </h2>

              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)"
                @click="router.push('/calendar')"
              >
                <AppIcon name="calendar" class="h-4.5 w-4.5" />
              </button>
            </div>

            <div class="flex flex-col gap-5">
              <div
                v-for="item in activeGoal?.entries ?? []"
                :key="item.title + item.time"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--color-light-blue-button) text-white shadow-sm"
                  >
                    <AppIcon :name="activeGoal?.icon ?? 'savings'" class="h-5 w-5" />
                  </div>

                  <div class="flex min-w-0 flex-col justify-center pr-1">
                    <p
                      class="truncate text-[0.88rem] font-bold text-(--color-primary-text)"
                    >
                      {{ item.title }}
                    </p>
                    <p
                      class="mt-[2px] whitespace-nowrap text-[10px] font-semibold tracking-tighter text-(--color-ocean-blue-button)"
                    >
                      {{ item.time }}
                    </p>
                  </div>
                </div>

                <p
                  class="whitespace-nowrap text-right text-[0.8rem] font-bold text-(--color-primary-text)"
                >
                  {{ item.amount }}
                </p>
              </div>
            </div>

            <AppButton
              class="mx-auto mt-8"
              min-width="10rem"
              @click="
                router.push(
                  `/categories/${category?.slug}/add?goal=${activeGoal?.slug}`,
                )
              "
            >
              Tambah Tabungan
            </AppButton>

            <AppButton
              class="mx-auto mt-3"
              variant="soft"
              min-width="10rem"
              @click="openEditSavings(activeGoal?.slug ?? '')"
            >
              Edit Target
            </AppButton>
          </div>
        </template>

        <template v-else>
          <div v-if="monthGroups.length > 0" class="mb-4 flex items-center justify-between">
            <h2
              class="text-[1.35rem] font-medium text-(--color-primary-text)"
            >
              {{ activeMonthLabel }}
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
            <div v-if="monthGroups.length === 0" class="flex flex-col items-center py-12 text-center">
              <AppIcon :name="category?.icon ?? 'stack'" class="h-16 w-16 text-(--color-light-blue-button)" />
              <p class="mt-4 text-[1rem] font-semibold text-(--color-primary-text)">Belum ada pengeluaran</p>
              <p class="mt-1 text-sm text-(--color-muted-text)/70">Catat pengeluaran pertama kamu di kategori ini.</p>
            </div>

            <template v-else>
              <template
                v-for="(group, groupIndex) in monthGroups"
                :key="group.month"
              >
                <h3
                  v-if="groupIndex > 0"
                  class="mt-7 mb-4 text-[1.1rem] font-medium text-(--color-primary-text)"
                >
                  {{ group.month }}
                </h3>

                <div class="flex flex-col gap-5">
                  <div
                    v-for="item in group.items"
                    :key="item.title + item.time"
                    class="flex items-center justify-between"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm bg-(--color-blue-button)"
                      >
                        <AppIcon :name="category?.icon ?? 'stack'" class="h-5 w-5" />
                      </div>

                      <div class="flex min-w-0 flex-col justify-center pr-1">
                        <p
                          class="truncate text-[0.88rem] font-bold text-(--color-primary-text)"
                        >
                          {{ item.title }}
                        </p>
                        <p
                          class="mt-[2px] whitespace-nowrap text-[10px] font-semibold tracking-tighter text-(--color-ocean-blue-button)"
                        >
                          {{ item.time }}
                        </p>
                      </div>
                    </div>

                    <p
                      class="whitespace-nowrap text-right text-[0.8rem] font-bold"
                      :class="
                        item.amount.startsWith('-')
                          ? 'text-(--color-ocean-blue-button)'
                          : 'text-(--color-primary-text)'
                      "
                    >
                      {{ item.amount }}
                    </p>
                  </div>
                </div>
              </template>
            </template>

            <AppButton
              class="mx-auto mt-8"
              min-width="10rem"
              @click="router.push(`/categories/${category?.slug}/add`)"
            >
              Tambah Pengeluaran
            </AppButton>
          </div>
        </template>

        <MobileBottomNav active="laporan" @navigate="handleNavigate" />
      </div>
    </section>
  </main>
</template>
