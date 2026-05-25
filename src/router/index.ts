import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFinanceStore } from '@/stores/finance'
import { pinia } from '@/stores/pinia'

// Onboarding
import LaunchView from '@/views/onboarding/LaunchView.vue'

// Auth
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import SecurityPinView from '@/views/auth/SecurityPinView.vue'
import AuthNewPasswordView from '@/views/auth/AuthNewPasswordView.vue'
import AuthPasswordResetSuccessView from '@/views/auth/AuthPasswordResetSuccessView.vue'
import AuthConfirmView from '@/views/auth/AuthConfirmView.vue'

// Main tabs
import HomeView from '@/views/tabs/home/HomeView.vue'
import AnalysisView from '@/views/tabs/analysis/AnalysisView.vue'
import SearchView from '@/views/tabs/analysis/SearchView.vue'
import CalendarView from '@/views/tabs/analysis/CalendarView.vue'
import TransactionView from '@/views/tabs/transaction/TransactionView.vue'
import TransactionTopupView from '@/views/tabs/transaction/TransactionTopupView.vue'
import TransactionDetailView from '@/views/tabs/transaction/TransactionDetailView.vue'
import CategoriesView from '@/views/tabs/categories/CategoriesView.vue'
import CategoryDetailView from '@/views/tabs/categories/CategoryDetailView.vue'
import CategoryEntryFormView from '@/views/tabs/categories/CategoryEntryFormView.vue'
import SavingsGoalFormView from '@/views/tabs/categories/SavingsGoalFormView.vue'
import ProfileView from '@/views/tabs/profile/ProfileView.vue'
import EditProfileView from '@/views/tabs/profile/EditProfileView.vue'

// Profile > Security
import SecurityView from '@/views/tabs/profile/security/SecurityView.vue'
import ChangePinView from '@/views/tabs/profile/security/ChangePinView.vue'
import PinChangedSuccessView from '@/views/tabs/profile/security/PinChangedSuccessView.vue'
import TermsView from '@/views/tabs/profile/security/TermsView.vue'

// Profile > Settings
import SettingsView from '@/views/tabs/profile/settings/SettingsView.vue'
import NotificationSettingsView from '@/views/tabs/profile/settings/NotificationSettingsView.vue'
import PasswordSettingsView from '@/views/tabs/profile/settings/PasswordSettingsView.vue'
import PasswordChangedSuccessView from '@/views/tabs/profile/settings/PasswordChangedSuccessView.vue'
import DeleteAccountView from '@/views/tabs/profile/settings/DeleteAccountView.vue'
import ThemeSettingsView from '@/views/tabs/profile/settings/ThemeSettingsView.vue'

// Profile > Help
import HelpCenterView from '@/views/tabs/profile/help/HelpCenterView.vue'
import OnlineSupportView from '@/views/tabs/profile/help/OnlineSupportView.vue'

// Shared screens
import NotificationView from '@/views/common/NotificationView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Onboarding
    {
      path: '/',
      name: 'launch',
      component: LaunchView,
    },

    // Auth
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/auth/security-pin',
      name: 'auth-security-pin',
      component: SecurityPinView,
    },
    {
      path: '/auth/new-password',
      name: 'auth-new-password',
      component: AuthNewPasswordView,
    },
    {
      path: '/auth/password-reset-success',
      name: 'auth-password-reset-success',
      component: AuthPasswordResetSuccessView,
    },
    {
      path: '/auth/confirm',
      name: 'auth-confirm',
      component: AuthConfirmView,
    },
    {
      path: '/daftar',
      name: 'signup',
      component: SignupView,
    },

    // Main tabs
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: AnalysisView,
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionView,
    },
    {
      path: '/transaction/add-balance',
      name: 'transaction-add-balance',
      component: TransactionTopupView,
    },
    {
      path: '/transaction/:id',
      name: 'transaction-detail',
      component: TransactionDetailView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },

    // Shared screens
    {
      path: '/notifications',
      name: 'notifications',
      component: NotificationView,
    },

    // Profile > Edit
    {
      path: '/profile/edit',
      name: 'profile-edit',
      component: EditProfileView,
    },

    // Profile > Security
    {
      path: '/profile/security',
      name: 'profile-security',
      component: SecurityView,
    },
    {
      path: '/profile/security/change-pin',
      name: 'profile-change-pin',
      component: ChangePinView,
    },
    {
      path: '/profile/security/change-pin/success',
      name: 'profile-change-pin-success',
      component: PinChangedSuccessView,
    },
    {
      path: '/profile/security/terms',
      name: 'profile-terms',
      component: TermsView,
    },

    // Profile > Settings
    {
      path: '/profile/settings',
      name: 'profile-settings',
      component: SettingsView,
    },
    {
      path: '/profile/settings/notifications',
      name: 'profile-settings-notifications',
      component: NotificationSettingsView,
    },
    {
      path: '/profile/settings/theme',
      name: 'profile-settings-theme',
      component: ThemeSettingsView,
    },
    {
      path: '/profile/settings/password',
      name: 'profile-settings-password',
      component: PasswordSettingsView,
    },
    {
      path: '/profile/settings/password/success',
      name: 'profile-settings-password-success',
      component: PasswordChangedSuccessView,
    },
    {
      path: '/profile/settings/delete-account',
      name: 'profile-settings-delete-account',
      component: DeleteAccountView,
    },

    // Profile > Help
    {
      path: '/profile/help',
      name: 'profile-help',
      component: HelpCenterView,
    },
    {
      path: '/profile/help/support',
      name: 'profile-help-support',
      component: OnlineSupportView,
    },

    // Categories
    {
      path: '/categories/:categorySlug',
      name: 'category-detail',
      component: CategoryDetailView,
    },
    {
      path: '/categories/:categorySlug/add',
      name: 'category-add-expense',
      component: CategoryEntryFormView,
    },
    {
      path: '/categories/savings/add',
      name: 'savings-goal-add',
      component: SavingsGoalFormView,
    },
    {
      path: '/categories/savings/edit/:goalSlug',
      name: 'savings-goal-edit',
      component: SavingsGoalFormView,
    },
  ],
})

const publicRouteNames = new Set([
  'launch',
  'login',
  'signup',
  'forgot-password',
  'auth-security-pin',
  'auth-new-password',
  'auth-password-reset-success',
  'auth-confirm',
])

router.beforeEach(async (to) => {
  const authStore = useAuthStore(pinia)
  const financeStore = useFinanceStore(pinia)

  if (!authStore.initialized) {
    await authStore.initialize()
  }

  const isPublicRoute = publicRouteNames.has(String(to.name))

  if (!isPublicRoute && !authStore.user) {
    return { name: 'login' }
  }

  if (isPublicRoute && authStore.user && (to.name === 'login' || to.name === 'signup')) {
    return { name: 'home' }
  }

  if (!isPublicRoute && authStore.user && !financeStore.initialized) {
    await financeStore.initialize()
  }

  // PIN gate
  if (!isPublicRoute && authStore.user && authStore.profile && to.name !== 'auth-security-pin') {
    if (!authStore.profile.pin) {
      return { name: 'auth-security-pin', query: { mode: 'set' } }
    }
    if (!authStore.pinVerified) {
      return { name: 'auth-security-pin' }
    }
  }

  return true
})

export default router
