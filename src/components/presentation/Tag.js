import { pipe } from 'ramda'

import { AbsView } from '../../abstractions/View'
import { IconLabel } from './IconLabel'
import { View } from '../structure/View'
import { moveScaleDown } from '../../theme/helpers/sizeScale'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useFullColorModifier } from '../../modifiers/fullColor'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }]) => {
  const oneSizeDown = moveScaleDown(sizeCode, 1)
  const twoSizeDown = moveScaleDown(sizeCode, 2)
  const threeSizeDown = moveScaleDown(sizeCode, 3)

  return {
    paddingH: twoSizeDown,
    padding: threeSizeDown,
    outline: true,
    br: threeSizeDown,
    borderWidth: 1,
    center: true,
  }
}

export function Tag(rootProps) {
  // TODO: Consider moving all to modifier and have robust return [formattedValues, props]. Then will be all mover to pipes
  // const [size, propsWithoutSize] = getSizeFromProps(rootProps, 'md')
  // let { label, style, textProps, ...props } = useMergeThemeComponent('Tag', propsWithoutSize)

  // const defaultProps = {
  // paddingH: twoSizeDown,
  // padding: threeSizeDown,
  // outline: true,
  // br: threeSizeDown,
  // borderWidth: 1,
  // center: true,
  // }
  // const [{ fontColor }, formattedProps] = useFullColorModifier([{}, { ...defaultProps, ...props, style }])

  const [{ fontColor, size }, formattedProps] = pipe(
    useColorConverter('primary'),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Tag'),
    useDefaultModifier(DEFAULT_PROPS),
    useFullColorModifier,
    useSizeModifier,
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useFlexWrapperModifier,
    useBackgroundModifier,
    useBorderModifier
  )([{}, rootProps])

  const { label, icon, textProps, iconProps, gap, invert, ...props } = formattedProps

  return (
    <View className="neko-tag" row>
      <AbsView className="neko-tag" {...props}>
        <IconLabel
          center
          color={fontColor}
          size={size}
          label={label}
          icon={icon}
          gap={gap}
          invert={invert}
          textProps={{ strong: true, ...textProps }}
          iconProps={iconProps}
        />
      </AbsView>
    </View>
  )

  // return (
  // <View className="neko-tag" row>
  // <View className="neko-tag-inner" {...formattedProps}>
  // <Text strong center color={fontColor} size={oneSizeDown} {...textProps}>
  // {label}
  // </Text>
  // </View>
  // </View>
  // )
}
