import { pipe } from 'ramda'

import { AbsText } from '../../abstractions/Text'
import { useFlexModifier } from '../../modifiers/flex'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { useSizeModifier } from '../../modifiers/size'
import { useTextModifier } from '../../modifiers/text'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Text({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('Text'),
    useSizeModifier, //
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useTextModifier
  )([{}, rootProps])

  return <AbsText {...props}>{children}</AbsText>
}

export const Title = Text
