import React from 'react'
import dayjs from 'dayjs'

import { Col } from '../structure/Col'
import { Grid } from '../structure/Row'
import { Icon } from '../presentation/Icon'
import { Link } from '../actions/Link'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useCalendarDays } from './_helpers/calendarDays'

export function DayPicker({ initialValue, value, onChange, ...props }) {
  const [localValue, setLocalValue] = React.useState(dayjs(initialValue))
  value = value === undefined ? localValue : value
  const handleChange = (v) => {
    setLocalValue(v)
    onChange?.(v)
  }

  const [currentMonth, setCurrentMonth] = React.useState(() =>
    initialValue ? dayjs(initialValue).startOf('month') : dayjs().startOf('month')
  )

  const prevMonth = () => setCurrentMonth((m) => m.subtract(1, 'month'))
  const nextMonth = () => setCurrentMonth((m) => m.add(1, 'month'))

  const prevYear = () => setCurrentMonth((m) => m.subtract(1, 'year'))
  const nextYear = () => setCurrentMonth((m) => m.add(1, 'year'))

  const { weekdayLabels, cells } = useCalendarDays(currentMonth)

  return (
    <View className="neko-day-picker" width={250} {...props}>
      <View className="neko-date-picker-header" row centerV gap="xxs" height={30}>
        <Link onPress={prevYear} aria-label="Previous year" padding="xxs" paddingL={0}>
          <Icon name="arrow-left-double-line" />
        </Link>

        <Link onPress={prevMonth} aria-label="Previous month" padding="xxs">
          <Icon name="arrow-left-s-line" />
        </Link>

        <Text center flex>
          {currentMonth.format('MMM YYYY')}
        </Text>

        <Link onPress={nextMonth} aria-label="Next month" padding="xxs">
          <Icon name="arrow-right-s-line" />
        </Link>

        <Link onPress={nextYear} aria-label="Next year" padding="xxs" paddingR={0}>
          <Icon name="arrow-right-double-line" />
        </Link>
      </View>

      <View className="neko-day-picker-week" row center gap="sm">
        {weekdayLabels.map((w) => (
          <View key={w} flex height={30} center>
            <Text center sm text4>
              {w}
            </Text>
          </View>
        ))}
      </View>

      <Grid className="neko-day-picker-days" colSpan={24 / 7} gap="sm">
        {cells.map((val, idx) => {
          const dateVal = currentMonth.date(val)
          const isActive = dateVal.isSame(value, 'day')

          return (
            <Col key={idx} className="day-cell" center>
              <Link
                ratio={1}
                width={30}
                center
                br="md"
                onPress={() => !!val && handleChange(dateVal)}
                bg={isActive && 'primary'}
              >
                <Text sm text2 center strong={isActive}>
                  {val != null ? val : ''}
                </Text>
              </Link>
            </Col>
          )
        })}
      </Grid>
    </View>
  )
}
