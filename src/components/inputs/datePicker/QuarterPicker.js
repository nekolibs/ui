import React from 'react'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/esm/plugin/quarterOfYear'

import { CalendarNav } from '../../calendar/CalendarNav'
import { ClearLink } from '../../actions/ClearLink'
import { Col } from '../../structure/Col'
import { Divider } from '../../helpers'
import { Grid } from '../../structure/Row'
import { InfiniteCarousel } from '../../carousel/InfiniteCarousel'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { isDateDisabled } from '../../calendar/_helpers/dateDisabled'

dayjs.extend(quarterOfYear)

const quarters = [1, 2, 3, 4]

function QuarterGrid({ year, selectedValue, onSelect, min, max, onCheckDisabled }) {
  const yearDate = dayjs().year(year).startOf('year')

  return (
    <Grid colSpan={6} gap="xs">
      {quarters.map((quarter) => {
        const dateVal = yearDate.quarter(quarter)
        const isActive = !!selectedValue && dateVal.isSame(selectedValue, 'week')
        const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

        return (
          <Col key={quarter}>
            <Link
              fullW
              br="md"
              padding="sm"
              onPress={() => onSelect(dateVal)}
              bg={isActive && 'primary'}
              disabled={disabled}
            >
              <Text text2={!isActive} strong={isActive} center>
                Q{dateVal.quarter()}
              </Text>
            </Link>
          </Col>
        )
      })}
    </Grid>
  )
}

export function QuarterPicker({ value, onChange, min, max, onCheckDisabled, allowClear, ...props }) {
  const [localValue, setLocalValue] = React.useState(value)
  const [currentYear, setCurrentYear] = React.useState(() => dayjs(value || undefined).startOf('year'))
  value = value === undefined ? localValue : value

  React.useEffect(() => {
    setLocalValue(value)
    if (value?.isValid?.()) setCurrentYear(value.startOf('year'))
  }, [value?.quarter?.(), value?.year?.()])

  const handleChange = (v) => {
    const newValue = v.startOf('quarter')
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const yearValue = currentYear.year()
  const minYear = min ? dayjs(min).year() : undefined
  const maxYear = max ? dayjs(max).year() : undefined

  const renderSlide = (v) => (
    <QuarterGrid year={v} selectedValue={value} onSelect={handleChange} min={min} max={max} onCheckDisabled={onCheckDisabled} />
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
      <ClearLink hide={!allowClear} value={value} onChange={onChange} />
    </View>
  )
}
