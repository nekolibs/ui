import { Dimensions } from 'react-native'
import React from 'react'

import { View } from '../structure/View'

export function LazyRender({
  children,
  delay = 0,
  whenVisible = false,
  destroyOffScreen = false,
  minHeight: initMinHeight,
  ...props
}) {
  const ref = React.useRef(null)
  const [open, setOpen] = React.useState(!whenVisible && !delay)
  const [minHeight, setMinHeight] = React.useState(initMinHeight)
  const windowHeight = Dimensions.get('window').height

  const checkVisibility = React.useCallback(() => {
    if (!ref.current) return
    ref.current.measureInWindow((x, y, width, height) => {
      const isVisible = y + height > 0 && y < windowHeight
      setOpen((prev) => {
        if (isVisible) return true
        return destroyOffScreen ? false : prev
      })
    })
  }, [windowHeight, destroyOffScreen])

  React.useEffect(() => {
    if (whenVisible) {
      checkVisibility()
      const interval = setInterval(checkVisibility, 100)
      return () => clearInterval(interval)
    }
  }, [whenVisible, checkVisibility])

  React.useEffect(() => {
    if (delay > 0 && !whenVisible) {
      const timer = setTimeout(() => setOpen(true), delay)
      return () => clearTimeout(timer)
    }
  }, [])

  React.useEffect(() => {
    if (ref.current && open) {
      ref.current.measure((x, y, width, height) => {
        setMinHeight(height)
      })
    }
  }, [open])

  return (
    <View className="neko-lazy-render" {...props} minHeight={minHeight} ref={ref}>
      {open ? children : null}
    </View>
  )
}
