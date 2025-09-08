import { pipe } from 'ramda'

import { AbsText } from '../../abstractions/Text'
import { VerticalView } from '../helpers/VerticalView'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useTextConverter } from '../../modifiers/textConverter'
import { useTextModifier } from '../../modifiers/text'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function VerticalText({ children, label, invert, ...rootProps }) {
  const [_, { style, ...props }] = pipe(
    useColorConverter('text'),
    useTextConverter('p'),
    useThemeComponentModifier('VerticalText'),
    useTextModifier
  )([{}, rootProps])

  return (
    <VerticalView invert={invert} {...props}>
      <AbsText
        style={{
          ...style,
        }}
      >
        {children || label}
      </AbsText>
    </VerticalView>
  )
}
