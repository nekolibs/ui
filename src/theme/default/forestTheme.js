import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const FOREST_MIST_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#4CAF50',
    text: '#0B2414',
    text2: '#14532D',
    text3: '#1B5E20',
    text4: '#388E3C',

    bg: '#E9F5EC',
    overlayBG: '#FFFFFF',
    backdrop: '#E9F5EC',
    shadow: 'rgba(39, 45, 52, 0.15)',
    divider: 'rgba(0,0,0, 0.1)',

    blue: '#2563EB',
    yellow: '#F59E0B',
    green: '#15803D',
    purple: '#7C3AED',
    orange: '#EA580C',
    cyan: '#0891B2',
    red: '#B91C1C',
    navy: '#1E3A8A',
    indigo: '#4338CA',
    gray: '#94A3B8',
    brown: '#78350F',
    lylac: '#A78BFA',
    pink: '#F472B6',
  },
})
