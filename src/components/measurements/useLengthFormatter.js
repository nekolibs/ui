import { LENGTH_CONVERTERS, LENGTH_IMPERIAL_DEFAULTS } from './helpers/length'
import { fixedDecimals } from '../../helpers/numbers'
import { useIsImperial } from './MeasurementHandler'

export function useLengthFormatter({
  measurementSystem,
  metricPrecision = 'cm',
  imperialPrecision,
  withoutSuffix,
} = {}) {
  const isImperial = useIsImperial(measurementSystem)
  const impPrec = imperialPrecision || LENGTH_IMPERIAL_DEFAULTS[metricPrecision] || 'ft+in'

  return (value) => {
    if (!value && value !== 0) return null

    if (isImperial) {
      const converter = LENGTH_CONVERTERS[metricPrecision]?.[impPrec]
      if (!converter) return `${fixedDecimals(value)} ${metricPrecision}`

      const converted = converter.to(value)

      if (impPrec === 'ft+in') {
        const v = typeof converted === 'object' ? converted : { feet: 0, inches: 0 }
        return `${v.feet}'${v.inches}"`
      }

      if (withoutSuffix) return fixedDecimals(converted)
      return `${fixedDecimals(converted)} ${impPrec}`
    }

    if (withoutSuffix) return fixedDecimals(value)
    return `${fixedDecimals(value)} ${metricPrecision}`
  }
}
