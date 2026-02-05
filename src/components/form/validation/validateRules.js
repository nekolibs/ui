import { path as getPath } from 'ramda'
import { validators } from './validators'

/**
 * Validates a value against an array of rules
 * @param {any} value - The value to validate
 * @param {Array} rules - Array of rule objects
 * @param {string} trigger - Current validation trigger ('onSubmit', 'onBlur', 'onChange')
 * @returns {Promise<string|null>} - First error message or null if valid
 */
export async function validateRules(value, rules, trigger = 'onSubmit') {
  if (!rules || rules.length === 0) return null

  for (const rule of rules) {
    const ruleTrigger = rule.trigger || 'onSubmit'
    const triggers = Array.isArray(ruleTrigger) ? ruleTrigger : [ruleTrigger]

    // Always run on submit, otherwise check trigger match
    if (trigger !== 'onSubmit' && !triggers.includes(trigger)) {
      continue
    }

    let error = null

    // Custom validator takes precedence
    if (rule.validator) {
      try {
        await rule.validator(rule, value)
      } catch (e) {
        error = e.message || rule.message || 'Validation failed'
      }
    } else {
      // Run built-in validators
      if (rule.required) {
        error = validators.required(value, rule)
      }
      if (!error && rule.type) {
        error = validators.type(value, rule)
      }
      if (!error && rule.min !== undefined) {
        error = validators.min(value, rule)
      }
      if (!error && rule.max !== undefined) {
        error = validators.max(value, rule)
      }
      if (!error && rule.pattern) {
        error = validators.pattern(value, rule)
      }
    }

    if (error) {
      return error
    }
  }

  return null
}

/**
 * Validates multiple fields at once (for form-level validation)
 * @param {Object} values - All form values
 * @param {Map} rulesRegistry - Map of field path keys to { path: array, rules: array }
 * @returns {Promise<Object>} - Object of path key -> error message
 */
export async function validateAllFields(values, rulesRegistry) {
  const errors = {}
  const validationPromises = []

  rulesRegistry.forEach(({ path, rules }, pathKey) => {
    const value = getPath(path, values)

    validationPromises.push(
      validateRules(value, rules, 'onSubmit').then((error) => {
        if (error) {
          errors[pathKey] = error
        }
      })
    )
  })

  await Promise.all(validationPromises)
  return errors
}
