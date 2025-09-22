import { pick } from 'ramda'
import { ImageBackground as RNImageBackground } from 'react-native'

import { AbsView } from './View'

const allBorderRadiusProps = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopStartRadius',
  'borderTopEndRadius',
  'borderBottomStartRadius',
  'borderBottomEndRadius',
]

export function AbsImageBackground({ src, source, resizeMode = 'cover', style, children, ...props }) {
  if (!source && !!src) source = { uri: src }
  const imageStyle = pick(allBorderRadiusProps, style)

  return (
    <RNImageBackground source={source} resizeMode={resizeMode} style={style} imageStyle={imageStyle} {...props}>
      {children}
    </RNImageBackground>
  )
}
