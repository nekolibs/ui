import { omit, pipe } from 'ramda'
import React from 'react'
import tinycolor from 'tinycolor2'

import { Divider } from '../../helpers/Separator'
import { IconText } from '../../presentation/IconLabel'
import { Link } from '../Link'
import { List } from '../../list/FlatList'
import { SubmenuWrapper } from './SubmenuWrapper'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { moveScale } from '../../../theme/helpers/sizeScale'
import { useColorConverter } from '../../../modifiers/colorConverter'
import { useSizeConverter } from '../../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../../modifiers/themeComponent'

function LinkItem({
  item,
  linkPaddingH = 'md',
  linkPaddingV = 'xs',
  linkMinHeight,
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
  const bg = active && tinycolor(color).setAlpha(0.03).toString()
  linkMinHeight = linkMinHeight || moveScale(sizeCode, 1)

  return (
    <SubmenuWrapper item={item} onChange={handlePress} activeKey={activeKey} color={color}>
      <Link
        fullW
        center
        paddingH={linkPaddingH}
        paddingV={linkPaddingV}
        minHeight={linkMinHeight}
        marginR={3}
        borderL={3}
        brColor={active ? activeColor : 'transparent'}
        bg={bg}
        transition="border-color 0.5s ease, background 0.3s ease"
        hover={{ br: 0 }}
        {...linkProps}
        onPress={() => handlePress(item, index)}
      >
        <IconText addingV={active && 4} color={active ? activeColor : color} fullW size={sizeCode} {...childProps} />
      </Link>
    </SubmenuWrapper>
  )
}

function DividerItem({ linkPaddingH = 'md', item }) {
  let content = <Divider height="xxs" line {...item} />
  if (!item.label) return content
  return (
    <>
      {content}
      <Text size="xs" color="text4" paddingV="xs" paddingH={linkPaddingH || 'md'} strong {...item} />
    </>
  )
}

function Item({ item, ...props }) {
  if (item.type === 'divider') return <DividerItem item={item} {...props} />
  return <LinkItem item={item} {...props} />
}

export function VerticalMenu(rootProps) {
  const [{ sizeCode, color }, formattedProps] = pipe(
    useColorConverter('text'),
    useSizeConverter('icons', 'md'),
    useThemeComponentModifier('VerticalMenu') //
  )([{}, rootProps])

  let { gap = 'sm', items, onChange, onChangeIndex, withDivider, ...props } = formattedProps

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
    <View className="neko-vertical-menu" gap={gap} width="100%" {...props}>
      <List
        data={items}
        keyExtractor={(item, index) => item.key || index}
        divider={withDivider}
        renderItem={({ item, index }) => (
          <Item
            key={item.key || index}
            item={item}
            handlePress={handlePress}
            color={color}
            sizeCode={sizeCode}
            index={index}
            {...props}
          />
        )}
      />
    </View>
  )

  return (
    <View className="neko-vertical-menu" gap={gap} width="100%" {...props}>
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
