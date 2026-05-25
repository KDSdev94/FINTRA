<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { navigateByTab } from '@/composables/useAppNavigation'
import { parseCurrencyInput } from '@/lib/finance'
import { useFinanceStore } from '@/stores/finance'
import type { NavKey } from '@/types/navigation'
import type { SourceType } from '@/types/transaction'

type BalanceSource = SourceType

const router = useRouter()
const financeStore = useFinanceStore()
const activeSource = ref<BalanceSource>('bank')
const selectedAccount = ref('BCA')
const amount = ref('')
const date = ref(new Date().toISOString().slice(0, 10))
const note = ref('')
const title = ref('')
const errorMessage = ref('')
const saving = ref(false)

const sourceOptions: Array<{ key: BalanceSource; label: string }> = [
  { key: 'bank', label: 'Bank' },
  { key: 'ewallet', label: 'E-Wallet' },
  { key: 'cash', label: 'Tunai' },
]

const accountOptions = computed(() => {
  if (activeSource.value === 'bank') {
    return ['BCA', 'Mandiri', 'BRI', 'BNI', 'BSI', 'CIMB Niaga', 'Danamon', 'Permata', 'OCBC NISP', 'Mega', 'BTN', 'Sea Bank', 'Jago', 'Blu by BCA', 'Neo Commerce', 'Allo Bank', 'Bank Muamalat', 'Jenius (BTPN)']
  }

  if (activeSource.value === 'ewallet') {
    return ['GoPay', 'OVO', 'DANA', 'ShopeePay', 'LinkAja', 'Sakuku', 'i.saku', 'DOKU', 'Kredivo', 'Akulaku']
  }

  return ['Dompet Utama', 'Kas Harian', 'Uang Jajan']
})

const applySource = (source: BalanceSource) => {
  activeSource.value = source
  selectedAccount.value = accountOptions.value[0]
}

const handleNavigate = (key: NavKey) => navigateByTab(router, key)

const handleSave = async () => {
  if (saving.value) return
  errorMessage.value = ''

  const parsedAmount = parseCurrencyInput(amount.value)
  if (!parsedAmount) {
    errorMessage.value = 'Nominal belum valid.'
    return
  }

  saving.value = true
  await financeStore.addIncome({
    title: title.value,
    note: note.value,
    amount: parsedAmount,
    sourceType: activeSource.value,
    accountName: selectedAccount.value,
    transactionAt: new Date(`${date.value}T12:00:00`).toISOString(),
  })

  router.push('/transaction')
}
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)">
      <div class="px-6 pt-8 pb-6">
        <div class="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3">
          <button
            type="button"
            class="text-(--color-shell-text)"
            @click="router.push('/transaction')"
          >
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>

          <h1 class="text-center text-2xl font-bold leading-tight text-(--color-shell-text)">
            Tambah Saldo
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

      <div class="relative mt-2 flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-5 pt-7">
        <div class="space-y-6 pb-28">
          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Judul
            </label>
            <input
              v-model="title"
              type="text"
              class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Sumber Dana
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
            </div>
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Nama Akun
            </label>

            <select
              v-model="selectedAccount"
              class="h-11 w-full appearance-none rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
            >
              <option v-for="account in accountOptions" :key="account" :value="account">
                {{ account }}
              </option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Nominal Masuk
            </label>
            <input
              v-model="amount"
              type="text"
              class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Tanggal Masuk
            </label>
            <input
              v-model="date"
              type="date"
              class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block text-[0.95rem] font-medium text-(--color-primary-text)">
              Catatan
            </label>
            <textarea
              v-model="note"
              rows="6"
              placeholder="Misalnya hasil tarik tunai, isi ATM, atau top up e-wallet..."
              class="w-full rounded-[18px] bg-(--color-input-background) px-4 py-4 text-[0.95rem] text-(--color-input-text) focus:outline-none"
            />
          </div>

          <p v-if="errorMessage" class="text-center text-sm font-medium text-(--color-ocean-blue-button)">
            {{ errorMessage }}
          </p>

          <AppButton class="mx-auto" min-width="10rem" :loading="saving" @click="handleSave">
            Simpan Saldo
          </AppButton>
        </div>

        <MobileBottomNav active="transfer" @navigate="handleNavigate" />
      </div>
    </section>
  </main>
</template>
