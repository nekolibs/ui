import { mergeDeepRight } from 'ramda'

import { BASE_THEME } from './base'

export const DEFAULT_PAPER_THEME = mergeDeepRight(BASE_THEME, {
  label: 'Paper',

  colors: {
    primary: '#5A5A5A',
    text: '#000000',
    text2: '#333333',
    text3: '#555555',
    text4: '#777777',

    mainBG: '#F8F1E3',
    overlayBG: '#F8F1E3',
    backdrop: '#383E44',
    shadow: 'rgba(0, 0, 0, 0.04)',
    divider: '#E3D9C9',

    blue: '#6B8EAE',
    yellow: '#EADCA6',
    green: '#88A288',
    purple: '#A391B8',
    orange: '#D9A066',
    cyan: '#9CC9C2',
    red: '#B85C5C',
    navy: '#4A4A4A',
    indigo: '#70788C',
    gray: '#B8B8B8',
    brown: '#8B7355',
    lylac: '#C7B7D4',
    pink: '#E4A1B2',
  },
})
