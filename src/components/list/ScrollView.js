import { pipe } from 'ramda'

import { AbsScrollView } from '../../abstractions/ScrollView'
import { View } from '../structure/View'
import { useAnimationModifier } from '../../modifiers/animation'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useResponsiveValue } from '../../responsive'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useStateModifier } from '../../modifiers/state'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([_, { horizontal }]) => {
  const overflowKey = horizontal ? 'scrollX' : 'scrollY'

  return {
    [overflowKey]: true,
    row: !!horizontal,
  }
}

export function ScrollView({ children, useNormalView, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('ScrollView'),
    useDefaultModifier(DEFAULT_PROPS),
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
  useNormalView = useResponsiveValue(useNormalView)

  if (useNormalView) return <View {...rootProps}>{children}</View>

  return (
    <AbsScrollView className="neko-scroll-view" {...props}>
      {children}
    </AbsScrollView>
  )
}
