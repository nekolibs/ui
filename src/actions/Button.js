import { pipe } from 'ramda'

import { AbsTouchableOpacity } from '../abstractions/TouchableOpacity'
import { IconLabel } from '../presentation'
import { useBackgroundModifier } from '../modifiers/background'
import { useBorderModifier } from '../modifiers/border'
import { useFlexModifier } from '../modifiers/flex'
import { useFlexWrapperModifier } from '../modifiers/flexWrapper'
import { useFullColorModifier } from '../modifiers/fullColor'
import { useMarginModifier } from '../modifiers/margin'
import { useMergeThemeComponent } from '../theme/ThemeHandler'
import { usePaddingModifier } from '../modifiers/padding'
import { usePositionModifier } from '../modifiers/position'
import { useSizeModifier } from '../modifiers/size'

export function Button(rootProps) {
  let {
    label,
    style,
    icon,
    textProps,
    iconProps,
    gap,
    invert,
    size = 'md',
    ...props
  } = useMergeThemeComponent('Button', rootProps)
  const defaultProps = {
    paddingH: size,
    paddingV: 2,
    height: size,
    br: size,
    borderWidth: 1,
    color: 'primary',
    center: true,
    row: true,
  }
  const [fontColor, formattedProps] = useFullColorModifier({ ...defaultProps, ...props, style })

  props = pipe(
    useSizeModifier, //
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useFlexWrapperModifier,
    useBackgroundModifier,
    useBorderModifier
  )(formattedProps)

  return (
    <AbsTouchableOpacity className="neko-button neko-wave-click-effect" {...props}>
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
    </AbsTouchableOpacity>
  )
}
