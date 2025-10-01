import { pipe } from 'ramda'
import React from 'react'

import { AbsFlatList } from '../../abstractions/FlatList'
import { AbsStaticList } from '../../abstractions/StaticList'
import { ConditionalLazyRender, Divider } from '../helpers'
import { useAnimationModifier } from '../../modifiers/animation'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useResponsiveValue } from '../../responsive'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useStateModifier } from '../../modifiers/state'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([_, { horizontal }]) => {
  const overflowKey = horizontal ? 'scrollX' : 'scrollY'

  return {
    [overflowKey]: true,
    row: !!horizontal,
  }
}

export function FlatList({ children, ...rootProps }) {
  const [_, formattedProps] = pipe(
    useThemeComponentModifier('FlatList'),
    useDefaultModifier(DEFAULT_PROPS),
    useFlexWrapperModifier,
    useDisplayModifier,
    useAnimationModifier,
    useStateModifier,
    useSizeModifier,
    usePositionModifier,
    useOverflowModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  let {
    divider,
    dividerColor,
    dividerProps,
    renderSeparator,
    renderItem,
    lazy,
    onlyOnScreen,
    itemMinHeight,
    ...props
  } = formattedProps
  const noScroll = useResponsiveValue(rootProps.noScroll)
  const Wrapper = noScroll ? AbsStaticList : AbsFlatList

  const formattedRenderItem = React.useCallback(
    (...params) => (
      <ConditionalLazyRender
        whenVisible={lazy || onlyOnScreen}
        destroyOffScreen={onlyOnScreen}
        minHeight={itemMinHeight}
      >
        {renderItem?.(...params)}
      </ConditionalLazyRender>
    ),
    [renderItem]
  )

  if (!renderSeparator && !!divider) {
    if (divider === true) divider = 1
    renderSeparator = () => <Divider line={divider} height={divider} color={dividerColor} {...dividerProps} />
  }

  return (
    <Wrapper className="neko-flat-list" renderSeparator={renderSeparator} renderItem={formattedRenderItem} {...props}>
      {children}
    </Wrapper>
  )
}

export const List = (props) => <FlatList noScroll {...props} />
