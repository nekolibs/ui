import { is } from 'ramda'

const SCALES = [
  ['xxxsm'],
  ['xxsm'],
  ['xsm'],
  ['sm', 'small'],
  ['md', 'p'],
  ['lg', 'h6'],
  ['xlg', 'h5'],
  ['xxlg', 'h4'],
  ['xxxlg', 'h3'],
]

export function getScaleSynonyms(key) {
  return SCALES.find((list) => list.includes(key)) || []
}

export function getThemeValue(group, key, defaultValue) {
  defaultValue = defaultValue === undefined ? key : defaultValue
  if (!key) return defaultValue
  let value = group[key]
  if (!!value || !is(String, key)) return value || defaultValue

  const synonyms = getScaleSynonyms(key)
  for (const synonym of synonyms) {
    if (group?.[synonym]) {
      value = group[synonym]
      break
    }
  }

  return value || defaultValue
}
