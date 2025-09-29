import { FlatList } from 'react-native'

export const AbsFlatList = ({
  style: { height, width, ...style },
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
  ListEmptyComponent = ListEmptyComponent || Empty || defaultRender
  ListFooterComponent = ListFooterComponent || Footer || renderFooter || defaultRender
  ListHeaderComponent = ListHeaderComponent || Header || renderHeader || defaultRender

  return (
    <FlatList
      height={height}
      width={width}
      {...props}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={style}
    />
  )
}
