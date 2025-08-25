export function smartPlacement(triggerRect, popoverRect, placement) {
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const viewportRect = {
    left: triggerRect.left - scrollX,
    right: triggerRect.right - scrollX,
    top: triggerRect.top - scrollY,
    bottom: triggerRect.bottom - scrollY,
  }

  const fitsRight = viewportRect.right + popoverRect.width <= screenWidth
  const fitsLeft = viewportRect.left - popoverRect.width >= 0
  const fitsBottom = viewportRect.bottom + popoverRect.height <= screenHeight
  const fitsTop = viewportRect.top - popoverRect.height >= 0

  if (placement.startsWith('right') && !fitsRight && fitsLeft) return placement.replace('right', 'left')
  if (placement.endsWith('Right') && !fitsLeft && fitsRight) return placement.replace('Right', 'Left')

  if (placement.startsWith('left') && !fitsLeft && fitsRight) return placement.replace('left', 'right')
  if (placement.endsWith('Left') && !fitsRight && fitsLeft) return placement.replace('Left', 'Right')

  if (placement.startsWith('bottom') && !fitsBottom && fitsTop) return placement.replace('bottom', 'top')
  if (placement.endsWith('Bottom') && !fitsTop && fitsBottom) return placement.replace('Bottom', 'Top')

  if (placement.startsWith('top') && !fitsTop && fitsBottom) return placement.replace('top', 'bottom')
  if (placement.endsWith('Top') && !fitsBottom && fitsTop) return placement.replace('Top', 'Bottom')

  return placement
}
