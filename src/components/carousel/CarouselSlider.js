import React from 'react'

import { View } from '../structure/View'
import { useCarousel } from './CarouselHandler'

function SlideContent({ item }) {
  const Content = React.useMemo(
    () => item.render || item.renderContent || item.Content,
    [item.render, item.renderContent, item.Content]
  )
  return Content ? <Content /> : null
}

export function CarouselSlider() {
  const { items, activeIndex, itemsCount, draggable, loop, afterChange, goToNext, goToPrev, pauseAutoplay, resumeAutoplay } =
    useCarousel()

  const containerRef = React.useRef(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState(0)
  const startXRef = React.useRef(0)
  const startTimeRef = React.useRef(0)
  const prevItemsRef = React.useRef(items)
  const skipTransitionRef = React.useRef(false)

  if (items !== prevItemsRef.current) {
    skipTransitionRef.current = true
    prevItemsRef.current = items
  }

  React.useEffect(() => {
    if (skipTransitionRef.current) {
      const id = requestAnimationFrame(() => {
        skipTransitionRef.current = false
      })
      return () => cancelAnimationFrame(id)
    }
  })

  if (!items?.length) return null

  const baseTranslate = -(activeIndex * 100) / itemsCount
  const dragPercent =
    isDragging && containerRef.current ? (dragOffset / containerRef.current.offsetWidth) * (100 / itemsCount) : 0
  const transformX = baseTranslate + dragPercent

  const dragStateRef = React.useRef({ isDragging: false, dragOffset: 0 })

  const handlePointerDown = (e) => {
    if (!draggable) return
    startXRef.current = e.clientX
    startTimeRef.current = Date.now()
    dragStateRef.current = { isDragging: true, dragOffset: 0 }
    setIsDragging(true)
    setDragOffset(0)
    pauseAutoplay()

    const onMove = (ev) => {
      const raw = ev.clientX - startXRef.current
      let offset = raw
      if (!loop) {
        const containerWidth = containerRef.current?.offsetWidth || 1
        const atStart = activeIndex === 0 && raw > 0
        const atEnd = activeIndex === itemsCount - 1 && raw < 0
        if (atStart || atEnd) offset = raw * 0.3
      }
      dragStateRef.current.dragOffset = offset
      setDragOffset(offset)
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)

      const offset = dragStateRef.current.dragOffset
      const containerWidth = containerRef.current?.offsetWidth || 1
      const threshold = containerWidth * 0.25
      const elapsed = Date.now() - startTimeRef.current
      const velocity = Math.abs(offset) / (elapsed || 1)

      if (offset < -threshold || (offset < 0 && velocity > 0.5)) {
        goToNext()
      } else if (offset > threshold || (offset > 0 && velocity > 0.5)) {
        goToPrev()
      }

      dragStateRef.current = { isDragging: false, dragOffset: 0 }
      setIsDragging(false)
      setDragOffset(0)
      resumeAutoplay()
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  return (
    <View hiddenOverflow fullW ref={containerRef}>
      <View
        row
        style={{
          width: `${itemsCount * 100}%`,
          transform: `translateX(${transformX}%)`,
          transition: isDragging || skipTransitionRef.current ? 'none' : 'transform 300ms ease-in-out',
          touchAction: 'pan-y',
          cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : undefined,
          userSelect: 'none',
        }}
        onTransitionEnd={afterChange ? (e) => {
          if (e.propertyName === 'transform') afterChange(items?.[activeIndex]?.key, activeIndex)
        } : undefined}
        onPointerDown={draggable ? handlePointerDown : undefined}
      >
        {items.map((item) => (
          <View key={item.key} style={{ width: `${100 / itemsCount}%` }}>
            <SlideContent item={item} />
          </View>
        ))}
      </View>
    </View>
  )
}
