import { pipe } from 'ramda'

import { AbsAnimatedView } from '../../abstractions/AnimatedView'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
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

export function ReanimatedView({ children, ...rootProps }) {
  const [{}, props] = pipe(
    useThemeComponentModifier('ReanimatedView'),
    useFlexWrapperModifier,
    useDisplayModifier,
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
    <AbsAnimatedView className="neko-reanimated-view" {...props}>
      {children}
    </AbsAnimatedView>
  )
}
