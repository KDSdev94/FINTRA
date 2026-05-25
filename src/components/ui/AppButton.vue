<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

type Variant = 'primary' | 'soft' | 'blue'
type Size = 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    to?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: Variant
    size?: Size
    full?: boolean
    minWidth?: string
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    full: false,
    minWidth: '9rem',
    disabled: false,
    loading: false,
  },
)

const componentTag = computed(() => (props.to ? RouterLink : 'button'))

const variantClass = computed(() => {
  if (props.variant === 'soft') {
    return 'bg-(--color-soft-button-background) text-(--color-soft-button-text)'
  }
  if (props.variant === 'blue') {
    return 'bg-(--color-blue-button) text-white'
  }
  return 'bg-(--color-primary-button-background) text-(--color-primary-button-text)'
})

const sizeClass = computed(() =>
  props.size === 'lg'
    ? 'h-12 px-7 text-[1rem] font-bold'
    : 'h-11 px-6 text-[0.95rem] font-semibold',
)

const widthStyle = computed(() => {
  if (props.full) return undefined
  return { minWidth: props.minWidth }
})

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <component
    :is="componentTag"
    :to="to"
    :type="to ? undefined : type"
    :disabled="to ? undefined : isDisabled"
    :style="widthStyle"
    class="inline-flex shrink-0 items-center justify-center rounded-full text-center leading-none whitespace-nowrap transition"
    :class="[
      variantClass,
      sizeClass,
      full ? 'w-full' : '',
      isDisabled ? 'cursor-not-allowed opacity-60' : '',
    ]"
  >
    <svg v-if="loading" class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </component>
</template>
