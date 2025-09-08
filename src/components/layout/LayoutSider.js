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

const DEFAULT_PROPS =
  (layoutSize, headerSpace) =>
  ([{}, { sticky }]) => ({
    top: headerSpace || 0,
    bottom: 0,
    maxHeight: !!sticky ? '100vh' : undefined,
    paddingB: !!sticky ? headerSpace : undefined,
  })

export function LayoutSider({ children, ...rootProps }) {
  const { layoutSize, layoutHeaderSpace, registerSider, unregisterHeader } = useLayout()

  const [_, props] = pipe(
    useThemeComponentModifier('LayoutSider'),
    useDefaultModifier(DEFAULT_PROPS(layoutSize, layoutHeaderSpace)),
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

  const siderRef = React.useRef(null)
  const [siderWidth, setSiderWidth] = React.useState(rootProps.width || 0)

  React.useLayoutEffect(() => {
    getElementSize(siderRef, ({ width }) => setSiderWidth(width))
  }, [])

  return (
    <>
      {rootProps.fixed && (
        <AbsView className="neko-layout-sider-empty-space" style={{ width: siderWidth, height: '100%' }} />
      )}
      <AbsView className="neko-layout-sider" {...props} ref={siderRef}>
        {children}
      </AbsView>
    </>
  )
}
