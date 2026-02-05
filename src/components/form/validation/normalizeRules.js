/**
 * Normalizes rules to array format.
 * Accepts either array format or object shorthand.
 *
 * Array format (full control):
 *   [{ required: true, message: 'Required' }, { min: 2 }]
 *
 * Object shorthand (simple cases):
 *   { required: true, min: 2, max: 7, type: 'email' }
 *   -> converts to: [{ required: true }, { min: 2 }, { max: 7 }, { type: 'email' }]
 *
 * @param {Array|Object} rules
 * @returns {Array}
 */
export function normalizeRules(rules) {
  if (!rules) return []
  if (Array.isArray(rules)) return rules
  if (typeof rules === 'object') {
    return Object.entries(rules).map(([key, value]) => ({ [key]: value }))
  }
  return []
}
