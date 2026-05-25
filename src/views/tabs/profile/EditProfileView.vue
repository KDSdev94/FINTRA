<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue'
import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { navigateByTab } from '@/composables/useAppNavigation'
import { toDateInputValue } from '@/lib/date'
import { useAuthStore } from '@/stores/auth'
import type { NavKey } from '@/types/navigation'

const router = useRouter()
const authStore = useAuthStore()
const { profile, loading, errorMessage } = storeToRefs(authStore)
const username = ref('')
const phone = ref('')
const email = ref('')
const birthDate = ref('')
const pushNotifications = ref(true)
const avatarInput = ref<HTMLInputElement | null>(null)
const avatarUploading = ref(false)
const avatarError = ref('')

const handleNavigate = (key: NavKey) => navigateByTab(router, key)

watchEffect(() => {
  if (!profile.value) {
    return
  }

  username.value = profile.value.fullName
  phone.value = profile.value.phoneNumber
  email.value = profile.value.email
  birthDate.value = toDateInputValue(profile.value.birthDate)
  pushNotifications.value = profile.value.pushNotifications
})

const handleSave = async () => {
  await authStore.updateProfile({
    fullName: username.value,
    phoneNumber: phone.value,
    birthDate: birthDate.value,
    pushNotifications: pushNotifications.value,
  })
}

const openAvatarPicker = () => {
  avatarInput.value?.click()
}

const handleAvatarChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    return
  }

  avatarUploading.value = true
  avatarError.value = ''

  try {
    await authStore.updateAvatar(file)
  } catch (error) {
    avatarError.value = error instanceof Error ? error.message : 'Gagal mengganti foto profil.'
  } finally {
    avatarUploading.value = false
    input.value = ''
  }
}
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background)">
    <section
      class="relative flex min-h-svh w-full flex-col bg-(--color-shell-background)"
    >
      <div class="px-6 pt-8 pb-16">
        <div class="flex items-center justify-between">
          <button
            type="button"
            class="text-(--color-shell-text)"
            @click="router.push('/profile')"
          >
            <AppIcon name="arrow-left" class="h-6 w-6" />
          </button>

          <h1
            class="text-2xl font-bold text-(--color-shell-text)"
          >
            Edit Profil
          </h1>

          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-glass-surface) text-(--color-shell-text) backdrop-blur-md"
          >
            <AppIcon name="bell" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        class="relative mt-2 flex flex-1 flex-col rounded-t-[40px] bg-(--color-panel-background) px-6 pt-[74px]"
      >
        <div class="absolute top-[-58px] left-1/2 flex -translate-x-1/2 flex-col items-center">
          <button
            type="button"
            class="rounded-full disabled:cursor-wait disabled:opacity-80"
            :disabled="avatarUploading"
            aria-label="Ganti foto profil"
            @click="openAvatarPicker"
          >
            <ProfileAvatar editable>
              <template #badge>
                <AppIcon
                  name="camera"
                  class="h-4 w-4"
                  :class="avatarUploading ? 'animate-pulse' : ''"
                />
              </template>
            </ProfileAvatar>
          </button>

          <input
            ref="avatarInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleAvatarChange"
          />
        </div>

        <div class="text-center">
          <h2
            class="text-[1.9rem] font-bold leading-none text-(--color-primary-text)"
          >
            {{ profile?.fullName ?? 'Pengguna Fintra' }}
          </h2>
          <p
            v-if="avatarUploading || avatarError"
            class="mt-3 text-sm font-semibold"
            :class="avatarError ? 'text-(--color-ocean-blue-button)' : 'text-(--color-muted-text)'"
          >
            {{ avatarError || 'Mengunggah foto...' }}
          </p>
        </div>

        <div class="mt-10 flex-1 overflow-y-auto pb-28">
          <h3
            class="text-[1.8rem] font-bold text-(--color-primary-text)"
          >
            Atur Akun
          </h3>

          <div class="mt-8 space-y-5">
            <div>
              <label
                class="mb-2 block text-[1rem] font-medium text-(--color-primary-text)"
              >
                Nama Pengguna
              </label>
              <input
                v-model="username"
                type="text"
                class="h-11 w-full rounded-[12px] bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
              />
            </div>

            <div>
              <label
                class="mb-2 block text-[1rem] font-medium text-(--color-primary-text)"
              >
                Nomor HP
              </label>
              <input
                v-model="phone"
                type="text"
                class="h-11 w-full rounded-[12px] bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
              />
            </div>

            <div>
              <label
                class="mb-2 block text-[1rem] font-medium text-(--color-primary-text)"
              >
                Alamat Email
              </label>
              <input
                v-model="email"
                type="email"
                disabled
                class="h-11 w-full rounded-[12px] bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
              />
            </div>

            <div>
              <label
                class="mb-2 block text-[1rem] font-medium text-(--color-primary-text)"
              >
                Tanggal Lahir
              </label>
              <input
                v-model="birthDate"
                type="date"
                class="h-11 w-full rounded-[12px] bg-(--color-input-background) px-5 text-[0.95rem] text-(--color-input-text) focus:outline-none"
              />
            </div>
          </div>

          <div class="mt-10 space-y-6">
            <div class="flex items-center justify-between">
              <span
                class="text-[1rem] font-medium text-(--color-primary-text)"
              >
                Notifikasi Masuk
              </span>
              <button
                type="button"
                class="relative h-7 w-12 rounded-full transition"
                :class="
                  pushNotifications
                    ? 'bg-(--color-main-green)'
                    : 'bg-(--color-nav-background)'
                "
                @click="pushNotifications = !pushNotifications"
              >
                <span
                  class="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white transition"
                  :class="pushNotifications ? 'right-1' : 'left-1'"
                />
              </button>
            </div>

            <button
              type="button"
              class="flex w-full items-center justify-between rounded-[18px] bg-(--color-surface-background) px-4 py-4 text-left"
              @click="router.push('/profile/settings/theme')"
            >
              <span
                class="text-[1rem] font-medium text-(--color-primary-text)"
              >
                Tema Aplikasi
              </span>
              <span class="text-[0.9rem] font-medium text-(--color-muted-text)">
                Ganti
              </span>
            </button>
          </div>

          <p v-if="errorMessage" class="mt-6 text-sm font-medium text-(--color-ocean-blue-button)">
            {{ errorMessage }}
          </p>

          <AppButton class="mx-auto mt-10" size="lg" min-width="10.75rem" :disabled="loading" @click="handleSave">
            {{ loading ? 'Menyimpan...' : 'Simpan Profil' }}
          </AppButton>
        </div>

        <MobileBottomNav active="profil" @navigate="handleNavigate" />
      </div>
    </section>
  </main>
</template>
