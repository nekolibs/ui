import { mergeDeepRight } from 'ramda'
import { BASE_THEME } from './base'

export const CYBERPUNK_DARK_THEME = mergeDeepRight(BASE_THEME, {
  label: 'Cyberpunk',

  colors: {
    primary: '#FF4FD8',

    text: '#F5EFFF',
    text2: '#D6C8FF',
    text3: '#A78BFA',
    text4: '#7C6BB3',

    mainBG: '#0A0614',
    overlayBG: '#140A26',
    backdrop: '#0A0A0F',
    shadow: 'rgba(0, 0, 0, 0.7)',
    transparent: 'rgba(0, 0, 0, 0)',
    divider: '#24123A',

    blue: '#00B3FF',
    yellow: '#FFD166',
    green: '#00F5A0',
    purple: '#9D4EDD',
    orange: '#FF7A18',
    cyan: '#00E5FF',
    red: '#FF3D6E',
    navy: '#1B1B3A',
    indigo: '#5A67FF',
    gray: '#8E8EAA',
    brown: '#8B5CF6',
    lylac: '#C77DFF',
    pink: '#FF4FD8',
  },
})
