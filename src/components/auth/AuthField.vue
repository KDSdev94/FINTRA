<script setup lang="ts">
import { computed, ref } from 'vue'
import ClosedEyeIcon from '@/components/icons/ClosedEyeIcon.vue'
import OpenEyeIcon from '@/components/icons/OpenEyeIcon.vue'

const props = defineProps<{
  label: string
  placeholder: string
  type?: string
  revealable?: boolean
}>()

const model = defineModel<string>({ default: '' })
const isVisible = ref(false)

const isPasswordField = computed(() => props.type === 'password')
const canReveal = computed(() => props.revealable ?? isPasswordField.value)
const inputType = computed(() => {
  if (isPasswordField.value) {
    return isVisible.value ? 'text' : 'password'
  }

  return props.type ?? 'text'
})
</script>

<template>
  <label class="block text-left">
    <span class="mb-2 block text-[0.95rem] font-semibold text-(--color-primary-text)">
      {{ label }}
    </span>

    <div class="relative flex h-12 items-center rounded-full bg-(--color-input-background) px-5">
      <input
        v-model="model"
        :type="inputType"
        :placeholder="placeholder"
        class="auth-field-input w-full min-w-0 bg-transparent text-[0.95rem] font-medium text-(--color-input-text) focus:outline-none"
        :class="{ 'pr-10': canReveal }"
      />

      <button
        v-if="canReveal"
        type="button"
        class="absolute top-1/2 right-4 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/55 text-(--color-primary-text) shadow-[0_4px_12px_rgba(5,34,36,0.08)]"
        :aria-label="isVisible ? 'Sembunyikan password' : 'Tampilkan password'"
        @click="isVisible = !isVisible"
      >
        <OpenEyeIcon v-if="isVisible" />
        <ClosedEyeIcon v-else />
      </button>

      <slot v-else name="suffix" />
    </div>
  </label>
</template>

<style scoped>
.auth-field-input::placeholder {
  color: var(--color-input-text);
  opacity: 0.42;
}
</style>
