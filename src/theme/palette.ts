export type ThemePalette = {
  darkModeGreenBlack: string
  backgroundDarkModeAndLetters: string
  lettersAndIcons: string
  darkModeGreenBar: string
  mainGreen: string
  lightGreen: string
  backgroundGreenWhiteAndLetter: string
  lightBlueButton: string
  blueButton: string
  oceanBlueButton: string
  shellBackground: string
  shellText: string
  panelBackground: string
  navBackground: string
  surfaceBackground: string
  primaryText: string
  mutedText: string
  glassSurface: string
  inputBackground: string
  inputText: string
  primaryButtonBackground: string
  primaryButtonText: string
  softButtonBackground: string
  softButtonText: string
  segmentedBackground: string
  segmentedInactiveText: string
}

export type ThemePreset = {
  id: ThemeId
  label: string
  description: string
  palette: ThemePalette
  preview: [string, string, string]
}

export type ThemeId = 'mint' | 'midnight' | 'sunset' | 'ocean' | 'blush'

export const mintTheme: ThemePalette = {
  darkModeGreenBlack: '#031314',
  backgroundDarkModeAndLetters: '#052224',
  lettersAndIcons: '#0E3E3E',
  darkModeGreenBar: '#0B4A4A',
  mainGreen: '#00D09E',
  lightGreen: '#DFF7E2',
  backgroundGreenWhiteAndLetter: '#F1FFF3',
  lightBlueButton: '#74DFC3',
  blueButton: '#00B889',
  oceanBlueButton: '#008E6A',
  shellBackground: '#00D09E',
  shellText: '#052224',
  panelBackground: '#F1FFF3',
  navBackground: '#DFF7E2',
  surfaceBackground: '#DFF7E2',
  primaryText: '#052224',
  mutedText: '#0E3E3E',
  glassSurface: 'rgba(255,255,255,0.45)',
  inputBackground: '#DFF7E2',
  inputText: '#052224',
  primaryButtonBackground: '#00D09E',
  primaryButtonText: '#052224',
  softButtonBackground: '#DFF7E2',
  softButtonText: '#052224',
  segmentedBackground: '#DFF7E2',
  segmentedInactiveText: '#0E3E3E',
}

export const midnightTheme: ThemePalette = {
  darkModeGreenBlack: '#010D0E',
  backgroundDarkModeAndLetters: '#052224',
  lettersAndIcons: '#093030',
  darkModeGreenBar: '#0B4A4A',
  mainGreen: '#00D09E',
  lightGreen: '#0E3E3E',
  backgroundGreenWhiteAndLetter: '#F1FFF3',
  lightBlueButton: '#6DB6FE',
  blueButton: '#3299FF',
  oceanBlueButton: '#0068FF',
  shellBackground: '#052224',
  shellText: '#F1FFF3',
  panelBackground: '#093030',
  navBackground: '#0B4A4A',
  surfaceBackground: '#0E3E3E',
  primaryText: '#F1FFF3',
  mutedText: '#DFF7E2',
  glassSurface: 'rgba(11,74,74,0.92)',
  inputBackground: '#F1FFF3',
  inputText: '#052224',
  primaryButtonBackground: '#00D09E',
  primaryButtonText: '#052224',
  softButtonBackground: '#F1FFF3',
  softButtonText: '#052224',
  segmentedBackground: '#0E3E3E',
  segmentedInactiveText: '#DFF7E2',
}

export const sunsetTheme: ThemePalette = {
  darkModeGreenBlack: '#3A2619',
  backgroundDarkModeAndLetters: '#5A3823',
  lettersAndIcons: '#6A3A1D',
  darkModeGreenBar: '#8B5332',
  mainGreen: '#FF8A5B',
  lightGreen: '#FFE2D3',
  backgroundGreenWhiteAndLetter: '#FFF6F0',
  lightBlueButton: '#FFB38A',
  blueButton: '#E56B3F',
  oceanBlueButton: '#C9532E',
  shellBackground: '#FF8A5B',
  shellText: '#FFF6F0',
  panelBackground: '#FFF6F0',
  navBackground: '#FFE7D9',
  surfaceBackground: '#FFE2D3',
  primaryText: '#4B2917',
  mutedText: '#7A4A2E',
  glassSurface: 'rgba(255, 246, 240, 0.48)',
  inputBackground: '#FFEADB',
  inputText: '#4B2917',
  primaryButtonBackground: '#E56B3F',
  primaryButtonText: '#FFF6F0',
  softButtonBackground: '#FFE2D3',
  softButtonText: '#4B2917',
  segmentedBackground: '#FFE2D3',
  segmentedInactiveText: '#7A4A2E',
}

export const oceanTheme: ThemePalette = {
  darkModeGreenBlack: '#0B2238',
  backgroundDarkModeAndLetters: '#11314D',
  lettersAndIcons: '#143A5B',
  darkModeGreenBar: '#1C4E74',
  mainGreen: '#44B5E8',
  lightGreen: '#D7F0FB',
  backgroundGreenWhiteAndLetter: '#EFF9FF',
  lightBlueButton: '#7FCDF3',
  blueButton: '#2A88C9',
  oceanBlueButton: '#1767A5',
  shellBackground: '#44B5E8',
  shellText: '#EFF9FF',
  panelBackground: '#EFF9FF',
  navBackground: '#D7F0FB',
  surfaceBackground: '#DDEFFA',
  primaryText: '#0F2F49',
  mutedText: '#2B5A7A',
  glassSurface: 'rgba(239, 249, 255, 0.42)',
  inputBackground: '#DDF1FC',
  inputText: '#0F2F49',
  primaryButtonBackground: '#2A88C9',
  primaryButtonText: '#EFF9FF',
  softButtonBackground: '#D7F0FB',
  softButtonText: '#0F2F49',
  segmentedBackground: '#D7F0FB',
  segmentedInactiveText: '#2B5A7A',
}

export const blushTheme: ThemePalette = {
  darkModeGreenBlack: '#4D2437',
  backgroundDarkModeAndLetters: '#6A314B',
  lettersAndIcons: '#6C304B',
  darkModeGreenBar: '#8E4768',
  mainGreen: '#F47FAE',
  lightGreen: '#FFE0EC',
  backgroundGreenWhiteAndLetter: '#FFF5F9',
  lightBlueButton: '#F8A9C7',
  blueButton: '#E15D95',
  oceanBlueButton: '#C7467E',
  shellBackground: '#F47FAE',
  shellText: '#FFF5F9',
  panelBackground: '#FFF5F9',
  navBackground: '#FFE3EE',
  surfaceBackground: '#FFE0EC',
  primaryText: '#58263D',
  mutedText: '#8B4A66',
  glassSurface: 'rgba(255, 245, 249, 0.45)',
  inputBackground: '#FFE7F0',
  inputText: '#58263D',
  primaryButtonBackground: '#C7467E',
  primaryButtonText: '#FFF5F9',
  softButtonBackground: '#FFE0EC',
  softButtonText: '#58263D',
  segmentedBackground: '#FFE0EC',
  segmentedInactiveText: '#8B4A66',
}

export const themePresets: ThemePreset[] = [
  {
    id: 'mint',
    label: 'Mint Fresh',
    description: 'Hijau cerah bawaan yang ringan buat dipakai harian.',
    palette: mintTheme,
    preview: ['#00D09E', '#F1FFF3', '#052224'],
  },
  {
    id: 'midnight',
    label: 'Midnight',
    description: 'Kontras gelap dengan teks terang buat malam hari.',
    palette: midnightTheme,
    preview: ['#052224', '#093030', '#F1FFF3'],
  },
  {
    id: 'sunset',
    label: 'Sunset Coral',
    description: 'Nuansa hangat dengan teks cokelat yang tetap terbaca.',
    palette: sunsetTheme,
    preview: ['#FF8A5B', '#FFF6F0', '#4B2917'],
  },
  {
    id: 'ocean',
    label: 'Ocean Breeze',
    description: 'Biru sejuk dengan panel terang dan teks yang stabil.',
    palette: oceanTheme,
    preview: ['#44B5E8', '#EFF9FF', '#0F2F49'],
  },
  {
    id: 'blush',
    label: 'Blush Pink',
    description: 'Pink lembut dengan teks plum supaya tetap manis tapi kebaca.',
    palette: blushTheme,
    preview: ['#F47FAE', '#FFF5F9', '#58263D'],
  },
]

export const themePresetMap = Object.fromEntries(
  themePresets.map((preset) => [preset.id, preset]),
) as Record<ThemeId, ThemePreset>

export const themeVariableMap: Record<keyof ThemePalette, string> = {
  darkModeGreenBlack: '--color-dark-mode-green-black',
  backgroundDarkModeAndLetters: '--color-background-dark-mode-and-letters',
  lettersAndIcons: '--color-letters-and-icons',
  darkModeGreenBar: '--color-dark-mode-green-bar',
  mainGreen: '--color-main-green',
  lightGreen: '--color-light-green',
  backgroundGreenWhiteAndLetter: '--color-background-green-white-and-letter',
  lightBlueButton: '--color-light-blue-button',
  blueButton: '--color-blue-button',
  oceanBlueButton: '--color-ocean-blue-button',
  shellBackground: '--color-shell-background',
  shellText: '--color-shell-text',
  panelBackground: '--color-panel-background',
  navBackground: '--color-nav-background',
  surfaceBackground: '--color-surface-background',
  primaryText: '--color-primary-text',
  mutedText: '--color-muted-text',
  glassSurface: '--color-glass-surface',
  inputBackground: '--color-input-background',
  inputText: '--color-input-text',
  primaryButtonBackground: '--color-primary-button-background',
  primaryButtonText: '--color-primary-button-text',
  softButtonBackground: '--color-soft-button-background',
  softButtonText: '--color-soft-button-text',
  segmentedBackground: '--color-segmented-background',
  segmentedInactiveText: '--color-segmented-inactive-text',
}
