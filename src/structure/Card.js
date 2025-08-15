import { pipe } from 'ramda'

import { AbsView } from '../abstractions/View'
import { useBackgroundModifier } from '../modifiers/background'
import { useBorderModifier } from '../modifiers/border'
import { useFlexModifier } from '../modifiers/flex'
import { useFlexWrapperModifier } from '../modifiers/flexWrapper'
import { useMarginModifier } from '../modifiers/margin'
import { useMergeThemeComponent } from '../theme/ThemeHandler'
import { usePaddingModifier } from '../modifiers/padding'
import { usePositionModifier } from '../modifiers/position'
import { useShadowModifier } from '../modifiers/shadow'
import { useSizeModifier } from '../modifiers/size'

export function Card({ children, ...rootProps }) {
  let props = useMergeThemeComponent('Card', rootProps)
  const defaultProps = { padding: 'md', br: 'xlg', bg: 'overlayBG' }

  props = pipe(
    useSizeModifier, //
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexWrapperModifier,
    useFlexModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )({ ...defaultProps, ...props })

  return (
    <AbsView className="neko-card" {...props}>
      {children}
    </AbsView>
  )
}
