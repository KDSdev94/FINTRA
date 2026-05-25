<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/icons/AppIcon.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const mode = computed(() => (route.query.mode === 'set' || !authStore.profile?.pin) ? 'set' : 'verify')
const pin = ref('')
const confirmPin = ref('')
const step = ref<'input' | 'confirm'>('input')
const error = ref('')

const title = computed(() => {
  if (mode.value === 'set') return step.value === 'confirm' ? 'Konfirmasi PIN' : 'Buat PIN Baru'
  return 'Masukkan PIN'
})

const handleDigit = (digit: string) => {
  error.value = ''
  if (step.value === 'input' && pin.value.length < 6) {
    pin.value += digit
    if (pin.value.length === 6 && mode.value === 'set') {
      step.value = 'confirm'
    } else if (pin.value.length === 6 && mode.value === 'verify') {
      submitVerify()
    }
  } else if (step.value === 'confirm' && confirmPin.value.length < 6) {
    confirmPin.value += digit
    if (confirmPin.value.length === 6) {
      submitSet()
    }
  }
}

const handleDelete = () => {
  if (step.value === 'confirm') {
    confirmPin.value = confirmPin.value.slice(0, -1)
  } else {
    pin.value = pin.value.slice(0, -1)
  }
}

const submitVerify = () => {
  if (authStore.verifyPin(pin.value)) {
    router.replace('/home')
  } else {
    error.value = 'PIN salah, coba lagi.'
    pin.value = ''
  }
}

const submitSet = async () => {
  if (pin.value !== confirmPin.value) {
    error.value = 'PIN tidak cocok, ulangi.'
    pin.value = ''
    confirmPin.value = ''
    step.value = 'input'
    return
  }
  authStore.pinVerified = true
  await authStore.setPin(pin.value)
  router.replace('/home')
}

const currentDisplay = computed(() => step.value === 'confirm' ? confirmPin.value : pin.value)
</script>

<template>
  <main class="flex min-h-svh flex-col bg-(--color-shell-background)">
    <div class="flex flex-1 flex-col items-center justify-center px-8">
      <AppIcon name="shield" class="h-14 w-14 text-(--color-main-green)" />

      <h1 class="mt-5 text-xl font-bold text-(--color-shell-text)">{{ title }}</h1>
      <p v-if="mode === 'set' && step === 'input'" class="mt-2 text-sm text-(--color-muted-text)/70">Buat 6 digit PIN untuk keamanan akun.</p>

      <div class="mt-8 flex items-center gap-3">
        <div
          v-for="i in 6"
          :key="i"
          class="h-4 w-4 rounded-full transition"
          :class="i <= currentDisplay.length ? 'bg-(--color-primary-text)' : 'bg-white/30'"
        />
      </div>

      <p v-if="error" class="mt-4 text-sm font-medium text-(--color-ocean-blue-button)">{{ error }}</p>

      <div class="mt-10 grid grid-cols-3 gap-4">
        <button
          v-for="digit in ['1','2','3','4','5','6','7','8','9','','0','⌫']"
          :key="digit"
          type="button"
          class="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold transition"
          :class="digit ? 'bg-(--color-panel-background) text-(--color-primary-text) active:bg-(--color-main-green)' : 'pointer-events-none'"
          :disabled="!digit"
          @click="digit === '⌫' ? handleDelete() : handleDigit(digit)"
        >
          {{ digit }}
        </button>
      </div>
    </div>
  </main>
</template>
