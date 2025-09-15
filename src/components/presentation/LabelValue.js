import { pipe, is } from 'ramda'

import { IconLabel } from './IconLabel'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useDefaultModifier } from '../../modifiers/default'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }, { vertical, spread }]) => {
  return {
    row: !vertical,
    centerV: !vertical,
    justify: !!spread && 'space-between',
    gap: !vertical ? moveScale(sizeCode, -1) : 0,
    labelProps: {
      size: moveScale(sizeCode, !vertical ? 0 : -2),
      moveIconSizeScale: !vertical ? -1 : -2,
      color: 'text3',
    },
    valueProps: {
      size: sizeCode,
      align: spread && 'right',
    },
  }
}

export function LabelValue({ children, ...rootProps }) {
  const [{ sizeCode, color }, formattedProps] = pipe(
    // useColorConverter(),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Labelvalue'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { icon, label, iconColor, labelProps, value, valueProps, vertical, spread, ...props } = formattedProps
  let separator = !vertical && !spread ? ':' : ''

  let content = children || value
  if (is(String, value)) content = <Text label={value} {...valueProps} />

  return (
    <View className="neko-label-value" {...props}>
      <IconLabel label={label + separator} icon={icon} iconColor={iconColor} {...labelProps} />
      {content}
    </View>
  )
}
