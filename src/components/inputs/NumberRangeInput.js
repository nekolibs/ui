import { NumberInput } from './NumberInput'
import { Text } from '../text/Text'
import { View } from '../structure/View'

export function NumberRangeInput({
  value,
  onChange,
  minProps,
  maxProps,
  placeholderMin = 'Min',
  placeholderMax = 'Max',
  separator = '–',
  ...props
}) {
  const handleChangeMin = (min) => onChange?.({ ...value, min })
  const handleChangeMax = (max) => onChange?.({ ...value, max })

  return (
    <View row centerV gap="sm">
      <NumberInput
        placeholder={placeholderMin}
        value={value?.min}
        onChange={handleChangeMin}
        max={value?.max}
        flex
        {...props}
        {...minProps}
      />
      <Text text4>{separator}</Text>
      <NumberInput
        placeholder={placeholderMax}
        value={value?.max}
        onChange={handleChangeMax}
        min={value?.min}
        flex
        {...props}
        {...maxProps}
      />
    </View>
  )
}
