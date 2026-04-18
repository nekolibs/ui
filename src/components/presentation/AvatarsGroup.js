import React from 'react'

import { Avatar } from './Avatar'
import { View } from '../structure/View'
import { useGetElementHeight } from '../../theme'

export function AvatarsGroup({ maxCount, size = 'md', overlap, children, ...props }) {
  const getSize = useGetElementHeight()
  const sizeValue = getSize(size)
  overlap = overlap || Math.round(sizeValue * 0.6)

  const items = React.Children.toArray(children).filter(React.isValidElement)
  const visibleItems = maxCount ? items.slice(0, maxCount) : items
  const overflowCount = maxCount ? items.length - maxCount : 0

  return (
    <View row centerV>
      {visibleItems.map((child, index) => (
        <View key={child.key || index} style={index > 0 ? { marginLeft: -overlap } : undefined}>
          {React.cloneElement(child, { size, border: 1, borderColor: 'overlayBG', ...props })}
        </View>
      ))}
      {overflowCount > 0 && (
        <View style={{ marginLeft: -overlap }}>
          <Avatar name={`+${overflowCount}`} size={size} color="text4" border borderColor="overlayBG" />
        </View>
      )}
    </View>
  )
}
