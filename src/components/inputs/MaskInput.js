import React from 'react'

import { TextInput } from './TextInput'

function removeMask(value, mask = '') {
  let result = ''

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i]
    const valueChar = value[i]

    if (!valueChar) break

    if (maskChar === 'A' && /[A-Za-z]/.test(valueChar)) {
      result += valueChar
    } else if (maskChar === '9' && /\d/.test(valueChar)) {
      result += valueChar
    }
  }

  return result
}

function applyMask(value, mask) {
  const clean = value.replace(/[^0-9A-Za-z]/g, '')
  let result = ''
  let index = 0

  for (let i = 0; i < mask.length; i++) {
    if (index >= clean.length) break
    const char = mask[i]

    if (char === '9' && /[0-9]/.test(clean[index])) {
      result += clean[index]
      index++
    } else if (char === 'A' && /[A-Za-z]/.test(clean[index])) {
      result += clean[index].toUpperCase()
      index++
    } else if (char === '9' || char === 'A') {
      index++
      i--
    } else {
      result += char
    }
  }

  return result
}

export function MaskInput({ value = '', onChange, mask = '', useRawValue, ...props }) {
  const [localValue, setLocalValue] = React.useState(applyMask(value, mask))

  const handleChange = React.useCallback(
    (text) => {
      const masked = applyMask(text, mask)
      onChange?.(useRawValue ? removeMask(masked, mask) : masked)
      setLocalValue(masked)
    },
    [mask, onChange]
  )

  React.useEffect(() => {
    setLocalValue(applyMask(value, mask))
  }, [value])

  return <TextInput value={localValue} onChange={handleChange} {...props} />
}
