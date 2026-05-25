<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
</script>

<template>
  <MobilePageShell
    title="Sidik Jari Jhon"
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

      <div
        class="mx-auto mt-8 flex h-11 w-full max-w-68 items-center justify-center rounded-full bg-(--color-surface-background)"
      >
        <span class="text-[1rem] font-semibold text-(--color-primary-text)">
          Sidik Jari Jhon
        </span>
      </div>

      <AppButton
        class="mx-auto mt-14"
        min-width="9rem"
        @click="router.push('/profile/security/fingerprint/jhon/deleted')"
      >
        Hapus
      </AppButton>
    </div>
  </MobilePageShell>
</template>
