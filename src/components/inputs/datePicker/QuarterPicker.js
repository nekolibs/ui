import React from 'react'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/esm/plugin/quarterOfYear'

import { CalendarNav } from '../../calendar/CalendarNav'
import { Col } from '../../structure/Col'
import { Divider } from '../../helpers'
import { Grid } from '../../structure/Row'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { isDateDisabled } from '../../calendar/_helpers/dateDisabled'

dayjs.extend(quarterOfYear)

const quarters = [1, 2, 3, 4]

export function QuarterPicker({ value, onChange, min, max, onCheckDisabled, ...props }) {
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

  return (
    <View className="neko-day-picker" width={275} {...props}>
      <CalendarNav value={currentYear} onChange={setCurrentYear} level="year" />
      <Divider />

      <Grid colSpan={6} gap="xs">
        {quarters.map((quarter) => {
          const dateVal = currentYear.quarter(quarter)
          const isActive = !!value && dateVal.isSame(value, 'week')
          const disabled = isDateDisabled(dateVal, { min, max, onCheckDisabled })

          return (
            <Col key={quarter}>
              <Link
                fullW
                br="md"
                padding="sm"
                onPress={() => handleChange(dateVal)}
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
    </View>
  )
}
