export function getElementSize(ref, callback) {
  if (!ref.current) return

  const el = ref.current
  const rect = el.getBoundingClientRect()

  callback({
    width: el.offsetWidth,
    height: el.offsetHeight,
    x: rect.x + window.scrollX,
    y: rect.y + window.scrollY,
  })
}
