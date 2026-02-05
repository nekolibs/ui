import { defaultMessages } from './defaultMessages'

const isEmpty = (value) => {
  if (value === undefined || value === null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  return false
}

export const validators = {
  required: (value, rule) => {
    if (isEmpty(value)) {
      return rule.message || defaultMessages.required
    }
    return null
  },

  type: (value, rule) => {
    if (isEmpty(value)) return null

    const typeValidators = {
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      url: (v) => {
        try {
          new URL(v)
          return true
        } catch {
          return false
        }
      },
      number: (v) => !isNaN(Number(v)),
      integer: (v) => Number.isInteger(Number(v)) && !isNaN(Number(v)),
    }

    const validator = typeValidators[rule.type]
    if (validator && !validator(value)) {
      return rule.message || defaultMessages.type[rule.type] || `Invalid ${rule.type}`
    }
    return null
  },

  min: (value, rule) => {
    if (isEmpty(value)) return null

    if (typeof value === 'string' && value.length < rule.min) {
      return rule.message || defaultMessages.min.string(rule.min)
    }
    if (typeof value === 'number' && value < rule.min) {
      return rule.message || defaultMessages.min.number(rule.min)
    }
    if (Array.isArray(value) && value.length < rule.min) {
      return rule.message || defaultMessages.min.array(rule.min)
    }
    return null
  },

  max: (value, rule) => {
    if (isEmpty(value)) return null

    if (typeof value === 'string' && value.length > rule.max) {
      return rule.message || defaultMessages.max.string(rule.max)
    }
    if (typeof value === 'number' && value > rule.max) {
      return rule.message || defaultMessages.max.number(rule.max)
    }
    if (Array.isArray(value) && value.length > rule.max) {
      return rule.message || defaultMessages.max.array(rule.max)
    }
    return null
  },

  pattern: (value, rule) => {
    if (isEmpty(value)) return null

    const regex = rule.pattern instanceof RegExp ? rule.pattern : new RegExp(rule.pattern)

    if (!regex.test(String(value))) {
      return rule.message || defaultMessages.pattern
    }
    return null
  },
}
