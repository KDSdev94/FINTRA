<script setup lang="ts">
withDefaults(
  defineProps<{
    editable?: boolean;
    size?: "md" | "lg";
  }>(),
  {
    editable: false,
    size: "lg",
  },
);
</script>

<template>
  <div
    class="relative overflow-visible rounded-full border-4 border-(--color-background-green-white-and-letter) bg-[#d8d8d8] shadow-sm"
    :class="size === 'lg' ? 'h-[116px] w-[116px]' : 'h-[108px] w-[108px]'"
  >
    <img
      src="/avatar-dummy.svg"
      alt="Dummy profile"
      class="h-full w-full rounded-full object-cover"
    />

    <div
      v-if="editable"
      class="absolute right-0 bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-(--color-main-green) text-(--color-background-dark-mode-and-letters) shadow-sm"
    >
      <slot name="badge" />
    </div>
  </div>
</template>
