<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthField from '@/components/auth/AuthField.vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const password = ref('')
const showConfirm = ref(false)
const loading = ref(false)
const error = ref('')

const handleDelete = async () => {
  error.value = ''
  loading.value = true
  try {
    await authStore.deleteAccount(password.value)
    router.replace('/login')
  } catch {
    error.value = authStore.errorMessage || 'Gagal menghapus akun.'
    showConfirm.value = false
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <MobilePageShell
    title="Hapus Akun"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-8 pb-28"
  >
    <div class="flex-1 text-center">
      <h2 class="mx-auto max-w-60 text-[1.3rem] font-semibold leading-snug text-(--color-primary-text)">
        Yakin Mau Hapus Akun Lu?
      </h2>

      <div class="mx-auto mt-6 rounded-[18px] bg-(--color-surface-background) px-5 py-5 text-left text-[0.8rem] leading-5 text-(--color-muted-text)/85">
        <ul class="list-disc space-y-2 pl-4">
          <li>Semua data transaksi, kategori, dan tabungan bakal lenyap.</li>
          <li>Akun tidak bisa diakses lagi setelah dihapus.</li>
          <li>Keputusan ini final dan tidak bisa di-undo.</li>
        </ul>
      </div>

      <div class="mt-8">
        <AuthField v-model="password" label="" placeholder="Masukin password untuk konfirmasi" type="password" :revealable="true" />
      </div>

      <p v-if="error" class="mt-4 text-sm font-medium text-(--color-ocean-blue-button)">{{ error }}</p>

      <AppButton class="mx-auto mt-8" min-width="12rem" @click="showConfirm = true">
        Iya, Hapus Akun
      </AppButton>

      <AppButton class="mx-auto mt-4" variant="soft" min-width="10rem" @click="router.back()">
        Batal
      </AppButton>
    </div>

    <div
      v-if="showConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,19,20,0.42)] px-8"
    >
      <div class="w-full max-w-[18rem] rounded-[24px] bg-(--color-panel-background) px-7 py-8 text-center shadow-xl">
        <h2 class="text-[1.5rem] font-bold text-(--color-primary-text)">Hapus Akun</h2>
        <p class="mt-4 text-[0.88rem] leading-5 text-(--color-muted-text)/85">
          Semua data akan dihapus permanen. Lanjut?
        </p>
        <AppButton class="mt-6" full :loading="loading" @click="handleDelete">
          Ya, Hapus Permanen
        </AppButton>
        <AppButton class="mt-3" variant="soft" full @click="showConfirm = false">
          Batal
        </AppButton>
      </div>
    </div>
  </MobilePageShell>
</template>
