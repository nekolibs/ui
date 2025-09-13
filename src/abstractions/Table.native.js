import { View } from 'react-native'

export function AbsTable({ children, ...props }) {
  return <View {...props}>{children}</View>
}

export function AbsTableRow({ style, ...props }) {
  return <View {...props} style={[style, { flexDirection: 'row', flex: 1 }]} />
}

export function AbsTableHeader({ style, ...props }) {
  if (!style.width && !style.minWidth && !style.flex) style.flex = 1
  return <View {...props} style={[style]} />
}

export function AbsTableCol({ style, ...props }) {
  if (!style.width && !style.minWidth && !style.flex) style.flex = 1
  return <View {...props} style={style} />
}
