import { pipe } from 'ramda'

import { Avatar } from './Avatar'
import { ContentLabel } from './ContentLabel'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

export function AvatarLabel(rootProps) {
  const [{ sizeCode, color }, formattedProps] = pipe(
    useColorConverter(),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('AvatarLabel') //
  )([{}, rootProps])

  const {
    icon,
    label,
    name,
    initials,
    src,
    avatarColor,
    square,
    dynamicColor,
    avatarProps,
    moveAvatarSizeScale,
    avatarSize,
    ...props
  } = formattedProps
  const hasAvatar = !!name || !!initials || !!src

  return (
    <ContentLabel
      className="neko-avatar-label"
      label={label || name}
      color={color}
      size={sizeCode}
      content={
        <Avatar
          name={name || label}
          initials={initials}
          icon={icon}
          src={src}
          size={avatarSize || moveScale(sizeCode, moveAvatarSizeScale || -1)}
          color={avatarColor || color}
          dynamicColor={dynamicColor}
          square={square}
          marginH={2}
          {...avatarProps}
        />
      }
      {...props}
    />
  )
}

export const AvatarText = AvatarLabel
