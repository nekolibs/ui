import React from 'react'

import { PopoverContent } from './PopoverContent'
import { useRegisterOverlay } from '../overlay/OverlayHandler'

export function Popover({
  renderContent,
  content,
  trigger = 'hover',
  placement = 'bottom',
  unmountOnClose,
  children,
  parentWidth,
  parentMinWidth,
  ...props
}) {
  const ref = React.useRef(null)
  const { onOpen, onClose, onFastClose, stopDelayedClosing } = useRegisterOverlay({ unmountOnClose })

  const click = trigger === 'click'
  const hover = trigger === 'hover'
  const focus = trigger === 'focus'

  renderContent = renderContent || (() => content)

  const show = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const rect = ref.current.getBoundingClientRect()
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset

    const triggerRect = {
      left: rect.left + scrollX,
      right: rect.right + scrollX,
      top: rect.top + scrollY,
      bottom: rect.bottom + scrollY,
      width: rect.width,
      height: rect.height,
    }

    onOpen({
      content: (
        <PopoverContent
          placement={placement}
          width={parentWidth ? rect.width : undefined}
          minWidth={parentMinWidth ? rect.width : undefined}
          {...props}
          onMouseEnter={hover ? stopDelayedClosing : undefined}
          onMouseLeave={hover ? onClose : undefined}
        >
          {renderContent({ onClose: onFastClose })}
        </PopoverContent>
      ),
      triggerRect,
      placement,
      options: { dismissOnClickOutside: !!click },
    })
  }

  React.useEffect(() => () => onClose(), [])

  const child = React.Children.only(children)
  let childProps = { ref, onClick: show }

  if (hover) childProps = { ref, onMouseEnter: show, onMouseLeave: onClose }
  if (focus) childProps = { ref, onFocus: show, onBlur: onClose }

  return React.cloneElement(child, childProps)
}
