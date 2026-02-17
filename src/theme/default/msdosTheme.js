import { mergeDeepRight } from 'ramda'

import { BASE_THEME } from './base'

export const DEFAULT_MSDOS_THEME = mergeDeepRight(BASE_THEME, {
  label: 'MSDOS',

  colors: {
    primary: '#FFFF00',
    text: '#FFFFFF',
    text2: '#E0E0E0',
    text3: '#B0B0B0',
    text4: '#8A8A8A',

    mainBG: '#0000AA',
    overlayBG: '#000088',
    backdrop: '#0000AA',
    shadow: 'rgba(0, 0, 0, 0.6)',
    divider: 'rgba(255,255,255,0.3)',

    blue: '#0000FF',
    yellow: '#FFFF00',
    green: '#00FF00',
    purple: '#AA00FF',
    orange: '#FF7700',
    cyan: '#00FFFF',
    red: '#FF0000',
    navy: '#000080',
    indigo: '#4B0082',
    gray: '#B0B0B0',
    brown: '#8B4513',
    lylac: '#9370DB',
    pink: '#FF69B4',
  },

  radius: {
    xxxs: 0,
    xxs: 1,
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
    xxl: 7,
    xxxl: 8,
  },

  components: {
    Card: {
      border: 1,
      borderColor: 'divider',
    },
  },
})
