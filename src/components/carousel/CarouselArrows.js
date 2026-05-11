import React from 'react'

import { Icon } from '../presentation/Icon'
import { Link } from '../actions/Link'
import { View } from '../structure/View'
import { useCarousel } from './CarouselHandler'

export function CarouselArrows({ iconSize = 'md', ...props }) {
  const { goToNext, goToPrev, activeIndex, itemsCount, loop } = useCarousel()

  const showPrev = loop || activeIndex > 0
  const showNext = loop || activeIndex < itemsCount - 1

  return (
    <View
      absoluteFill
      row
      centerV
      paddingH="xs"
      justify="space-between"
      style={{ pointerEvents: 'none' }}
      {...props}
    >
      {showPrev ? (
        <Link onPress={goToPrev} bg="overlayBG_op80" round padding="xs" shadow style={{ pointerEvents: 'auto' }}>
          <Icon name="arrow-left-s-line" text3 size={iconSize} />
        </Link>
      ) : (
        <View />
      )}
      {showNext ? (
        <Link onPress={goToNext} bg="overlayBG_op80" round padding="xs" shadow style={{ pointerEvents: 'auto' }}>
          <Icon name="arrow-right-s-line" text3 size={iconSize} />
        </Link>
      ) : (
        <View />
      )}
    </View>
  )
}
