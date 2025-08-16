import { Text } from '../text/Text'
import { View } from '../structure/View'
import { getSizeFromProps, moveScaleDown } from '../theme/helpers/sizeScale'
import { useFullColorModifier } from '../modifiers/fullColor'
import { useMergeThemeComponent } from '../theme/ThemeHandler'

export function Tag(rootProps) {
  // TODO: Consider moving all to modifier and have robust return [formattedValues, props]. Then will be all mover to pipes
  const [size, propsWithoutSize] = getSizeFromProps(rootProps, 'md')
  let { label, style, textProps, ...props } = useMergeThemeComponent('Button', propsWithoutSize)

  const oneSizeDown = moveScaleDown(size, 1)
  const twoSizeDown = moveScaleDown(size, 2)
  const threeSizeDown = moveScaleDown(size, 3)
  const defaultProps = {
    paddingH: twoSizeDown,
    padding: threeSizeDown,
    outline: true,
    br: threeSizeDown,
    borderWidth: 1,
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
