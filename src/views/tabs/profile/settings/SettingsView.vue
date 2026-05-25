<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import { settingsMenuItems } from '@/data/profile/menu'

const router = useRouter()
</script>

<template>
  <MobilePageShell
    title="Pengaturan"
    back-to="/profile"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-10 pb-28"
  >
    <div class="flex-1 space-y-5">
      <button
        v-for="item in settingsMenuItems"
        :key="item.label"
        type="button"
        class="flex w-full items-center justify-between py-2 text-left"
        @click="item.route && router.push(item.route)"
      >
        <div class="flex items-center gap-4">
          <div class="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-(--color-main-green) text-(--color-primary-text)">
            <AppIcon :name="item.icon" class="h-5 w-5" />
          </div>
          <span class="text-[0.98rem] font-medium text-(--color-primary-text)">
            {{ item.label }}
          </span>
        </div>
        <AppIcon
          name="chevron-right"
          class="h-5 w-5 text-(--color-primary-text)"
        />
      </button>
    </div>
  </MobilePageShell>
</template>
