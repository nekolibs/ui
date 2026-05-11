import React from 'react'

import { Carousel } from './Carousel'

function buildItems(value, min, max, renderSlideRef) {
  const items = []
  if (min === undefined || value - 1 >= min) {
    items.push({ key: value - 1, render: () => renderSlideRef.current(value - 1) })
  }
  items.push({ key: value, render: () => renderSlideRef.current(value) })
  if (max === undefined || value + 1 <= max) {
    items.push({ key: value + 1, render: () => renderSlideRef.current(value + 1) })
  }
  return items
}

export function InfiniteCarousel({ value, onChange, renderSlide, min, max, ...carouselProps }) {
  const renderSlideRef = React.useRef(renderSlide)
  renderSlideRef.current = renderSlide

  const [items, setItems] = React.useState(() => buildItems(value, min, max, renderSlideRef))
  const [activeKey, setActiveKey] = React.useState(value)

  React.useEffect(() => {
    setItems(buildItems(value, min, max, renderSlideRef))
    setActiveKey(value)
  }, [value, min, max])

  const handleChange = React.useCallback((key) => {
    setActiveKey(key)
  }, [])

  const handleAfterChange = React.useCallback(
    (key) => {
      if (key !== value) onChange?.(key)
    },
    [value, onChange]
  )

  return (
    <Carousel
      items={items}
      activeKey={activeKey}
      onChange={handleChange}
      afterChange={handleAfterChange}
      draggable
      {...carouselProps}
    />
  )
}
