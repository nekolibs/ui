import { pipe } from 'ramda'
import React from 'react'

import { AbsSwitch } from '../../abstractions/Switch'
import { ContentLabel } from '../presentation/ContentLabel'
import { Picker } from './Picker'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Switch({ value, onChange, disabled, initialValue, ...rootProps }) {
  const [{ size, sizeCode, color }, props] = pipe(
    useColorConverter('primary'),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Switch') //
  )([{}, rootProps])

  const [localValue, setLocalValue] = React.useState(initialValue)
  value = value === undefined ? localValue : value
  onChange = onChange || setLocalValue

  const toggle = () => {
    if (!!disabled) return
    setLocalValue(!value)
    onChange?.(!value)
  }

  return (
    <ContentLabel
      className="neko-checkbox"
      size={sizeCode}
      gap={8}
      disabled={disabled}
      content={
        <AbsSwitch
          color={color}
          value={value}
          onValueChange={toggle}
          trackColor={{ true: color }}
          disabled={disabled}
          height={size * 0.75}
        />
      }
      {...props}
    />
  )
}

export function SwitchGroup({ switchProps, ...props }) {
  return (
    <Picker
      multiple
      row={false}
      {...props}
      renderOption={({ option, selected, onChange, labelKey, ...props }) => (
        <Switch label={option[labelKey]} value={selected} onChange={onChange} {...props} {...switchProps} />
      )}
    />
  )
}
