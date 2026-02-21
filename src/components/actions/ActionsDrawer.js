import { pipe } from 'ramda'

import { TopBar, View } from '../structure'
import { BottomDrawer, DrawerScrollView } from '../modals/bottomDrawer'
import { Menu } from './menu/Menu'
import { Section } from '../sections'
import { useDefaultModifier } from '../../modifiers/default'
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
          <Section>
            <Menu items={items} onChange={handleChange} {...menuProps} />
          </Section>
          <View height={100} />
        </DrawerScrollView>
      </View>
    </>
  )
}

export function ActionsDrawer({ items, onChange, title, subtitle, onClose, ...rootProps }) {
  const [{}, formattedProps] = pipe(
    useThemeComponentModifier('ActionsDrawer'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { topBarProps, menuProps, ...props } = formattedProps

  return (
    <BottomDrawer onClose={onClose} {...props}>
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
