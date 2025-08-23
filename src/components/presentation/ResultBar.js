import { Card } from '../structure/Card'
import { Icon } from './Icon'
import { RESULT_TYPES } from './Result'
import { Text } from '../text/Text'
import { View } from '../structure/View'

export function ResultBar({
  type,
  icon,
  iconColor,
  title,
  description,
  rightContent,
  titleProps,
  descriptionProps,
  textProps,
  iconProps,
  ...props
}) {
  const typeProps = RESULT_TYPES[type] || {}
  icon = icon || typeProps.icon
  iconColor = iconColor || typeProps.color || 'primary'
  const bg = typeProps.color ? typeProps.color + '_op10' : 'overlayBG'
  const brColor = typeProps.color && typeProps.color + '_op30'

  return (
    <Card
      className="neko-result"
      row
      gap="sm"
      center
      padding="sm"
      br="sm"
      bg={bg}
      border
      borderColor={brColor}
      centerV
      fullW
      {...props}
    >
      {!!icon && <Icon name={icon} color={iconColor} size="lg" primary {...iconProps} />}

      <View flex>
        <Text sm strong {...textProps} {...titleProps}>
          {title}
        </Text>
        {!!description && (
          <Text text3 xsm {...textProps} {...descriptionProps}>
            {description}
          </Text>
        )}
      </View>
      {rightContent}
    </Card>
  )
}
