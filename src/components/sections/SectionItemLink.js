import { pipe } from 'ramda'

import { IconLabel } from '../presentation'
import { Link } from '../actions'
import { SectionItem } from './SectionItem'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useDefaultModifier } from '../../modifiers/default'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  icon: 'md',
  paddingV: 'sm',
  minH: 'md',
  icon: 'arrow-right-s-line',
}

export function SectionItemLink({ children, value, onPress, loading, ...rootProps }) {
  const [{ color }, formattedProps] = pipe(
    useColorConverter(),
    useThemeComponentModifier('SectionItemLink'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { icon, iconLabelProps, ...props } = formattedProps

  return (
    <Link className="neko-section-item-link" onPress={onPress}>
      <SectionItem color={color} {...props}>
        {children || (
          <IconLabel gap={2} invert color={color} loading={loading} {...iconLabelProps} label={value} icon={icon} />
        )}
      </SectionItem>
    </Link>
  )
}
