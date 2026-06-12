import React from 'react'

// Local display state for measurement inputs.
// Resyncs when the unit changes or the value is changed externally,
// without clobbering what the user is typing (their own onChange echoes back).
export function useLocalInputValue({ value, formattedValue, suffix, onChange, converter }) {
  const [localValue, setLocalValue] = React.useState(formattedValue)
  const [prevSuffix, setPrevSuffix] = React.useState(suffix)
  const lastEmitted = React.useRef(value)

  if (suffix !== prevSuffix) {
    setPrevSuffix(suffix)
    setLocalValue(formattedValue)
    lastEmitted.current = value
  } else if (value !== lastEmitted.current) {
    lastEmitted.current = value
    setLocalValue(formattedValue)
  }

  function handleChange(newValue) {
    setLocalValue(newValue)
    if (!newValue && newValue !== 0) {
      lastEmitted.current = newValue
      return onChange(newValue)
    }
    const converted = converter ? converter.from(newValue) : newValue
    lastEmitted.current = converted
    onChange(converted)
  }

  return [localValue, handleChange]
}
