<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import AuthField from '@/components/auth/AuthField.vue'
import AuthScreenLayout from '@/components/auth/AuthScreenLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useFinanceStore } from '@/stores/finance'

const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const birthDate = ref('')
const password = ref('')
const confirmPassword = ref('')
const localError = ref('')
const router = useRouter()
const authStore = useAuthStore()
const financeStore = useFinanceStore()
const { loading, errorMessage, infoMessage, cooldownSeconds, awaitingEmailConfirmation } =
  storeToRefs(authStore)

const handleSignup = async () => {
  localError.value = ''

  if (password.value !== confirmPassword.value) {
    localError.value = 'Konfirmasi password belum sama.'
    return
  }

  await authStore.signUp({
    fullName: fullName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    birthDate: birthDate.value,
    password: password.value,
  })

  if (authStore.user) {
    await financeStore.initialize(true)
    await router.push('/home')
  }
}

</script>

<template>
  <AuthScreenLayout title="Bikin Akun">
    <div class="space-y-4">
      <AuthField
        v-model="fullName"
        label="Nama lengkap"
        placeholder="Nama keren kamu"
      />

      <AuthField
        v-model="email"
        label="Email"
        placeholder="contoh@email.com"
      />

      <AuthField
        v-model="phoneNumber"
        label="Nomor HP"
        placeholder="+62 812 3456 7890"
      />

      <AuthField
        v-model="birthDate"
        label="Tanggal lahir"
        type="date"
        placeholder="DD / MM / YYYY"
      />

      <AuthField
        v-model="password"
        label="Kata sandi"
        placeholder="Bikin password yang aman"
        type="password"
        :revealable="true"
      />

      <AuthField
        v-model="confirmPassword"
        label="Ulangin kata sandi"
        placeholder="Ketik ulang password kamu"
        type="password"
        :revealable="true"
      />
    </div>

    <div class="mt-8 text-center">
      <p v-if="localError || errorMessage" class="mx-auto max-w-72 text-[0.82rem] font-medium text-(--color-ocean-blue-button)">
        {{ localError || errorMessage }}
      </p>
      <p v-if="infoMessage" class="mx-auto mt-3 max-w-72 text-[0.82rem] font-medium text-(--color-main-green)">
        {{ infoMessage }}
      </p>
      <p v-if="cooldownSeconds" class="mx-auto mt-2 max-w-72 text-[0.78rem] text-(--color-muted-text)/80">
        Cooldown aktif {{ cooldownSeconds }} detik.
      </p>
      <p v-if="awaitingEmailConfirmation" class="mx-auto mt-2 max-w-72 text-[0.78rem] text-(--color-muted-text)/80">
        Setelah klik link dari email, Anda akan diarahkan kembali ke aplikasi.
      </p>

      <p class="mx-auto max-w-60 text-[0.82rem] leading-4 text-(--color-muted-text)/85">
        Lanjut berarti kamu setuju sama
        <span class="font-semibold text-(--color-primary-text)">Syarat Pakai</span>
        dan
        <span class="font-semibold text-(--color-primary-text)">Kebijakan Privasi</span>.
      </p>

      <AppButton
        size="lg"
        :disabled="loading"
        class="mt-7 w-full max-w-56 shadow-[0_14px_28px_rgba(16,201,160,0.24)]"
        :loading="loading"
        @click="handleSignup"
      >
        Daftar
      </AppButton>

      <p class="mt-5 text-[0.85rem] text-(--color-muted-text)/80">
        Udah punya akun?
        <RouterLink to="/login" class="font-medium text-(--color-blue-button)">
          Gas login
        </RouterLink>
      </p>
    </div>
  </AuthScreenLayout>
</template>
