import { pipe } from 'ramda'

import { View } from './View'
import { useDefaultModifier } from '../../modifiers/default'
import { useResponsiveConverter } from '../../modifiers/responsiveConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {}

export function Col({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('Col'), //
    useResponsiveConverter([]),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  return (
    <View className="neko-col" {...props}>
      {children}
    </View>
  )
}
