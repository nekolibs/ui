export const defaultMessages = {
  required: 'This field is required',
  type: {
    email: 'Please enter a valid email address',
    url: 'Please enter a valid URL',
    number: 'Please enter a valid number',
    integer: 'Please enter a valid integer',
  },
  min: {
    string: (min) => `Must be at least ${min} characters`,
    number: (min) => `Must be at least ${min}`,
    array: (min) => `Must have at least ${min} items`,
  },
  max: {
    string: (max) => `Must be at most ${max} characters`,
    number: (max) => `Must be at most ${max}`,
    array: (max) => `Must have at most ${max} items`,
  },
  pattern: 'Invalid format',
}
