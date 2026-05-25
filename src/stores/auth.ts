import type { User } from 'firebase/auth'
import {
  applyActionCode,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updatePassword,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { deleteDoc, doc, getDoc, runTransaction, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

import { uploadProfileAvatar } from '@/lib/cloudinary'
import { toDateInputValue } from '@/lib/date'
import { auth, db } from '@/lib/firebase'
import { getStoredThemeMode, setThemeMode, type ThemeMode } from '@/theme/useTheme'

type SessionLike = {
  user: User
}

type AuthProfileDoc = {
  fullName?: string
  phoneNumber?: string
  birthDate?: string
  avatarUrl?: string
  pushNotifications?: boolean
  email?: string
  pin?: string
  userId?: string
  themePreference?: ThemeMode
  authProvider?: 'password' | 'google'
}

export type AuthProfile = {
  id: string
  userId: string
  fullName: string
  phoneNumber: string
  birthDate: string
  avatarUrl: string
  pushNotifications: boolean
  email: string
  pin: string
  themePreference: ThemeMode
}

const toProfile = (user: User, docData?: AuthProfileDoc | null): AuthProfile => ({
  id: user.uid,
  userId: docData?.userId ?? '',
  fullName: docData?.fullName ?? user.displayName ?? 'Pengguna Fintra',
  phoneNumber: docData?.phoneNumber ?? '',
  birthDate: toDateInputValue(docData?.birthDate),
  avatarUrl: docData?.avatarUrl || user.photoURL || '',
  pushNotifications: docData?.pushNotifications ?? true,
  email: docData?.email ?? user.email ?? '',
  pin: docData?.pin ?? '',
  themePreference: docData?.themePreference ?? getStoredThemeMode(),
})

const getOrigin = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:5173'
  }

  return window.location.origin
}

const getActionParams = () => {
  const params = new URLSearchParams(window.location.search)
  const mode = params.get('mode')
  const oobCode = params.get('oobCode')
  const continueUrl = params.get('continueUrl')

  if (mode && oobCode) {
    return { mode, oobCode, continueUrl }
  }

  if (!continueUrl) {
    return { mode: null, oobCode: null, continueUrl: null }
  }

  try {
    const nested = new URL(continueUrl)

    return {
      mode: nested.searchParams.get('mode'),
      oobCode: nested.searchParams.get('oobCode'),
      continueUrl: nested.searchParams.get('continueUrl') ?? continueUrl,
    }
  } catch {
    return { mode: null, oobCode: null, continueUrl }
  }
}

const getEmailActionContinueUrl = () => `${getOrigin()}/login?verified=1`
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

const isGoogleUser = (user: User) =>
  user.providerData.some((provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID)

const maxAvatarSize = 3 * 1024 * 1024

const getNextUserId = async () => {
  const counterRef = doc(db, 'counters', 'users')
  const newCount = await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef)
    const current = counterSnap.exists() ? (counterSnap.data().count as number) : 0
    const next = current + 1
    transaction.set(counterRef, { count: next }, { merge: true })
    return next
  })

  return String(newCount).padStart(6, '0')
}

const buildProfilePayload = (
  user: User,
  overrides: Partial<AuthProfileDoc> = {},
): AuthProfileDoc & { createdAt: unknown; updatedAt: unknown } => ({
  userId: overrides.userId ?? '',
  fullName: overrides.fullName ?? user.displayName ?? 'Pengguna Fintra',
  phoneNumber: overrides.phoneNumber ?? '',
  birthDate: toDateInputValue(overrides.birthDate),
  avatarUrl: overrides.avatarUrl ?? user.photoURL ?? '',
  pushNotifications: overrides.pushNotifications ?? true,
  email: overrides.email ?? user.email ?? '',
  pin: overrides.pin ?? '',
  themePreference: overrides.themePreference ?? getStoredThemeMode(),
  authProvider: overrides.authProvider ?? 'password',
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
})

const mapAuthError = (error: unknown) => {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : ''

  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'Email atau password salah.'
  }
  if (code === 'auth/email-already-in-use') {
    return 'Email ini sudah terdaftar. Coba login atau pakai email lain.'
  }
  if (code === 'auth/too-many-requests') {
    return 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.'
  }
  if (code === 'auth/invalid-action-code') {
    return 'Link konfirmasi sudah tidak valid atau sudah pernah dipakai.'
  }
  if (code === 'auth/missing-password') {
    return 'Password wajib diisi.'
  }
  if (code === 'auth/weak-password') {
    return 'Password terlalu lemah. Minimal 6 karakter.'
  }
  if (code === 'auth/invalid-email') {
    return 'Format email tidak valid.'
  }
  if (code === 'auth/network-request-failed') {
    return 'Koneksi internet bermasalah. Cek jaringan lalu coba lagi.'
  }
  if (code === 'auth/requires-recent-login') {
    return 'Sesi sudah lama. Silakan logout dan login ulang.'
  }
  if (code === 'auth/user-disabled') {
    return 'Akun ini sudah dinonaktifkan.'
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Login Google dibatalkan.'
  }
  if (code === 'auth/cancelled-popup-request') {
    return 'Permintaan login Google sebelumnya tergantikan. Coba sekali saja dan tunggu popup selesai.'
  }
  if (code === 'auth/account-exists-with-different-credential') {
    return 'Email ini sudah terhubung ke metode login lain.'
  }
  if (code === 'auth/operation-not-allowed') {
    return 'Login Google belum aktif di aplikasi.'
  }
  if (code === 'auth/popup-blocked') {
    return 'Popup Google gagal dipakai di browser ini. Coba sekali lagi, dan jangan klik tombol Google berulang.'
  }
  if (code === 'auth/unauthorized-domain') {
    return 'Domain aplikasi ini belum diizinkan untuk login Google.'
  }
  if (code === 'auth/invalid-api-key') {
    return 'Konfigurasi aplikasi tidak valid. Hubungi admin.'
  }
  if (code.startsWith('auth/')) {
    return `Login Google gagal (${code}).`
  }

  return 'Terjadi kesalahan. Coba lagi nanti.'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: null as SessionLike | null,
    user: null as User | null,
    profile: null as AuthProfile | null,
    initialized: false,
    loading: false,
    errorMessage: '',
    infoMessage: '',
    cooldownSeconds: 0,
    awaitingEmailConfirmation: false,
    pinVerified: false,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user?.emailVerified),
  },

  actions: {
    clearAuthState() {
      this.session = null
      this.user = null
      this.profile = null
      this.awaitingEmailConfirmation = false
      this.cooldownSeconds = 0
      this.pinVerified = false
    },

    async hydrateUser(user: User | null) {
      if (!user) {
        this.clearAuthState()
        return null
      }

      if (!user.emailVerified) {
        await firebaseSignOut(auth)
        this.clearAuthState()
        this.awaitingEmailConfirmation = true
        this.infoMessage = 'Email belum dikonfirmasi. Buka email Anda lalu klik link verifikasi.'
        return null
      }

      this.user = user
      this.session = { user }
      await this.ensureProfile(isGoogleUser(user))
      return user
    },

    async initialize() {
      if (this.initialized) {
        return
      }

      try {
        const redirectResult = await getRedirectResult(auth)

        if (redirectResult?.user) {
          await this.hydrateUser(redirectResult.user)
        }

        await new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
            unsubscribe()
            try {
              await this.hydrateUser(nextUser)
            } catch (error) {
              this.errorMessage = error instanceof Error ? error.message : 'Gagal menyinkronkan status login.'
              this.clearAuthState()
            }
            resolve()
          })
        })

        onAuthStateChanged(auth, async (nextUser) => {
          try {
            await this.hydrateUser(nextUser)
          } catch (error) {
            this.errorMessage = error instanceof Error ? error.message : 'Gagal menyinkronkan status login.'
            this.clearAuthState()
          }
        })
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Gagal menghubungkan layanan login.'
      } finally {
        this.initialized = true
      }
    },

    async ensureProfile(createIfMissing = false) {
      if (!this.user) {
        return
      }

      const profileRef = doc(db, 'users', this.user.uid)
      const snapshot = await getDoc(profileRef)

      if (!snapshot.exists()) {
        if (!createIfMissing) {
          this.profile = null
          return
        }

        const payload = buildProfilePayload(this.user, {
          userId: await getNextUserId(),
          authProvider: isGoogleUser(this.user) ? 'google' : 'password',
        })

        await setDoc(profileRef, payload)
        this.profile = toProfile(this.user, payload)
        setThemeMode(this.profile.themePreference)
        return
      }

      this.profile = toProfile(this.user, snapshot.data() as AuthProfileDoc)

      // Selalu sync foto dari Google untuk Google user
      if (isGoogleUser(this.user) && this.user.photoURL && this.profile.avatarUrl !== this.user.photoURL) {
        this.profile.avatarUrl = this.user.photoURL
        await setDoc(profileRef, { avatarUrl: this.user.photoURL, updatedAt: serverTimestamp() }, { merge: true })
      }

      setThemeMode(this.profile.themePreference)
    },

    async signIn(email: string, password: string) {
      this.loading = true
      this.errorMessage = ''
      this.infoMessage = ''
      this.cooldownSeconds = 0

      try {
        const credential = await signInWithEmailAndPassword(auth, email, password)

        if (!credential.user.emailVerified) {
          await sendEmailVerification(credential.user, {
            url: getEmailActionContinueUrl(),
          })
          await firebaseSignOut(auth)
          this.awaitingEmailConfirmation = true
          throw new Error('Email belum dikonfirmasi. Kami sudah kirim ulang link verifikasi ke email Anda.')
        }

        await this.hydrateUser(credential.user)
        this.awaitingEmailConfirmation = false
      } catch (error) {
        this.errorMessage = mapAuthError(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async signUp(payload: {
      fullName: string
      email: string
      phoneNumber: string
      birthDate: string
      password: string
    }) {
      this.loading = true
      this.errorMessage = ''
      this.infoMessage = ''
      this.cooldownSeconds = 0
      this.awaitingEmailConfirmation = false

      try {
        const credential = await createUserWithEmailAndPassword(auth, payload.email, payload.password)

        await updateFirebaseProfile(credential.user, {
          displayName: payload.fullName,
        })

        const userId = await getNextUserId()

        await setDoc(
          doc(db, 'users', credential.user.uid),
          buildProfilePayload(credential.user, {
            userId,
            fullName: payload.fullName,
            phoneNumber: payload.phoneNumber,
            birthDate: toDateInputValue(payload.birthDate),
            avatarUrl: '',
            email: payload.email,
            authProvider: 'password',
          }),
        )

        await sendEmailVerification(credential.user, {
          url: getEmailActionContinueUrl(),
        })

        await firebaseSignOut(auth)
        this.clearAuthState()
        this.awaitingEmailConfirmation = true
        this.infoMessage =
          'Akun berhasil dibuat. Buka email Anda lalu klik link konfirmasi supaya akun tersambung ke aplikasi.'
      } catch (error) {
        this.errorMessage = mapAuthError(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async signInWithGoogle() {
      if (this.loading) {
        return
      }

      this.loading = true
      this.errorMessage = ''
      this.infoMessage = ''
      this.cooldownSeconds = 0

      try {
        const credential = await signInWithPopup(auth, googleProvider)
        await this.hydrateUser(credential.user)
      } catch (error) {
        const code = (error as { code?: string })?.code ?? ''

        if (code === 'auth/cancelled-popup-request' || code === 'auth/popup-closed-by-user') {
          return
        }

        this.errorMessage =
          error instanceof Error && !code.startsWith('auth/')
            ? error.message
            : mapAuthError(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      await firebaseSignOut(auth)
      this.clearAuthState()
    },

    async updateProfile(payload: {
      fullName: string
      phoneNumber: string
      birthDate: string
      pushNotifications: boolean
    }) {
      if (!this.user) {
        return
      }

      this.loading = true
      this.errorMessage = ''

      try {
        if (payload.fullName !== (this.user.displayName ?? '')) {
          await updateFirebaseProfile(this.user, {
            displayName: payload.fullName,
          })
        }

        await setDoc(
          doc(db, 'users', this.user.uid),
          {
            userId: this.profile?.userId ?? '',
            fullName: payload.fullName,
            phoneNumber: payload.phoneNumber,
            birthDate: toDateInputValue(payload.birthDate),
            pushNotifications: payload.pushNotifications,
            email: this.user.email ?? '',
            avatarUrl: this.profile?.avatarUrl ?? this.user.photoURL ?? '',
            pin: this.profile?.pin ?? '',
            themePreference: this.profile?.themePreference ?? getStoredThemeMode(),
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        )

        this.profile = {
          id: this.user.uid,
          userId: this.profile?.userId ?? '',
          fullName: payload.fullName,
          phoneNumber: payload.phoneNumber,
          birthDate: toDateInputValue(payload.birthDate),
          avatarUrl: this.profile?.avatarUrl ?? this.user.photoURL ?? '',
          pushNotifications: payload.pushNotifications,
          email: this.user.email ?? '',
          pin: this.profile?.pin ?? '',
          themePreference: this.profile?.themePreference ?? getStoredThemeMode(),
        }
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Gagal menyimpan profil.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateAvatar(file: File) {
      if (!this.user) {
        throw new Error('User tidak ditemukan.')
      }

      this.errorMessage = ''

      if (!file.type.startsWith('image/')) {
        throw new Error('File harus berupa gambar.')
      }

      if (file.size > maxAvatarSize) {
        throw new Error('Ukuran foto maksimal 3 MB.')
      }

      try {
        const avatarUrl = await uploadProfileAvatar(file, this.user.uid)

        await updateFirebaseProfile(this.user, {
          photoURL: avatarUrl,
        })

        await setDoc(
          doc(db, 'users', this.user.uid),
          {
            avatarUrl,
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        )

        if (this.profile) {
          this.profile.avatarUrl = avatarUrl
        }

        return avatarUrl
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Gagal mengganti foto profil.'
        throw error
      }
    },

    async finalizeEmailConfirmation() {
      const { mode, oobCode, continueUrl } = getActionParams()

      if (mode !== 'verifyEmail' || !oobCode) {
        throw new Error('Link konfirmasi tidak valid.')
      }

      await applyActionCode(auth, oobCode)

      if (this.user?.uid) {
        await updateDoc(doc(db, 'users', this.user.uid), {
          updatedAt: serverTimestamp(),
        })
      }

      this.clearAuthState()
      this.infoMessage = 'Email berhasil dikonfirmasi. Silakan login untuk masuk ke aplikasi.'

      return continueUrl
    },

    async setPin(pin: string) {
      if (!this.user) return
      await setDoc(doc(db, 'users', this.user.uid), { pin }, { merge: true })
      if (this.profile) this.profile.pin = pin
      this.pinVerified = true
    },

    async updateThemePreference(themePreference: ThemeMode) {
      setThemeMode(themePreference)

      if (!this.user) {
        return
      }

      await setDoc(
        doc(db, 'users', this.user.uid),
        {
          themePreference,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      )

      if (this.profile) {
        this.profile.themePreference = themePreference
      }
    },

    verifyPin(input: string): boolean {
      if (this.profile?.pin === input) {
        this.pinVerified = true
        return true
      }
      return false
    },

    async resetPassword(email: string) {
      this.loading = true
      this.errorMessage = ''
      try {
        await sendPasswordResetEmail(auth, email)
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Gagal mengirim email reset.'
        throw error
      } finally {
        this.loading = false
      }
    },

    async changePassword(currentPassword: string, newPassword: string) {
      if (!this.user?.email) throw new Error('User tidak ditemukan.')
      this.loading = true
      this.errorMessage = ''
      try {
        const credential = EmailAuthProvider.credential(this.user.email, currentPassword)
        await reauthenticateWithCredential(this.user, credential)
        await updatePassword(this.user, newPassword)
      } catch (error) {
        this.errorMessage = mapAuthError(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteAccount(password: string) {
      if (!this.user?.email) throw new Error('User tidak ditemukan.')
      this.loading = true
      this.errorMessage = ''
      try {
        const credential = EmailAuthProvider.credential(this.user.email, password)
        await reauthenticateWithCredential(this.user, credential)
        await deleteDoc(doc(db, 'users', this.user.uid))
        await this.user.delete()
        this.clearAuthState()
      } catch (error) {
        this.errorMessage = mapAuthError(error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
