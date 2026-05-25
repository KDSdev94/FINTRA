<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthScreenLayout from '@/components/auth/AuthScreenLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const email = ref('')
const sent = ref(false)
const loading = ref(false)
const error = ref('')

const handleReset = async () => {
  error.value = ''
  if (!email.value.trim()) {
    error.value = 'Email wajib diisi.'
    return
  }
  loading.value = true
  try {
    await authStore.resetPassword(email.value.trim())
    sent.value = true
  } catch {
    error.value = authStore.errorMessage || 'Gagal mengirim email reset.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthScreenLayout title="Lupa Password">
    <div class="mt-6 flex flex-1 flex-col">
      <div class="rounded-[30px] bg-transparent">
        <h2 class="text-[1.7rem] font-bold text-(--color-primary-text)">
          Reset Password?
        </h2>
        <p class="mt-3 max-w-60 text-[0.78rem] leading-5 text-(--color-muted-text)/80">
          Masukin email yang kepake di akun lu. Nanti kita kirim link reset password ke email.
        </p>

        <template v-if="!sent">
          <label class="mt-12 block text-left">
            <span class="mb-2 block text-[0.82rem] font-medium text-(--color-primary-text)">
              Alamat Email
            </span>
            <input
              v-model="email"
              type="email"
              placeholder="contoh@email.com"
              class="h-11 w-full rounded-full bg-(--color-input-background) px-5 text-[0.92rem] text-(--color-input-text) placeholder:text-(--color-muted-text)/60 focus:outline-none"
            />
          </label>

          <p v-if="error" class="mt-4 text-center text-sm font-medium text-(--color-ocean-blue-button)">{{ error }}</p>

          <div class="mt-12 flex justify-center">
            <AppButton min-width="9rem" :loading="loading" @click="handleReset">
              Kirim Link Reset
            </AppButton>
          </div>
        </template>

        <template v-else>
          <div class="mt-12 text-center">
            <p class="text-sm font-medium text-(--color-primary-text)">Link reset sudah dikirim ke:</p>
            <p class="mt-1 text-sm font-bold text-(--color-main-green)">{{ email }}</p>
            <p class="mt-4 text-xs text-(--color-muted-text)/70">Cek inbox atau folder spam, lalu klik link untuk reset password.</p>
          </div>
        </template>
      </div>

      <div class="mt-auto flex flex-col items-center pt-16 pb-3">
        <p class="text-center text-[0.75rem] text-(--color-muted-text)/70">
          Ingat password?
          <RouterLink to="/login" class="font-medium text-(--color-ocean-blue-button)">
            Login
          </RouterLink>
        </p>
      </div>
    </div>
  </AuthScreenLayout>
</template>
