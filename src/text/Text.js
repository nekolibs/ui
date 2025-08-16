import { pipe } from 'ramda'

import { AbsText } from '../abstractions/Text'
import { useFlexModifier } from '../modifiers/flex'
import { useMarginModifier } from '../modifiers/margin'
import { usePaddingModifier } from '../modifiers/padding'
import { useSizeModifier } from '../modifiers/size'
import { useTextModifier } from '../modifiers/text'

export function Text({ children, ...props }) {
  props = pipe(
    useSizeModifier, //
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useTextModifier
  )(props)

  return <AbsText {...props}>{children}</AbsText>
}

export const Title = Text
