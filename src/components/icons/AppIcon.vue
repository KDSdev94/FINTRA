<script setup lang="ts">
defineProps<{
  name:
    | 'bell'
    | 'car'
    | 'stack'
    | 'food'
    | 'salary'
    | 'groceries'
    | 'rent'
    | 'home'
    | 'chart'
    | 'arrows'
    | 'layers'
    | 'user'
    | 'arrow-left'
    | 'search'
    | 'calendar'
    | 'income'
    | 'expense'
    | 'transport'
    | 'medicine'
    | 'gift'
    | 'savings'
    | 'ticket'
    | 'plus'
    | 'chevron-down'
    | 'plane'
    | 'wedding'
    | 'profile-edit'
    | 'shield'
    | 'settings'
    | 'support'
    | 'logout'
    | 'camera'
    | 'chevron-right'
    | 'fingerprint'
    | 'google'
    | 'key'
    | 'trash-user'
}>()
</script>

<template>
  <svg
    v-if="name === 'arrow-left'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5" />
    <path d="m11 18-6-6 6-6" />
  </svg>

  <svg
    v-else-if="name === 'bell'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M15 17H9a3 3 0 0 1-3-3v-2.5a6 6 0 1 1 12 0V14a3 3 0 0 1-3 3Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>

  <svg
    v-else-if="name === 'search'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.35-4.35" />
  </svg>

  <svg
    v-else-if="name === 'calendar'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="6" width="16" height="14" rx="2" />
    <path d="M8 4v4" />
    <path d="M16 4v4" />
    <path d="M4 10h16" />
  </svg>

  <svg
    v-else-if="name === 'income'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8 16 16 8" />
    <path d="M11 8h5v5" />
  </svg>

  <svg
    v-else-if="name === 'expense'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8 8h5v5" />
    <path d="m16 16-8-8" />
  </svg>

  <svg
    v-else-if="name === 'transport'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="6" y="4" width="12" height="14" rx="2" />
    <path d="M6 9h12" />
    <path d="M9 18v2" />
    <path d="M15 18v2" />
    <path d="M9 7h.01" />
    <path d="M15 7h.01" />
  </svg>

  <svg
    v-else-if="name === 'medicine'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M8.5 8.5a3.2 3.2 0 0 1 4.5 0l2.5 2.5a3.2 3.2 0 0 1 0 4.5 3.2 3.2 0 0 1-4.5 0l-2.5-2.5a3.2 3.2 0 0 1 0-4.5Z" />
    <path d="m9 15 6-6" />
  </svg>

  <svg
    v-else-if="name === 'gift'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="9" width="16" height="11" rx="2" />
    <path d="M12 9v11" />
    <path d="M4 13h16" />
    <path d="M8.5 9C7 9 6 8.2 6 7s1-2 2.5-2c2 0 3.5 2.3 3.5 4" />
    <path d="M15.5 9C17 9 18 8.2 18 7s-1-2-2.5-2c-2 0-3.5 2.3-3.5 4" />
  </svg>

  <svg
    v-else-if="name === 'savings'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="10" cy="7" rx="5" ry="2.5" />
    <path d="M5 7v7c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7" />
    <path d="M15 10.5c2.3 0 4 1.2 4 2.7s-1.7 2.8-4 2.8" />
    <path d="M17 11.5v7" />
    <path d="M19 13.5h-4" />
  </svg>

  <svg
    v-else-if="name === 'ticket'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M6 7h12a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2.5 2.5 0 0 0 0-5V9a2 2 0 0 1 2-2Z" />
    <path d="M12 7v13" />
  </svg>

  <svg
    v-else-if="name === 'plus'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>

  <svg
    v-else-if="name === 'chevron-down'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>

  <svg
    v-else-if="name === 'plane'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m3 14 18-7-6 10-3-3-4 2z" />
    <path d="m12 14-2 5" />
  </svg>

  <svg
    v-else-if="name === 'wedding'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="8.5" cy="13.5" r="4.5" />
    <circle cx="15.5" cy="10.5" r="4.5" />
    <path d="M7 8.5 9 6l1.5 2" />
    <path d="M14 5.5 16 3l1.5 2" />
  </svg>

  <svg
    v-else-if="name === 'profile-edit'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 19a7 7 0 0 1 14 0" />
  </svg>

  <svg
    v-else-if="name === 'shield'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3 6 5.5v5.7c0 4 2.6 7.7 6 9.8 3.4-2.1 6-5.8 6-9.8V5.5L12 3Z" />
    <path d="m9.5 12 1.8 1.8 3.7-3.7" />
  </svg>

  <svg
    v-else-if="name === 'settings'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1Z" />
  </svg>

  <svg
    v-else-if="name === 'support'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12a8 8 0 1 1 16 0" />
    <path d="M6 13v4a2 2 0 0 0 2 2h1.5" />
    <path d="M18 13v4a2 2 0 0 1-2 2h-1.5" />
    <path d="M9.5 18.5v.5a2 2 0 0 0 2 2h1" />
    <path d="M8 12a2 2 0 0 1 2-2h.5" />
    <path d="M16 12a2 2 0 0 0-2-2h-.5" />
  </svg>

  <svg
    v-else-if="name === 'logout'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M10 17H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
    <path d="M14 16l5-4-5-4" />
    <path d="M19 12H9" />
  </svg>

  <svg
    v-else-if="name === 'camera'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M4 8h3l1.4-2h7.2L17 8h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" />
    <circle cx="12" cy="14" r="3.5" />
  </svg>

  <svg
    v-else-if="name === 'chevron-right'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m9 6 6 6-6 6" />
  </svg>

  <svg
    v-else-if="name === 'fingerprint'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3.8a5.8 5.8 0 0 1 5.8 5.8" />
    <path d="M6.3 8.5A5.7 5.7 0 0 1 17 11.2" />
    <path d="M5.8 11.5c0-3.4 2.8-6.2 6.2-6.2 2.2 0 4.2 1.1 5.3 2.9" />
    <path d="M8.3 20.2c-2.2-2.1-3.6-5-3.6-8.2" />
    <path d="M12 18.8c-2-1.4-3.4-3.8-3.4-6.5 0-1.9 1.5-3.4 3.4-3.4 1.1 0 2.1.5 2.7 1.3" />
    <path d="M16.1 19.1c-2.8-1.1-4.8-3.8-4.8-7 0-.8.7-1.5 1.5-1.5.5 0 .9.2 1.2.6l2.2 2.6" />
    <path d="M19 16.3c-.3 1.6-1 3-2 4.2" />
  </svg>

  <svg
    v-else-if="name === 'google'"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.63v3.01h3.88c2.27-2.09 3.55-5.16 3.55-8.67Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.08.72-2.45 1.14-4.06 1.14-3.12 0-5.75-2.11-6.69-4.95H1.3v3.1A11.99 11.99 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.31 14.27A7.2 7.2 0 0 1 4.94 12c0-.79.14-1.55.37-2.27v-3.1H1.3A12 12 0 0 0 0 12c0 1.94.46 3.77 1.3 5.37l4.01-3.1Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.3 6.63l4.01 3.1c.94-2.84 3.57-4.96 6.69-4.96Z"
    />
  </svg>

  <svg
    v-else-if="name === 'key'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="12" r="4" />
    <path d="M12 12h8" />
    <path d="M17 12v3" />
    <path d="M20 12v2" />
  </svg>

  <svg
    v-else-if="name === 'trash-user'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="8" r="3" />
    <path d="M4 18a5 5 0 0 1 10 0" />
    <path d="M16 7h5" />
    <path d="M18.5 5v8" />
  </svg>

  <svg
    v-else-if="name === 'car'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M5 14.5h14l-1.2-4.2A2 2 0 0 0 15.9 9H8.1a2 2 0 0 0-1.9 1.3L5 14.5Z" />
    <path d="M4 14.5v2a1.5 1.5 0 0 0 1.5 1.5H6v1.5" />
    <path d="M20 14.5v2a1.5 1.5 0 0 1-1.5 1.5H18v1.5" />
    <circle cx="8" cy="15.5" r="1" />
    <circle cx="16" cy="15.5" r="1" />
  </svg>

  <svg
    v-else-if="name === 'stack'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 4 4 8l8 4 8-4-8-4Z" />
    <path d="m4 12 8 4 8-4" />
    <path d="m4 16 8 4 8-4" />
  </svg>

  <svg
    v-else-if="name === 'food'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M7 4v6" />
    <path d="M10 4v6" />
    <path d="M7 7h3" />
    <path d="M8.5 10v10" />
    <path d="M16 4c1.7 2 1.7 4.7 0 8v8" />
  </svg>

  <svg
    v-else-if="name === 'salary'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="7" width="16" height="10" rx="2" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
  </svg>

  <svg
    v-else-if="name === 'groceries'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M8 7h10l-1 10H7L6 9" />
    <path d="M6 9 5 6H3" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>

  <svg
    v-else-if="name === 'rent'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m4 11 8-6 8 6" />
    <path d="M6 10v9h12v-9" />
    <path d="M10 19v-4h4v4" />
  </svg>

  <svg
    v-else-if="name === 'home'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m4 11 8-6 8 6" />
    <path d="M6 10v9h12v-9" />
  </svg>

  <svg
    v-else-if="name === 'chart'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <path d="M8 16v-4" />
    <path d="M12 16V8" />
    <path d="M16 16v-6" />
  </svg>

  <svg
    v-else-if="name === 'arrows'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M4 8h13" />
    <path d="m14 5 3 3-3 3" />
    <path d="M20 16H7" />
    <path d="m10 13-3 3 3 3" />
  </svg>

  <svg
    v-else-if="name === 'layers'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 4 4 8l8 4 8-4-8-4Z" />
    <path d="m4 12 8 4 8-4" />
    <path d="m4 16 8 4 8-4" />
  </svg>

  <svg
    v-else
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 19a7 7 0 0 1 14 0" />
  </svg>
</template>
