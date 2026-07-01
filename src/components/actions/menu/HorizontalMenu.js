import { omit, pipe } from 'ramda'
import React from 'react'

import { IconText } from '../../presentation/IconLabel'
import { Link } from '../Link'
import { SubmenuWrapper } from './SubmenuWrapper'
import { View } from '../../structure/View'
import { useColorConverter } from '../../../modifiers/colorConverter'
import { useDefaultModifier } from '../../../modifiers/default'
import { useSizeConverter } from '../../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }]) => ({
  gap: 'sm',
  height: sizeCode,
  size: sizeCode,
  linkPaddingH: 'md',
  activeColor: 'primary',
})

function Item({
  item,
  linkPaddingH = 'md',
  handlePress,
  linkProps,
  activeIndex,
  activeKey,
  activeColor = 'primary',
  color,
  height,
  sizeCode,
  index,
  ...props
}) {
  activeColor = activeColor || 'primary'
  let { active, key, disabled, ...childProps } = omit(['onClick', 'onPress'], item)
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
      height={height}
    >
      <Link
        key={key || index}
        center
        paddingH={linkPaddingH}
        disabled={disabled}
        height={height}
        {...linkProps}
        onPress={() => handlePress(item, index)}
      >
        <IconText
          color={active ? activeColor : color}
          marginT={3}
          borderB={3}
          borderColor={active ? activeColor : 'transparent'}
          transition="border-color 0.6s ease"
          size={sizeCode}
          height={height}
          {...childProps}
        />
      </Link>
    </SubmenuWrapper>
  )
}

export function HorizontalMenu(rootProps) {
  const [{ sizeCode, color }, formattedProps] = pipe(
    useColorConverter(),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('HorizontalMenu'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  let { gap, height, items, onChange, onChangeIndex, activeIndex, ...props } = formattedProps

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
          height={height}
          index={index}
          activeIndex={activeIndex}
          {...props}
        />
      ))}
    </View>
  )
}
