import { pipe, omit } from 'ramda'

import { IconLabel } from '../presentation/IconLabel'
import { Link } from './Link'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Breadcrumb({ items, onChange, ...rootProps }) {
  const [{ sizeCode }, props] = pipe(
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Breadcrumb')
  )([{}, rootProps])

  const oneSizeDown = moveScale(sizeCode, -1)
  const twoSizeDown = moveScale(sizeCode, -1)
  const gap = 'sm'

  const handlePress = (item, index) => {
    onChange?.(item, index)
    item.onPress?.(index)
    item.onClick?.(index)
  }

  return (
    <View className="neko-breadcrumb" row gap={gap} centerV {...props}>
      {items.map((item, index) => {
        const active = index === items.length - 1

        return (
          <View row gap={gap} centerV key={item.key || index}>
            <Link onPress={!active ? () => handlePress(item, index) : undefined}>
              <IconLabel
                color={active ? 'text' : 'text3'}
                size={sizeCode}
                iconProps={{ size: oneSizeDown }}
                textProps={{ strong: active }}
                {...omit(['onPress', 'onClick'], item)}
              />
            </Link>
            {!active && <Text text4 label="/" size={moveScale(sizeCode, -1)} />}
          </View>
        )
      })}
    </View>
  )
}
