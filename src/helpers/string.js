import {
  adjust,
  compose,
  defaultTo,
  head,
  join,
  juxt,
  map,
  pipe,
  replace,
  split,
  tail,
  toLower,
  toUpper,
  trim,
} from 'ramda'

export const removeSpecialChars = replace(/[^a-zA-Z ,0-9]/g, '')

export const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]), toLower, defaultTo(''))

export const capitalizeFirstLetter = compose(join(''), juxt([compose(toUpper, head), tail]), defaultTo(''))

export const capitalizeSentence = compose(join(' '), map(capitalize), split('. '), defaultTo(''))

export const capitalizeAll = compose(join(' '), map(capitalize), split(' '), defaultTo(''))

export const isLower = (str) => (str || '').toLowerCase() === str

export const capitalizeIfLower = (str) => (isLower(str) ? capitalize(str) : str)

export const capitalizeAllIfLower = (str) => (isLower(str) ? capitalizeAll(str) : str)

export const capitalizeSentenceIfLower = (str) => (isLower(str) ? capitalizeSentence(str) : str)

export const getInitials = (str) => {
  if (!str) return '--'

  if (str.includes(' ')) {
    str = str.split(' ').map(head).join('')
  }

  return str.substring(0, 2)
}

export const splitWords = split(new RegExp(/[/\-_ ]/gi))

export const toKebabCase = (str) => {
  return str
    .split('')
    .map((letter, index) => {
      if (letter === '_') return '-'
      if (letter?.toUpperCase() === letter) return `${index !== 0 ? '-' : ''}${letter?.toLowerCase()}`
      return letter
    })
    .join('')
}

export const toSnakeCase = pipe(toKebabCase, replace(/-/g, '_'))

export const toCamelCase = pipe(splitWords, map(capitalize), adjust(0, toLower), join(''))

export const truncateString = (str, size) => {
  if (!size) return str
  if (!!str && str.length > size) return str.substring(0, size) + '...'
  return str
}
export const truncate = truncateString

export const slugify = (text) => {
  return toSnakeCase(text)
}

export const normalizeString = pipe(toLower, trim, (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
