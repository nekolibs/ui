import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const MIDNIGHT_NEON_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#FF00FF',
    text: '#F0F0F0',
    text2: '#D4D4D4',
    text3: '#A3A3A3',
    text4: '#7A7A7A',

    bg: '#0D0D0D',
    overlayBG: '#1A1A1A',
    shadow: 'rgba(39, 45, 52, 0.6)',

    blue: '#3B82F6',
    yellow: '#FACC15',
    green: '#22C55E',
    purple: '#A855F7',
    orange: '#FB923C',
    cyan: '#06B6D4',
    red: '#F87171',
    navy: '#1E3A8A',
    indigo: '#6366F1',
    gray: '#9CA3AF',
    brown: '#92400E',
    lylac: '#C084FC',
    pink: '#F472B6',
  },
})
