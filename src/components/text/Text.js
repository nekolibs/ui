import { pipe } from 'ramda'

import { AbsText } from '../../abstractions/Text'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useFlexModifier } from '../../modifiers/flex'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { useSizeModifier } from '../../modifiers/size'
import { useTextConverter } from '../../modifiers/textConverter'
import { useTextModifier } from '../../modifiers/text'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Text({ children, label, ...rootProps }) {
  const [_, props] = pipe(
    useColorConverter('text'),
    useTextConverter('p'),
    useThemeComponentModifier('Text'),
    useSizeModifier, //
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useTextModifier
  )([{}, rootProps])

  return <AbsText {...props}>{children || label}</AbsText>
}

export const Title = Text
