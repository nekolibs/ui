import { pipe } from 'ramda'

import { AbsActivityIndicator } from '../../abstractions/ActivityIndicator'
import { View } from '../structure'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Loading({ ...rootProps }) {
  const [{ color, size }, props] = pipe(
    useColorConverter('primary'),
    useSizeConverter('icons', 'md'),
    useThemeComponentModifier('Loading')
    // usePaddingModifier,
    // useMarginModifier
  )([{}, rootProps])

  return (
    <View {...props}>
      <AbsActivityIndicator className="neko-loader" size={size} color={color} />
    </View>
  )
}
