import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useMergeThemeComponent } from '../theme/ThemeHandler'

export function ContentLabel(rootProps) {
  const {
    label,
    content,
    color,
    textProps,
    size = 'md',
    invert,
    gap = 5,
    ...props
  } = useMergeThemeComponent('ContentLabel', rootProps)

  return (
    <View className="neko-content-label" row gap={gap} centerV {...props}>
      {!invert && content}
      <Text color={color} size={size} {...textProps}>
        {label}
      </Text>
      {!!invert && content}
    </View>
  )
}
