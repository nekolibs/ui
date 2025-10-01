import { range } from 'ramda'
import React from 'react'
import dayjs from 'dayjs'

import { CalendarNav } from '../../calendar/CalendarNav'
import { Col } from '../../structure/Col'
import { Divider } from '../../helpers'
import { Grid } from '../../structure/Row'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { isDateDisabled } from '../../calendar/_helpers/dateDisabled'

function getDecade(value) {
  const year = dayjs(value || undefined).year()
  const decadeStartYear = Math.floor(year / 10) * 10
  return dayjs().year(decadeStartYear).startOf('year')
}

export function YearPicker({ value, onChange, min, max, onCheckDisabled, ...props }) {
  const [localValue, setLocalValue] = React.useState(value)
  const [currentDecade, setCurrentDecade] = React.useState(() => getDecade(value))

  value = value === undefined ? localValue : value

  React.useEffect(() => {
    setLocalValue(value)
    if (value?.isValid?.()) setCurrentDecade(getDecade(value))
  }, [value?.year?.()])

  const handleChange = (v) => {
    const newValue = v.startOf('year')
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const years = range(currentDecade.year(), currentDecade.year() + 10)

  return (
    <View className="neko-day-picker" width={275} {...props}>
      <CalendarNav value={currentDecade} onChange={setCurrentDecade} level="decade" />
      <Divider />

      <Grid colSpan={12} gap="xs">
        {years.map((year) => {
          const dateVal = currentDecade.year(year)
          const isActive = !!value && dateVal.isSame(value, 'week')
          const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

          return (
            <Col key={year}>
              <Link
                fullW
                br="md"
                padding="sm"
                onPress={() => handleChange(dateVal)}
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
    </View>
  )
}
