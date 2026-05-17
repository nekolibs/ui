import { Text } from '../text/Text'
import { View } from '../structure/View'
import { getFirstDayOfWeek } from '../../helpers/weekStart'

const ALL_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function WeekDaysBar() {
  const firstDay = getFirstDayOfWeek()
  const labels = [...ALL_DAYS.slice(firstDay), ...ALL_DAYS.slice(0, firstDay)]

  return (
    <View className="neko-week-days-bar" row center gap="sm">
      {labels.map((w) => (
        <View key={w} flex height={30} center>
          <Text center sm text4>
            {w}
          </Text>
        </View>
      ))}
    </View>
  )
}
