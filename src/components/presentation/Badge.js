import { pipe } from 'ramda'

import { AbsView } from '../../abstractions/View'
import { IconLabel } from './IconLabel'
import { View } from '../structure/View'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useFullColorModifier } from '../../modifiers/fullColor'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DOT_SIZE = 8
const DEFAULT_PROPS = ([{ sizeCode }, { dot }]) => {
  sizeCode = !!dot ? DOT_SIZE : moveScale(sizeCode, -2)

  return {
    paddingH: !dot && 5,
    height: sizeCode,
    minWidth: sizeCode,
    round: true,
    center: true,
    border: 1,
  }
}

function Badge(rootProps) {
  const [{ fontColor, sizeCode }, formattedProps] = pipe(
    useColorConverter('primary'),
    useSizeConverter('spaces', 'md'),
    useThemeComponentModifier('Badge'),
    useDefaultModifier(DEFAULT_PROPS),
    useFullColorModifier,
    useSizeModifier,
    usePositionModifier,
    useFlexWrapperModifier,
    useBackgroundModifier,
    usePaddingModifier,
    useMarginModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  let { label, value, dot, icon, invert, textProps, iconProps, limit = 99, ...props } = formattedProps
  if (!!value && value > limit) label = `${limit}+`
  label = label || value

  let content = (
    <IconLabel
      center
      color={fontColor}
      size={moveScale(sizeCode, -2)}
      label={label}
      icon={icon}
      invert={invert}
      textProps={{ strong: true, ...textProps }}
      iconProps={iconProps}
    />
  )

  if (!!dot) content = false

  return (
    <AbsView className="neko-badge" {...props}>
      {content}
    </AbsView>
  )
}

function BadgeWrapper({ children, dot, ...props }) {
  if (!children) return <Badge {...props} />
  if (!props.value && !props.label && !props.icon) return children

  return (
    <View className="neko-badge-wrapper" relative>
      {children}
      <Badge {...props} dot={dot} absolute top={dot ? -2 : -12} right={dot ? -5 : -15} />
    </View>
  )
}

export { BadgeWrapper as Badge }
