import { pipe } from 'ramda'

import { View } from '../View'
import { useDefaultModifier } from '../../../modifiers/default'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  fullW: true,
  // fullH: true,
  scrollY: true,
  padding: 'md',
}

export function ModalContent({ children, ...rootProps }) {
  const [{}, props] = pipe(
    useThemeComponentModifier('ModalContent'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  if (!children) return false

  return (
    <View className="neko-modal-content" {...props}>
      {children}
    </View>
  )
}
