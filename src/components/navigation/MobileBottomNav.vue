<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import type { NavKey } from '@/types/navigation'

type NavIcon = 'home' | 'chart' | 'arrows' | 'layers' | 'user'

defineProps<{
  active: NavKey
}>()

const emit = defineEmits<{
  navigate: [key: NavKey]
}>()

const navItems: Array<{ key: NavKey; icon: NavIcon }> = [
  { key: 'home', icon: 'home' },
  { key: 'statistik', icon: 'chart' },
  { key: 'transfer', icon: 'arrows' },
  { key: 'laporan', icon: 'layers' },
  { key: 'profil', icon: 'user' },
]
</script>

<template>
  <nav
    class="absolute right-0 bottom-0 left-0 flex h-[100px] items-end bg-(--color-panel-background)"
  >
    <div
      class="flex h-[66px] w-full items-center justify-between rounded-t-[32px] bg-(--color-nav-background) px-7 shadow-sm"
    >
      <button
        v-for="item in navItems"
        :key="item.key"
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full text-(--color-primary-text) transition"
        :class="active === item.key ? 'bg-(--color-main-green) shadow-sm' : ''"
        @click="emit('navigate', item.key)"
      >
        <AppIcon :name="item.icon" class="h-5.5 w-5.5" />
      </button>
    </div>
  </nav>
</template>
