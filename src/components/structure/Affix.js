import React from 'react'
import { View } from './View'

export function Affix({ children, shadow, offsetTop, offsetBottom, ...props }) {
  const [isFloating, setIsFloating] = React.useState(false)
  const sentinelRef = React.useRef()

  React.useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsFloating(!entry.isIntersecting),
      { threshold: [1] }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} style={{ height: 0 }} />
      <View
        sticky
        top={offsetBottom === undefined ? (offsetTop || 0) : undefined}
        bottom={offsetBottom}
        shadow={shadow && isFloating}
        {...props}
      >
        {children}
      </View>
    </>
  )
}
