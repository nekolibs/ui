import { pipe, is } from 'ramda'

import { AbsTouchableOpacity } from '../../abstractions/TouchableOpacity'
import { Text } from '../text/Text'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Link({ label, children, onPress, onClick, href, target, ...rootProps }) {
  const [{ color: color }, props] = pipe(
    useThemeComponentModifier('Link'),
    useColorConverter('primary'),
    useSizeModifier, //
    useFlexWrapperModifier,
    useDisplayModifier, //
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
    <AbsTouchableOpacity
      className="neko-link"
      link
      onPress={!!props.disabled ? undefined : onPress || onClick}
      target={target}
      href={!props.disabled && href}
    >
      {children}
    </AbsTouchableOpacity>
  )
}
