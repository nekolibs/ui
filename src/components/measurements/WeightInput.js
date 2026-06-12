import { NumberInput } from '../inputs'
import { fixedDecimals } from '../../helpers/numbers'
import { WEIGHT_CONVERTERS, WEIGHT_IMPERIAL_DEFAULTS } from './helpers/weight'
import { useIsImperial } from './MeasurementHandler'
import { useLocalInputValue } from './useLocalInputValue'

export function WeightInput({
  value,
  onChange,
  measurementSystem,
  metricPrecision = 'kg',
  imperialPrecision,
  ...props
}) {
  const isImperial = useIsImperial(measurementSystem)
  const impPrec = imperialPrecision || WEIGHT_IMPERIAL_DEFAULTS[metricPrecision] || 'lbs'
  const converter = isImperial ? WEIGHT_CONVERTERS[metricPrecision]?.[impPrec] : null

  const suffix = converter ? impPrec : metricPrecision
  const formattedValue = converter ? fixedDecimals(converter.to(value)) : fixedDecimals(value)

  const [localValue, handleChange] = useLocalInputValue({ value, formattedValue, suffix, onChange, converter })

  return <NumberInput {...props} value={localValue} onChange={handleChange} suffix={suffix} />
}
