import { is } from 'ramda'
import dayjs from 'dayjs'

export function isDateDisabled(date, { min, max, onCheckDisabled } = {}) {
  const dateVal = !!date && dayjs(date)
  if (!dateVal || !dateVal.isValid()) return true
  if (!!min && dateVal.isBefore(min)) return true
  if (!!max && dateVal.isAfter(max)) return true
  return onCheckDisabled?.(dateVal) || false
}

export function isValidDate(v, format, validations = {}) {
  if (v === null || v === '') return true

  let dateVal = dayjs(v)

  if (is(String, v)) {
    if (v.length !== format.length) return false
    dateVal = dayjs(v, format, true)
    if (!dateVal.isValid()) return false
  }

  return !isDateDisabled(v, validations)
}
