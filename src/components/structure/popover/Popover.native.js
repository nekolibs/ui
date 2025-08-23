import { Modal, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

import { PopoverContent } from './PopoverContent'
import { View } from '../View'
import { calculatePosition } from '../overlay/calculatePosition'

export function Popover({ content, placement = 'bottom', children, ...props }) {
  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(false)
  const [triggerRect, setTriggerRect] = React.useState(null)
  const [position, setPosition] = React.useState(null)

  const show = () => {
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
        setVisible(true)
      })
    }
  }

  const hide = () => {
    setVisible(false)
    setTriggerRect(null)
    setPosition(null)
  }

  return (
    <>
      <View ref={ref}>
        {React.cloneElement(React.Children.only(children), {
          onPress: show,
        })}
      </View>

      {visible && (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={hide}>
          <View fullW flex fullH bg="bg_op50">
            <TouchableWithoutFeedback onPress={hide}>
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
                      {content}
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
