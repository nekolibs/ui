import { AnimatedView } from './AnimatedView'

export function ParallaxHeader({ children, height = 200, ...props }) {
  return (
    <AnimatedView height={height} fade {...props}>
      {children}
    </AnimatedView>
  )
}
