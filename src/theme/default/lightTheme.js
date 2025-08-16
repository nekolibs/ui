import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const DEFAULT_LIGHT_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#818DF9',
    text: '#272D34',
    text2: '#4A5159',
    text3: '#6E7680',
    text4: '#9AA1AC',

    bg: '#F4F5FE',
    overlayBG: '#FFFFFF',
    shadow: 'rgba(39, 45, 52, 0.15)',
    divider: 'rgba(0,0,0, 0.1)',

    blue: '#4DA3FF',
    yellow: '#FFD93B',
    green: '#4CAF50',
    purple: '#9B59B6',
    orange: '#FF7F50',
    cyan: '#00BCD4',
    red: '#E74C3C',
    navy: '#34495E',
    indigo: '#5C6BC0',
    gray: '#B0BEC5',
    brown: '#8D6E63',
    lylac: '#B39DDB',
    pink: '#F48FB1',
  },
})
