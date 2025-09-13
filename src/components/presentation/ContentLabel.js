import { pipe } from 'ramda'

import { Loading } from '../state/Loading'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const AUTO_GAP_SCALE = {
  xxxs: 5,
  xxs: 5,
  xs: 5,
  sm: 5,
  md: 6,
  lg: 7,
  xl: 8,
  xxl: 9,
  xxxl: 10,
}

export function ContentLabel(rootProps) {
  const [{ color, sizeCode }, formattedProps] = pipe(
    useColorConverter(),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('ContentLabel') //
  )([{}, rootProps])

  let { loading, label, content, textProps, invert, gap, strong, ...props } = formattedProps
  if (!!loading) content = <Loading size={sizeCode} color={color} />

  return (
    <View className="neko-content-label" row gap={gap || AUTO_GAP_SCALE[sizeCode] || 5} centerV {...props}>
      {!invert && content}
      {!!label && (
        <Text color={color} size={sizeCode} strong={strong} {...textProps}>
          {label}
        </Text>
      )}
      {!!invert && content}
    </View>
  )
}
