import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const requiredFirebaseEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const missingFirebaseEnv = Object.entries(requiredFirebaseEnv)
  .filter(([, value]) => !value)
  .map(([key]) => key)

if (missingFirebaseEnv.length > 0) {
  throw new Error(`Firebase env belum lengkap: ${missingFirebaseEnv.join(', ')}`)
}

const firebaseConfig = {
  apiKey: requiredFirebaseEnv.apiKey,
  authDomain: requiredFirebaseEnv.authDomain,
  projectId: requiredFirebaseEnv.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: requiredFirebaseEnv.messagingSenderId,
  appId: requiredFirebaseEnv.appId,
}

export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
