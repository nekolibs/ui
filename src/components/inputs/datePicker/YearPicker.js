import { range } from 'ramda'
import React from 'react'
import dayjs from 'dayjs'

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

function getDecadeIndex(value) {
  return Math.floor(dayjs(value || undefined).year() / 10)
}

function decadeFromIndex(i) {
  return dayjs().year(i * 10).startOf('year')
}

function DecadeGrid({ decadeIndex, selectedValue, onSelect, min, max, onCheckDisabled }) {
  const decadeStart = decadeFromIndex(decadeIndex)
  const years = range(decadeStart.year(), decadeStart.year() + 10)

  return (
    <Grid colSpan={12} gap="xs">
      {years.map((year) => {
        const dateVal = decadeStart.year(year)
        const isActive = !!selectedValue && dateVal.isSame(selectedValue, 'week')
        const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

        return (
          <Col key={year}>
            <Link
              fullW
              br="md"
              padding="sm"
              onPress={() => onSelect(dateVal)}
              bg={isActive && 'primary'}
              disabled={disabled}
            >
              <Text text2={!isActive} strong={isActive} center>
                {dateVal.year()}
              </Text>
            </Link>
          </Col>
        )
      })}
    </Grid>
  )
}

export function YearPicker({ value, onChange, min, max, onCheckDisabled, allowClear, ...props }) {
  const [localValue, setLocalValue] = React.useState(value)
  const [currentDecade, setCurrentDecade] = React.useState(() => getDecadeIndex(value))

  value = value === undefined ? localValue : value

  React.useEffect(() => {
    setLocalValue(value)
    if (value?.isValid?.()) setCurrentDecade(getDecadeIndex(value))
  }, [value?.year?.()])

  const handleChange = (v) => {
    const newValue = v.startOf('year')
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const minDecade = min ? getDecadeIndex(min) : undefined
  const maxDecade = max ? getDecadeIndex(max) : undefined

  const renderSlide = (v) => (
    <DecadeGrid decadeIndex={v} selectedValue={value} onSelect={handleChange} min={min} max={max} onCheckDisabled={onCheckDisabled} />
  )

  return (
    <View className="neko-day-picker" width={275} {...props}>
      <CalendarNav value={decadeFromIndex(currentDecade)} onChange={(v) => setCurrentDecade(getDecadeIndex(v))} level="decade" />
      <Divider />
      <InfiniteCarousel
        value={currentDecade}
        onChange={setCurrentDecade}
        renderSlide={renderSlide}
        min={minDecade}
        max={maxDecade}
      />
      <ClearLink hide={!allowClear} value={value} onChange={onChange} />
    </View>
  )
}
