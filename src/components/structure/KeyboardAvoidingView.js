import { pipe } from 'ramda'

import { AbsKeyboardAvoidingView } from '../../abstractions/KeyboardAvoidingView'
import { Platform } from '../../abstractions/Platform'
import { useSafeAreaInsets } from '../../abstractions/helpers/useSafeAreaInsets'
import { useAnimationModifier } from '../../modifiers/animation'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useCursorModifier } from '../../modifiers/cursor'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useStateModifier } from '../../modifiers/state'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function KeyboardAvoidingView({ children, keyboardVerticalOffset = 0, ...rootProps }) {
  const { bottom } = useSafeAreaInsets()

  const [_, props] = pipe(
    useThemeComponentModifier('KeyboardAvoidingView'),
    useFlexWrapperModifier,
    useDisplayModifier,
    useCursorModifier,
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

  return (
    <AbsKeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset + bottom}
      {...props}
    >
      {children}
    </AbsKeyboardAvoidingView>
  )
}
