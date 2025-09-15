import { pipe } from 'ramda'
import React from 'react'

import { AbsView } from '../../abstractions/View'
import { Card } from './Card'
import { Icon } from '../presentation/Icon'
import { Link } from '../actions/Link'
import { Text } from '../text/Text'
import { View } from './View'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useDefaultModifier } from '../../modifiers/default'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  padding: 0,
  br: 'xl',
  bg: 'overlayBG',
  hiddenOverflow: true,
}

export function Accordion({ children, title, open, onChange, ...rootProps }) {
  const [{ sizeCode }, formattedProps] = pipe(
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('Accordion'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { contentProps, titleProps, headerProps, initOpen, ...props } = formattedProps

  const [localOpen, setLocalOpen] = React.useState(initOpen)
  open = open === undefined ? localOpen : open

  const toggle = () => {
    setLocalOpen(!open)
    onChange?.(!open)
  }

  return (
    <Card {...props}>
      <Link
        padding={sizeCode}
        row
        gap={moveScale(sizeCode, -2)}
        borderB={open ? props.border || true : open}
        borderColor={props.borderColor}
        centerV
        {...headerProps}
        onPress={toggle}
      >
        <Icon name={!!open ? 'arrow-down-s-line' : 'arrow-right-s-line'} />
        <Text flex {...titleProps}>
          {title}
        </Text>
      </Link>
      {!!open && (
        <View padding={sizeCode} {...contentProps}>
          {children}
        </View>
      )}
    </Card>
  )

  return (
    <AbsView className="neko-accordion" {...props}>
      {children}
    </AbsView>
  )
}
