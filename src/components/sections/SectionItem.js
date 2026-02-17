import { pipe } from 'ramda'

import { LabelValue } from '../presentation'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  paddingH: 'md',
  paddingV: 'sm',
  minH: 'md',
}

export function SectionItem({ ...rootProps }) {
  const [{ color }, formattedProps] = pipe(
    useColorConverter(),
    useThemeComponentModifier('SectionItem'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { ...props } = formattedProps

  return <LabelValue spread className="neko-section-item" color={color} {...props} />
}
