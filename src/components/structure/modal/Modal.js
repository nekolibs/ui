import { pipe } from 'ramda'

import { AnimatedView } from '../../animations/AnimatedView'
import { ModalBackdrop } from './ModalBackdrop'
import { ModalContent } from './ModalContent'
import { ModalFooter } from './ModalFooter'
import { ModalHeader } from './ModalHeader'
import { Portal } from '../../helpers/Portal'
import { useDefaultModifier } from '../../../modifiers/default'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  maxWidth: '90%',
  maxHeight: '90%',
  scale: true,
  br: 'xl',
  bg: 'overlayBG',
  overflow: 'hidden',
  shadow: true,
}

export function Modal({
  open,
  onClose,
  title,
  width = 500,
  children,
  header,
  footer,
  noLayout,
  disableOutsideClick,
  ...rootProps
}) {
  const [{}, formattedProps] = pipe(
    useThemeComponentModifier('Modal'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { contentProps, headerProps, footerProps, ...props } = formattedProps

  let content = children
  if (!noLayout) {
    content = (
      <>
        <ModalHeader title={title} onClose={onClose} {...headerProps}>
          {header}
        </ModalHeader>
        <ModalContent {...contentProps}>{children}</ModalContent>
        <ModalFooter {...footerProps}>{footer}</ModalFooter>
      </>
    )
  }

  return (
    <Portal>
      <ModalBackdrop open={open} onClose={!disableOutsideClick && onClose}>
        <AnimatedView className="neko-modal" open={open} width={width} {...props} onPress={(e) => e.stopPropagation()}>
          {content}
        </AnimatedView>
      </ModalBackdrop>
    </Portal>
  )
}
