export function AbsImageBackground({ src, resizeMode = 'cover', style, ...props }) {
  const objectFitMap = {
    cover: 'cover',
    contain: 'contain',
    stretch: 'fill',
    center: 'none',
  }

  const objectFit = objectFitMap[resizeMode] || 'cover'

  return (
    <div
      style={{ backgroundSize: objectFit, backgroundPosition: 'center', backgroundImage: `url(${src})`, ...style }}
      {...props}
    />
  )
}
