import { pipe } from 'ramda'

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

const DEFAULT_PROPS = ([{ size, sizeCode }, { withLine }]) => ({
  height: withLine ? 2 * size : size,
  br: sizeCode,
  center: true,
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

  const { withLine, lineProps, lineWidth, lineHeight = 1, ...props } = formattedProps

  return (
    <AbsView className="neko-separator" {...props}>
      {!!withLine && (
        <View
          bg={color}
          br={lineHeight}
          height={lineHeight}
          fullW
          maxWidth={lineWidth}
          className="neko-separator-line"
          {...lineProps}
        />
      )}
    </AbsView>
  )
}
