import { mergeDeepRight } from 'ramda'

import { BASE_THEME } from './base'

export const DEFAULT_MSDOS_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#FFFF00',
    text: '#FFFFFF',
    text2: '#FFD700',
    text3: '#CCCCCC',
    text4: '#999999',

    bg: '#0000AA',
    overlayBG: '#000088',
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

  components: {
    Card: {
      borderWidth: 1,
      br: 5,
      borderColor: 'divider',
    },
  },
})
