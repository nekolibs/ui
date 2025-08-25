import { omit, pipe } from 'ramda'
import React from 'react'

import { IconText } from '../../presentation/IconLabel'
import { Link } from '../Link'
import { SubmenuWrapper } from './SubmenuWrapper'
import { View } from '../../structure/View'
import { useColorConverter } from '../../../modifiers/colorConverter'
import { useSizeConverter } from '../../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

function Item({
  item,
  linkPaddingH = 'md',
  handlePress,
  linkProps,
  activeIndex,
  activeKey,
  activeColor = 'primary',
  color,
  sizeCode,
  index,
  ...props
}) {
  activeColor = activeColor || 'primary'
  let { active, key, ...childProps } = omit(['onClick', 'onPress'], item)
  if (!active && activeIndex >= 0) active = activeIndex === index
  if (!active && activeKey !== undefined) active = activeKey === item.key

  return (
    <SubmenuWrapper
      item={item}
      onChange={handlePress}
      activeKey={activeKey}
      color={color}
      placement="bottomRight"
      hideIcon
    >
      <Link
        key={key || index}
        fullH
        center
        paddingH={linkPaddingH}
        {...linkProps}
        onPress={() => handlePress(item, index)}
      >
        <IconText
          color={active ? activeColor : color}
          fullH
          marginT={3}
          borderB={3}
          borderColor={active ? activeColor : 'transparent'}
          transition="border-color 0.6s ease"
          size={sizeCode}
          {...childProps}
        />
      </Link>
    </SubmenuWrapper>
  )
}

export function HorizontalMenu(rootProps) {
  const [{ sizeCode, color }, formattedProps] = pipe(
    useColorConverter(),
    useSizeConverter('icons', 'md'),
    useThemeComponentModifier('HorizontalMenu') //
  )([{}, rootProps])

  let { gap = 'sm', height = 50, items, onChange, onChangeIndex, ...props } = formattedProps

  const handlePress = React.useCallback(
    (item, index) => {
      if (!!onChange) onChange(item, index)
      if (!!onChangeIndex) onChangeIndex(index)
      if (!!item.onPress) item.onPress()
      if (!!item.onClick) item.onClick()
    },
    [onChange, onChangeIndex]
  )

  return (
    <View className="neko-horizontal-menu" row gap={gap} height={height} centerV {...props}>
      {items.map((item, index) => (
        <Item
          key={item.key || index}
          item={item}
          handlePress={handlePress}
          color={color}
          sizeCode={sizeCode}
          index={index}
          {...props}
        />
      ))}
    </View>
  )
}
