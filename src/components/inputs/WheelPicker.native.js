import React from 'react'

import { IconLabel } from '../presentation'
import { Text } from '../text'
import { View } from '../structure'
import { useColors } from '../../theme'
import { debounce } from '../../helpers/debounce'

const ITEM_FONT_SIZE = 20
const ITEM_HEIGHT = 40

let QuidoneWheelPicker

try {
  QuidoneWheelPicker = require('@quidone/react-native-wheel-picker').default
} catch {
  QuidoneWheelPicker = null
}

function WheelOption({ item }) {
  return (
    <View center height={ITEM_HEIGHT}>
      <IconLabel icon={item.icon} color={item.color} label={item.label} size="lg" />
    </View>
  )
}

const renderOption = (props) => <WheelOption {...props} />

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

  const [from, to] = range || [0, 100]
  const generatedOptions = React.useMemo(() => {
    if (!range && !!options) return null
    const count = Math.floor((to - from) / step) + 1
    return Array.from({ length: count }, (_, i) => {
      const v = from + i * step
      return { [labelKey]: formatLabel ? formatLabel(v) : v, [valueKey]: v }
    })
  }, [!range && !!options, from, to, step, labelKey, valueKey])
  options = generatedOptions || options

  const data = React.useMemo(() => {
    if (!options) return []
    return options.map((opt) => ({
      ...opt,
      value: opt[valueKey],
      label: String(opt[labelKey] ?? opt[valueKey]),
    }))
  }, [options, labelKey, valueKey])

  const hasCustomOptions = React.useMemo(() => data.some((item) => !!item.icon || !!item.color), [data])

  const itemTextStyle = React.useMemo(() => ({ fontSize: ITEM_FONT_SIZE, color: colors.text }), [colors.text])

  const overlayItemStyle = React.useMemo(
    () => ({
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: colors.divider,
      opacity: 1,
    }),
    [colors.divider]
  )

  const selectedLabel = data.find((item) => item.value === value)?.label ?? ''

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
        <View absoluteFill row center gap="xs" pointerEvents="none">
          <Text text2 opacity={0}>
            {suffix}
          </Text>
          <Text fontSize={ITEM_FONT_SIZE} opacity={0}>
            {selectedLabel}
          </Text>
          <Text text2>{suffix}</Text>
        </View>
      )}
      <QuidoneWheelPicker
        data={data}
        value={value}
        itemTextStyle={itemTextStyle}
        itemHeight={ITEM_HEIGHT}
        overlayItemStyle={overlayItemStyle}
        renderItem={hasCustomOptions ? renderOption : undefined}
        _onValueChanging={({ item }) => handleChange(resolveValue(item))}
        onValueChanged={({ item }) => onChange(resolveValue(item))}
        {...props}
      />
    </View>
  )
}
