import { pipe } from 'ramda'

import { AbsIcon } from '../abstractions/Icon'
import { useMarginModifier } from '../modifiers/margin'
import { useMergeThemeComponent } from '../theme/ThemeHandler'
import { usePositionModifier } from '../modifiers/position'
import { useSmartColor } from '../theme/helpers/colorScale'
import { useSmartSize } from '../theme/helpers/sizeScale'

export function Icon({ name, ...rootProps }) {
  // TODO: Consider moving all to modifier and have robust return [formattedValues, props]. Then will be all mover to pipes
  let [size, propsWithoutSize] = useSmartSize(rootProps, 'icons', 'md')
  let [color, props] = useSmartColor(propsWithoutSize, 'text')
  props = useMergeThemeComponent('Icon', props)

  props = pipe(
    usePositionModifier, //
    useMarginModifier
  )(props)

  return <AbsIcon className="neko-icon" name={name} color={color} size={size} {...props} />
}
