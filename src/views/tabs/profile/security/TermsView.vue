<script setup lang="ts">
import { ref } from 'vue'
import MobilePageShell from '@/components/layouts/MobilePageShell.vue'
import AppButton from '@/components/ui/AppButton.vue'

const accepted = ref(true)
</script>

<template>
  <MobilePageShell
    title="Syarat & Ketentuan"
    back-to="/profile/security"
    active-nav="profil"
    panel-inner-class="flex flex-1 flex-col px-6 pt-8 pb-28"
  >
    <div class="flex-1 overflow-y-auto">
      <h2 class="text-[1.02rem] font-semibold text-(--color-primary-text)">
        Biar Sama-Sama Enak
      </h2>

      <div class="mt-5 space-y-4 text-[0.78rem] leading-5 text-(--color-muted-text)/85">
        <p>
          Dengan pakai Fintra, lu setuju buat pakai aplikasi ini dengan wajar dan nggak nyalahgunain fitur yang ada. Kita juga bakal jaga data lu sebaik mungkin.
        </p>

        <ol class="list-decimal space-y-1 pl-4">
          <li>Data transaksi yang lu masukin tetap jadi tanggung jawab lu.</li>
          <li>Jangan bagiin akun ke orang lain tanpa alasan yang jelas.</li>
          <li>Aktifin pengaman tambahan kalau mau akun lebih aman.</li>
          <li>Kita bisa update fitur atau aturan kalau memang dibutuhin.</li>
        </ol>

        <p>
          Kalau ada perubahan penting soal layanan atau privasi, kita bakal kasih tahu lewat aplikasi. Jadi lu nggak bakal ketinggalan info penting.
        </p>

        <ul class="list-disc space-y-1 pl-4">
          <li>Lu bisa berhenti pakai aplikasi kapan aja.</li>
          <li>Kalau ada kendala, tim support siap bantuin.</li>
        </ul>

        <p>
          Intinya simpel: pakai aplikasi ini dengan aman, jaga akun lu, dan manfaatin fitur buat bantu ngatur duit biar nggak boncos.
        </p>

        <p>
          Mau baca versi lengkapnya?
          <br />
          <span class="text-(--color-ocean-blue-button) underline">www.fintra.app</span>
        </p>
      </div>

      <label class="mt-6 flex items-center gap-3 text-[0.82rem] font-medium text-(--color-primary-text)">
        <input
          v-model="accepted"
          type="checkbox"
          class="h-4 w-4 rounded border-(--color-primary-text) accent-(--color-main-green)"
        />
        Gue setuju sama semua syarat dan ketentuannya
      </label>

      <AppButton class="mx-auto mt-5" size="lg" min-width="9rem">
        Oke, Setuju
      </AppButton>
    </div>
  </MobilePageShell>
</template>
