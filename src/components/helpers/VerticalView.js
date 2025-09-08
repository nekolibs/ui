import React from 'react'

import { View } from '../structure/View'
import { formatTransform } from '../../abstractions/helpers/transformStyle'
import { getElementSize } from '../../abstractions/helpers/componentSize'

export function VerticalView({ children, invert, ...props }) {
  const wrapperRef = React.useRef(null)
  const [size, setSize] = React.useState({})

  React.useLayoutEffect(() => {
    getElementSize(wrapperRef, setSize)
  }, [])

  const { height, width } = size

  return (
    <View width="100%" height="100%" {...props} relative ref={wrapperRef}>
      <View
        style={{
          position: 'absolute',
          width: height,
          height: width,
          transform: formatTransform([{ rotate: !!invert ? '90deg' : '-90deg' }]),
          left: width / 2 - height / 2,
          top: '50%',
          marginTop: -width / 2,
        }}
      >
        {children}
      </View>
    </View>
  )
}
