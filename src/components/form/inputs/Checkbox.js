import { pipe } from 'ramda'
import React from 'react'

import { AbsHiddenInput } from '../../../abstractions/HiddenInput'
import { ContentLabel } from '../../presentation/ContentLabel'
import { Link } from '../../actions/Link'
import { View } from '../../structure/View'
import { useColorConverter } from '../../../modifiers/colorConverter'
import { useSizeConverter } from '../../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

export function Checkbox({ value, onChange, disabled, ...rootProps }) {
  const [{ size, sizeCode, color }, props] = pipe(
    useColorConverter('primary'),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Checkbox') //
  )([{}, rootProps])

  const [checked, setChecked] = React.useState(value)

  const toggle = () => {
    if (!!disabled) return
    setChecked(!checked)
    if (onChange) onChange(!checked)
  }

  return (
    <Link onPress={toggle} className="neko-checkbox" disabled={disabled}>
      <AbsHiddenInput checked={checked} onChange={toggle} type="checkbox" disabled={disabled} />
      <ContentLabel
        size={sizeCode}
        gap={8}
        content={
          <View height={size * 0.75} ratio={1} borderWidth={2} padding={3} borderColor={color} br={3} center>
            {checked && <View bg={color} br={2} flex fullW fullH />}
          </View>
        }
        {...props}
      />
    </Link>
  )
}
