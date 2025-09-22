import tinycolor from 'tinycolor2'
import { pipe } from 'ramda'

import { AbsBlurView } from '../../abstractions/BlurView'
import { useAnimationModifier } from '../../modifiers/animation'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useColors } from '../../theme'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useStateModifier } from '../../modifiers/state'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS =
  (colors) =>
  ([{}, {}]) => {
    const isDark = tinycolor(colors?.overlayBG || colors?.bg).isDark()

    return {
      tint: isDark ? 'dark' : 'light',
    }
  }

export function BlurView({ children, ...rootProps }) {
  const colors = useColors()

  const [{}, props] = pipe(
    useThemeComponentModifier('BlurView'),
    useDefaultModifier(DEFAULT_PROPS(colors)),
    useFlexWrapperModifier,
    useDisplayModifier,
    useAnimationModifier,
    useStateModifier,
    useSizeModifier,
    usePositionModifier,
    useOverflowModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  return (
    <AbsBlurView className="neko-blur-view" {...props}>
      {children}
    </AbsBlurView>
  )
}
