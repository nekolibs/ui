import { pipe } from 'ramda'

import { AbsView } from '../abstractions/View'
import { useFlexModifier } from '../modifiers/flex'
import { useFlexWrapperModifier } from '../modifiers/flexWrapper'
import { useMarginModifier } from '../modifiers/margin'
import { usePaddingModifier } from '../modifiers/padding'
import { usePositionModifier } from '../modifiers/position'
import { useSizeModifier } from '../modifiers/size'

export function View({ children, ...props }) {
  props = pipe(
    useSizeModifier, //
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexWrapperModifier,
    useFlexModifier
  )(props)

  return <AbsView {...props}>{children}</AbsView>
}
