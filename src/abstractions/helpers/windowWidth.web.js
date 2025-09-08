import { useWindowDimensions } from 'react-native'

export function useWindowWidth() {
  const { width } = useWindowDimensions()
  return width
}
