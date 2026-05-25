<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  message: string
  to: string
}>()

const router = useRouter()
const phase = ref(0)

const dotPositions = computed(() => {
  if (phase.value >= 3) {
    return []
  }

  return [
    { left: '34%', delay: '0ms' },
    { left: '50%', delay: '90ms' },
    { left: '66%', delay: '180ms' },
  ].slice(0, phase.value + 1)
})

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    if (phase.value >= 3) {
      if (timer) {
        clearInterval(timer)
      }
      return
    }

    phase.value += 1
  }, 420)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <main
    class="flex min-h-svh items-center justify-center overflow-hidden bg-(--color-main-green)"
    @click="router.push(props.to)"
  >
    <section class="flex w-full flex-col items-center px-8 text-center text-white">
      <div class="status-ring relative flex h-[108px] w-[108px] items-center justify-center rounded-full border-[6px] border-white">
        <template v-if="phase < 3">
          <span
            v-for="dot in dotPositions"
            :key="dot.left"
            class="status-dot absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white"
            :style="{ left: dot.left, animationDelay: dot.delay }"
          />
        </template>

        <svg
          v-else
          viewBox="0 0 32 32"
          class="status-check h-10 w-10"
          aria-hidden="true"
        >
          <path
            d="M7 16.5L13.2 22.5L25 10"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3.4"
          />
        </svg>
      </div>

      <p class="mt-6 text-[1.55rem] font-semibold leading-tight whitespace-pre-line">
        {{ message }}
      </p>
    </section>
  </main>
</template>

<style scoped>
.status-ring {
  animation: ring-pulse 1.2s ease-in-out infinite;
}

.status-dot {
  transform: translate(-50%, -50%);
  animation: dot-pop 0.9s ease-in-out infinite;
}

.status-check {
  color: white;
  animation: check-in 220ms ease-out both;
}

@keyframes ring-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.08);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.02);
  }
}

@keyframes dot-pop {
  0%,
  100% {
    opacity: 0.5;
    scale: 0.82;
  }
  50% {
    opacity: 1;
    scale: 1;
  }
}

@keyframes check-in {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
