import { FlatList } from 'react-native'
import { omit } from 'ramda'

const IGNORED_STYLE_FIELDS = ['overflow', 'overflowY', 'overflowX', 'flexDirection']

export const AbsFlatList = ({
  style: { height, width, flex, ...style },
  ItemSeparatorComponent,
  Separator,
  renderSeparator,
  ListEmptyComponent,
  Empty,
  renderEmpty,
  ListFooterComponent,
  Footer,
  renderFooter,
  ListHeaderComponent,
  Header,
  renderHeader,
  ...props
}) => {
  ItemSeparatorComponent = ItemSeparatorComponent || Separator || renderSeparator
  ListEmptyComponent = ListEmptyComponent || Empty || renderEmpty
  ListFooterComponent = ListFooterComponent || Footer || renderFooter
  ListHeaderComponent = ListHeaderComponent || Header || renderHeader

  return (
    <FlatList
      height={height}
      width={width}
      style={{ flex }}
      {...props}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={omit(IGNORED_STYLE_FIELDS, style)}
    />
  )
}
