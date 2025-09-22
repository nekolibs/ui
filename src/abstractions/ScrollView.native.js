import { ScrollView } from 'react-native'

export const AbsScrollView = ({ style: { height, width, ...style }, ...props }) => {
  return <ScrollView height={height} width={width} {...props} contentContainerStyle={style} />
}
