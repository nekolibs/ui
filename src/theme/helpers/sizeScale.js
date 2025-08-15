const SCALES = ['xxxsm', 'xxsm', 'xsm', 'sm', 'md', 'lg', 'xlg', 'xxlg', 'xxxlg']

export function moveScaleDown(value, unit = 1) {
  const index = SCALES.indexOf(value)
  if (!index) return value
  return SCALES[index - unit] || value
}
