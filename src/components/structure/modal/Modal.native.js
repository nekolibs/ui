import { Modal as RNModal, ScrollView } from 'react-native'
import { pipe } from 'ramda'

import { ModalBackdrop } from './ModalBackdrop'
import { ModalContent } from './ModalContent'
import { ModalFooter } from './ModalFooter'
import { ModalHeader } from './ModalHeader'
import { Pressable } from '../../actions/Pressable'
import { View } from '../View'
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
        <ScrollView>
          <ModalContent {...contentProps}>{children}</ModalContent>
        </ScrollView>
        <ModalFooter {...footerProps}>{footer}</ModalFooter>
      </>
    )
  }

  return (
    <RNModal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={onClose}
      allowSwipeDismissal
      navigationBarTranslucent
      statusBarTranslucent
    >
      <ModalBackdrop open={open} useSimpleView>
        <Pressable
          onPress={!disableOutsideClick ? onClose : undefined}
          absolute
          top={0}
          left={0}
          right={0}
          bottom={0}
          pointerEvents="box-only"
        />
        <View width={width} {...props} zIndex={10}>
          {content}
        </View>
      </ModalBackdrop>
    </RNModal>
  )
}
