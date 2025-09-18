import { pipe } from 'ramda'
import React from 'react'

import { AnimatedView } from '../../animations/AnimatedView'
import { SafeAreaView } from '../SafeAreaView'
import { useDefaultModifier } from '../../../modifiers/default'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  fixed: true,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  center: true,
  center: true,
  lazy: true,
  unmountOnClose: true,
  fade: true,
  zIndex: 500,
  bg: 'backdrop_op70',
}

export function ModalBackdrop({ open, onClose, children, useSimpleView, ...rootProps }) {
  const modalRef = React.useRef()
  const [{}, props] = pipe(
    useThemeComponentModifier('ModalBackdrop'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  if (useSimpleView) {
    return (
      <SafeAreaView className="neko-modal-backdrop" {...props}>
        {children}
      </SafeAreaView>
    )
  }

  return (
    <AnimatedView open={open} className="neko-modal-backdrop" onPress={onClose} {...props}>
      {children}
    </AnimatedView>
  )
}
