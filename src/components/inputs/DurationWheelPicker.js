import { View } from '../structure'
import { WheelPicker } from './WheelPicker'

export function DurationWheelPicker({ value, onChange, maxMinutes = 59, secondStep = 1, useHours }) {
  const total = value ?? 0
  const hours = useHours ? Math.floor(total / 3600) : 0
  const minutes = Math.floor((total - hours * 3600) / 60)
  const seconds = Math.round((total % 60) / secondStep) * secondStep

  const emit = (h, m, s) => onChange?.(h * 3600 + m * 60 + s)

  return (
    <View row gap="sm" centerV>
      {!!useHours && (
        <View flex>
          <WheelPicker range={[0, 23]} value={hours} suffix="h" onChange={(h) => emit(h, minutes, seconds)} />
        </View>
      )}
      <View flex>
        <WheelPicker
          range={[0, useHours ? 59 : maxMinutes]}
          value={minutes}
          suffix="m"
          onChange={(m) => emit(hours, m, seconds)}
        />
      </View>
      <View flex>
        <WheelPicker
          range={[0, 59]}
          step={secondStep}
          value={seconds}
          suffix="s"
          onChange={(s) => emit(hours, minutes, s)}
        />
      </View>
    </View>
  )
}
