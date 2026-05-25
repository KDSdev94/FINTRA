<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import AuthField from '@/components/auth/AuthField.vue'
import AuthScreenLayout from '@/components/auth/AuthScreenLayout.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useFinanceStore } from '@/stores/finance'

const email = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const financeStore = useFinanceStore()
const { user, loading, errorMessage, infoMessage, cooldownSeconds } = storeToRefs(authStore)

const redirectIfAuthenticated = async () => {
  if (!user.value) {
    return
  }

  await financeStore.initialize(true)
  await router.replace('/home')
}

onMounted(() => {
  void redirectIfAuthenticated()

  if (route.query.verified === '1') {
    authStore.infoMessage = 'Email berhasil dikonfirmasi. Sekarang Anda bisa login.'
  }
})

watch(
  () => user.value?.uid,
  () => {
    void redirectIfAuthenticated()
  },
)

const handleLogin = async () => {
  await authStore.signIn(email.value, password.value)
  await financeStore.initialize(true)
  await router.push('/home')
}

const handleGoogleLogin = async () => {
  await authStore.signInWithGoogle()
}
</script>

<template>
  <AuthScreenLayout title="Welcome Back">
    <div class="mt-8 flex flex-1 flex-col">
      <div class="space-y-6">
        <AuthField
          v-model="email"
          label="Username atau email"
          placeholder="contoh@email.com"
        />

        <AuthField
          v-model="password"
          label="Kata sandi"
          placeholder="Masukin password kamu"
          type="password"
          :revealable="true"
        />
      </div>

      <p v-if="errorMessage" class="mt-4 text-center text-sm font-medium text-(--color-ocean-blue-button)">
        {{ errorMessage }}
      </p>
      <p v-if="infoMessage" class="mt-4 text-center text-sm font-medium text-(--color-main-green)">
        {{ infoMessage }}
      </p>
      <p v-if="cooldownSeconds" class="mt-2 text-center text-[0.78rem] text-(--color-muted-text)/80">
        Coba lagi dalam {{ cooldownSeconds }} detik.
      </p>

      <div class="mt-14 flex flex-col items-center">
        <AppButton
          size="lg"
          :disabled="loading"
          class="w-full max-w-[13.5rem] shadow-[0_14px_28px_rgba(16,201,160,0.24)]"
          :loading="loading"
          @click="handleLogin"
        >
          Masuk
        </AppButton>

        <button
          type="button"
          class="mt-5 text-[0.9rem] font-semibold text-(--color-muted-text)"
          @click="$router.push('/auth/forgot-password')"
        >
          Lupa password, nih?
        </button>

        <AppButton to="/daftar" variant="soft" size="lg" class="mt-6 w-full max-w-[13.5rem]">
          Bikin Akun
        </AppButton>

        <p class="mt-8 text-[0.9rem] text-(--color-muted-text)/70">
          atau lanjut lewat
        </p>

        <div class="mt-4 flex items-center justify-center">
          <button
            type="button"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-(--color-muted-text)/35 bg-white/70 shadow-[0_8px_20px_rgba(5,34,36,0.08)]"
            aria-label="Lanjut dengan Google"
            :disabled="loading"
            @click="handleGoogleLogin"
          >
            <AppIcon name="google" class="h-6 w-6" />
          </button>
        </div>

        <p class="mt-8 text-center text-[0.85rem] text-(--color-muted-text)/70">
          Belum punya akun?
          <RouterLink to="/daftar" class="font-medium text-(--color-blue-button)">
            Cus daftar
          </RouterLink>
        </p>
      </div>
    </div>
  </AuthScreenLayout>
</template>
