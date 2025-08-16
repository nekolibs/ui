import { pipe } from 'ramda'

import { AbsView } from '../../abstractions/View'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function View({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('View'),
    useSizeModifier, //
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexWrapperModifier,
    useFlexModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  return (
    <AbsView className="neko-view" {...props}>
      {children}
    </AbsView>
  )
}
