import { Text } from '../text/Text'
import { View } from '../structure/View'

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function WeekDaysBar() {
  return (
    <View className="neko-week-days-bar" row center gap="sm">
      {weekdayLabels.map((w) => (
        <View key={w} flex height={30} center>
          <Text center sm text4>
            {w}
          </Text>
        </View>
      ))}
    </View>
  )
}
