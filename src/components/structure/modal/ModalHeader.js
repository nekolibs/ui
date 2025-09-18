import { pipe } from 'ramda'

import { Icon } from '../../presentation/Icon'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../View'
import { moveScale } from '../../../theme/helpers/sizeScale'
import { useDefaultModifier } from '../../../modifiers/default'
import { useSizeConverter } from '../../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }, _]) => ({
  centerV: true,
  paddingH: sizeCode,
  paddingV: moveScale(sizeCode, -2),
  minHeight: moveScale(sizeCode, 1),
  gap: 'md',
  borderB: true,
  justify: 'space-between',

  titleProps: {
    strong: true,
  },
})

export function ModalHeader({ onClose, title, children, ...rootProps }) {
  const [{}, formattedProps] = pipe(
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('ModalHeader'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { titleProps, ...props } = formattedProps

  if (!title && !children) return false

  return (
    <View className="neko-modal-header" {...props} row>
      {title && <Text {...titleProps}>{title}</Text>}

      {children}

      {!!onClose && (
        <Link onPress={onClose}>
          <Icon name="close-line" />
        </Link>
      )}
    </View>
  )
}
