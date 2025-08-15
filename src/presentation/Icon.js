import { AbsIcon } from '../abstractions/Icon'
import { useGetColor, useMergeThemeComponent } from '../theme/ThemeHandler'

export function Icon({ name, color, ...rootProps }) {
  const getColor = useGetColor()
  let props = useMergeThemeComponent('Icon', rootProps)

  // props = pipe(
  // useSizeModifier, //
  // usePositionModifier,
  // )(props)

  return <AbsIcon className="neko-icon" name={name} color={getColor(color || 'text')} {...props} />
}
