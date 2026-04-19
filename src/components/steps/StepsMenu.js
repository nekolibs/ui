import { Menu } from '../actions'
import { useSteps } from './StepsHandler'

export function StepsMenu(props) {
  const { activeIndex, items, moveToIndex, maxIndexReleased } = useSteps()
  const formattedItems = items.map((item, index) => ({
    ...item,
    disabled: maxIndexReleased < index,
  }))

  return (
    <Menu items={formattedItems} activeIndex={activeIndex} onChangeIndex={(index) => moveToIndex(index)} {...props} />
  )
}
