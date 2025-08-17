import { Switch as RNSwitch } from 'react-native'

export function AbsSwitch({ height, style, ...props }) {
  const baseHeight = 31
  let transform = undefined
  if (!!height) {
    const scale = height / baseHeight
    transform = [{ scaleX: scale }, { scaleY: scale }]
  }

  return <RNSwitch style={{ transform, ...style }} {...props} />
}
