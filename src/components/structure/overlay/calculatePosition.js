export function calculatePosition(triggerRect, popoverRect, placement, gap = 2) {
  const { left, right, top, bottom, width, height } = triggerRect
  const pw = popoverRect?.width || 0
  const ph = popoverRect?.height || 0

  const positions = {
    // Top
    top: { x: left + width / 2 - pw / 2, y: top - ph - gap },
    topLeft: { x: left, y: top - ph - gap },
    topRight: { x: right - pw, y: top - ph - gap },

    // Bottom
    bottom: { x: left + width / 2 - pw / 2, y: bottom + gap },
    bottomLeft: { x: left, y: bottom + gap },
    bottomRight: { x: right - pw, y: bottom + gap },

    // Left
    left: { x: left - pw - gap, y: top + height / 2 - ph / 2 },
    leftTop: { x: left - pw - gap, y: top },
    leftBottom: { x: left - pw - gap, y: bottom - ph },

    // Right
    right: { x: right + gap, y: top + height / 2 - ph / 2 },
    rightTop: { x: right + gap, y: top },
    rightBottom: { x: right + gap, y: bottom - ph },
  }

  return positions[placement] || positions.bottom
}
