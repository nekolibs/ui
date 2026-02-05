import { AnimatedView } from './AnimatedView'
import { TopBar } from '../structure'

export function AnimatedTopBar(props) {
  return (
    <AnimatedView style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 90 }} fade>
      <TopBar {...props} />
    </AnimatedView>
  )
}
