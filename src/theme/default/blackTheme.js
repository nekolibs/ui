import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const DEFAULT_BLACK_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#818DF9',
    text: '#FFFFFF',
    text2: '#E0E0E0',
    text3: '#B0B0B0',
    text4: '#8A8A8A',

    bg: '#0f0f0f',
    overlayBG: '#000000',
    backdrop: '#030303',
    shadow: 'rgba(216, 210, 203, 0.1)',
    divider: '#383E44',

    blue: '#4DA3FF',
    yellow: '#FFD93B',
    green: '#4CAF50',
    purple: '#9B59B6',
    orange: '#FF7F50',
    cyan: '#00BCD4',
    red: '#E74C3C',
    navy: '#34495E',
    indigo: '#5C6BC0',
    gray: '#9E9E9E',
    brown: '#8D6E63',
    lylac: '#B39DDB',
    pink: '#F48FB1',
  },
})
