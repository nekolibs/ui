import { mergeDeepRight } from 'ramda'

import { BASE_THEME } from './base'

export const DEFAULT_BLACK_THEME = mergeDeepRight(BASE_THEME, {
  label: 'Pitch Black',

  colors: {
    primary: '#818DF9',

    text: '#F2F2F2',
    text2: '#CFCFCF',
    text3: '#A6A6A6',
    text4: '#737373',

    mainBG: '#0A0A0A',
    overlayBG: '#141414',
    backdrop: '#1f1f1f',
    shadow: 'rgba(0, 0, 0, 0.7)',
    transparent: 'rgba(0, 0, 0, 0)',
    divider: '#262626',

    blue: '#3A7BFF',
    yellow: '#FFC857',
    green: '#2ECC71',
    purple: '#9B5DE5',
    orange: '#FF8C42',
    cyan: '#00C2D1',
    red: '#FF4D4F',
    navy: '#1F2A44',
    indigo: '#5C6BC0',
    gray: '#8E8E93',
    brown: '#8B5E3C',
    lylac: '#C77DFF',
    pink: '#FF6FAE',
  },

  // components: {
  // Card: {
  // border: true,
  // },

  // Section: {
  // border: true,
  // },
  // },
})
