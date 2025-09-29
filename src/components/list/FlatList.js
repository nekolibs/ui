import { pipe } from 'ramda'

import { AbsFlatList } from '../../abstractions/FlatList'
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

export function FlatList({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('FlatList'),
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
  // useNormalView = useResponsiveValue(useNormalView)

  return (
    <AbsFlatList className="neko-flat-list" {...props}>
      {children}
    </AbsFlatList>
  )
}
