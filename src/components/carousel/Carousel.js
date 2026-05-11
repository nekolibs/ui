import { View } from '../structure/View'
import { CarouselArrows } from './CarouselArrows'
import { CarouselDots } from './CarouselDots'
import { CarouselHandler } from './CarouselHandler'
import { CarouselSlider } from './CarouselSlider'

export function Carousel({
  items,
  activeIndex,
  activeKey,
  onChange,
  autoplay,
  autoplaySpeed,
  draggable,
  loop,
  showDots,
  showArrows,
  floatingDots,
  dotsProps,
  arrowsProps,
  children,
  ...rootProps
}) {
  return (
    <CarouselHandler
      items={items}
      activeIndex={activeIndex}
      activeKey={activeKey}
      onChange={onChange}
      autoplay={autoplay}
      autoplaySpeed={autoplaySpeed}
      draggable={draggable}
      loop={loop}
    >
      <View {...rootProps}>
        <View relative>
          <CarouselSlider />
          {showArrows && <CarouselArrows {...arrowsProps} />}
          {showDots && floatingDots && <CarouselDots absolute bottom="xs" left={0} right={0} {...dotsProps} />}
        </View>
        {showDots && !floatingDots && <CarouselDots {...dotsProps} />}
        {children}
      </View>
    </CarouselHandler>
  )
}
