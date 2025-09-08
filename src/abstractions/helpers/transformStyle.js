export function formatTransform(transforms) {
  return transforms
    .map((t) => {
      const [key, value] = Object.entries(t)[0]
      return `${key}(${value})`
    })
    .join(' ')
}
