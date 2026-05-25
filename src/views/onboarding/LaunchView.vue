<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import OnboardingScreen from '@/components/onboarding/OnboardingScreen.vue'
import SplashScreen from '@/components/onboarding/SplashScreen.vue'
import { useAuthStore } from '@/stores/auth'

type ScreenState = 'splash' | 'onboarding'

const SPLASH_DURATION = 2200

const screen = ref<ScreenState>('splash')
const router = useRouter()
const authStore = useAuthStore()

let splashTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  if (authStore.user) {
    void router.replace('/home')
    return
  }

  splashTimer = setTimeout(() => {
    screen.value = 'onboarding'
  }, SPLASH_DURATION)
})

onBeforeUnmount(() => {
  if (splashTimer) {
    clearTimeout(splashTimer)
  }
})
</script>

<template>
  <SplashScreen v-if="screen === 'splash'" />
  <OnboardingScreen v-else />
</template>
