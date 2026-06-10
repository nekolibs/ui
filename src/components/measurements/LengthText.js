import { Text } from '../text'
import { useLengthFormatter } from './useLengthFormatter'

export function LengthText({ value, measurementSystem, metricPrecision, imperialPrecision, ...props }) {
  const format = useLengthFormatter({ measurementSystem, metricPrecision, imperialPrecision, ...props })

  if (!value && value !== 0) return false

  return <Text {...props}>{format(value)}</Text>
}
