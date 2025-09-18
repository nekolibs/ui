import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const CYBERPUNK_DARK_THEME = mergeDeepRight(BASE_THEME, {
  colors: {
    primary: '#FCEE09',
    text: '#FFFFFF',
    text2: '#B3B3B3',
    text3: '#8C8C8C',
    text4: '#666666',

    bg: '#0A0A0F',
    overlayBG: '#14141F',
    backdrop: '#0A0A0F',
    shadow: 'rgba(39, 45, 52, 0.6)',
    divider: 'rgba(255,255,255, 0.2)',

    blue: '#00E5FF',
    yellow: '#FFD600',
    green: '#00FF9D',
    purple: '#D500F9',
    orange: '#FF9100',
    cyan: '#00B8D4',
    red: '#FF1744',
    navy: '#1E2A38',
    indigo: '#651FFF',
    gray: '#757575',
    brown: '#6D4C41',
    lylac: '#B388FF',
    pink: '#FF80AB',
  },
})
