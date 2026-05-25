<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthField from '@/components/auth/AuthField.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const currentPin = ref('')
const newPin = ref('')
const confirmPin = ref('')
const error = ref('')

const handleChange = async () => {
  error.value = ''
  if (currentPin.value !== authStore.profile?.pin) {
    error.value = 'PIN sekarang salah.'
    return
  }
  if (newPin.value.length < 6) {
    error.value = 'PIN baru harus 6 digit.'
    return
  }
  if (newPin.value !== confirmPin.value) {
    error.value = 'PIN baru tidak cocok.'
    return
  }
  await authStore.setPin(newPin.value)
  router.push('/profile/security/change-pin/success')
}
</script>

<template>
  <MobilePageShell
    title="Ganti PIN"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-10 pb-28"
  >
    <div class="flex-1 space-y-7">
      <AuthField v-model="currentPin" label="PIN Sekarang" placeholder="Masukin PIN sekarang" type="password" :revealable="true" />
      <AuthField v-model="newPin" label="PIN Baru" placeholder="Masukin PIN baru (6 digit)" type="password" :revealable="true" />
      <AuthField v-model="confirmPin" label="Ulangi PIN" placeholder="Ketik ulang PIN baru" type="password" :revealable="true" />

      <p v-if="error" class="text-center text-sm font-medium text-(--color-ocean-blue-button)">{{ error }}</p>

      <AppButton class="mx-auto mt-10" min-width="9.25rem" @click="handleChange">
        Ganti PIN
      </AppButton>
    </div>
  </MobilePageShell>
</template>
