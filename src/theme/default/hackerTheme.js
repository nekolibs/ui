import { mergeDeepRight } from 'ramda'

import { BASE_THEME } from './base'

export const DEFAULT_MATRIX_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#00FF41',
    text: '#00FF41',
    text2: '#00CC33',
    text3: '#009926',
    text4: '#00661A',

    bg: '#000000',
    overlayBG: '#0A0A0A',
    shadow: 'rgba(0, 255, 65, 0.2)',
    divider: 'rgba(0,255,65, 0.3)',

    blue: '#0087BD',
    yellow: '#AEBF00',
    green: '#00FF41',
    purple: '#7A1FA2',
    orange: '#FF6D00',
    cyan: '#00BFA5',
    red: '#D50000',
    navy: '#003366',
    indigo: '#303F9F',
    gray: '#4A4A4A',
    brown: '#5D4037',
    lylac: '#8E24AA',
    pink: '#C51162',
  },
})
