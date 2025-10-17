import { pipe } from 'ramda'

import { Tag } from './Tag'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  icon: 'star-fill', //
  // outline: false,
}

export function RateTag({ value, ...rootProps }) {
  let [{ size, sizeCode, color }, formattedProps] = pipe(
    useColorConverter('primary'),
    useSizeConverter('icons', 'md'),
    useThemeComponentModifier('RateTag'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { icon, ...props } = formattedProps

  return (
    <Tag
      icon={icon}
      label={value}
      color={color}
      textProps={{ size: moveScale(sizeCode, -1) }}
      gap={moveScale(sizeCode, -3)}
      {...props}
    />
  )
}
