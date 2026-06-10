import { Text } from '../text'
import { View } from '../structure'
import { WheelPicker } from './WheelPicker'

export function NumberWheelPicker({ value, onChange, min = 0, max = 100, step = 1, decimalStep = 1, useInt, precision = 2 }) {
  if (useInt) precision = 0

  const intValue = value != null ? Math.trunc(value) : min
  const decFactor = Math.pow(10, precision)
  const decValue = value != null ? Math.round((Math.abs(value) - Math.abs(intValue)) * decFactor) : 0

  const handleIntChange = (v) => {
    onChange?.(precision === 0 ? v : v + decValue / decFactor)
  }

  const handleDecChange = (v) => {
    onChange?.(intValue + v / decFactor)
  }

  return (
    <View row gap="xs" centerV>
      <View flex>
        <WheelPicker range={[min, max]} step={step} value={intValue} onChange={handleIntChange} />
      </View>
      {precision > 0 && (
        <>
          <Text h3 strong>
            .
          </Text>
          <View flex>
            <WheelPicker
              range={[0, decFactor - 1]}
              step={decimalStep}
              value={decValue}
              onChange={handleDecChange}
              formatLabel={(v) => String(v).padStart(precision, '0')}
            />
          </View>
        </>
      )}
    </View>
  )
}
