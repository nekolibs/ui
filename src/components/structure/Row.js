import { pipe } from 'ramda'
import React from 'react'

import { AbsView } from '../../abstractions/View'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useGridModifier } from '../../modifiers/grid'
import { useMarginModifier } from '../../modifiers/margin'
import { usePositionModifier } from '../../modifiers/position'
import { useResponsiveConverter } from '../../modifiers/responsiveConverter'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Row({ children, ...rootProps }) {
  const [{ childPaddingProps }, { colSpan, ...props }] = pipe(
    useThemeComponentModifier('Row'),
    useResponsiveConverter([]),
    useGridModifier,
    useSizeModifier, //
    usePositionModifier,
    useFlexWrapperModifier,
    useFlexModifier,
    useMarginModifier
  )([{}, rootProps])

  // Memoiza os children clonados para evitar recriação se childPaddingProps não mudar
  const clonedChildren = React.useMemo(
    () =>
      React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { parentSpan: colSpan, ...childPaddingProps }) : child
      ),
    [children, childPaddingProps]
  )

  return (
    <AbsView className="neko-row" {...props}>
      {clonedChildren}
    </AbsView>
  )
}

export const Grid = Row
