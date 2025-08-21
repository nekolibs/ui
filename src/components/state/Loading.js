import { pipe } from 'ramda'

import { AbsActivityIndicator } from '../../abstractions/ActivityIndicator'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Loading({ ...rootProps }) {
  const [{ color, size }, props] = pipe(
    useColorConverter('divider'),
    useSizeConverter('icons', 'md'),
    useThemeComponentModifier('Loading'),
    usePaddingModifier,
    useMarginModifier
  )([{}, rootProps])

  return <AbsActivityIndicator size={size} color={color} {...props} />
}
