import { Modal, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

import { BottomDrawer } from '../bottomDrawer'
import { PopoverContent } from './PopoverContent'
import { View } from '../View'
import { calculatePosition } from '../overlay/calculatePosition'
import { useResponsiveValue } from '../../../responsive'

export function Popover({
  content,
  renderContent,
  placement = 'bottom',
  children,
  useBottomDrawer = {},
  bottomDrawerProps = {},
  snapPoints,
  ...props
}) {
  const shouldUseDrawer = useResponsiveValue(useBottomDrawer)
  const ref = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const [triggerRect, setTriggerRect] = React.useState(null)
  const [position, setPosition] = React.useState(null)

  renderContent = renderContent || (() => content)

  const onOpen = () => {
    if (shouldUseDrawer) {
      setOpen(true)
      return
    }
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        setTriggerRect({
          left: x,
          top: y,
          right: x + width,
          bottom: y + height,
          width,
          height,
        })
        setOpen(true)
      })
    }
  }

  const onClose = () => {
    setOpen(false)
    setTriggerRect(null)
    setPosition(null)
  }

  children = React.cloneElement(React.Children.only(children), {
    onPress: onOpen,
  })

  if (shouldUseDrawer) {
    return (
      <View ref={ref}>
        {children}

        <BottomDrawer open={open} onClose={onClose} snapPoints={snapPoints} {...bottomDrawerProps}>
          {renderContent({ onClose: onClose })}
        </BottomDrawer>
      </View>
    )
  }

  return (
    <>
      <View ref={ref}>{children}</View>

      {open && (
        <Modal transparent visible={open} animationType="fade" onRequestClose={onClose}>
          <View fullW flex fullH bg="backdrop_op50">
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={{ flex: 1 }}>
                {triggerRect && (
                  <View
                    style={{
                      position: 'absolute',
                      top: position?.y ?? -9999,
                      left: position?.x ?? -9999,
                    }}
                    onLayout={(e) => {
                      const { width, height } = e.nativeEvent.layout
                      const popoverRect = { width, height }
                      const pos = calculatePosition(triggerRect, popoverRect, placement, 8)
                      setPosition(pos)
                    }}
                  >
                    <PopoverContent placement={placement} {...props}>
                      {renderContent({ onClose: onClose })}
                    </PopoverContent>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      )}
    </>
  )
}
