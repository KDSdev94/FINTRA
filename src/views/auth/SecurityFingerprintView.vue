<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AuthScreenLayout from '@/components/auth/AuthScreenLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
</script>

<template>
  <AuthScreenLayout title="Sidik Jari">
    <div class="mt-8 flex flex-1 flex-col items-center text-center">
      <div
        class="flex h-[126px] w-[126px] items-center justify-center rounded-full bg-(--color-main-green) text-white"
      >
        <AppIcon name="fingerprint" class="h-16 w-16" />
      </div>

      <h2 class="mt-8 text-[1.4rem] font-bold text-(--color-primary-text)">
        Pakai Sidik Jari Buat Masuk
      </h2>

      <p class="mt-4 max-w-56 text-[0.76rem] leading-5 text-(--color-muted-text)/88">
        Tinggal tempelin sidik jari biar masuk akun lebih cepet, tanpa ribet ngetik lagi.
      </p>

      <AppButton to="/login" variant="soft" size="lg" class="mt-12" min-width="12rem">
        Pakai Touch ID
      </AppButton>

      <RouterLink
        to="/login"
        class="mt-6 text-[0.78rem] font-medium text-(--color-muted-text)/88"
      >
        Atau mau pakai kode PIN aja?
      </RouterLink>
    </div>
  </AuthScreenLayout>
</template>
