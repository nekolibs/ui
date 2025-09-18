import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const OCEAN_BREEZE_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#2B90D9',
    text: '#04364A',
    text2: '#065A82',
    text3: '#0B84B4',
    text4: '#3ABEFF',

    bg: '#E6F7FF',
    overlayBG: '#FFFFFF',
    backdrop: '#04364A',
    shadow: 'rgba(39, 45, 52, 0.15)',
    divider: 'rgba(0,0,0, 0.1)',

    blue: '#1D4ED8',
    yellow: '#FACC15',
    green: '#10B981',
    purple: '#8B5CF6',
    orange: '#FB923C',
    cyan: '#06B6D4',
    red: '#EF4444',
    navy: '#1E3A8A',
    indigo: '#6366F1',
    gray: '#9CA3AF',
    brown: '#A16207',
    lylac: '#C4B5FD',
    pink: '#F472B6',
  },
})
