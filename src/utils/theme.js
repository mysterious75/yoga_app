export const COLORS = {
  // Primary - Deep emerald/teal green
  primary: '#2D6A4F',
  primaryDark: '#1B4332',
  primaryLight: '#40916C',
  primaryGlow: '#52B788',

  // Secondary
  secondary: '#0A0A0A',

  // Accent - Warm gold
  accent: '#D4A373',
  accentLight: '#E9C46A',
  accentDark: '#B08968',

  // Background - Very dark
  background: '#0A0A0A',
  backgroundAlt: '#111111',

  // Surface - Dark cards
  surface: '#1A1A2E',
  surfaceAlt: '#16213E',
  surfaceElevated: '#1E1E36',
  surfaceBorder: '#2A2A40',

  // Text
  text: '#FFFFFF',
  textSecondary: '#8B8B9E',
  textLight: '#5A5A6E',
  textMuted: '#3D3D50',

  // Semantic
  border: '#2A2A40',
  borderLight: '#1E1E36',
  error: '#FF6B6B',
  warning: '#E9C46A',
  success: '#52B788',
  info: '#4CC9F0',

  // Star
  star: '#E9C46A',

  // Gradients
  gradient: ['#1B4332', '#2D6A4F', '#40916C'],
  gradientGold: ['#D4A373', '#E9C46A'],
  gradientGreen: ['#1B4332', '#52B788'],
  gradientDark: ['#0A0A0A', '#1A1A2E'],
  gradientHero: ['#0A0A0A', '#1B4332', '#0A0A0A'],
  gradientCard: ['#1A1A2E', '#16213E'],
  gradientAccent: ['#2D6A4F', '#40916C'],
  gradientBlue: ['#16213E', '#4CC9F0'],
  gradientPurple: ['#1A1A2E', '#7B2CBF'],
  gradientRed: ['#3D0000', '#FF6B6B'],

  // Card accent colors
  cardColors: ['#2D6A4F', '#D4A373', '#4CC9F0', '#7B2CBF', '#FF6B6B', '#E9C46A'],

  // Nutrient colors
  nutrientCalories: '#E9C46A',
  nutrientProtein: '#4CC9F0',
  nutrientCarbs: '#D4A373',
  nutrientFat: '#FF6B6B',
  nutrientFiber: '#52B788',
};

export const FONTS = {
  regular: { fontFamily: 'System', fontWeight: '400' },
  medium: { fontFamily: 'System', fontWeight: '500' },
  semiBold: { fontFamily: 'System', fontWeight: '600' },
  bold: { fontFamily: 'System', fontWeight: '700' },
  extraBold: { fontFamily: 'System', fontWeight: '800' },
};

export const SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  title: 28,
  h1: 34,
  padding: 20,
  radius: 16,
  radiusLg: 24,
  radiusXl: 32,
  radiusFull: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  glow: {
    shadowColor: '#2D6A4F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  glowGold: {
    shadowColor: '#D4A373',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
};
