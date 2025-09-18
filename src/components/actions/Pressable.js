import { pipe } from 'ramda'

import { AbsPressable } from '../../abstractions/Pressable'
import { useAnimationModifier } from '../../modifiers/animation'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useSizeModifier } from '../../modifiers/size'
import { useStateModifier } from '../../modifiers/state'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Pressable({ children, href, target, ...rootProps }) {
  const [{}, props] = pipe(
    useThemeComponentModifier('Pressable'),
    useBackgroundModifier,
    useAnimationModifier,
    useSizeModifier, //
    useFlexWrapperModifier,
    useDisplayModifier,
    useStateModifier,
    useBorderModifier,
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier
  )([{}, rootProps])

  return (
    <AbsPressable className="neko-pressable" link target={target} href={!props.disabled && href} {...props}>
      {children}
    </AbsPressable>
  )
}
