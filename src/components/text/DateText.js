import { is } from 'ramda'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/esm/plugin/relativeTime'

import { Text } from '../text'

dayjs.extend(relativeTime)

export function DateText({ format = 'DD MMM YYYY', fromNow, withFromNow, value, children, ...props }) {
  value = is(String, children) ? children : value
  if (!value) return false
  // TODO: Get format from i18n

  const date = dayjs(value)
  const formattedValue = fromNow ? date.fromNow() : date.format(format)
  const suffix = withFromNow ? ` (${date.fromNow()})` : ''

  return (
    <Text {...props}>
      {formattedValue}
      {suffix}
    </Text>
  )
}
