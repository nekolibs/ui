import { ImageBackground as RNImageBackground } from 'react-native'

export function AbsImageBackground({ src, source, resizeMode = 'cover', ...props }) {
  if (!source && !!src) source = { uri: src }

  return <RNImageBackground source={source} resizeMode={resizeMode} {...props} />
}
