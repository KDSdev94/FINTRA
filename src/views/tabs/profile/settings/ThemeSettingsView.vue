<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useThemeMode, type ThemeMode } from '@/theme/useTheme'

const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)
const { themeMode, availableThemes, setThemeMode } = useThemeMode()
const savingTheme = ref<ThemeMode | null>(null)
const themeError = ref('')

const selectedTheme = computed(() => profile.value?.themePreference ?? themeMode.value)

const handleThemeSelect = async (nextTheme: ThemeMode) => {
  if (savingTheme.value || selectedTheme.value === nextTheme) {
    return
  }

  const previousTheme = selectedTheme.value
  themeError.value = ''
  savingTheme.value = nextTheme
  setThemeMode(nextTheme)

  try {
    await authStore.updateThemePreference(nextTheme)
  } catch (error) {
    setThemeMode(previousTheme)
    themeError.value = error instanceof Error ? error.message : 'Tema gagal disimpan.'
  } finally {
    savingTheme.value = null
  }
}
</script>

<template>
  <MobilePageShell
    title="Tema Aplikasi"
    back-to="/profile/settings"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-10 pb-28"
  >
    <div class="flex-1">
      <p class="max-w-[20rem] text-[0.92rem] leading-6 text-(--color-muted-text)/85">
        Pilih tema yang paling enak dilihat. Warna teks dan panel akan ikut menyesuaikan supaya
        tetap kebaca.
      </p>

      <div class="mt-7 space-y-4">
        <button
          v-for="theme in availableThemes"
          :key="theme.id"
          type="button"
          class="w-full rounded-[28px] border px-5 py-5 text-left transition"
          :class="
            selectedTheme === theme.id
              ? 'border-(--color-main-green) bg-(--color-surface-background) shadow-[0_14px_30px_rgba(5,34,36,0.08)]'
              : 'border-transparent bg-(--color-panel-background) shadow-[0_10px_24px_rgba(5,34,36,0.05)]'
          "
          @click="handleThemeSelect(theme.id)"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="flex items-center gap-3">
                <span class="text-[1rem] font-semibold text-(--color-primary-text)">
                  {{ theme.label }}
                </span>
                <span
                  v-if="selectedTheme === theme.id"
                  class="rounded-full bg-(--color-main-green)/15 px-3 py-1 text-[0.72rem] font-semibold text-(--color-primary-text)"
                >
                  Aktif
                </span>
              </div>
              <p class="mt-2 max-w-[14rem] text-[0.86rem] leading-5 text-(--color-muted-text)/80">
                {{ theme.description }}
              </p>
            </div>

            <div class="flex items-center gap-2 pt-1">
              <span
                v-for="color in theme.preview"
                :key="color"
                class="h-5 w-5 rounded-full border border-black/5"
                :style="{ backgroundColor: color }"
              />
            </div>
          </div>

          <div
            class="mt-4 rounded-[20px] px-4 py-4"
            :style="{ backgroundColor: theme.preview[1], color: theme.preview[2] }"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[0.75rem] opacity-70">Preview</p>
                <p class="mt-1 text-[1rem] font-semibold">Saldo Tetap Kebaca</p>
              </div>
              <div
                class="rounded-full px-3 py-1 text-[0.78rem] font-semibold"
                :style="{ backgroundColor: theme.preview[0], color: theme.preview[1] }"
              >
                Fintra
              </div>
            </div>
          </div>
        </button>
      </div>

      <p v-if="themeError" class="mt-5 text-sm font-medium text-(--color-ocean-blue-button)">
        {{ themeError }}
      </p>
    </div>

    <AppButton class="mx-auto mt-8" variant="soft" min-width="11rem" :disabled="Boolean(savingTheme)">
      {{ savingTheme ? 'Menyimpan tema...' : 'Tema tersimpan otomatis' }}
    </AppButton>
  </MobilePageShell>
</template>
