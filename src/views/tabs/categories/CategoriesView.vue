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
import type { CategoryIcon, CategoryItem } from '@/types/category'
import type { NavKey } from '@/types/navigation'

const router = useRouter()
const financeStore = useFinanceStore()
const { expenseCategories, balance, totalExpense, totalIncome } = storeToRefs(financeStore)

const isModalOpen = ref(false)
const isEditMode = ref(false)
const editCategoryId = ref('')
const newCategory = ref('')
const selectedIcon = ref<CategoryIcon>('stack')
const showDeleteConfirm = ref(false)

const iconOptions: Array<{ key: CategoryIcon; label: string }> = [
  { key: 'food', label: 'Makan' },
  { key: 'transport', label: 'Transport' },
  { key: 'groceries', label: 'Belanja' },
  { key: 'rent', label: 'Sewa' },
  { key: 'medicine', label: 'Obat' },
  { key: 'gift', label: 'Kado' },
  { key: 'ticket', label: 'Hiburan' },
  { key: 'car', label: 'Mobil' },
  { key: 'home', label: 'Rumah' },
  { key: 'plane', label: 'Pesawat' },
  { key: 'stack', label: 'Lainnya' },
]

type CategoryTile =
  | (CategoryItem & { active: boolean; more: false })
  | { slug: 'more'; label: string; icon: 'plus'; active: boolean; more: true }

const categoryTiles = computed<CategoryTile[]>(() => [
  ...expenseCategories.value.map((item) => ({
    ...item,
    active: item.slug === expenseCategories.value[0]?.slug,
    more: false as const,
  })),
  ...(financeStore.savingsCategory
    ? [{ ...financeStore.savingsCategory, active: false, more: false as const }]
    : []),
  { slug: 'more', label: 'Lainnya', icon: 'plus' as const, active: false, more: true },
])

const handleCategoryClick = (item: { slug: string; more?: boolean }) => {
  if (item.more) {
    openAddModal()
    return
  }
  router.push(`/categories/${item.slug}`)
}

const openAddModal = () => {
  isEditMode.value = false
  editCategoryId.value = ''
  newCategory.value = ''
  selectedIcon.value = 'stack'
  isModalOpen.value = true
}

const openEditModal = (item: { id: string; label: string; icon: CategoryIcon; slug: string }) => {
  if (item.slug === 'savings') return
  isEditMode.value = true
  editCategoryId.value = item.id
  newCategory.value = item.label
  selectedIcon.value = item.icon
  isModalOpen.value = true
}

const handleSave = async () => {
  if (isEditMode.value) {
    await financeStore.updateCategory(editCategoryId.value, { label: newCategory.value, icon: selectedIcon.value })
  } else {
    await financeStore.addCategory(newCategory.value, selectedIcon.value)
  }
  isModalOpen.value = false
  newCategory.value = ''
}

const handleDelete = async () => {
  await financeStore.deleteCategory(editCategoryId.value)
  showDeleteConfirm.value = false
  isModalOpen.value = false
}

const handleNavigate = (key: NavKey) => navigateByTab(router, key)
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)">
      <div class="px-6 pt-8 pb-7">
        <div class="flex items-center justify-between">
          <button type="button" class="text-(--color-shell-text)" @click="router.push('/home')">
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>

          <h1 class="text-2xl font-bold text-(--color-shell-text)">
            Kategori
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
          <div class="flex-1">
            <p class="mb-1 text-xs font-semibold text-(--color-shell-text)/78">
              Total Saldo
            </p>
            <h2 class="text-[28px] font-extrabold tracking-tight text-white">{{ formatCurrency(balance) }}</h2>
          </div>

          <div class="mx-4 h-10 w-[2px] bg-white/40" />

          <div class="flex-1">
            <p class="mb-1 text-xs font-semibold text-(--color-shell-text)/78">
              Total Keluar
            </p>
            <h2 class="text-[22px] font-extrabold tracking-tight text-(--color-shell-text)">
              -{{ formatCurrency(totalExpense) }}
            </h2>
          </div>
        </div>

        <div class="mt-6 flex h-[26px] w-full items-center overflow-hidden rounded-full text-[11px] font-bold">
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

        <p class="mt-3 flex items-center gap-2 text-xs font-semibold text-(--color-shell-text)/78">
          <span
            class="flex h-4 w-4 items-center justify-center rounded-[4px] border border-(--color-shell-text)/55 text-[10px]"
          >
            ✓
          </span>
          {{ totalIncome ? Math.min(100, Math.round((totalExpense / totalIncome) * 100)) : 0 }}% pengeluaran lu udah kepake.
        </p>
      </div>

      <div
        class="relative mt-2 flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-6 pt-8"
      >
        <div class="grid grid-cols-3 gap-x-5 gap-y-8 pb-28">
          <div
            v-for="item in categoryTiles"
            :key="item.label"
            class="relative flex flex-col items-center"
          >
            <button
              type="button"
              class="flex h-[96px] w-full items-center justify-center rounded-[24px] text-white transition"
              :class="
                item.active
                  ? 'bg-(--color-ocean-blue-button)'
                  : 'bg-(--color-light-blue-button)'
              "
              @click="handleCategoryClick(item)"
            >
              <AppIcon :name="item.icon" class="h-12 w-12" />
            </button>
            <button
              v-if="!item.more && item.slug !== 'savings'"
              type="button"
              class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-(--color-main-green) text-[0.7rem] font-bold text-(--color-background-dark-mode-and-letters) shadow"
              @click.stop="openEditModal(item)"
            >
              ✎
            </button>
            <span class="mt-2 text-[0.95rem] font-medium text-(--color-primary-text)">
              {{ item.label }}
            </span>
          </div>
        </div>

        <MobileBottomNav active="laporan" @navigate="handleNavigate" />
      </div>

      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,19,20,0.38)] px-10"
      >
        <div class="w-full max-w-80 rounded-[24px] bg-(--color-panel-background) px-7 py-8 text-center shadow-xl">
          <h2 class="text-[1.4rem] font-bold leading-tight text-(--color-primary-text)">
            {{ isEditMode ? 'Edit Kategori' : 'Kategori Baru' }}
          </h2>

          <input
            v-model="newCategory"
            type="text"
            placeholder="Tulis nama kategorinya..."
            class="mt-5 h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) placeholder:text-(--color-main-green) focus:outline-none"
          />

          <div class="mt-4 grid grid-cols-4 gap-2">
            <button
              v-for="icon in iconOptions"
              :key="icon.key"
              type="button"
              class="flex flex-col items-center gap-0.5 rounded-[12px] py-2 transition"
              :class="selectedIcon === icon.key ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'bg-(--color-input-background) text-(--color-primary-text)'"
              @click="selectedIcon = icon.key"
            >
              <AppIcon :name="icon.key" class="h-5 w-5" />
              <span class="text-[0.6rem]">{{ icon.label }}</span>
            </button>
          </div>

          <AppButton class="mt-5" full @click="handleSave">
            Simpan
          </AppButton>

          <AppButton v-if="isEditMode" class="mt-3" variant="soft" full @click="showDeleteConfirm = true">
            Hapus Kategori
          </AppButton>

          <AppButton class="mt-3" variant="soft" full @click="isModalOpen = false">
            Batal
          </AppButton>
        </div>
      </div>

      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,19,20,0.38)] px-10"
      >
        <div class="w-full max-w-76 rounded-[24px] bg-(--color-panel-background) px-7 py-8 text-center shadow-xl">
          <h2 class="text-[1.3rem] font-bold text-(--color-primary-text)">Hapus Kategori?</h2>
          <p class="mt-2 text-sm text-(--color-muted-text)">Transaksi di kategori ini tetap tersimpan.</p>
          <AppButton class="mt-5" full @click="handleDelete">Ya, Hapus</AppButton>
          <AppButton class="mt-3" variant="soft" full @click="showDeleteConfirm = false">Batal</AppButton>
        </div>
      </div>
    </section>
  </main>
</template>
