import { pipe, is } from 'ramda'

import { AbsTouchableOpacity } from '../../abstractions/TouchableOpacity'
import { LoadingView } from '../state/LoadingView'
import { Text } from '../text/Text'
import { useAnimationModifier } from '../../modifiers/animation'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useSizeModifier } from '../../modifiers/size'
import { useStateModifier } from '../../modifiers/state'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Link({ label, children, href, target, ...rootProps }) {
  const [{ loading, color: color }, props] = pipe(
    useThemeComponentModifier('Link'),
    useBackgroundModifier,
    useColorConverter('primary'),
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

  if (!!label || is(String, children)) {
    children = (
      <Text color={color} {...props}>
        {label || children}
      </Text>
    )
  }

  return (
    <LoadingView active={loading} noWrapper replaceChildren>
      <AbsTouchableOpacity className="neko-link" link target={target} href={!props.disabled && href} {...props}>
        {children}
      </AbsTouchableOpacity>
    </LoadingView>
  )
}
