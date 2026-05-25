<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { toTransactionItem } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'

type Mode = 'income' | 'expense'

const activeReport = ref<Mode>('expense')
const search = ref('')
const selectedCategory = ref('')
const selectedDate = ref('')
const financeStore = useFinanceStore()
const { latestTransactions, expenseCategories } = storeToRefs(financeStore)

const filteredItems = computed(() =>
  latestTransactions.value
    .filter((item) => (activeReport.value === 'income' ? item.transactionType === 'income' : item.transactionType === 'expense'))
    .filter((item) => (selectedCategory.value ? item.categorySlug === selectedCategory.value : true))
    .filter((item) => (selectedDate.value ? item.transactionAt.startsWith(selectedDate.value) : true))
    .filter((item) => {
      if (!search.value.trim()) {
        return true
      }

      const query = search.value.toLowerCase()
      return (
        item.title.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.note.toLowerCase().includes(query)
      )
    })
    .map(toTransactionItem),
)
</script>

<template>
  <MobilePageShell
    title="Cari"
    back-to=""
    active-nav="statistik"
    header-class="px-5 pt-8 pb-5"
    panel-inner-class="flex flex-1 flex-col px-5 pt-7 pb-28"
  >
    <template #header-extra>
      <div class="mt-7">
        <input
          v-model="search"
          type="text"
          placeholder="Cari transaksi..."
          class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) placeholder:text-(--color-muted-text)/65 focus:outline-none"
        />
      </div>
    </template>

    <div>
      <div>
        <h2 class="text-[1.2rem] font-medium text-(--color-primary-text)">
          Kategori
        </h2>
        <select
          v-model="selectedCategory"
          class="mt-3 flex h-11 w-full items-center justify-between rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text)/65 focus:outline-none"
        >
          <option value="">Semua kategori</option>
          <option v-for="category in expenseCategories" :key="category.id" :value="category.slug">
            {{ category.label }}
          </option>
        </select>
      </div>

      <div class="mt-7">
        <h2 class="text-[1.2rem] font-medium text-(--color-primary-text)">
          Tanggal
        </h2>
        <input
          v-model="selectedDate"
          type="date"
          class="mt-3 h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
        />
      </div>

      <div class="mt-8">
        <h2 class="text-[1.2rem] font-medium text-(--color-primary-text)">
          Jenis Catatan
        </h2>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <button
            type="button"
            class="flex items-center gap-3 text-[0.95rem] text-(--color-primary-text)"
            @click="activeReport = 'income'"
          >
            <span
              class="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-(--color-main-green)"
            >
              <span
                v-if="activeReport === 'income'"
                class="h-3 w-3 rounded-full bg-(--color-main-green)"
              />
            </span>
            Pemasukan
          </button>

          <button
            type="button"
            class="flex items-center gap-3 text-[0.95rem] text-(--color-primary-text)"
            @click="activeReport = 'expense'"
          >
            <span
              class="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-(--color-main-green)"
            >
              <span
                v-if="activeReport === 'expense'"
                class="h-3 w-3 rounded-full bg-(--color-main-green)"
              />
            </span>
            Pengeluaran
          </button>
        </div>
      </div>

      <AppButton class="mx-auto mt-10" min-width="10.5rem">
        Cari
      </AppButton>

      <div
        v-if="filteredItems[0]"
        class="mt-12 rounded-[18px] bg-(--color-surface-background) px-4 py-3.5"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full text-white"
              :style="{ backgroundColor: filteredItems[0].iconBg }"
            >
              <AppIcon :name="filteredItems[0].icon" class="h-6 w-6" />
            </div>

            <div>
              <p class="text-[1.05rem] font-semibold text-(--color-primary-text)">
                {{ filteredItems[0].title }}
              </p>
              <p class="text-[0.82rem] font-semibold text-(--color-ocean-blue-button)">
                {{ filteredItems[0].time }}
              </p>
            </div>
          </div>

          <p
            class="text-[1rem] font-bold"
            :class="filteredItems[0].expense ? 'text-(--color-ocean-blue-button)' : 'text-(--color-primary-text)'"
          >
            {{ filteredItems[0].amount }}
          </p>
        </div>
      </div>

      <p v-else class="mt-12 text-center text-sm font-medium text-(--color-muted-text)/80">
        Belum ada transaksi yang cocok.
      </p>
    </div>
  </MobilePageShell>
</template>
