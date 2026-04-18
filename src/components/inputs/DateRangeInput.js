import { DateInput } from './DateInput'
import { Text } from '../text/Text'
import { View } from '../structure/View'

export function DateRangeInput({
  value,
  onChange,
  startProps,
  endProps,
  placeholderStart = 'Start',
  placeholderEnd = 'End',
  separator = '–',
  ...props
}) {
  const handleChangeStart = (start) => onChange?.({ ...value, start })
  const handleChangeEnd = (end) => onChange?.({ ...value, end })

  return (
    <View row centerV gap="sm">
      <DateInput
        placeholder={placeholderStart}
        value={value?.start}
        onChange={handleChangeStart}
        max={value?.end}
        flex
        {...props}
        {...startProps}
      />
      <Text text4>{separator}</Text>
      <DateInput
        placeholder={placeholderEnd}
        value={value?.end}
        onChange={handleChangeEnd}
        min={value?.start}
        flex
        {...props}
        {...endProps}
      />
    </View>
  )
}
