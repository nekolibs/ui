import { Icon } from '../presentation/Icon'
import { Link } from '../actions/Link'
import { Text } from '../text/Text'
import { View } from '../structure/View'

export function CalendarNav({ value, onChange, level, ...props }) {
  const prevMonth = () => onChange((m) => m.subtract(1, 'month'))
  const nextMonth = () => onChange((m) => m.add(1, 'month'))

  const prevYear = () => onChange((m) => m.subtract(1, 'year'))
  const nextYear = () => onChange((m) => m.add(1, 'year'))

  const prevDecade = () => onChange((m) => m.subtract(10, 'year'))
  const nextDecade = () => onChange((m) => m.add(10, 'year'))

  const showMonth = level !== 'year'

  if (level === 'decade') {
    const year = value.year()

    return (
      <View className="neko-calendar-nav" row centerV gap="xxs" height={30} {...props}>
        <Link onPress={prevDecade} aria-label="Previous decade" padding="xxs" paddingL={0}>
          <Icon name="arrow-left-double-line" />
        </Link>

        <Text center flex>
          {year}-{year + 9}
        </Text>

        <Link onPress={nextDecade} aria-label="Next decade" padding="xxs" paddingR={0}>
          <Icon name="arrow-right-double-line" />
        </Link>
      </View>
    )
  }

  return (
    <View className="neko-calendar-nav" row centerV gap="xxs" height={30} {...props}>
      <Link onPress={prevYear} aria-label="Previous year" padding="xxs" paddingL={0}>
        <Icon name="arrow-left-double-line" />
      </Link>

      {showMonth && (
        <Link onPress={prevMonth} aria-label="Previous month" padding="xxs">
          <Icon name="arrow-left-s-line" />
        </Link>
      )}

      <View center flex gap="xxs" row>
        {showMonth && <Text center>{value.format?.('MMM')}</Text>}

        <Text center>{value.format?.('YYYY')}</Text>
      </View>

      {showMonth && (
        <Link onPress={nextMonth} aria-label="Next month" padding="xxs">
          <Icon name="arrow-right-s-line" />
        </Link>
      )}

      <Link onPress={nextYear} aria-label="Next year" padding="xxs" paddingR={0}>
        <Icon name="arrow-right-double-line" />
      </Link>
    </View>
  )
}
