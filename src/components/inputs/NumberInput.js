import { endsWith, is } from 'ramda'
import React from 'react'

import { TextInput } from './TextInput'

function isValidNumber(stringValue, options = {}) {
  const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, useInt, precision } = options

  if (stringValue === null || stringValue === undefined || stringValue === '') return true

  if (isNaN(stringValue)) return false
  const numericValue = parseFloat(stringValue)

  if (numericValue < min) return false
  if (numericValue > max) return false

  const decimalPart = stringValue?.toString()?.split?.('.')[1]

  if (decimalPart && is(Number, precision)) {
    if (decimalPart.length > precision) return false
  }

  return true
}

export function formatNumericValue(newValue, prevValue, options = {}) {
  const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, useInt, precision } = options
  let numericValue = newValue

  // Handle number to string conversion
  if (is(Number, newValue)) newValue = newValue.toString()

  // Handle null/undefined/empty
  if (newValue === null || newValue === undefined || newValue === '') return null

  // Normalize decimal separator (comma to dot)
  if (is(String, newValue)) newValue = newValue.replace(',', '.')

  // Allow negative sign as intermediate state
  if (newValue === '-') return newValue

  if (useInt) {
    // For integers, don't allow decimal points
    if (newValue.includes('.')) return prevValue
    numericValue = parseInt(newValue, 10)
  } else {
    // For floats, handle decimal points
    const dotsCount = newValue.split('.').length
    if (dotsCount > 2) return prevValue

    // Allow "1." as intermediate state
    if (endsWith('.', newValue)) return newValue

    numericValue = parseFloat(newValue)
  }

  if (isNaN(numericValue)) return prevValue

  // Check min/max
  if (numericValue < min) return min
  if (numericValue > max) return max

  // Handle decimal precision
  const decimalPart = newValue.split('.')[1]
  if (decimalPart && !!precision) {
    // Exceeded precision, reject
    if (decimalPart.length > precision) return prevValue
    // Within precision, keep as string to preserve "1.0" while typing "1.05"
    return newValue
  }

  // No decimals, return as number
  return numericValue
}

export function NumberInput({ onChange, onBlur, value, defaultValue, useInt, precision, min, max, error, ...props }) {
  if (value === undefined || value === null) value = defaultValue ?? null
  const [hasError, setHasError] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(value)
  const [localValue, setLocalValue] = React.useState(value)
  React.useEffect(() => setInputValue(value?.toString() || ''), [value])

  if (useInt) precision = 0
  if (!useInt && precision === 0) useInt = true
  const opts = { useInt, precision }
  const optsWithMinMax = { ...opts, min, max }

  return (
    <TextInput
      {...props}
      onChange={(newValue) => {
        const numericValue = formatNumericValue(newValue, localValue, opts)
        setInputValue(newValue?.toString() || '')
        setLocalValue(numericValue)
        onChange?.(numericValue)
        setHasError(!isValidNumber(newValue, optsWithMinMax))
      }}
      onBlur={(e) => {
        const clamped = formatNumericValue(localValue, localValue, optsWithMinMax)
        setLocalValue(clamped)
        setInputValue(clamped?.toString() || '')
        setHasError(!isValidNumber(clamped, optsWithMinMax))
        onChange?.(clamped)
        onBlur?.(e)
      }}
      value={inputValue}
      keyboardType={useInt ? 'number-pad' : 'decimal-pad'}
      error={error || hasError}
    />
  )
}
