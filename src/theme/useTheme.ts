import { computed, ref } from 'vue'

import {
  type ThemeId,
  type ThemePalette,
  themePresetMap,
  themePresets,
  themeVariableMap,
} from './palette'

export type ThemeMode = ThemeId

const THEME_STORAGE_KEY = 'finwise-theme-mode'
const DEFAULT_THEME_ID: ThemeId = 'mint'
const themeMode = ref<ThemeMode>(DEFAULT_THEME_ID)

export const applyTheme = (theme: ThemePalette, target: HTMLElement = document.documentElement) => {
  for (const [token, cssVariable] of Object.entries(themeVariableMap) as Array<
    [keyof ThemePalette, string]
  >) {
    target.style.setProperty(cssVariable, theme[token])
  }
}

export const normalizeThemeMode = (value: string | null | undefined): ThemeMode => {
  if (value === 'dark') {
    return 'midnight'
  }

  if (value === 'light') {
    return 'mint'
  }

  if (value && value in themePresetMap) {
    return value as ThemeMode
  }

  return DEFAULT_THEME_ID
}

export const setThemeMode = (mode: ThemeMode, target: HTMLElement = document.documentElement) => {
  const normalizedMode = normalizeThemeMode(mode)
  const preset = themePresetMap[normalizedMode]

  if (!preset) {
    return
  }

  themeMode.value = normalizedMode
  applyTheme(preset.palette, target)
  target.dataset.themeMode = normalizedMode
  target.style.colorScheme = normalizedMode === 'midnight' ? 'dark' : 'light'
  localStorage.setItem(THEME_STORAGE_KEY, normalizedMode)
}

export const getStoredThemeMode = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME_ID
  }

  return normalizeThemeMode(localStorage.getItem(THEME_STORAGE_KEY))
}

export const initThemeMode = (target: HTMLElement = document.documentElement) => {
  setThemeMode(getStoredThemeMode(), target)
}

export const useThemeMode = () => ({
  themeMode,
  activeTheme: computed(() => themePresetMap[themeMode.value]),
  availableThemes: themePresets,
  isDarkMode: computed(() => themeMode.value === 'midnight'),
  setThemeMode,
  toggleThemeMode: (target?: HTMLElement) =>
    setThemeMode(themeMode.value === 'midnight' ? 'mint' : 'midnight', target),
})
