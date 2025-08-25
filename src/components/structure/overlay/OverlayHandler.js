import { toPairs, dissoc } from 'ramda'
import React from 'react'

import { OverlayWrapper } from './OverlayWrapper'
import { Text } from '../../text/Text'
import { genRandonId } from '../../../helpers/random'

const OverlayContext = React.createContext(null)

export const useOverlay = () => React.useContext(OverlayContext)

export const useRegisterOverlay = (opts = {}) => {
  const { unmountOnClose } = opts
  const timeout = React.useRef(null)
  const { overlays, setOverlays } = useOverlay()
  const randomId = React.useMemo(() => genRandonId(), [])
  const overlay = overlays[randomId] || {}
  const mergeOverlay = (value) => setOverlays((data) => ({ ...data, [randomId]: { ...overlay, ...value } }))
  const closeOverlay = () => mergeOverlay({ open: false })
  const removeOverlay = () => setOverlays((data) => dissoc(randomId, data))
  const stopDelayedClosing = () => !!timeout?.current && clearTimeout(timeout.current)

  React.useEffect(() => {
    return () => removeOverlay()
  }, [])

  const onOpen = ({ content, triggerRect, placement, options = {} }) => {
    stopDelayedClosing()
    mergeOverlay({ open: true, content, triggerRect, placement, ...options })
  }

  const onClose = () => {
    stopDelayedClosing()
    timeout.current = setTimeout(() => {
      !!unmountOnClose ? removeOverlay() : closeOverlay()
    }, 250)
  }

  const onFastClose = () => {
    stopDelayedClosing()
    !!unmountOnClose ? removeOverlay() : closeOverlay()
  }

  return { onOpen, onClose, onFastClose, stopDelayedClosing }
}

export function OverlayHandler({ children }) {
  const [overlays, setOverlays] = React.useState({})

  return (
    <OverlayContext.Provider value={{ overlays, setOverlays }}>
      {children}

      {toPairs(overlays).map(([key, overlay]) => {
        const handleClickOutside = () => setTimeout(() => setOverlays((data) => dissoc(key, data)), 100)
        return (
          <OverlayWrapper
            key={key}
            triggerRect={overlay.triggerRect}
            placement={overlay.placement}
            onClickOutside={overlay.dismissOnClickOutside ? handleClickOutside : null}
            display={!overlay.open && 'none'}
          >
            {overlay.content}
          </OverlayWrapper>
        )
      })}
    </OverlayContext.Provider>
  )
}
