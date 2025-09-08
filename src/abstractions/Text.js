export function AbsText({ numberOfLines, style, ...props }) {
  style = style || {}

  const limitLinesStyle = !!numberOfLines
    ? {
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : {}

  return <span {...props} style={{ ...limitLinesStyle, ...style }} />
}
