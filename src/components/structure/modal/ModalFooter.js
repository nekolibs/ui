import { pipe } from 'ramda'

import { View } from '../View'
import { moveScale } from '../../../theme/helpers/sizeScale'
import { useDefaultModifier } from '../../../modifiers/default'
import { useSizeConverter } from '../../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }, _]) => ({
  borderT: true,
  paddingH: sizeCode,
  paddingV: moveScale(sizeCode, -2),
  minHeight: moveScale(sizeCode, 1),
  centerV: true,
})

export function ModalFooter({ children, ...rootProps }) {
  const [{}, props] = pipe(
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('ModalFooter'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  if (!children) return false

  return (
    <View className="neko-modal-footer" {...props}>
      {children}
    </View>
  )
}
