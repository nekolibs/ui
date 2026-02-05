import { normalizeRules } from './normalizeRules'

/**
 * Checks if validation should run for a given trigger.
 * @param {string} trigger - The trigger to check ('onChange', 'onBlur', 'onSubmit')
 * @param {Array|Object} rules - The rules (array or object format)
 * @param {string|string[]} validateTrigger - The default trigger(s) for the field
 * @returns {boolean}
 */
export function shouldValidateOn(trigger, rules, validateTrigger = 'onSubmit') {
  if (!rules) return false

  const triggers = Array.isArray(validateTrigger) ? validateTrigger : [validateTrigger]
  if (triggers.includes(trigger)) return true

  // Check per-rule triggers
  const rulesArray = normalizeRules(rules)
  return rulesArray.some(
    (rule) => rule.trigger === trigger || (Array.isArray(rule.trigger) && rule.trigger.includes(trigger))
  )
}
