import React from 'react'
import dayjs from 'dayjs'

import { CalendarNav } from '../../calendar/CalendarNav'
import { Col } from '../../structure/Col'
import { Grid } from '../../structure/Row'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { WeekDaysBar } from '../../calendar/WeekDaysBar'
import { isDateDisabled } from '../../calendar/_helpers/dateDisabled'
import { useCalendarDays } from '../../calendar/_helpers/calendarDays'

export function DayPicker({ value, onChange, min, max, onCheckDisabled, ...props }) {
  if (!!value) value = dayjs(value)
  const [localValue, setLocalValue] = React.useState(value)
  const [currentMonth, setCurrentMonth] = React.useState(() => dayjs(value || undefined).startOf('month'))
  value = value === undefined ? localValue : value

  React.useEffect(() => {
    setLocalValue(value)
    if (value?.isValid?.()) setCurrentMonth(value.startOf('month'))
  }, [value?.day?.(), value?.month?.(), value?.year?.()])

  const handleChange = (v) => {
    setLocalValue(v)
    onChange?.(v)
  }

  const { cells } = useCalendarDays(currentMonth)

  return (
    <View className="neko-day-picker" width={275} {...props}>
      <CalendarNav value={currentMonth} onChange={setCurrentMonth} />
      <WeekDaysBar />

      <Grid className="neko-day-picker-days" colSpan={24 / 7} gap="sm">
        {cells.map((day, i) => {
          const dateVal = currentMonth.date(day)
          const isActive = !!value && !!day && dateVal.isSame(value, 'day')
          const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

          return (
            <Col key={day ? dateVal.format('YYYYMMDD') : i} className="day-cell" center>
              <Link
                ratio={1}
                fullW
                center
                br="md"
                onPress={() => !!day && handleChange(dateVal)}
                bg={isActive && 'primary'}
                disabled={disabled}
              >
                <Text sm text2 center strong={isActive}>
                  {day || ''}
                </Text>
              </Link>
            </Col>
          )
        })}
      </Grid>
    </View>
  )
}
