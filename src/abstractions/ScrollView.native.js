import { ScrollView } from 'react-native'

export const AbsScrollView = ({ style: { height, width, flex, ...style }, ...props }) => {
  return <ScrollView height={height} width={width} style={{ flex }} {...props} contentContainerStyle={style} />
}
