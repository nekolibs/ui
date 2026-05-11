import React from 'react'
import dayjs from 'dayjs'

import { CalendarNav } from '../../calendar/CalendarNav'
import { Col } from '../../structure/Col'
import { Divider } from '../../helpers'
import { Grid } from '../../structure/Row'
import { InfiniteCarousel } from '../../carousel/InfiniteCarousel'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { isDateDisabled } from '../../calendar/_helpers/dateDisabled'

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

function MonthGrid({ year, selectedValue, onSelect, min, max, onCheckDisabled }) {
  const yearDate = dayjs().year(year).startOf('year')

  return (
    <Grid colSpan={8} gap="xs">
      {months.map((month) => {
        const dateVal = yearDate.month(month)
        const isActive = !!selectedValue && dateVal.isSame(selectedValue, 'week')
        const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

        return (
          <Col key={month}>
            <Link
              fullW
              br="md"
              padding="sm"
              onPress={() => onSelect(dateVal)}
              bg={isActive && 'primary'}
              disabled={disabled}
            >
              <Text text2={!isActive} strong={isActive} center>
                {dateVal.format('MMM')}
              </Text>
            </Link>
          </Col>
        )
      })}
    </Grid>
  )
}

export function MonthPicker({ value, onChange, min, max, onCheckDisabled, ...props }) {
  const [localValue, setLocalValue] = React.useState(value)
  const [currentYear, setCurrentYear] = React.useState(() => dayjs(value || undefined).startOf('year'))
  value = value === undefined ? localValue : value

  React.useEffect(() => {
    setLocalValue(value)
    if (value?.isValid?.()) setCurrentYear(value.startOf('year'))
  }, [value?.month?.(), value?.year?.()])

  const handleChange = (v) => {
    const newValue = v.startOf('month')
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const yearValue = currentYear.year()
  const minYear = min ? dayjs(min).year() : undefined
  const maxYear = max ? dayjs(max).year() : undefined

  const renderSlide = (v) => (
    <MonthGrid year={v} selectedValue={value} onSelect={handleChange} min={min} max={max} onCheckDisabled={onCheckDisabled} />
  )

  return (
    <View className="neko-day-picker" width={275} {...props}>
      <CalendarNav value={currentYear} onChange={setCurrentYear} level="year" />
      <Divider />
      <InfiniteCarousel
        value={yearValue}
        onChange={(v) => setCurrentYear(dayjs().year(v).startOf('year'))}
        renderSlide={renderSlide}
        min={minYear}
        max={maxYear}
      />
    </View>
  )
}
