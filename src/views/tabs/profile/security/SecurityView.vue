<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import { securityMenuItems } from '@/data/profile/menu'

const router = useRouter()

const handleItemClick = (route?: string) => {
  if (route) {
    router.push(route)
  }
}
</script>

<template>
  <MobilePageShell
    title="Keamanan"
    back-to="/profile"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-10 pb-28"
  >
    <h2 class="text-[1.55rem] font-bold text-(--color-primary-text)">
      Keamanan
    </h2>

    <div class="mt-8 flex-1 divide-y divide-[rgba(5,34,36,0.08)] dark:divide-[rgba(241,255,243,0.12)]">
      <button
        v-for="item in securityMenuItems"
        :key="item.label"
        type="button"
        class="flex w-full items-center justify-between py-5 text-left"
        @click="handleItemClick(item.route)"
      >
        <span class="text-[0.98rem] font-medium text-(--color-primary-text)">
          {{ item.label }}
        </span>
        <AppIcon
          name="chevron-right"
          class="h-5 w-5 text-(--color-primary-text)"
        />
      </button>
    </div>
  </MobilePageShell>
</template>
