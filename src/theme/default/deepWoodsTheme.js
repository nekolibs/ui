import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const DEEP_WOODS_DARK_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#4CAF50',
    text: '#F0F8F2',
    text2: '#C8E6C9',
    text3: '#A5D6A7',
    text4: '#81C784',

    bg: '#0D1B14',
    overlayBG: '#16281F',
    shadow: 'rgba(39, 45, 52, 0.6)',
    divider: 'rgba(255,255,255, 0.2)',

    blue: '#64B5F6',
    yellow: '#FBC02D',
    green: '#81C784',
    purple: '#9575CD',
    orange: '#FFB74D',
    cyan: '#4DD0E1',
    red: '#E57373',
    navy: '#1B263B',
    indigo: '#5C6BC0',
    gray: '#9E9E9E',
    brown: '#8D6E63',
    lylac: '#B39DDB',
    pink: '#F48FB1',
  },
})
