import { omit } from 'ramda'

import { useGetThemeValue } from '../ThemeHandler'

const SCALES = ['xxxsm', 'xxsm', 'xsm', 'sm', 'md', 'lg', 'xlg', 'xxlg', 'xxxlg']

export function moveScaleDown(value, unit = 1) {
  const index = SCALES.indexOf(value)
  if (!index) return value
  return SCALES[index - unit] || value
}

export function getSizeFromProps({ size, ...props }, defaultValue) {
  if (!!size) return [size, props]
  size = SCALES.find((key) => !!props[key]) || defaultValue
  return [size, omit(SCALES, props)]
}

export function useSmartSize(props, groupKey, defaultValue) {
  const getSizeValue = useGetThemeValue(groupKey)
  const [size, formattedProps] = getSizeFromProps(props, defaultValue)
  return [getSizeValue(size), formattedProps]
}
