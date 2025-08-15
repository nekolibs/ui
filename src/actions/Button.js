import { pipe } from 'ramda'

import { AbsTouchableOpacity } from '../abstractions/TouchableOpacity'
import { Text } from '../text/Text'
import { useBackgroundModifier } from '../modifiers/background'
import { useBorderModifier } from '../modifiers/border'
import { useFlexModifier } from '../modifiers/flex'
import { useFlexWrapperModifier } from '../modifiers/flexWrapper'
import { useFullColorModifier } from '../modifiers/fullColor.js'
import { useMarginModifier } from '../modifiers/margin'
import { useMergeThemeComponent } from '../theme/ThemeHandler'
import { usePaddingModifier } from '../modifiers/padding'
import { usePositionModifier } from '../modifiers/position'
import { useSizeModifier } from '../modifiers/size'

export function Button(rootProps) {
  let { label, style, textProps, size = 'md', ...props } = useMergeThemeComponent('Button', rootProps)
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
      <Text center color={fontColor} strong size={size} {...textProps}>
        {label}
      </Text>
    </AbsTouchableOpacity>
  )
}
