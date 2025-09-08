import { UIManager, findNodeHandle } from 'react-native'

export function getElementSize(ref, callback) {
  if (!ref.current) return

  const handle = findNodeHandle(ref.current)
  if (handle) {
    UIManager.measure(handle, (x, y, width, height) => {
      callback({ width, height, x, y })
    })
  }
}
