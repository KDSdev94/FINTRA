<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppIcon from '@/components/icons/AppIcon.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { formatCurrency, parseCurrencyInput } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'
import type { CategoryIcon } from '@/types/category'

const route = useRoute()
const router = useRouter()
const financeStore = useFinanceStore()

const goalSlug = computed(() => String(route.params.goalSlug ?? ''))
const isEdit = computed(() => goalSlug.value.length > 0)
const existingGoal = computed(() => financeStore.savingsGoals.find((g) => g.slug === goalSlug.value))

const label = ref('')
const targetAmount = ref('')
const selectedIcon = ref<CategoryIcon>('car')
const selectedPriority = ref(0)
const saving = ref(false)
const showDeleteConfirm = ref(false)
const errorMessage = ref('')

const iconOptions: Array<{ key: CategoryIcon; label: string }> = [
  { key: 'car', label: 'Mobil' },
  { key: 'home', label: 'Rumah' },
  { key: 'plane', label: 'Pesawat' },
  { key: 'wedding', label: 'Nikahan' },
  { key: 'savings', label: 'Celengan' },
  { key: 'gift', label: 'Kado' },
  { key: 'ticket', label: 'Tiket' },
  { key: 'food', label: 'Makan' },
  { key: 'transport', label: 'Transport' },
  { key: 'medicine', label: 'Obat' },
  { key: 'groceries', label: 'Belanja' },
  { key: 'rent', label: 'Sewa' },
  { key: 'stack', label: 'Lainnya' },
]

watchEffect(() => {
  if (existingGoal.value) {
    label.value = existingGoal.value.label
    targetAmount.value = String(existingGoal.value.target_amount)
    selectedIcon.value = existingGoal.value.icon
    selectedPriority.value = existingGoal.value.priority
  }
})

const handleSave = async () => {
  if (saving.value) return
  errorMessage.value = ''

  if (!label.value.trim()) {
    errorMessage.value = 'Nama target belum diisi.'
    return
  }

  const parsed = parseCurrencyInput(targetAmount.value)
  if (!parsed) {
    errorMessage.value = 'Nominal target belum valid.'
    return
  }

  saving.value = true

  if (isEdit.value) {
    await financeStore.updateSavingsGoal(existingGoal.value!.id, {
      label: label.value.trim(),
      icon: selectedIcon.value,
      targetAmount: parsed,
      priority: selectedPriority.value,
    })
  } else {
    await financeStore.addSavingsGoal({
      label: label.value.trim(),
      icon: selectedIcon.value,
      targetAmount: parsed,
      priority: selectedPriority.value,
    })
  }

  router.push('/categories/savings')
}

const handleDelete = async () => {
  if (!existingGoal.value) return
  await financeStore.deleteSavingsGoal(existingGoal.value.id)
  router.push('/categories/savings')
}
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)">
      <div class="px-6 pt-8 pb-6">
        <div class="flex items-center justify-between">
          <button type="button" class="text-(--color-shell-text)" @click="router.push('/categories/savings')">
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>
          <h1 class="text-2xl font-bold text-(--color-shell-text)">
            {{ isEdit ? 'Edit Target' : 'Target Baru' }}
          </h1>
          <div class="h-10 w-10" />
        </div>
      </div>

      <div class="relative flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-6 pt-7">
        <div class="space-y-6 pb-28">
          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Nama Target</label>
            <input
              v-model="label"
              type="text"
              placeholder="Contoh: Nabung Buat Rubicon"
              class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) placeholder:text-(--color-muted-text)/50 focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Target Nominal</label>
            <input
              v-model="targetAmount"
              type="text"
              placeholder="850000000"
              class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) placeholder:text-(--color-muted-text)/50 focus:outline-none"
            />
            <p class="mt-1 text-xs text-(--color-muted-text)/80">Preview: {{ formatCurrency(parseCurrencyInput(targetAmount)) }}</p>
          </div>

          <div>
            <label class="mb-3 block text-[0.95rem] font-medium text-(--color-primary-text)">Pilih Icon</label>
            <div class="grid grid-cols-4 gap-3">
              <button
                v-for="icon in iconOptions"
                :key="icon.key"
                type="button"
                class="flex flex-col items-center gap-1 rounded-[16px] py-3 transition"
                :class="selectedIcon === icon.key ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'bg-(--color-input-background) text-(--color-primary-text)'"
                @click="selectedIcon = icon.key"
              >
                <AppIcon :name="icon.key" class="h-7 w-7" />
                <span class="text-[0.7rem] font-medium">{{ icon.label }}</span>
              </button>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">Prioritas</label>
            <div class="grid grid-cols-3 gap-2 rounded-[18px] bg-(--color-nav-background) p-1.5">
              <button
                type="button"
                class="rounded-[14px] py-2.5 text-[0.85rem] font-semibold transition"
                :class="selectedPriority === 1 ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'text-(--color-primary-text)/75'"
                @click="selectedPriority = 1"
              >
                Utama
              </button>
              <button
                type="button"
                class="rounded-[14px] py-2.5 text-[0.85rem] font-semibold transition"
                :class="selectedPriority === 2 ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'text-(--color-primary-text)/75'"
                @click="selectedPriority = 2"
              >
                Sub
              </button>
              <button
                type="button"
                class="rounded-[14px] py-2.5 text-[0.85rem] font-semibold transition"
                :class="selectedPriority === 0 ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'text-(--color-primary-text)/75'"
                @click="selectedPriority = 0"
              >
                Biasa
              </button>
            </div>
          </div>

          <p v-if="errorMessage" class="text-center text-sm font-medium text-(--color-ocean-blue-button)">
            {{ errorMessage }}
          </p>

          <AppButton full :loading="saving" @click="handleSave">
            {{ isEdit ? 'Simpan Perubahan' : 'Buat Target' }}
          </AppButton>

          <AppButton v-if="isEdit" variant="soft" full @click="showDeleteConfirm = true">
            Hapus Target
          </AppButton>
        </div>

        <!-- Delete confirmation -->
        <div
          v-if="showDeleteConfirm"
          class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,19,20,0.38)] px-10"
        >
          <div class="w-full max-w-76 rounded-[24px] bg-(--color-panel-background) px-7 py-8 text-center shadow-xl">
            <h2 class="text-[1.3rem] font-bold text-(--color-primary-text)">Hapus Target?</h2>
            <p class="mt-2 text-sm text-(--color-muted-text)">Target dan riwayat tabungannya akan tetap ada.</p>
            <AppButton class="mt-5" full @click="handleDelete">Ya, Hapus</AppButton>
            <AppButton class="mt-3" variant="soft" full @click="showDeleteConfirm = false">Batal</AppButton>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
