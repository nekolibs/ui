import React from 'react'
import { View } from '../View'
import { calculatePosition } from './calculatePosition'
import { smartPlacement } from './smartPlacement' // você cria esse helper

export function OverlayWrapper({ children, triggerRect, placement, onClickOutside, ...props }) {
  const overlayRef = React.useRef(null)
  const [pos, setPos] = React.useState({ x: -9999, y: -9999 })

  React.useLayoutEffect(() => {
    if (overlayRef.current && triggerRect) {
      const rect = overlayRef.current.getBoundingClientRect()
      const popoverRect = { width: rect.width, height: rect.height }

      const safePlacement = smartPlacement(triggerRect, popoverRect, placement)
      setPos(calculatePosition(triggerRect, popoverRect, safePlacement))
    }
  }, [triggerRect, placement, children])

  React.useEffect(() => {
    if (onClickOutside) {
      const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
          onClickOutside()
        }
      }
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside, true)
      }, 10)

      return () => {
        clearTimeout(timer)
        document.removeEventListener('mousedown', handleClickOutside, true)
      }
    }
  }, [onClickOutside])

  return (
    <View
      ref={overlayRef}
      className="neko-overlay-wrapper"
      absolute
      top={pos.y}
      left={pos.x}
      zIndex={9999}
      pointerEvents="none"
      {...props}
    >
      {children}
    </View>
  )
}
