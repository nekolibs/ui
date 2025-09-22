import { AbsView } from './View'

function angleToPoints(angle) {
  const a = (angle % 360) * (Math.PI / 180)
  const x = Math.cos(a)
  const y = Math.sin(a)

  // Normaliza de [-1, 1] para [0, 1]
  return {
    start: { x: 0.5 - x / 2, y: 0.5 - y / 2 },
    end: { x: 0.5 + x / 2, y: 0.5 + y / 2 },
  }
}

let AbsGradientView

try {
  const { LinearGradient } = require('expo-linear-gradient') || {}
  AbsGradientView = ({ angle = 45, colors, ...props }) => {
    const { start, end } = angleToPoints(angle)

    if (!colors?.length) return <AbsView {...props} />
    return <LinearGradient start={start} end={end} colors={colors} {...props} />
  }
} catch {
  AbsGradientView = (props) => {
    console.warn('expo-linear-gradient not instaled.')
    return <AbsView {...props} />
  }
}

export { AbsGradientView }
