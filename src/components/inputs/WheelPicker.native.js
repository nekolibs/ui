import React from 'react'

import { Text } from '../text'
import { View } from '../structure'
import { useColors } from '../../theme'
import { debounce } from '../../helpers/debounce'

let QuidoneWheelPicker

try {
  QuidoneWheelPicker = require('@quidone/react-native-wheel-picker').default
} catch {
  QuidoneWheelPicker = null
}

export function WheelPicker({
  value,
  onChange,
  options,
  suffix,
  range,
  step = 1,
  labelKey = 'label',
  valueKey = 'value',
  useRawOption,
  formatLabel,
  ...props
}) {
  const colors = useColors()
  const handleChange = React.useMemo(() => debounce(onChange, 300), [onChange])

  if (!!range || !options) {
    const [from, to] = range || [0, 100]
    const count = Math.floor((to - from) / step) + 1
    options = Array.from({ length: count }, (_, i) => {
      const v = from + i * step
      return { [labelKey]: formatLabel ? formatLabel(v) : v, [valueKey]: v }
    })
  }

  const data = React.useMemo(() => {
    if (!options) return []
    return options.map((opt) => ({
      value: opt[valueKey],
      label: String(opt[labelKey] ?? opt[valueKey]),
    }))
  }, [options, labelKey, valueKey])

  if (!QuidoneWheelPicker) {
    console.warn('@quidone/react-native-wheel-picker not installed.')
    return null
  }

  const resolveValue = (item) => {
    if (useRawOption) return options.find((o) => o[valueKey] === item.value)
    return item.value
  }

  return (
    <View relative hiddenOverflow>
      {!!suffix && (
        <View absoluteFill row centerV>
          <View flex />
          <View flex paddingL={20}>
            <Text text2>{suffix}</Text>
          </View>
        </View>
      )}
      <QuidoneWheelPicker
        data={data}
        value={value}
        itemTextStyle={{ color: colors.text }}
        itemHeight={40}
        overlayItemStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderColor: colors.divider,
          opacity: 1,
        }}
        _onValueChanging={({ item }) => handleChange(resolveValue(item))}
        onValueChanged={({ item }) => onChange(resolveValue(item))}
        {...props}
      />
    </View>
  )
}
