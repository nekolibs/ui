import { pipe } from 'ramda'

import { View } from '../structure/View'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Progress({ value, target = 100, bg = 'divider', height = 8, ...rootProps }) {
  const [{ color }, props] = pipe(
    useColorConverter('primary'),
    useThemeComponentModifier('Progress') //
  )([{}, rootProps])

  const pct = Math.max(0, Math.min(100, ((value || 0) / target) * 100))

  return (
    <View className="neko-progress" fullW height={height} bg={bg} br={height} hiddenOverflow relative {...props}>
      <View absolute top={0} bottom={0} left={0} bg={color} width={`${pct}%`} br={height} />
    </View>
  )
}
