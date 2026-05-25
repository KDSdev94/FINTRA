<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppIcon from "@/components/icons/AppIcon.vue";

const router = useRouter()

defineProps<{
  labels: string[];
  greenBars: number[];
  blueBars: number[];
  leftTicks: string[];
  incomeLabel: string;
  incomeValue: string;
  expenseLabel: string;
  expenseValue: string;
}>();
</script>

<template>
  <div>
    <div class="rounded-[28px] bg-(--color-surface-background) px-5 pt-5 pb-4">
      <div class="mb-4 flex items-center justify-between">
        <h2
          class="text-[1.15rem] font-semibold text-(--color-primary-text)"
        >
          Masuk & Cabut
        </h2>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)"
            @click="router.push('/search')"
          >
            <AppIcon name="search" class="h-4 w-4" />
          </button>

          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)"
            @click="router.push('/calendar')"
          >
            <AppIcon name="calendar" class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between pb-8 pt-2"
        >
          <span
            v-for="tick in leftTicks"
            :key="tick"
            class="text-[0.78rem] font-medium leading-none text-(--color-light-blue-button)"
          >
            {{ tick }}
          </span>
        </div>

        <div class="ml-8">
          <div
            class="grid h-[150px] grid-rows-4 gap-0 border-b border-[rgba(14,62,62,0.55)]"
          >
            <div
              v-for="row in 4"
              :key="row"
              class="border-b border-dotted border-[rgba(109,182,254,0.8)] last:border-b-0"
            />
          </div>

          <div
            class="mt-[-150px] flex h-[150px] items-end justify-between px-2"
          >
            <div
              v-for="label in labels"
              :key="label"
              class="flex w-8 flex-col items-center justify-end gap-1"
            >
              <div class="flex h-[118px] items-end gap-[5px]">
                <span
                  class="block w-[6px] rounded-full bg-[#11CFA4]"
                  :style="{ height: `${greenBars[labels.indexOf(label)]}%` }"
                />
                <span
                  class="block w-[6px] rounded-full bg-[#1E63F0]"
                  :style="{ height: `${blueBars[labels.indexOf(label)]}%` }"
                />
              </div>
              <span
                class="pt-2 text-[0.78rem] font-medium text-(--color-primary-text)"
              >
                {{ label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-6 px-4">
      <div class="text-center">
        <div
          class="mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-(--color-main-green)"
        >
          <AppIcon name="income" class="h-7 w-7" />
        </div>
        <p
          class="mt-2 text-[1rem] text-(--color-primary-text)"
        >
          {{ incomeLabel }}
        </p>
        <p
          class="text-[1.05rem] font-bold text-(--color-primary-text)"
        >
          {{ incomeValue }}
        </p>
      </div>

      <div class="text-center">
        <div
          class="mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-(--color-ocean-blue-button)"
        >
          <AppIcon name="expense" class="h-7 w-7" />
        </div>
        <p
          class="mt-2 text-[1rem] text-(--color-background-dark-mode-and-letters)"
        >
          {{ expenseLabel }}
        </p>
        <p
          class="text-[1.05rem] font-bold text-(--color-ocean-blue-button)"
        >
          {{ expenseValue }}
        </p>
      </div>
    </div>
  </div>
</template>
