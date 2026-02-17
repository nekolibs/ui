import { pipe } from 'ramda'

import { BottomDrawer, TopBar, View } from '../structure'
import { Menu } from './menu/Menu'
import { ScrollView } from '../list'
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

export function ActionsDrawer({ items, onChange, title, subtitle, onClose, ...rootProps }) {
  const [{}, formattedProps] = pipe(
    useThemeComponentModifier('ActionsDrawer'), //
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { topBarProps, menuProps, ...props } = formattedProps

  const handleChange = (...params) => {
    if (onChange) onChange(...params)
    onClose()
  }

  return (
    <BottomDrawer onClose={onClose} {...props}>
      <TopBar title={title} subtitle={subtitle} {...topBarProps} />

      <View flex>
        <ScrollView>
          {!title && <View paddingT="md" />}
          <Section>
            <Menu items={items} onChange={handleChange} {...menuProps} />
          </Section>
          <View height={100} />
        </ScrollView>
      </View>
    </BottomDrawer>
  )
}
