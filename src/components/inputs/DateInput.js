import React from 'react'
import advancedFormat from 'dayjs/esm/plugin/advancedFormat'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/esm/plugin/weekOfYear'

import { LinkInput } from './LinkInput'
import { View } from '../structure/View'
import { useResponsiveValue } from '../../responsive'

dayjs.extend(advancedFormat)
dayjs.extend(weekOfYear)

import { DatePicker } from './datePicker/DatePicker'
import { MaskInput } from './MaskInput'
import { Popover } from '../structure/popover/Popover'
import { isValidDate } from '../calendar/_helpers/dateDisabled'

export function getDateInputDefaultFormat(type) {
  switch (type) {
    case 'year':
      return 'YYYY'
    case 'quarter':
      return 'YYYY-Q'
    case 'month':
      return 'YYYY-MM'
    case 'week':
      return 'YYYY-ww'
    default:
      return 'YYYY-MM-DD'
  }
}

export function DateInput({
  value,
  onChange,
  min,
  max,
  onCheckDisabled,
  placement,
  type = 'day',
  format,
  useBottomDrawer = { native: true, sm: true, md: true },
  ...props
}) {
  useBottomDrawer = useResponsiveValue(useBottomDrawer)
  format = format || getDateInputDefaultFormat(type)
  if (value === '') value = undefined
  const [inputValue, setInputValue] = React.useState('')
  const [localValue, setLocalValue] = React.useState(value)

  value = value || localValue

  const validations = { min, max, onCheckDisabled }

  const handleChange = (v) => {
    if (!isValidDate(v, format, validations)) return
    v = !!v ? dayjs(v) : null
    setLocalValue(v)
    onChange?.(v)
  }

  const handleChangeInput = (v) => {
    setInputValue(v)
    if (!isValidDate(v, format, validations)) return
    handleChange(v)
  }

  const onBlur = () => {
    if (isValidDate(inputValue, format, validations)) return
    handleChange(null)
    setInputValue('')
  }

  React.useEffect(() => {
    setInputValue(!!value ? dayjs(value).format(format) : '')
  }, [value])

  const Input = useBottomDrawer ? LinkInput : MaskInput

  return (
    <Popover
      trigger="click"
      placement={placement || 'bottomLeft'}
      snapPoints={[350]}
      useBottomDrawer={useBottomDrawer}
      watch={[value?.format?.('YYYYMMDD')]}
      renderContent={({ onClose }) => (
        <View flex centerH>
          <DatePicker
            value={value}
            onChange={(v) => {
              handleChange(v)
              onClose()
            }}
            {...validations}
            type={type}
          />
        </View>
      )}
    >
      <View fullW>
        <Input
          value={inputValue}
          onChange={handleChangeInput}
          suffixIcon="calendar-line"
          suffixIconColor="text4"
          onBlur={onBlur}
          mask={format.replace(/[DMYQwW]/gi, '9')}
          {...props}
        />
      </View>
    </Popover>
  )
}
