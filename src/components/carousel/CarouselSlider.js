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
  const { items, activeIndex, itemsCount, draggable, loop, goToNext, goToPrev, pauseAutoplay, resumeAutoplay } =
    useCarousel()

  const containerRef = React.useRef(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState(0)
  const startXRef = React.useRef(0)
  const startTimeRef = React.useRef(0)

  if (!items?.length) return null

  const baseTranslate = -(activeIndex * 100) / itemsCount
  const dragPercent =
    isDragging && containerRef.current ? (dragOffset / containerRef.current.offsetWidth) * (100 / itemsCount) : 0
  const transformX = baseTranslate + dragPercent

  const handlePointerDown = (e) => {
    if (!draggable) return
    startXRef.current = e.clientX
    startTimeRef.current = Date.now()
    setIsDragging(true)
    setDragOffset(0)
    e.target.setPointerCapture(e.pointerId)
    pauseAutoplay()
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const raw = e.clientX - startXRef.current
    if (loop) {
      setDragOffset(raw)
    } else {
      const containerWidth = containerRef.current?.offsetWidth || 1
      const atStart = activeIndex === 0 && raw > 0
      const atEnd = activeIndex === itemsCount - 1 && raw < 0
      setDragOffset(atStart || atEnd ? raw * 0.3 : raw)
    }
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    const containerWidth = containerRef.current?.offsetWidth || 1
    const threshold = containerWidth * 0.25
    const elapsed = Date.now() - startTimeRef.current
    const velocity = Math.abs(dragOffset) / (elapsed || 1)

    if (dragOffset < -threshold || (dragOffset < 0 && velocity > 0.5)) {
      goToNext()
    } else if (dragOffset > threshold || (dragOffset > 0 && velocity > 0.5)) {
      goToPrev()
    }

    setIsDragging(false)
    setDragOffset(0)
    resumeAutoplay()
  }

  return (
    <View hiddenOverflow fullW ref={containerRef}>
      <View
        row
        style={{
          width: `${itemsCount * 100}%`,
          transform: `translateX(${transformX}%)`,
          transition: isDragging ? 'none' : 'transform 300ms ease-in-out',
          touchAction: 'pan-y',
          cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : undefined,
          userSelect: 'none',
        }}
        onPointerDown={draggable ? handlePointerDown : undefined}
        onPointerMove={draggable ? handlePointerMove : undefined}
        onPointerUp={draggable ? handlePointerUp : undefined}
        onPointerCancel={draggable ? handlePointerUp : undefined}
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
