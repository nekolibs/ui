import * as Icons from '@remixicon/react'

import { capitalizeFirstLetter, toCamelCase } from '../helpers/string'

export function AbsIcon({ name, ...props }) {
  if (!!name && !name.startsWith('Ri')) name = 'Ri' + capitalizeFirstLetter(toCamelCase(name))
  const IconComponent = Icons[name] || Icons['RiCircleFill']

  return <IconComponent {...props} />
}
