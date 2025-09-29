// export const AbsText = ({ numberOfLines, style, ...props }) => {
// style = style || {}

// const limitLinesStyle = !!numberOfLines
// ? {
// display: '-webkit-box',
// WebkitLineClamp: numberOfLines,
// WebkitBoxOrient: 'vertical',
// overflow: 'hidden',
// }
// : {}

// return <AbsText {...props} style={[limitLinesStyle, style]} />
// }

import { Text as RNText } from 'react-native'

export const AbsText = RNText
