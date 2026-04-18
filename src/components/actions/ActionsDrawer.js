import { pipe } from 'ramda'
import React from 'react'

import { BottomDrawer, DrawerScrollView } from '../modals/bottomDrawer'
import { Menu } from './menu/Menu'
import { Section } from '../sections'
import { TopBar, View } from '../structure'
import { useDefaultModifier } from '../../modifiers/default'
import { useTheme } from '../../theme'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  useSafeArea: false,
  bg: 'mainBG',
  topBarProps: {
    useSafeArea: false,
  },
  menuProps: {
    vertical: true,
    linkPaddingH: 'md',
    linkMinHeight: 'xl',
    withDivider: true,
  },
}

function Content({ items, title, subtitle, onClose, onChange, topBarProps, menuProps }) {
  const handleChange = (...params) => {
    onChange?.(...params)
    onClose()
  }

  return (
    <>
      <TopBar title={title} subtitle={subtitle} {...topBarProps} />

      <View flex>
        <DrawerScrollView>
          {!title && <View paddingT="md" />}
          <Section marginH="md">
            <Menu items={items} onChange={handleChange} {...menuProps} />
          </Section>
          <View height={100} />
        </DrawerScrollView>
      </View>
    </>
  )
}

export function ActionsDrawer({ items, onChange, title, subtitle, onClose, snapPoints, ...rootProps }) {
  const { elementHeights, spaces } = useTheme()
  const [{}, formattedProps] = pipe(
    useThemeComponentModifier('ActionsDrawer'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { topBarProps, menuProps, ...props } = formattedProps

  // Auto height
  snapPoints = React.useMemo(() => {
    if (!!snapPoints?.length) return snapPoints
    // Title bar + padding + safe footer space
    const safeSpace = (!!title ? elementHeights.xxl : spaces.sm) + spaces.md + spaces.sm
    const itemHeight = elementHeights[menuProps?.linkMinHeight]
    const itemsLength = Math.min(8, items.length)
    return [itemsLength * itemHeight + safeSpace]
  }, [snapPoints, title, items])

  return (
    <BottomDrawer onClose={onClose} snapPoints={snapPoints} {...props}>
      <Content
        onClose={onClose}
        topBarProps={topBarProps}
        menuProps={menuProps}
        title={title}
        subtitle={subtitle}
        onChange={onChange}
        items={items}
      />
    </BottomDrawer>
  )
}
