import { pipe } from 'ramda'

import { AnimatedView } from '../../animations/AnimatedView'
import { ModalBackdrop } from './ModalBackdrop'
import { ModalContent } from './ModalContent'
import { ModalFooter } from './ModalFooter'
import { ModalHeader } from './ModalHeader'
import { Portal } from '../../helpers/Portal'
import { useDefaultModifier } from '../../../modifiers/default'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{}, { position }]) => {
  let radiusKey = 'br'
  let height = undefined
  if (position === 'bottom') {
    radiusKey = 'borderRadiusT'
    height = '95%'
  } else if (position === 'top') {
    radiusKey = 'borderRadiusB'
    height = '95%'
  } else if (position === 'right') {
    radiusKey = 'borderRadiusL'
    height = '100%'
  } else if (position === 'left') {
    radiusKey = 'borderRadiusR'
    height = '100%'
  }

  return {
    maxWidth: '100%',
    maxHeight: !position && '95%',
    height,
    scale: !position,
    fade: !!position,
    slide: position && { from: position },
    [radiusKey]: 'xl',
    bg: 'overlayBG',
    overflow: 'hidden',
    shadow: true,
  }
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

  const { contentProps, headerProps, footerProps, position, ...props } = formattedProps

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
      <ModalBackdrop open={open} onClose={!disableOutsideClick && onClose} position={position}>
        <AnimatedView className="neko-modal" open={open} width={width} {...props} onPress={(e) => e.stopPropagation()}>
          {content}
        </AnimatedView>
      </ModalBackdrop>
    </Portal>
  )
}
