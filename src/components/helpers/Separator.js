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

const DEFAULT_PROPS = ([{ size, sizeCode }, { line, vertical }]) => {
  const lineSize = is(Number, line) ? line : 1
  return {
    ...(vertical
      ? { width: !!line ? 2 * size : size, fullH: true, row: true }
      : { height: !!line ? 2 * size : size, fullW: true }),
    br: sizeCode,
    center: true,
    lineProps: vertical
      ? { width: lineSize, fullH: true, br: lineSize }
      : { height: lineSize, fullW: true, br: lineSize },
  }
}

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

  const { line, vertical, lineProps, ...props } = formattedProps

  return (
    <AbsView className="neko-separator" {...props}>
      {!!line && <View bg={color} className="neko-separator-line" {...lineProps} />}
    </AbsView>
  )
}

export const Divider = Separator
