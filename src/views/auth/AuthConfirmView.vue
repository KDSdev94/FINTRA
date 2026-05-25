<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthScreenLayout from '@/components/auth/AuthScreenLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('Sedang memproses konfirmasi akun...')

onMounted(async () => {
  try {
    const continueUrl = await authStore.finalizeEmailConfirmation()
    status.value = 'success'
    message.value = 'Email berhasil dikonfirmasi. Anda akan diarahkan ke login.'
    window.setTimeout(() => {
      if (continueUrl) {
        const target = new URL(continueUrl, window.location.origin)

        if (target.origin === window.location.origin) {
          void router.push(`${target.pathname}${target.search}${target.hash}`)
          return
        }
      }

      void router.push('/login?verified=1')
    }, 1200)
  } catch (error) {
    status.value = 'error'
    message.value = error instanceof Error ? error.message : 'Gagal memproses konfirmasi akun.'
  }
})
</script>

<template>
  <AuthScreenLayout title="Konfirmasi Akun">
    <div class="mt-12 flex flex-1 flex-col items-center text-center">
      <p
        class="max-w-72 text-[0.95rem] font-medium"
        :class="
          status === 'error'
            ? 'text-(--color-ocean-blue-button)'
            : 'text-(--color-primary-text)'
        "
      >
        {{ message }}
      </p>

      <AppButton v-if="status === 'error'" class="mt-8" min-width="10rem" @click="router.push('/login')">
        Ke Login
      </AppButton>
    </div>
  </AuthScreenLayout>
</template>
