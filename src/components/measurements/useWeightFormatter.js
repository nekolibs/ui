import { WEIGHT_CONVERTERS, WEIGHT_IMPERIAL_DEFAULTS } from './helpers/weight'
import { fixedDecimals } from '../../helpers/numbers'
import { useIsImperial } from './MeasurementHandler'

export function useWeightFormatter({
  measurementSystem,
  metricPrecision = 'kg',
  imperialPrecision,
  withoutSuffix,
} = {}) {
  const isImperial = useIsImperial(measurementSystem)
  const impPrec = imperialPrecision || WEIGHT_IMPERIAL_DEFAULTS[metricPrecision] || 'lbs'

  return (value) => {
    if (!value && value !== 0) return null

    if (isImperial) {
      const converter = WEIGHT_CONVERTERS[metricPrecision]?.[impPrec]
      if (!converter) return `${fixedDecimals(value)} ${metricPrecision}`

      const converted = converter.to(value)
      if (withoutSuffix) return fixedDecimals(converted)
      return `${fixedDecimals(converted)} ${impPrec}`
    }

    if (withoutSuffix) return fixedDecimals(value)
    return `${fixedDecimals(value)} ${metricPrecision}`
  }
}
