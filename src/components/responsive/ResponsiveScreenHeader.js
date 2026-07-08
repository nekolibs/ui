import { SafeAreaView, View } from '../structure'
import { Button } from '../actions'
import { ScrollView } from '../list'
import { SearchInput } from '../filter'
import { Text } from '../text'
import { useSpaces } from '../../theme'
import { useResponsiveValue } from '../../responsive/responsiveHooks'
import { useSafeAreaInsets } from '../../abstractions/helpers/useSafeAreaInsets'

// Screen header, responsive by SIZE (not platform). Picks a layout by breakpoint
// using the same md-and-up / default split as the list it sits above.
//
// actions: [{ label, icon?, primary?, color?, onPress }]
//   - large: primary -> filled button (bar row, left); secondary -> outline (title row, right)
//   - small: rendered as compact round icon buttons on the title row
export function ResponsiveScreenHeader(props) {
  const Header = useResponsiveValue({ mdu: LargeHeader, df: SmallHeader })

  return <Header {...props} />
}

// md and up. Title (+ subtitle) row with secondary actions pinned right, then an
// action/filter bar: primary actions left, `filterBar` slot, optional search.
function LargeHeader({ title, subtitle, actions = [], filterBar, useSearch, searchPlaceholder, ...props }) {
  const primaryActions = actions.filter((action) => action.primary)
  const secondaryActions = actions.filter((action) => !action.primary)
  const showBar = primaryActions.length > 0 || !!filterBar || !!useSearch

  return (
    <SafeAreaView centerV gap="md" edges={['top']} paddingV="md" {...props}>
      <View row centerV gap="sm">
        <View flex gap={2}>
          <Text h3 label={title} />
          {!!subtitle && <Text color="text3" label={subtitle} />}
        </View>

        {secondaryActions.map((action, i) => (
          <Button key={action.label ?? i} sm outline {...action} />
        ))}
      </View>

      {showBar && (
        <View row centerV gap="sm">
          <View flex row gap="sm">
            {primaryActions.map((action, i) => (
              <Button key={action.label ?? i} sm {...action} />
            ))}
          </View>

          {filterBar}

          {!!useSearch && <SearchInput placeholder={searchPlaceholder} />}
        </View>
      )}
    </SafeAreaView>
  )
}

// Below md — modelled on kochy events/list: title row with compact round icon
// actions, then the filter bar as a horizontal scroll. (Parallax / animated top
// bar are the view's concern, not the header's.)
function SmallHeader({ title, subtitle, actions = [], filterBar, useSearch, searchPlaceholder, ...props }) {
  const insets = useSafeAreaInsets()
  const spaces = useSpaces()

  return (
    <View gap="sm" paddingB="md" paddingT={insets.top || spaces.md} {...props}>
      <View row centerV gap="sm" paddingH="md">
        <View flex>
          <Text h3 strong label={title} />
          {!!subtitle && <Text sm color="text3" label={subtitle} />}
        </View>

        {actions.map((action, i) => (
          <Button key={action.label ?? i} md ratio={1} round iconProps={{ size: 'md' }} {...action} label={false} />
        ))}
      </View>

      {!!useSearch && (
        <View paddingH="md">
          <SearchInput placeholder={searchPlaceholder} />
        </View>
      )}

      {!!filterBar && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} paddingH="md">
          <View row centerV gap="sm">
            {filterBar}
          </View>
        </ScrollView>
      )}
    </View>
  )
}
