import { curry } from 'ramda'
import React from 'react'

import { useGetResponsiveValue } from '../responsive/responsiveHooks'

export const useResponsiveConverter = curry(function (keys, [values, props]) {
  const getValue = useGetResponsiveValue()

  return React.useMemo(() => {
    const formattedProps = Object.keys(props).reduce((acc, k) => {
      let v = props[k]
      if (!keys?.length || keys.includes(k)) v = getValue(v)
      acc[k] = v
      return acc
    }, {})

    return [values, formattedProps]
  }, [getValue])
})
