<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'

const fallbackAvatar = '/avatar-dummy.svg'
const props = withDefaults(
  defineProps<{
    editable?: boolean;
    src?: string;
    size?: "md" | "lg";
  }>(),
  {
    editable: false,
    src: '',
    size: "lg",
  },
);

const { profile } = storeToRefs(useAuthStore())
const avatarSrc = computed(() => props.src || profile.value?.avatarUrl || fallbackAvatar)
const visibleAvatarSrc = ref(avatarSrc.value)

watch(
  avatarSrc,
  (nextSrc) => {
    visibleAvatarSrc.value = nextSrc || fallbackAvatar
  },
  { immediate: true },
)

const handleAvatarError = () => {
  visibleAvatarSrc.value = fallbackAvatar
}
</script>

<template>
  <div
    class="relative overflow-visible rounded-full border-4 border-(--color-background-green-white-and-letter) bg-[#d8d8d8] shadow-sm"
    :class="size === 'lg' ? 'h-[116px] w-[116px]' : 'h-[108px] w-[108px]'"
  >
    <img
      :key="visibleAvatarSrc"
      :src="visibleAvatarSrc"
      alt="Foto profil"
      class="h-full w-full rounded-full object-cover"
      @error="handleAvatarError"
    />

    <div
      v-if="editable"
      class="absolute right-0 bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-(--color-main-green) text-(--color-background-dark-mode-and-letters) shadow-sm"
    >
      <slot name="badge" />
    </div>
  </div>
</template>
