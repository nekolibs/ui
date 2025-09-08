import { pipe } from 'ramda'

import { AbsImage } from '../../abstractions/Image'
import { useBorderModifier } from '../../modifiers/border'
import { useDefaultModifier } from '../../modifiers/default'
import { useFlexModifier } from '../../modifiers/flex'
import { useMarginModifier } from '../../modifiers/margin'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  width: '100%',
  br: 'md',
}

export function Image({ name, ...rootProps }) {
  const [{ size, color }, props] = pipe(
    useThemeComponentModifier('Image'),
    useDefaultModifier(DEFAULT_PROPS),
    usePositionModifier, //
    useMarginModifier,
    useSizeModifier,
    usePositionModifier,
    useFlexModifier,
    useMarginModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  return <AbsImage className="neko-image" name={name} color={color} size={size} {...props} />
}
