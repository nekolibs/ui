import { pipe } from 'ramda'

import { AbsTouchableOpacity } from '../../abstractions/TouchableOpacity'
import { IconLabel } from '../presentation/IconLabel'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useCursorModifier } from '../../modifiers/cursor'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useFullColorModifier } from '../../modifiers/fullColor'
import { useHoverConverter } from '../../modifiers/hover'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useSizeModifier } from '../../modifiers/size'
import { useStateModifier } from '../../modifiers/state'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }]) => ({
  paddingH: sizeCode,
  paddingV: 2,
  height: sizeCode,
  br: sizeCode,
  border: 1,
  center: true,
  hover: {
    opacity: 0.7,
  },
})

export function Button(rootProps) {
  const [{ loading, fontColor, sizeCode }, formattedProps] = pipe(
    useColorConverter('primary'),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Button'),
    useDefaultModifier(DEFAULT_PROPS),
    useHoverConverter,
    useCursorModifier,
    useFullColorModifier,
    useDisplayModifier,
    useStateModifier,
    useSizeModifier,
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useFlexWrapperModifier,
    useBackgroundModifier,
    useBorderModifier
  )([{}, rootProps])

  const { label, icon, textProps, iconProps, gap, invert, size, ...props } = formattedProps

  return (
    <AbsTouchableOpacity className="neko-button neko-wave-click-effect" type="button" {...props}>
      <IconLabel
        center
        color={fontColor}
        size={sizeCode}
        label={label}
        icon={icon}
        gap={gap}
        invert={invert}
        textProps={{ strong: true, ...textProps }}
        iconProps={iconProps}
        loading={loading}
      />
    </AbsTouchableOpacity>
  )
}
