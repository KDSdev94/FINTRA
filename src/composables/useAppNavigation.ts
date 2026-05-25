import type { Router } from 'vue-router'

import type { NavKey } from '@/types/navigation'

const navRouteMap: Record<NavKey, string> = {
  home: '/home',
  statistik: '/analysis',
  transfer: '/transaction',
  laporan: '/categories',
  profil: '/profile',
}

export const navigateByTab = (router: Router, key: NavKey) => router.push(navRouteMap[key])
