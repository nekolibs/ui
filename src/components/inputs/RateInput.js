import { pipe, range, is } from 'ramda'
import React from 'react'

import { Icon } from '../presentation'
import { Link } from '../actions/Link'
import { LoadingView } from '../state'
import { View } from '../structure/View'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  color: 'primary',
  inactiveColor: 'text4_op50',
  max: 5,
  icon: 'star-fill',
}

export function RateInput({ value, onChange, disabled, loading, ...rootProps }) {
  let [{ size, sizeCode, color }, formattedProps] = pipe(
    useColorConverter('primary'),
    useSizeConverter('icons', 'md'),
    useThemeComponentModifier('RateInput'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const [localValue, setLocalValue] = React.useState(value)
  React.useEffect(() => setLocalValue(value), [value])

  const { icon, max, inactiveColor, ...props } = formattedProps

  const handleChange = (v) => {
    if (!!disabled) return
    const newValue = v === localValue ? null : v
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  return (
    <LoadingView active={loading} width="fit-content">
      <View className="neko-rate-input" row gap="xs" centerV minHeight={sizeCode} {...props}>
        {range(1, max + 1).map((i) => {
          const active = localValue >= i

          let finalIcon = icon
          if (is(Function, icon)) finalIcon = icon?.({ value: localValue, optionValue: i, active })

          let finalColor = color
          if (is(Function, color)) finalColor = color?.({ value: localValue, optionValue: i, active })

          return (
            <Link onPress={() => handleChange(i)} disabled={disabled} center key={i}>
              <Icon name={finalIcon} size={moveScale(sizeCode, 1)} color={active ? finalColor : inactiveColor} />
            </Link>
          )
        })}
      </View>
    </LoadingView>
  )
}
