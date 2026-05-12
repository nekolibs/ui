import React from 'react'
import dayjs from 'dayjs'

import { CalendarNav } from '../../calendar/CalendarNav'
import { ClearLink } from '../../actions/ClearLink'
import { Col } from '../../structure/Col'
import { Grid } from '../../structure/Row'
import { InfiniteCarousel } from '../../carousel/InfiniteCarousel'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { WeekDaysBar } from '../../calendar/WeekDaysBar'
import { isDateDisabled } from '../../calendar/_helpers/dateDisabled'
import { useCalendarDays } from '../../calendar/_helpers/calendarDays'

function toMonthValue(date) {
  return date.year() * 12 + date.month()
}

function fromMonthValue(v) {
  return dayjs()
    .year(Math.floor(v / 12))
    .month(v % 12)
    .startOf('month')
}

const MonthDays = React.memo(function MonthDays({ monthValue, selectedKey, onSelect, min, max, onCheckDisabled }) {
  const month = fromMonthValue(monthValue)
  const selectedValue = selectedKey ? dayjs(selectedKey) : null
  const { cells } = useCalendarDays(month)

  return (
    <View>
      <WeekDaysBar />
      <Grid className="neko-day-picker-days" colSpan={24 / 7} gap="sm">
        {cells.map((day, i) => {
          const dateVal = month.date(day)
          const isActive = !!selectedValue && !!day && dateVal.isSame(selectedValue, 'day')
          const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

          return (
            <Col key={day ? dateVal.format('YYYYMMDD') : i} className="day-cell" center>
              <Link
                ratio={1}
                fullW
                center
                br="md"
                onPress={() => !!day && onSelect(dateVal)}
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
})

export function DayPicker({ value, onChange, min, max, onCheckDisabled, allowClear, ...props }) {
  if (!!value) value = dayjs(value)
  const [localValue, setLocalValue] = React.useState(value)
  const [currentMonth, setCurrentMonth] = React.useState(() => dayjs(value || undefined).startOf('month'))
  value = value === undefined ? localValue : value

  React.useEffect(() => {
    setLocalValue(value)
    if (value?.isValid?.()) setCurrentMonth(value.startOf('month'))
  }, [value?.day?.(), value?.month?.(), value?.year?.()])

  const handleChange = React.useCallback(
    (v) => {
      setLocalValue(v)
      onChange?.(v)
    },
    [onChange]
  )

  const monthValue = toMonthValue(currentMonth)
  const minMonth = min ? toMonthValue(dayjs(min).startOf('month')) : undefined
  const maxMonth = max ? toMonthValue(dayjs(max).startOf('month')) : undefined
  const selectedKey = value?.valueOf?.()

  const renderSlide = (v) => (
    <MonthDays
      monthValue={v}
      selectedKey={selectedKey}
      onSelect={handleChange}
      min={min}
      max={max}
      onCheckDisabled={onCheckDisabled}
    />
  )

  return (
    <View className="neko-day-picker" width={275} maxW={350} {...props}>
      <CalendarNav value={currentMonth} onChange={setCurrentMonth} />
      <InfiniteCarousel
        value={monthValue}
        onChange={(v) => setCurrentMonth(fromMonthValue(v))}
        renderSlide={renderSlide}
        min={minMonth}
        max={maxMonth}
      />
      <ClearLink hide={!allowClear} value={value} onChange={onChange} />
    </View>
  )
}
