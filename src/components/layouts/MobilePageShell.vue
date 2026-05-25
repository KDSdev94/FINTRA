<script setup lang="ts">
import { useRouter } from 'vue-router'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import { navigateByTab } from '@/composables/useAppNavigation'
import type { NavKey } from '@/types/navigation'

const props = withDefaults(
  defineProps<{
    title: string
    backTo?: string
    activeNav?: NavKey | null
    showBell?: boolean
    bellTo?: string
    headerClass?: string
    panelClass?: string
    panelInnerClass?: string
    titleClass?: string
  }>(),
  {
    backTo: '',
    activeNav: null,
    showBell: true,
    bellTo: '/notifications',
    headerClass: 'px-6 pt-8 pb-12',
    panelClass: '',
    panelInnerClass: 'flex flex-1 flex-col px-6 pt-8 pb-28',
    titleClass: 'text-2xl font-bold text-(--color-shell-text)',
  },
)

const router = useRouter()

const handleBack = () => {
  if (props.backTo) {
    router.push(props.backTo)
  } else {
    router.back()
  }
}

const handleBell = () => {
  if (props.bellTo) {
    router.push(props.bellTo)
  }
}

const handleNavigate = (key: NavKey) => navigateByTab(router, key)
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)">
      <div :class="headerClass">
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="text-(--color-shell-text)"
            @click="handleBack"
          >
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>

          <h1 :class="titleClass">
            {{ title }}
          </h1>

          <button
            v-if="showBell"
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-glass-surface) text-(--color-shell-text) backdrop-blur-md"
            @click="handleBell"
          >
            <AppIcon name="bell" class="h-5 w-5" />
          </button>
          <div v-else class="h-10 w-10" />
        </div>

        <slot name="header-extra" />
      </div>

      <div
        class="relative mt-2 flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background)"
        :class="panelClass"
      >
        <slot name="panel-overlay" />

        <div :class="panelInnerClass">
          <slot />
        </div>

        <MobileBottomNav v-if="activeNav" :active="activeNav" @navigate="handleNavigate" />
      </div>
    </section>
  </main>
</template>
