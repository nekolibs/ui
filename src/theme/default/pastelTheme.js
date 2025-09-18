import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const PASTEL_DREAM_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#FFB6C1',
    text: '#4B4453',
    text2: '#6D6875',
    text3: '#A093A6',
    text4: '#C9BBCF',

    bg: '#FFF7FA',
    overlayBG: '#FFFFFF',
    backdrop: '#4B4453',
    shadow: 'rgba(39, 45, 52, 0.15)',
    divider: '#f0f0f0',

    blue: '#A5B4FC',
    yellow: '#FDE68A',
    green: '#BBF7D0',
    purple: '#E9D5FF',
    orange: '#FED7AA',
    cyan: '#BAE6FD',
    red: '#FCA5A5',
    navy: '#A5B4FC',
    indigo: '#C7D2FE',
    gray: '#E5E7EB',
    brown: '#E0B084',
    lylac: '#E9D5FF',
    pink: '#FBCFE8',
  },
})
