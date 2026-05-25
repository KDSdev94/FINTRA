<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthField from '@/components/auth/AuthField.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const handleChange = async () => {
  error.value = ''
  if (!currentPassword.value) {
    error.value = 'Password sekarang wajib diisi.'
    return
  }
  if (newPassword.value.length < 6) {
    error.value = 'Password baru minimal 6 karakter.'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Password baru tidak cocok.'
    return
  }
  loading.value = true
  try {
    await authStore.changePassword(currentPassword.value, newPassword.value)
    router.push('/profile/settings/password/success')
  } catch {
    error.value = authStore.errorMessage || 'Gagal mengubah password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <MobilePageShell
    title="Atur Password"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-12 pb-28"
  >
    <div class="flex-1 space-y-7">
      <AuthField v-model="currentPassword" label="Password Sekarang" placeholder="Masukin password sekarang" type="password" :revealable="true" />
      <AuthField v-model="newPassword" label="Password Baru" placeholder="Minimal 6 karakter" type="password" :revealable="true" />
      <AuthField v-model="confirmPassword" label="Ulangi Password Baru" placeholder="Ketik ulang password baru" type="password" :revealable="true" />

      <p v-if="error" class="text-center text-sm font-medium text-(--color-ocean-blue-button)">{{ error }}</p>

      <AppButton class="mx-auto mt-10" min-width="11rem" :loading="loading" @click="handleChange">
        Ganti Password
      </AppButton>
    </div>
  </MobilePageShell>
</template>
