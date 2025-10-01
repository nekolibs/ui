import { FlatList } from 'react-native'

export const AbsFlatList = ({
  style: { height, width, ...style },
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
      {...props}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={style}
    />
  )
}
