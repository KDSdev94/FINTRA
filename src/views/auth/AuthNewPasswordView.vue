<script setup lang="ts">
import { ref } from 'vue'
import AuthField from '@/components/auth/AuthField.vue'
import AuthScreenLayout from '@/components/auth/AuthScreenLayout.vue'
import AppButton from '@/components/ui/AppButton.vue'

const newPassword = ref('password')
const confirmPassword = ref('password')
</script>

<template>
  <AuthScreenLayout title="Password Baru">
    <div class="mt-10 flex flex-1 flex-col">
      <div class="space-y-7">
        <AuthField
          v-model="newPassword"
          label="Password Baru"
          placeholder="Masukin password baru"
          type="password"
          :revealable="true"
        />

        <AuthField
          v-model="confirmPassword"
          label="Ulangi Password Baru"
          placeholder="Ketik ulang password baru"
          type="password"
          :revealable="true"
        />
      </div>

      <div class="mt-16 flex justify-center">
        <AppButton to="/auth/password-reset-success" min-width="12rem">
          Ganti Password
        </AppButton>
      </div>
    </div>
  </AuthScreenLayout>
</template>
