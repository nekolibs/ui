import { pipe, range, is } from 'ramda'

import { Icon } from '../presentation'
import { View } from '../structure/View'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  color: 'primary',
  inactiveColor: 'text4_op50',
  max: 5,
  icon: 'star-fill',
}

export function Rate({ value, ...rootProps }) {
  let [{ size, sizeCode, color }, formattedProps] = pipe(
    useColorConverter('primary'),
    useSizeConverter('icons', 'md'),
    useThemeComponentModifier('Rate'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { icon, max, inactiveColor, tag, ...props } = formattedProps

  return (
    <View className="neko-rate" row gap="xxs" centerV minHeight={sizeCode} {...props}>
      {range(1, max + 1).map((i) => {
        const active = value >= i
        const partial = getDecimalOrEdge(value, i)

        let finalIcon = icon
        if (is(Function, icon)) finalIcon = icon?.({ value, optionValue: i, active })

        let finalColor = color
        if (is(Function, color)) finalColor = color?.({ value, optionValue: i, active })

        return (
          <View center key={i} relative>
            <Icon name={finalIcon} size={sizeCode} color={inactiveColor} />
            {!!partial && (
              <View absolute overflow="hidden" left={0} width={100 * partial + '%'}>
                <Icon name={finalIcon} size={sizeCode} color={finalColor} />
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

function getDecimalOrEdge(value, i) {
  if (value >= i) return 1
  if (value < i - 1) return 0
  return value - Math.floor(value)
}
