<script setup lang="ts">
import { ref } from 'vue'

import AppIcon from '@/components/icons/AppIcon.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'
import {
  activeSupportChats,
  endedSupportChats,
  supportConversation,
  type SupportTabKey,
  type SupportViewKey,
} from '@/data/profile/help'

const currentView = ref<SupportViewKey>('list')
const supportTab = ref<SupportTabKey>('assistant')
const message = ref('')
</script>

<template>
  <MobilePageShell
    title="Online Support"
    back-to="/profile/help"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-8 pb-28"
  >
    <div v-if="currentView === 'list'" class="flex-1 overflow-y-auto">
      <h2 class="text-[0.9rem] font-medium text-(--color-primary-text)">
        Active Chats
      </h2>

      <div class="mt-4 space-y-3">
        <button
          v-for="item in activeSupportChats"
          :key="item.title"
          type="button"
          class="flex w-full items-center gap-3 rounded-[14px] bg-(--color-surface-background) px-3 py-3 text-left"
          @click="currentView = 'chat'"
        >
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)">
            <AppIcon name="support" class="h-5 w-5" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-[0.84rem] font-semibold text-(--color-primary-text)">
              {{ item.title }}
            </p>
            <p class="truncate text-[0.72rem] text-(--color-muted-text)/80">
              {{ item.subtitle }}
            </p>
          </div>
          <span class="text-[0.62rem] text-(--color-muted-text)/75">{{ item.time }}</span>
        </button>
      </div>

      <h2 class="mt-8 text-[0.9rem] font-medium text-(--color-primary-text)">
        Ended Chats
      </h2>

      <div class="mt-4 space-y-3">
        <div
          v-for="item in endedSupportChats"
          :key="item.title + item.time"
          class="flex w-full items-center gap-3 rounded-[14px] bg-(--color-surface-background) px-3 py-3 text-left"
        >
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)">
            <AppIcon name="support" class="h-5 w-5" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-[0.84rem] font-semibold text-(--color-primary-text)">
              {{ item.title }}
            </p>
            <p class="truncate text-[0.72rem] text-(--color-muted-text)/80">
              {{ item.subtitle }}
            </p>
          </div>
          <span class="text-[0.62rem] text-(--color-muted-text)/75">{{ item.time }}</span>
        </div>
      </div>

      <AppButton class="mx-auto mt-8" min-width="12rem" @click="currentView = 'chat'">
        Start Another Chat
      </AppButton>
    </div>

    <div v-else class="flex flex-1 flex-col">
      <div class="flex rounded-full bg-(--color-segmented-background) p-1">
        <button
          type="button"
          class="flex-1 rounded-full py-2.5 text-[0.84rem] font-medium"
          :class="supportTab === 'assistant' ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'text-(--color-segmented-inactive-text)'"
          @click="supportTab = 'assistant'"
        >
          Support Assistant
        </button>
        <button
          type="button"
          class="flex-1 rounded-full py-2.5 text-[0.84rem] font-medium"
          :class="supportTab === 'help' ? 'bg-(--color-main-green) text-(--color-background-dark-mode-and-letters)' : 'text-(--color-segmented-inactive-text)'"
          @click="supportTab = 'help'"
        >
          Help Center
        </button>
      </div>

      <div class="mt-5 flex-1 space-y-4 overflow-y-auto">
        <template
          v-for="bubble in supportConversation"
          :key="bubble.text + (bubble.time ?? '')"
        >
          <div
            class="rounded-[14px] px-3 py-2 text-[0.72rem]"
            :class="[
              bubble.side === 'right' ? 'ml-auto text-(--color-background-dark-mode-and-letters) max-w-50' : 'text-(--color-muted-text)/85 max-w-52',
              bubble.tone === 'accent' ? 'bg-(--color-main-green)' : 'bg-(--color-surface-background)',
            ]"
          >
            {{ bubble.text }}
          </div>
          <p
            v-if="bubble.time"
            class="text-[0.62rem] text-(--color-muted-text)/75"
            :class="bubble.side === 'right' ? 'text-right' : ''"
          >
            {{ bubble.time }}
          </p>
        </template>
      </div>

      <div class="mt-4 flex items-center gap-2 rounded-[14px] bg-(--color-main-green) px-3 py-2">
        <button type="button" class="flex h-6 w-6 items-center justify-center rounded-full bg-(--color-input-background) text-(--color-main-green)">
          <AppIcon name="camera" class="h-3.5 w-3.5" />
        </button>
        <input
          v-model="message"
          type="text"
          placeholder="Write Here..."
          class="h-7 flex-1 rounded-full bg-(--color-input-background) px-3 text-[0.72rem] text-(--color-input-text) placeholder:text-(--color-muted-text)/65 focus:outline-none"
        />
        <button type="button" class="flex h-6 w-6 items-center justify-center rounded-full bg-(--color-input-background) text-(--color-main-green)">
          <AppIcon name="support" class="h-3.5 w-3.5" />
        </button>
        <button type="button" class="flex h-6 w-6 items-center justify-center rounded-full bg-(--color-input-background) text-(--color-main-green)">
          <AppIcon name="plane" class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </MobilePageShell>
</template>
