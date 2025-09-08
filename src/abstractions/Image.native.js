import { Image as RNImage } from 'react-native'

export function AbsImage({ src, source, resizeMode = 'cover', ...props }) {
  if (!source && !!src) source = { uri: src }

  return <RNImage source={source} resizeMode={resizeMode} {...props} />
}
