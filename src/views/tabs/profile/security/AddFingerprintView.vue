<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
</script>

<template>
  <MobilePageShell
    title="Tambah Sidik Jari"
    back-to="/profile/security/fingerprint"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-14 pb-28"
  >
    <div class="flex-1 text-center">
      <div
        class="mx-auto flex h-[140px] w-[140px] items-center justify-center rounded-full bg-(--color-main-green) text-white"
      >
        <AppIcon name="fingerprint" class="h-20 w-20" />
      </div>

      <h2 class="mt-10 text-[1.9rem] font-bold text-(--color-primary-text)">
        Pakai Sidik Jari Buat Masuk
      </h2>

      <p class="mx-auto mt-5 max-w-[16rem] text-[0.82rem] leading-5 text-(--color-muted-text)/85">
        Tempelin sidik jari lu di sini biar login makin cepet dan nggak pake ribet.
      </p>

      <AppButton
        class="mx-auto mt-16"
        variant="soft"
        size="lg"
        min-width="12rem"
        @click="router.push('/profile/security/fingerprint/changed')"
      >
        Pakai Touch ID
      </AppButton>
    </div>
  </MobilePageShell>
</template>
