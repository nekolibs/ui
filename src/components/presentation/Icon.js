import { pipe } from 'ramda'

import { AbsIcon } from '../../abstractions/Icon'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useMarginModifier } from '../../modifiers/margin'
import { usePositionModifier } from '../../modifiers/position'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Icon({ name, ...rootProps }) {
  const [{ size, color }, props] = pipe(
    useSizeConverter('icons', 'md'),
    useColorConverter('text'),
    useThemeComponentModifier('Icon'),
    usePositionModifier, //
    useMarginModifier
  )([{}, rootProps])

  return <AbsIcon className="neko-icon" name={name} color={color} size={size} {...props} />
}
