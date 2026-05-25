<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import { formatCurrency, formatDateTimeLabel } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'

const { transactions } = storeToRefs(useFinanceStore())

const notificationGroups = computed(() => {
  const now = new Date()
  const today = now.toDateString()
  const yesterday = new Date(now.getTime() - 86400000).toDateString()

  const groups: Array<{ label: string; items: Array<{ title: string; subtitle: string; meta?: string; time: string; icon: 'bell' | 'savings' | 'arrows' | 'settings' }> }> = []
  const buckets = new Map<string, typeof groups[0]['items']>()

  for (const t of transactions.value.slice(0, 20)) {
    const d = new Date(t.transactionAt)
    const ds = d.toDateString()
    let label: string
    if (ds === today) label = 'Hari Ini'
    else if (ds === yesterday) label = 'Kemarin'
    else label = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })

    const icon = t.transactionType === 'income' ? 'arrows' as const : t.transactionType === 'saving' ? 'savings' as const : 'bell' as const
    const typeLabel = t.transactionType === 'income' ? 'Pemasukan' : t.transactionType === 'saving' ? 'Tabungan' : 'Pengeluaran'

    const item = {
      title: typeLabel,
      subtitle: t.title,
      meta: `${t.categoryLabel} | ${t.transactionType === 'expense' ? '-' : ''}${formatCurrency(t.amount)}`,
      time: formatDateTimeLabel(t.transactionAt),
      icon,
    }

    const existing = buckets.get(label) ?? []
    existing.push(item)
    buckets.set(label, existing)
  }

  for (const [label, items] of buckets) {
    groups.push({ label, items })
  }

  return groups
})
</script>

<template>
  <MobilePageShell
    title="Notifikasi"
    active-nav="home"
    panel-inner-class="flex flex-1 flex-col px-6 pt-8 pb-28"
  >
    <div class="flex-1 overflow-y-auto">
      <div v-if="notificationGroups.length === 0" class="flex flex-col items-center py-12 text-center">
        <AppIcon name="bell" class="h-14 w-14 text-(--color-light-blue-button)" />
        <p class="mt-4 text-[1rem] font-semibold text-(--color-primary-text)">Belum ada notifikasi</p>
        <p class="mt-1 text-sm text-(--color-muted-text)/70">Notifikasi akan muncul saat ada transaksi baru.</p>
      </div>

      <section
        v-for="group in notificationGroups"
        :key="group.label"
        class="mb-7"
      >
        <h2 class="mb-4 text-[0.88rem] font-medium text-(--color-primary-text)">
          {{ group.label }}
        </h2>

        <div
          v-for="(item, idx) in group.items"
          :key="idx"
          class="border-b border-[rgba(0,208,158,0.35)] py-4 last:border-b-0"
        >
          <div class="flex items-start gap-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)">
              <AppIcon :name="item.icon" class="h-5 w-5" />
            </div>

            <div class="min-w-0 flex-1">
              <p class="text-[1rem] font-semibold text-(--color-primary-text)">
                {{ item.title }}
              </p>
              <p class="mt-1 text-[0.75rem] leading-4 text-(--color-muted-text)/85">
                {{ item.subtitle }}
              </p>
              <p
                v-if="item.meta"
                class="mt-1 text-[0.72rem] font-semibold text-(--color-ocean-blue-button)"
              >
                {{ item.meta }}
              </p>
            </div>
          </div>
          <p class="mt-2 text-right text-[0.72rem] text-(--color-ocean-blue-button)">
            {{ item.time }}
          </p>
        </div>
      </section>
    </div>
  </MobilePageShell>
</template>
