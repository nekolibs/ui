import { pipe } from 'ramda'
import React from 'react'

import { Divider } from '../helpers/Separator'
import { Text } from '../text'
import { View } from '../structure'
import { useDefaultModifier } from '../../modifiers/default'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  marginH: 'md',
  bg: 'overlayBG',
  br: 'md',
  border: 'overlayDivider',
  titleProps: {
    strong: true,
    text4: true,
    sm: true,
    marginB: 'sm',
    paddingH: 'md',
  },
  dividerProps: {
    line: true,
    height: 1,
  },
}

export function Section({ children, title, ...rootProps }) {
  const [{}, formattedProps] = pipe(
    useThemeComponentModifier('Section'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { titleProps, dividerProps, ...props } = formattedProps

  const childArray = React.Children.toArray(children)

  return (
    <View>
      {!!title && <Text marginH={props.marginH} {...titleProps} label={title} />}
      <View className="neko-section" {...props}>
        {childArray.map((child, i) => (
          <React.Fragment key={child.key}>
            {child}
            {i < childArray.length - 1 && <Divider {...dividerProps} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  )
}
