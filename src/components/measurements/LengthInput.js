import { NumberInput } from '../inputs'
import { fixedDecimals } from '../../helpers/numbers'
import { LENGTH_CONVERTERS, LENGTH_IMPERIAL_DEFAULTS } from './helpers/length'
import { useIsImperial } from './MeasurementHandler'
import { useLocalInputValue } from './useLocalInputValue'
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
  const isFtIn = isImperial && impPrec === 'ft+in' && !!converter

  const Input = isFtIn ? FeetInchesInput : NumberInput
  const suffix = isFtIn ? false : converter ? impPrec : metricPrecision

  let formattedValue
  if (isFtIn) formattedValue = converter.to(value)
  else if (converter) formattedValue = fixedDecimals(converter.to(value))
  else formattedValue = fixedDecimals(value)

  const [localValue, handleChange] = useLocalInputValue({ value, formattedValue, suffix, onChange, converter })

  return <Input {...props} value={localValue} onChange={handleChange} suffix={suffix} />
}
