import { View } from '../structure/View'

export function FormWrapperComponent({ children, ...props }) {
  return <View {...props}>{children}</View>
}
