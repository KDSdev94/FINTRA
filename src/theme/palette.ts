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

export type ThemeId = 'mint' | 'midnight' | 'sunset' | 'ocean' | 'blush' | 'lavender' | 'mocha' | 'charcoal'

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
  backgroundGreenWhiteAndLetter: '#00D09E',
  lightBlueButton: '#0B4A4A',
  blueButton: '#00D09E',
  oceanBlueButton: '#00B889',
  shellBackground: '#052224',
  shellText: '#F1FFF3',
  panelBackground: '#093030',
  navBackground: '#0B4A4A',
  surfaceBackground: '#0E3E3E',
  primaryText: '#F1FFF3',
  mutedText: '#A8E6CF',
  glassSurface: 'rgba(11,74,74,0.92)',
  inputBackground: '#0E3E3E',
  inputText: '#F1FFF3',
  primaryButtonBackground: '#00D09E',
  primaryButtonText: '#052224',
  softButtonBackground: '#0B4A4A',
  softButtonText: '#F1FFF3',
  segmentedBackground: '#0E3E3E',
  segmentedInactiveText: '#A8E6CF',
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

export const lavenderTheme: ThemePalette = {
  darkModeGreenBlack: '#2D2440',
  backgroundDarkModeAndLetters: '#3B3055',
  lettersAndIcons: '#4A3D66',
  darkModeGreenBar: '#6B5B8A',
  mainGreen: '#A78BFA',
  lightGreen: '#EDE9FE',
  backgroundGreenWhiteAndLetter: '#F5F3FF',
  lightBlueButton: '#C4B5FD',
  blueButton: '#8B5CF6',
  oceanBlueButton: '#7C3AED',
  shellBackground: '#A78BFA',
  shellText: '#F5F3FF',
  panelBackground: '#F5F3FF',
  navBackground: '#EDE9FE',
  surfaceBackground: '#EDE9FE',
  primaryText: '#2D2440',
  mutedText: '#5B4D75',
  glassSurface: 'rgba(245, 243, 255, 0.45)',
  inputBackground: '#EDE9FE',
  inputText: '#2D2440',
  primaryButtonBackground: '#8B5CF6',
  primaryButtonText: '#F5F3FF',
  softButtonBackground: '#EDE9FE',
  softButtonText: '#2D2440',
  segmentedBackground: '#EDE9FE',
  segmentedInactiveText: '#5B4D75',
}

export const mochaTheme: ThemePalette = {
  darkModeGreenBlack: '#1C1410',
  backgroundDarkModeAndLetters: '#2C2018',
  lettersAndIcons: '#3D2E22',
  darkModeGreenBar: '#5C4433',
  mainGreen: '#D4A574',
  lightGreen: '#F5E6D3',
  backgroundGreenWhiteAndLetter: '#FBF5EE',
  lightBlueButton: '#E2C4A0',
  blueButton: '#B8845C',
  oceanBlueButton: '#9A6B42',
  shellBackground: '#D4A574',
  shellText: '#FBF5EE',
  panelBackground: '#FBF5EE',
  navBackground: '#F5E6D3',
  surfaceBackground: '#F5E6D3',
  primaryText: '#2C2018',
  mutedText: '#5C4433',
  glassSurface: 'rgba(251, 245, 238, 0.45)',
  inputBackground: '#F5E6D3',
  inputText: '#2C2018',
  primaryButtonBackground: '#B8845C',
  primaryButtonText: '#FBF5EE',
  softButtonBackground: '#F5E6D3',
  softButtonText: '#2C2018',
  segmentedBackground: '#F5E6D3',
  segmentedInactiveText: '#5C4433',
}

export const charcoalTheme: ThemePalette = {
  darkModeGreenBlack: '#121212',
  backgroundDarkModeAndLetters: '#1E1E1E',
  lettersAndIcons: '#2C2C2C',
  darkModeGreenBar: '#3D3D3D',
  mainGreen: '#FFFFFF',
  lightGreen: '#2C2C2C',
  backgroundGreenWhiteAndLetter: '#FFFFFF',
  lightBlueButton: '#4A4A4A',
  blueButton: '#FFFFFF',
  oceanBlueButton: '#BDBDBD',
  shellBackground: '#1E1E1E',
  shellText: '#F5F5F5',
  panelBackground: '#2C2C2C',
  navBackground: '#1E1E1E',
  surfaceBackground: '#333333',
  primaryText: '#F5F5F5',
  mutedText: '#9E9E9E',
  glassSurface: 'rgba(60,60,60,0.92)',
  inputBackground: '#333333',
  inputText: '#F5F5F5',
  primaryButtonBackground: '#FFFFFF',
  primaryButtonText: '#1E1E1E',
  softButtonBackground: '#3D3D3D',
  softButtonText: '#F5F5F5',
  segmentedBackground: '#333333',
  segmentedInactiveText: '#9E9E9E',
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
  {
    id: 'lavender',
    label: 'Lavender',
    description: 'Ungu lembut yang elegan dan menenangkan.',
    palette: lavenderTheme,
    preview: ['#A78BFA', '#F5F3FF', '#2D2440'],
  },
  {
    id: 'mocha',
    label: 'Mocha',
    description: 'Cokelat kopi yang hangat dan terasa premium.',
    palette: mochaTheme,
    preview: ['#D4A574', '#FBF5EE', '#2C2018'],
  },
  {
    id: 'charcoal',
    label: 'Charcoal',
    description: 'Abu-abu gelap netral yang minimalis dan elegan.',
    palette: charcoalTheme,
    preview: ['#1E1E1E', '#2C2C2C', '#F5F5F5'],
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
