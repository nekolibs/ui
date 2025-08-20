import { pipe, is } from 'ramda'

import { AbsView } from '../../abstractions/View'
import { View } from '../structure/View'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ size, sizeCode }, { line }]) => ({
  height: !!line ? 2 * size : size,
  br: sizeCode,
  center: true,
  fullW: true,
})

export function Separator(rootProps) {
  const [{ color }, formattedProps] = pipe(
    useColorConverter('divider'),
    useSizeConverter('spaces', 'md'),
    useThemeComponentModifier('Separator'),
    useDefaultModifier(DEFAULT_PROPS),
    useSizeModifier,
    useMarginModifier,
    useFlexModifier,
    useFlexWrapperModifier
  )([{}, rootProps])

  const { line, lineProps, ...props } = formattedProps
  const lineHeight = is(Number, line) ? line : 1

  return (
    <AbsView className="neko-separator" {...props}>
      {!!line && (
        <View bg={color} br={lineHeight} height={lineHeight} fullW className="neko-separator-line" {...lineProps} />
      )}
    </AbsView>
  )
}

export const Divider = Separator
