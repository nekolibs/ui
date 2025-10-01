import { splitEvery, identity } from 'ramda'
import React from 'react'
import dayjs from 'dayjs'

import { CalendarNav } from '../../calendar/CalendarNav'
import { Col } from '../../structure/Col'
import { Link } from '../../actions/Link'
import { Row } from '../../structure/Row'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { WeekDaysBar } from '../../calendar/WeekDaysBar'
import { isDateDisabled } from '../../calendar/_helpers/dateDisabled'
import { useCalendarDays } from '../../calendar/_helpers/calendarDays'

export function WeekPicker({ value, onChange, min, max, onCheckDisabled, ...props }) {
  const [localValue, setLocalValue] = React.useState(value)
  const [currentMonth, setCurrentMonth] = React.useState(() => dayjs(value || undefined).startOf('month'))
  value = value === undefined ? localValue : value

  React.useEffect(() => {
    setLocalValue(value)
    if (value?.isValid?.()) setCurrentMonth(value.startOf('month'))
  }, [value?.day?.(), value?.month?.(), value?.year?.()])

  const handleChange = (v) => {
    const newValue = v.startOf('week')
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const { cells } = useCalendarDays(currentMonth)
  const weeks = splitEvery(7, cells)

  return (
    <View className="neko-day-picker" width={275} {...props}>
      <CalendarNav value={currentMonth} onChange={setCurrentMonth} />
      <WeekDaysBar />

      <View colSpan={24 / 7} gap="sm">
        {weeks.map((week, wi) => {
          const firstDay = week.find(identity)
          const dateVal = currentMonth.date(firstDay)
          const isActive = !!value && !!firstDay && dateVal.isSame(value, 'week')
          const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

          return (
            <Link
              key={firstDay ? dateVal.format('YYYYMMDD') : wi}
              fullW
              br="md"
              onPress={() => !!firstDay && handleChange(dateVal)}
              bg={isActive && 'primary'}
              disabled={disabled}
            >
              <Row colSpan={24 / 7} gap="sm">
                {week.map((day, i) => {
                  const dateVal = currentMonth.date(day)

                  return (
                    <Col key={day ? dateVal.format('YYYYMMDD') : i} className="day-cell" center ratio={1}>
                      <Text sm text2 center strong={isActive}>
                        {day || ''}
                      </Text>
                    </Col>
                  )
                })}
              </Row>
            </Link>
          )
        })}
      </View>
    </View>
  )
}
