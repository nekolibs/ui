import { pipe } from 'ramda'
import React from 'react'

import { AbsHiddenInput } from '../../abstractions/HiddenInput'
import { ContentLabel } from '../presentation/ContentLabel'
import { Link } from '../actions/Link'
import { Picker } from './Picker'
import { View } from '../structure/View'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Radio({ value, onChange, disabled, initialValue, ...rootProps }) {
  const [{ size, sizeCode, color }, props] = pipe(
    useColorConverter('primary'),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Radio') //
  )([{}, rootProps])

  const [localValue, setLocalValue] = React.useState(initialValue)
  value = value === undefined ? localValue : value

  const toggle = () => {
    if (!!disabled) return
    setLocalValue(!value)
    onChange?.(!value)
  }

  return (
    <Link onPress={toggle} className="neko-radio" disabled={disabled}>
      <AbsHiddenInput checked={value} onChange={toggle} type="radio" disabled={disabled} />
      <ContentLabel
        size={sizeCode}
        gap={8}
        content={
          <View height={size * 0.65} ratio={1} border={2} padding={3} borderColor={color} br={size} center>
            {!!value && <View bg={color} br={size} flex fullW fullH />}
          </View>
        }
        {...props}
      />
    </Link>
  )
}

export function RadioGroup({ radioProps, ...props }) {
  return (
    <Picker
      {...props}
      renderOption={({ option, selected, onChange, labelKey, ...props }) => (
        <Radio label={option[labelKey]} value={selected} onChange={onChange} {...props} {...radioProps} />
      )}
    />
  )
}
