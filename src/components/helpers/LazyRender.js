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

  React.useEffect(() => {
    if (!whenVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOpen((open) => {
          if (entry.isIntersecting) return true
          return destroyOffScreen ? false : open
        })
      },
      { threshold: 0 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [whenVisible, destroyOffScreen])

  React.useEffect(() => {
    if (delay > 0 && !whenVisible) {
      const timer = setTimeout(() => setOpen(true), delay)
      return () => clearTimeout(timer)
    }
  }, [])

  React.useEffect(() => {
    if (ref.current && open) {
      setMinHeight(ref.current.offsetHeight)
    }
  }, [open])

  return (
    <View className="neko-lazy-render" {...props} minHeight={minHeight} ref={ref}>
      {open ? children : null}
    </View>
  )
}
