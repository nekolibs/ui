import { pipe, is } from 'ramda'

import { AbsTouchableOpacity } from '../../abstractions/TouchableOpacity'
import { Text } from '../text/Text'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function Link({ label, children, onPress, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('Link'),
    useSizeModifier, //
    useDisplayModifier, //
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexWrapperModifier,
    useFlexModifier
  )([{}, rootProps])

  if (!!label || is(String, children)) {
    children = (
      <Text primary {...props}>
        {label || children}
      </Text>
    )
  }

  return (
    <AbsTouchableOpacity className="neko-link" link onPress={!!props.disabled ? undefined : onPress} {...props}>
      {children}
    </AbsTouchableOpacity>
  )
}
