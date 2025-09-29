import { mergeDeepRight } from 'ramda'

import { BASE_THEME } from './base'

export const SUNSET_GLOW_THEME = mergeDeepRight(BASE_THEME, {
  label: 'Sunset',

  colors: {
    primary: '#FF6B6B',
    text: '#4B372E',
    text2: '#5C4033',
    text3: '#8C5A43',
    text4: '#B97A57',

    mainBG: '#FFF5E6',
    overlayBG: '#FFFAF1',
    backdrop: '#331E0A',
    shadow: 'rgba(39, 45, 52, 0.15)',
    divider: '#f0f0f0',

    blue: '#3B82F6',
    yellow: '#FBBF24',
    green: '#22C55E',
    purple: '#A855F7',
    orange: '#FB923C',
    cyan: '#06B6D4',
    red: '#DC2626',
    navy: '#1E3A8A',
    indigo: '#4F46E5',
    gray: '#9CA3AF',
    brown: '#92400E',
    lylac: '#C084FC',
    pink: '#F472B6',
  },
})
