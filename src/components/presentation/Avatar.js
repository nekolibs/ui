import { pipe } from 'ramda'

import { AbsView } from '../../abstractions/View'
import { IconLabel } from './IconLabel'
import { Image } from './Image'
import { getDynamicColor } from '../../theme/helpers/dynamicColor'
import { getInitials } from '../../helpers'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useFullColorModifier } from '../../modifiers/fullColor'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }, { round, square, src, dynamicColor, color }]) => {
  return {
    padding: !!src ? undefined : 1,
    height: sizeCode,
    width: sizeCode,
    ratio: 1,
    br: !!square ? moveScale(sizeCode, -2) || sizeCode : undefined,
    round: !square,
    center: true,
    border: !!src ? undefined : 1,
    overflow: 'hidden',
    color: dynamicColor !== undefined ? getDynamicColor(dynamicColor) : color,
  }
}

export function Avatar(rootProps) {
  const [{ fontColor, sizeCode }, formattedProps] = pipe(
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Avatar'),
    useDefaultModifier(DEFAULT_PROPS),
    useColorConverter('text3'),
    useFullColorModifier,
    useSizeModifier,
    usePositionModifier,
    useFlexWrapperModifier,
    useBackgroundModifier,
    usePaddingModifier,
    useMarginModifier,
    useBorderModifier,
    useShadowModifier,
    useOverflowModifier
  )([{}, rootProps])

  let { initials, name, icon, src, invert, textProps, iconProps, ...props } = formattedProps
  initials = initials || getInitials(name)

  let content = (
    <IconLabel
      center
      color={fontColor}
      size={sizeCode}
      label={!icon && initials}
      icon={icon}
      invert={invert}
      textProps={{ strong: true, ...textProps }}
      iconProps={iconProps}
    />
  )
  if (!!src) content = <Image br={0} src={src} width={sizeCode} height={sizeCode} />

  return (
    <AbsView className="neko-avatar" {...props}>
      {content}
    </AbsView>
  )
}
