<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <main class="min-h-svh overflow-hidden bg-(--color-shell-background) text-(--color-shell-text)">
    <section class="flex min-h-svh w-full flex-col bg-(--color-shell-background)">
      <header class="px-8 pt-16 pb-9 text-center">
        <h1 class="text-[2.2rem] font-bold tracking-[-0.04em] text-(--color-shell-text)">
          {{ title }}
        </h1>
      </header>

      <div
        class="flex flex-1 flex-col rounded-t-[3rem] bg-(--color-panel-background) px-8 pt-7 pb-8"
      >
        <slot />
      </div>
    </section>
  </main>
</template>
