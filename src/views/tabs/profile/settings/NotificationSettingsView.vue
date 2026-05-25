<script setup lang="ts">
import { reactive } from 'vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import { notificationSettingToggles } from '@/data/profile/menu'

const toggles = reactive(notificationSettingToggles.map((item) => ({ ...item })))
</script>

<template>
  <MobilePageShell
    title="Atur Notifikasi"
    back-to="/profile/settings"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-10 pt-12 pb-28"
  >
    <div class="flex-1 space-y-6">
      <div
        v-for="item in toggles"
        :key="item.label"
        class="flex items-center justify-between gap-4"
      >
        <span class="text-[0.96rem] font-medium text-(--color-primary-text)">
          {{ item.label }}
        </span>
        <button
          type="button"
          class="relative h-6 w-10 rounded-full transition"
          :class="item.enabled ? 'bg-(--color-main-green)' : 'bg-(--color-nav-background)'"
          @click="item.enabled = !item.enabled"
        >
          <span
            class="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-(--color-input-background) transition"
            :class="item.enabled ? 'right-1' : 'left-1'"
          />
        </button>
      </div>
    </div>
  </MobilePageShell>
</template>
