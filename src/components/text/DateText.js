import { is } from 'ramda'
import dayjs from 'dayjs'

import { Text } from '../text'

export function DateText({ format = 'DD MMM YYYY', value, children, ...props }) {
  value = is(String, children) ? children : value
  // TODO: Get format from i18n

  return <Text {...props}>{dayjs(value).format(format)}</Text>
}
