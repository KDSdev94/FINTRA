# Fintra

Frontend Fintra sekarang disiapkan memakai Firebase Auth dan Firestore untuk autentikasi serta data per-user.

## Setup

1. Copy `.env.example` menjadi `.env`
2. Isi semua variabel `VITE_FIREBASE_*`
3. Di Firebase Console, aktifkan `Authentication > Sign-in method > Email/Password`
4. Di Firebase Console, tambahkan domain app Anda ke `Authentication > Settings > Authorized domains`
5. Aktifkan Firestore Database untuk project yang sama
6. Jalankan `bun install`
7. Jalankan `bun run dev`

## Yang Sudah Terkoneksi

- Login dan signup lewat Firebase Auth
- Verifikasi email lewat Firebase action link
- Profil user di dokumen `users/{uid}`
- Kategori di subcollection `users/{uid}/categories`
- Target tabungan di subcollection `users/{uid}/savingsGoals`
- Transaksi pemasukan, pengeluaran, dan tabungan di subcollection `users/{uid}/transactions`
