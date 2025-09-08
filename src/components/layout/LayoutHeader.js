import { pipe } from 'ramda'
import React from 'react'

import { AbsView } from '../../abstractions/View'
import { getElementSize } from '../../abstractions/helpers/componentSize'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useDefaultModifier } from '../../modifiers/default'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useLayout } from './Layout'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{}, { sticky }]) => ({
  bg: 'overlayBG',
  fullW: true,
  row: true,
  centerV: true,
  padding: 'md',
  top: 0,
  left: 0,
  right: 0,
  zIndex: sticky ? 90 : undefined,
})

export function LayoutHeader({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('LayoutHeader'),
    useDefaultModifier(DEFAULT_PROPS),
    useSizeModifier, //
    usePositionModifier,
    useOverflowModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexWrapperModifier,
    useFlexModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  const { registerHeader, unregisterHeader } = useLayout()
  const headerRef = React.useRef(null)
  const headerHeightRef = React.useRef(null)

  React.useLayoutEffect(() => {
    if (headerRef.current && !!rootProps.sticky) {
      getElementSize(headerRef, ({ height }) => {
        headerHeightRef.current = height
        registerHeader?.(height)
      })
      return () => unregisterHeader?.(headerHeightRef.current)
    }
  }, [])

  return (
    <>
      <AbsView className="neko-layout-header" {...props} ref={headerRef}>
        {children}
      </AbsView>
    </>
  )
}
