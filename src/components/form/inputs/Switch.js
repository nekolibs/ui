import { pipe } from 'ramda'
import React from 'react'

import { AbsSwitch } from '../../../abstractions/Switch'
import { ContentLabel } from '../../presentation/ContentLabel'
import { useColorConverter } from '../../../modifiers/colorConverter'
import { useSizeConverter } from '../../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

export function Switch({ value, onChange, disabled, ...rootProps }) {
  const [{ size, sizeCode, color }, props] = pipe(
    useColorConverter('primary'),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Switch') //
  )([{}, rootProps])

  const [checked, setChecked] = React.useState(value)

  const toggle = () => {
    if (!!disabled) return
    setChecked(!checked)
    if (onChange) onChange(!checked)
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
          value={checked}
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
