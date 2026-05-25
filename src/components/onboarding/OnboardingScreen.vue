<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

type Slide = {
  title: string
  image: string
}

const router = useRouter()
const activeSlide = ref(0)

const slides: Slide[] = [
  {
    title: 'Selamat Datang di\nFINTRA',
    image: '/ilustracion-1.png',
  },
  {
    title: 'Siap ngatur duit\nbiar hidupmu\nnggak boncos?',
    image: '/ilustracion-2.png',
  },
]

const currentSlide = computed(() => slides[activeSlide.value])
const isLastSlide = computed(() => activeSlide.value === slides.length - 1)
const actionLabel = computed(() => (isLastSlide.value ? 'Gas Masuk' : 'Next'))

const handleAction = () => {
  if (isLastSlide.value) {
    router.push('/login')
    return
  }

  activeSlide.value += 1
}
</script>

<template>
  <main
    class="h-svh overflow-hidden bg-(--color-main-green) text-center text-(--color-letters-and-icons)"
  >
    <section
      class="mx-auto flex h-svh w-full max-w-sm flex-col overflow-hidden bg-(--color-main-green)"
    >
      <header class="px-8 pt-18 pb-10">
        <h1
          class="whitespace-pre-line text-[2rem] font-bold leading-[1.15] tracking-[-0.04em] text-(--color-letters-and-icons)"
        >
          {{ currentSlide.title }}
        </h1>
      </header>

      <div
        class="flex flex-1 flex-col items-center rounded-t-[3rem] bg-(--color-background-green-white-and-letter) px-8 pt-12 pb-8"
      >
        <div class="flex h-64 w-64 items-center justify-center rounded-full bg-(--color-light-green)">
          <img
            :src="currentSlide.image"
            alt="Ilustrasi onboarding"
            class="h-auto w-50 drop-shadow-[0_16px_28px_rgba(0,0,0,0.12)]"
          />
        </div>

        <div class="mt-auto flex flex-col items-center pt-10">
          <button
            type="button"
            class="text-[2rem] font-bold tracking-[-0.03em] text-(--color-letters-and-icons)"
            @click="handleAction"
          >
            {{ actionLabel }}
          </button>

          <div class="mt-5 flex items-center gap-3">
            <button
              v-for="(slide, index) in slides"
              :key="slide.title"
              type="button"
              class="flex h-4 w-4 items-center justify-center"
              @click="activeSlide = index"
            >
              <span
                class="block rounded-full border border-(--color-letters-and-icons)"
                :class="
                  index === activeSlide
                    ? 'h-3 w-3 border-(--color-main-green) bg-(--color-main-green)'
                    : 'h-3 w-3 bg-transparent'
                "
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
