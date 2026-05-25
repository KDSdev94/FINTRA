<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import { helpContactItems, helpFaqItems, type HelpTabKey } from '@/data/profile/help'

const router = useRouter()
const activeTab = ref<HelpTabKey>('faq')
const search = ref('')
</script>

<template>
  <MobilePageShell
    title="Help & FAQs"
    back-to="/profile"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-8 pb-28"
  >
    <div class="text-center">
      <h2 class="text-[1rem] font-medium text-(--color-primary-text)">
        How Can We Help You?
      </h2>
    </div>

    <div class="mt-5 flex rounded-full bg-(--color-segmented-background) p-1">
      <button
        type="button"
        class="flex-1 rounded-full py-2.5 text-[0.9rem] font-medium"
        :class="activeTab === 'faq' ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'text-(--color-segmented-inactive-text)'"
        @click="activeTab = 'faq'"
      >
        FAQ
      </button>
      <button
        type="button"
        class="flex-1 rounded-full py-2.5 text-[0.9rem] font-medium"
        :class="activeTab === 'contact' ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'text-(--color-segmented-inactive-text)'"
        @click="activeTab = 'contact'"
      >
        Contact Us
      </button>
    </div>

    <div class="mt-3 flex rounded-full bg-(--color-segmented-background) px-2 py-1 text-[0.78rem] font-medium text-(--color-segmented-inactive-text)">
      <div class="flex-1 text-center">General</div>
      <div class="flex-1 text-center">Account</div>
      <div class="flex-1 text-center">Services</div>
    </div>

    <input
      v-model="search"
      type="text"
      placeholder="Search"
      class="mt-3 h-9 rounded-[10px] border border-(--color-main-green) bg-transparent px-4 text-[0.8rem] text-(--color-primary-text) placeholder:text-(--color-muted-text)/65 focus:outline-none"
    />

    <div class="mt-5 flex-1 overflow-y-auto">
      <div v-if="activeTab === 'faq'" class="space-y-4">
        <button
          v-for="item in helpFaqItems"
          :key="item"
          type="button"
          class="flex w-full items-center justify-between gap-4 text-left text-[0.84rem] font-medium text-(--color-primary-text)"
        >
          <span>{{ item }}</span>
          <AppIcon name="chevron-down" class="h-4 w-4 shrink-0" />
        </button>
      </div>

      <div v-else class="space-y-4">
        <button
          v-for="item in helpContactItems"
          :key="item"
          type="button"
          class="flex w-full items-center justify-between gap-4 text-left"
          @click="router.push('/profile/help/support')"
        >
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)">
              <AppIcon name="support" class="h-4.5 w-4.5" />
            </div>
            <span class="text-[0.92rem] font-medium text-(--color-primary-text)">
              {{ item }}
            </span>
          </div>
          <AppIcon name="chevron-right" class="h-4.5 w-4.5 text-(--color-primary-text)" />
        </button>
      </div>
    </div>
  </MobilePageShell>
</template>
