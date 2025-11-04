import { pipe } from 'ramda'
import React from 'react'

import { View } from './View'
import { useDefaultModifier } from '../../modifiers/default'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }]) => ({
  row: true,
  justify: 'stretch',
  br: sizeCode,
  // overflow: 'hidden',
})

export function Segment({ children, ...rootProps }) {
  const [{ sizeCode }, formattedProps] = pipe(
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Segment'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { br, ...props } = formattedProps
  const size = children?.length

  return (
    <View className="neko-segment" {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        const isFirst = index === 0
        const isLast = size - 1 === index

        const childProps = child.props || {}
        const newProps = {
          brL: br,
          brR: br,
          size: sizeCode,
        }

        if (!isLast) {
          newProps.brR = 0
        }
        if (!isFirst) {
          newProps.brL = 0
        }

        return React.cloneElement(child, newProps)
      })}
    </View>
  )
}
