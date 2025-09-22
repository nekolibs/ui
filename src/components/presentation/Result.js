import { Divider } from '../helpers/Separator'
import { Icon } from './Icon'
import { Text } from '../text/Text'
import { View } from '../structure/View'

export const RESULT_TYPES = {
  error: {
    icon: 'close-circle-fill',
    color: 'red',
  },

  success: {
    icon: 'checkbox-circle-fill',
    color: 'green',
  },

  warning: {
    icon: 'error-warning-fill',
    color: 'yellow',
  },

  info: {
    icon: 'information-2-fill',
    color: 'blue',
  },
}

export function Result({
  type,
  icon,
  iconColor,
  title,
  description,
  footer,
  titleProps,
  descriptionProps,
  textProps,
  iconProps,
  ...props
}) {
  const typeProps = RESULT_TYPES[type] || {}
  icon = icon || typeProps.icon
  iconColor = iconColor || typeProps.color || 'primary'

  return (
    <View className="neko-result" center padding="lg" {...props}>
      {!!icon && <Icon name={icon} color={iconColor} size={42} primary {...iconProps} />}
      {!!icon && <Divider height={10} />}
      <Text h3 {...textProps} {...titleProps}>
        {title}
      </Text>
      {!!description && (
        <Text text3 sm {...textProps} {...descriptionProps}>
          {description}
        </Text>
      )}
      {!!footer && <View marginT="lg">{footer}</View>}
    </View>
  )
}
