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

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export function MonthPicker({ value, onChange, min, max, onCheckDisabled, ...props }) {
  const [localValue, setLocalValue] = React.useState(value)
  value = value === undefined ? localValue : value

  React.useEffect(() => {
    setLocalValue(value)
  }, [value?.month?.(), value?.year?.()])

  const handleChange = (v) => {
    const newValue = v.startOf('month')
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const [currentYear, setCurrentYear] = React.useState(() => dayjs(value).startOf('year'))

  return (
    <View className="neko-day-picker" width={275} {...props}>
      <CalendarNav value={currentYear} onChange={setCurrentYear} level="year" />
      <Divider />

      <Grid colSpan={8} gap="xs">
        {months.map((month) => {
          const dateVal = currentYear.month(month)
          const isActive = !!value && dateVal.isSame(value, 'week')
          const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

          return (
            <Col key={month}>
              <Link
                fullW
                br="md"
                padding="sm"
                onPress={() => handleChange(dateVal)}
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
    </View>
  )
}
