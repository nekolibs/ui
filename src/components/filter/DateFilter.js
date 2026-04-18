import React from 'react'
import dayjs from 'dayjs'
import { is } from 'ramda'

import { DateInput } from '../inputs'
import { FilterItem } from './FilterItem'
import { useFilter } from './FilterHandler'

function getFormat(type) {
  switch (type) {
    case 'year':
      return 'YYYY'
    case 'quarter':
      return 'YYYY [Q]Q'
    case 'month':
      return 'YYYY MMM'
    case 'week':
      return 'YYYY wo'
    default:
      return 'YYYY-MM-DD'
  }
}

function formatValue(value, type) {
  if (!value) return null
  const date = dayjs(value)

  switch (type) {
    case 'year':
      return [date.startOf('year'), date.endOf('year')]
    case 'quarter':
      return [date.startOf('quarter'), date.endOf('quarter')]
    case 'month':
      return [date.startOf('month'), date.endOf('month')]
    case 'week':
      return [date.startOf('isoWeek'), date.endOf('isoWeek')]
    default:
      return [date.startOf('day'), date.endOf('day')]
  }
}

export function DateFilter({ name, label, type, format, useMapValue, ...rest }) {
  const { filters, onChangeFilter } = useFilter()
  let value = filters?.[name]
  format = format || getFormat(type)

  if (!!value?.init && !!value.end) {
    value = value.init
  }
  if (is(Array, value) && value?.length === 2) {
    value = value[0]
  }

  if (!!value && !!value.format) {
    label = value.format(format)
  }

  const handleChange = (val) => {
    let result = formatValue(val, type)
    if (!!result?.length && !!useMapValue) {
      const [init, end] = result
      result = { init, end }
    }
    onChangeFilter(name, result)
  }

  return (
    <FilterItem name={name}>
      {({ value: _v }) => <DateInput value={value} onChange={handleChange} type={type} {...rest} />}
    </FilterItem>
  )
}
