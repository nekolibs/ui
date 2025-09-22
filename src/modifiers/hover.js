import React from 'react'

export function useHoverConverter([values, props]) {
  const [isHover, setIsHover] = React.useState(false)
  let { hover, onMouseEnter, onMouseLeave, ...restProps } = props

  const handleMouseEnter = () => {
    setIsHover(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    setIsHover(false)
    onMouseLeave?.()
  }

  if (!isHover) hover = {}

  return [
    { ...values, isHover },
    {
      ...restProps,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ...hover,
    },
  ]
}
