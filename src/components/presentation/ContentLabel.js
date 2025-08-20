import { pipe } from 'ramda'

import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function ContentLabel(rootProps) {
  const [{ color }, formattedProps] = pipe(
    useColorConverter(),
    useThemeComponentModifier('ContentLabel') //
  )([{}, rootProps])

  const { label, content, textProps, size = 'md', invert, gap = 5, ...props } = formattedProps

  return (
    <View className="neko-content-label" row gap={gap} centerV {...props}>
      {!invert && content}
      {!!label && (
        <Text color={color} size={size} {...textProps}>
          {label}
        </Text>
      )}
      {!!invert && content}
    </View>
  )
}
