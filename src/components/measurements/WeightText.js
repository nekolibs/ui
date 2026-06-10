import { Text } from '../text'
import { useWeightFormatter } from './useWeightFormatter'

export function WeightText({ value, measurementSystem, metricPrecision, imperialPrecision, ...props }) {
  const format = useWeightFormatter({ measurementSystem, metricPrecision, imperialPrecision, ...props })

  if (!value && value !== 0) return false

  return <Text {...props}>{format(value)}</Text>
}
