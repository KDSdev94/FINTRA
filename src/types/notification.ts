export type NotificationIcon = 'bell' | 'settings' | 'savings' | 'arrows'

export type NotificationItem = {
  title: string
  subtitle: string
  meta?: string
  time: string
  icon: NotificationIcon
}

export type NotificationGroup = {
  label: string
  items: NotificationItem[]
}
