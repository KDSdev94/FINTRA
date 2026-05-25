import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import { useFinanceStore } from './stores/finance'
import { pinia } from './stores/pinia'
import { initThemeMode } from './theme/useTheme'

initThemeMode()

const bootstrap = async () => {
  const app = createApp(App)

  app.use(pinia)
  app.use(router)

  app.mount('#app')

  try {
    const authStore = useAuthStore()
    await authStore.initialize()

    if (authStore.user) {
      const financeStore = useFinanceStore()
      await financeStore.initialize()

      const currentRouteName = String(router.currentRoute.value.name ?? '')
      if (currentRouteName === 'login' || currentRouteName === 'signup' || currentRouteName === 'launch') {
        await router.replace('/home')
      }
    }
  } catch (error) {
    const authStore = useAuthStore()
    authStore.errorMessage =
      error instanceof Error ? error.message : 'Aplikasi gagal menyiapkan sesi login.'
  }
}

void bootstrap()
