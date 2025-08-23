import { pipe } from 'ramda'

import { AbsView } from '../../abstractions/View'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useDefaultModifier } from '../../modifiers/default'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  padding: 'md', //
  br: 'xlg',
  bg: 'overlayBG',
}

export function Card({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('Card'),
    useDefaultModifier(DEFAULT_PROPS),
    useSizeModifier, //
    usePositionModifier,
    useOverflowModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexWrapperModifier,
    useFlexModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  return (
    <AbsView className="neko-card" {...props}>
      {children}
    </AbsView>
  )
}
