import React from 'react'

import { NumberInput } from '../inputs'
import { fixedDecimals } from '../../helpers/numbers'
import { LENGTH_CONVERTERS, LENGTH_IMPERIAL_DEFAULTS } from './helpers/length'
import { useIsImperial } from './MeasurementHandler'
import { FeetInchesInput } from './FeetInchesInput'

export function LengthInput({
  value,
  onChange,
  measurementSystem,
  metricPrecision = 'cm',
  imperialPrecision,
  ...props
}) {
  const isImperial = useIsImperial(measurementSystem)
  const impPrec = imperialPrecision || LENGTH_IMPERIAL_DEFAULTS[metricPrecision] || 'ft+in'
  const converter = isImperial ? LENGTH_CONVERTERS[metricPrecision]?.[impPrec] : null
  const isFtIn = isImperial && impPrec === 'ft+in'

  let Input = isFtIn ? FeetInchesInput : NumberInput
  let suffix = isImperial ? impPrec : metricPrecision
  let formattedValue = value

  if (isFtIn) {
    suffix = false
    formattedValue = converter?.to(value)
  } else if (converter) {
    formattedValue = converter.to(value)
  } else {
    formattedValue = fixedDecimals(value)
  }

  const [localValue, setLocalValue] = React.useState(formattedValue)

  function handleChange(newValue) {
    setLocalValue(newValue)
    if (!newValue && newValue !== 0) return onChange(newValue)
    if (converter) newValue = converter.from(newValue)
    onChange(newValue)
  }

  return <Input {...props} value={localValue} onChange={handleChange} suffix={suffix} />
}
