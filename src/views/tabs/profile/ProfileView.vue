<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { profileMenuItems } from '@/data/profile/menu'
import { useAuthStore } from '@/stores/auth'
import { useFinanceStore } from '@/stores/finance'

const router = useRouter()
const authStore = useAuthStore()
const financeStore = useFinanceStore()
const { profile } = storeToRefs(authStore)
const isLogoutOpen = ref(false)
const profileId = computed(() => profile.value?.id.slice(0, 8).toUpperCase() ?? 'GUEST')

const handleMenuClick = (route?: string) => {
  if (route) {
    router.push(route)
    return
  }

  isLogoutOpen.value = true
}

const handleLogout = async () => {
  await authStore.signOut()
  financeStore.reset()
  await router.push('/login')
}
</script>

<template>
  <MobilePageShell
    title="Profil"
    back-to="/home"
    active-nav="profil"
    header-class="px-6 pt-8 pb-16"
    panel-inner-class="flex flex-1 flex-col px-6 pt-[74px] pb-28"
  >
    <template #panel-overlay>
      <div class="absolute top-[-58px] left-1/2 -translate-x-1/2">
        <ProfileAvatar />
      </div>
    </template>

    <div class="text-center">
      <h2
        class="text-3xl font-bold leading-none text-(--color-primary-text)"
      >
        {{ profile?.fullName ?? 'Pengguna Fintra' }}
      </h2>
      <p
        class="mt-2 text-[1rem] text-(--color-muted-text)/85"
      >
        <span class="font-bold">ID:</span> {{ profileId }}
      </p>
    </div>

    <div class="mt-12 flex-1 space-y-7">
      <button
        v-for="item in profileMenuItems"
        :key="item.label"
        type="button"
        class="flex w-full items-center gap-4 text-left"
        @click="handleMenuClick(item.route)"
      >
        <div
          class="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[18px] bg-(--color-light-blue-button) text-white"
          :class="
            item.icon === 'logout' ? 'bg-(--color-blue-button)' : ''
          "
        >
          <AppIcon :name="item.icon" class="h-7 w-7" />
        </div>
        <span
          class="text-[1.1rem] font-medium text-(--color-primary-text)"
        >
          {{ item.label }}
        </span>
      </button>
    </div>

    <div
      v-if="isLogoutOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,19,20,0.42)] px-8"
    >
      <div class="w-full max-w-[18rem] rounded-[24px] bg-(--color-panel-background) px-7 py-8 text-center shadow-xl">
        <h2 class="text-[1.5rem] font-bold text-(--color-primary-text)">
          Keluar Akun
        </h2>

        <p class="mt-5 text-[0.96rem] font-medium text-(--color-primary-text)">
          Yakin mau keluar dulu?
        </p>

        <AppButton class="mt-8" full @click="handleLogout">
          Iya, Keluar
        </AppButton>

        <AppButton class="mt-4" variant="soft" full @click="isLogoutOpen = false">
          Batal
        </AppButton>
      </div>
    </div>
  </MobilePageShell>
</template>
