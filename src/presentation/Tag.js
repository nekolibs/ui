import { Text } from '../text/Text'
import { View } from '../structure/View'
import { moveScaleDown } from '../theme/helpers/sizeScale'
import { useFullColorModifier } from '../modifiers/fullColor.js'
import { useMergeThemeComponent } from '../theme/ThemeHandler'

export function Tag(rootProps) {
  let { label, style, textProps, size = 'md', ...props } = useMergeThemeComponent('Button', rootProps)
  const oneSizeDown = moveScaleDown(size, 1)
  const twoSizeDown = moveScaleDown(size, 2)
  const threeSizeDown = moveScaleDown(size, 3)
  const defaultProps = {
    paddingH: twoSizeDown,
    padding: threeSizeDown,
    outline: true,
    br: threeSizeDown,
    borderWidth: 1,
    color: 'primary',
    center: true,
  }
  const [fontColor, formattedProps] = useFullColorModifier({ ...defaultProps, ...props, style })

  return (
    <View className="neko-tag" row>
      <View className="neko-tag-inner" {...formattedProps}>
        <Text strong center color={fontColor} size={oneSizeDown} {...textProps}>
          {label}
        </Text>
      </View>
    </View>
  )
}
