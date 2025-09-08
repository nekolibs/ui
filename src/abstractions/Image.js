export function AbsImage({ src, resizeMode = 'cover', style, ...props }) {
  const objectFitMap = {
    cover: 'cover',
    contain: 'contain',
    stretch: 'fill',
    center: 'none',
  }

  const objectFit = objectFitMap[resizeMode] || 'cover'

  return <img src={src} style={{ objectFit, objectPosition: 'center', ...style }} {...props} />
}
