import React from 'react'

import { BottomDrawer } from '../bottomDrawer'
import { PopoverContent } from './PopoverContent'
import { useRegisterOverlay } from '../overlay/OverlayHandler'
import { useResponsiveValue } from '../../../responsive'

export function Popover({
  renderContent,
  content,
  trigger = 'hover',
  placement = 'bottom',
  unmountOnClose,
  children,
  parentWidth,
  parentMinWidth,
  useBottomDrawer = {},
  bottomDrawerProps = {},
  watch,
  ...props
}) {
  const shouldUseDrawer = useResponsiveValue(useBottomDrawer)
  const ref = React.useRef(null)
  const { onOpen, onUpdate, onClose, onFastClose, stopDelayedClosing } = useRegisterOverlay({ unmountOnClose })

  const click = trigger === 'click'
  const hover = trigger === 'hover'
  const focus = trigger === 'focus'

  renderContent = renderContent || (() => content)

  const buildContent = () => (
    <PopoverContent
      placement={placement}
      width={parentWidth ? ref.current?.getBoundingClientRect()?.width : undefined}
      minWidth={parentMinWidth ? ref.current?.getBoundingClientRect()?.width : undefined}
      {...props}
      onMouseEnter={hover ? stopDelayedClosing : undefined}
      onMouseLeave={hover ? onClose : undefined}
    >
      {renderContent({ onClose: onFastClose })}
    </PopoverContent>
  )

  const computeTriggerRect = () => {
    const rect = ref.current.getBoundingClientRect()
    const scrollX = window.scrollX || window.pageXOffset
    const scrollY = window.scrollY || window.pageYOffset
    return {
      left: rect.left + scrollX,
      right: rect.right + scrollX,
      top: rect.top + scrollY,
      bottom: rect.bottom + scrollY,
      width: rect.width,
      height: rect.height,
    }
  }

  const show = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    const triggerRect = computeTriggerRect()
    onOpen({
      content: buildContent(),
      triggerRect,
      placement,
      options: { dismissOnClickOutside: click || focus },
    })
  }

  React.useEffect(() => () => onClose(), [])

  // 🔑 re-render do portal quando `watch` (ex.: search) mudar
  React.useEffect(() => {
    if (!ref.current) return
    const triggerRect = computeTriggerRect()
    onUpdate({
      content: buildContent(),
      triggerRect,
      placement,
      options: { dismissOnClickOutside: click || focus },
    })
  }, [watch, renderContent])

  // const show = (e) => {
  // if (e && e.stopPropagation) e.stopPropagation()
  // const rect = ref.current.getBoundingClientRect()
  // const scrollX = window.scrollX || window.pageXOffset
  // const scrollY = window.scrollY || window.pageYOffset

  // const triggerRect = {
  // left: rect.left + scrollX,
  // right: rect.right + scrollX,
  // top: rect.top + scrollY,
  // bottom: rect.bottom + scrollY,
  // width: rect.width,
  // height: rect.height,
  // }

  // onOpen({
  // content: () => (
  // <PopoverContent
  // placement={placement}
  // width={parentWidth ? rect.width : undefined}
  // minWidth={parentMinWidth ? rect.width : undefined}
  // {...props}
  // onMouseEnter={hover ? stopDelayedClosing : undefined}
  // onMouseLeave={hover ? onClose : undefined}
  // >
  // {renderContent({ onClose: onFastClose })}
  // </PopoverContent>
  // ),
  // triggerRect,
  // placement,
  // options: { dismissOnClickOutside: click || focus },
  // })
  // }

  // React.useEffect(() => () => onClose(), [])

  if (shouldUseDrawer) {
    return (
      <DrawerPopover
        content={content}
        renderContent={renderContent}
        children={children}
        {...props}
        {...bottomDrawerProps}
      />
    )
  }

  const child = React.Children.only(children)
  let childProps = { ref, onClick: show }

  if (hover) childProps = { ref, onMouseEnter: show, onMouseLeave: onClose }
  if (focus) childProps = { ref, onFocus: show }

  return React.cloneElement(child, childProps)
}

function DrawerPopover({ children, content, renderContent, snapPoints, ...props }) {
  const [open, setOpen] = React.useState(false)
  const onClose = () => setOpen(false)

  const child = React.Children.only(children)
  let childProps = { onClick: () => setOpen(true) }

  return (
    <>
      {React.cloneElement(child, childProps)}

      <BottomDrawer open={open} onClose={onClose} snapPoints={snapPoints} {...props}>
        {renderContent({ onClose })}
      </BottomDrawer>
    </>
  )
}
