import { Text } from '../text'
import { useWeightFormatter } from './useWeightFormatter'

export function WeightText({ value, measurementSystem, metricPrecision, imperialPrecision, withoutSuffix, ...props }) {
  const format = useWeightFormatter({ measurementSystem, metricPrecision, imperialPrecision, withoutSuffix })

  if (!value && value !== 0) return false

  return <Text {...props}>{format(value)}</Text>
}
