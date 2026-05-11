import React from 'react'

const CarouselContext = React.createContext(null)
export const useCarousel = () => React.useContext(CarouselContext) || {}

export function CarouselHandler({
  children,
  items,
  activeIndex: controlledIndex,
  activeKey,
  onChange,
  afterChange,
  autoplay,
  autoplaySpeed = 3000,
  draggable,
  loop,
}) {
  const itemsCount = items?.length || 0
  const isControlled = controlledIndex !== undefined || activeKey !== undefined

  const [internalIndex, setInternalIndex] = React.useState(() => {
    if (controlledIndex !== undefined) return controlledIndex
    if (activeKey !== undefined) return Math.max(0, items?.findIndex((i) => i.key === activeKey) || 0)
    return 0
  })

  const resolvedIndex = isControlled
    ? activeKey !== undefined
      ? Math.max(0, items?.findIndex((i) => i.key === activeKey) || 0)
      : controlledIndex
    : internalIndex

  const activeItem = React.useMemo(() => items?.[resolvedIndex], [items, resolvedIndex])

  const pausedRef = React.useRef(false)

  const goTo = React.useCallback(
    (index) => {
      let next = index
      if (loop) next = ((next % itemsCount) + itemsCount) % itemsCount
      else next = Math.max(0, Math.min(next, itemsCount - 1))

      if (!isControlled) setInternalIndex(next)
      onChange?.(items?.[next]?.key, next)
    },
    [loop, itemsCount, isControlled, onChange, items]
  )

  const goToNext = React.useCallback(() => goTo(resolvedIndex + 1), [goTo, resolvedIndex])
  const goToPrev = React.useCallback(() => goTo(resolvedIndex - 1), [goTo, resolvedIndex])

  const pauseAutoplay = React.useCallback(() => {
    pausedRef.current = true
  }, [])

  const resumeAutoplay = React.useCallback(() => {
    pausedRef.current = false
  }, [])

  React.useEffect(() => {
    if (!autoplay || itemsCount <= 1) return

    const interval = setInterval(() => {
      if (!pausedRef.current) goToNext()
    }, autoplaySpeed)

    return () => clearInterval(interval)
  }, [autoplay, autoplaySpeed, itemsCount, resolvedIndex, goToNext])

  const value = {
    items,
    activeIndex: resolvedIndex,
    activeItem,
    itemsCount,
    goTo,
    goToNext,
    goToPrev,
    afterChange,
    draggable,
    loop,
    pauseAutoplay,
    resumeAutoplay,
  }

  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>
}
