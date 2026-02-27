import { mergeDeepRight } from 'ramda'

import { BASE_THEME } from './base'

export const DEFAULT_MATRIX_THEME = mergeDeepRight(BASE_THEME, {
  label: 'Hacker',

  colors: {
    primary: '#00FF41',

    // text: '#00FF41',
    // text2: '#00CC33',
    // text3: '#009926',
    // text4: '#00661A',

    text: '#D2FFE9',
    text2: '#A6F5D0',
    text3: '#6EE7B7',
    text4: '#3FAF85',

    mainBG: '#000000',
    overlayBG: '#0A0A0A',
    backdrop: '#000000',
    shadow: 'rgba(0, 255, 65, 0.2)',
    transparent: 'rgba(0, 0, 0, 0)',
    divider: 'rgba(0,255,65, 0.3)',

    blue: '#00B3FF',
    yellow: '#E6FF3F',
    green: '#00FF41',
    purple: '#9B5DE5',
    orange: '#FF9F1C',
    cyan: '#00FFE0',
    red: '#FF3B3B',
    navy: '#001F2F',
    indigo: '#4B6BFF',
    gray: '#2E2E2E',
    brown: '#5C4033',
    lylac: '#C084FC',
    pink: '#FF4FD8',
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
      border: true,
    },

    Section: {
      border: true,
    },
  },
})
