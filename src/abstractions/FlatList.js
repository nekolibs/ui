import React from 'react'
import { AbsView } from './View'

const defaultRender = () => false

export function AbsFlatList({
  data,
  renderItem,
  ListEmptyComponent,
  Empty,
  renderEmpty,
  ListFooterComponent,
  Footer,
  renderFooter,
  ListHeaderComponent,
  Header,
  renderHeader,
  keyExtractor,
  ...props
}) {
  ListEmptyComponent = ListEmptyComponent || Empty || defaultRender
  ListFooterComponent = ListFooterComponent || Footer || renderFooter || defaultRender
  ListHeaderComponent = ListHeaderComponent || Header || renderHeader || defaultRender
  keyExtractor = keyExtractor || ((item, index) => index)
  renderItem = renderItem || defaultRender

  return (
    <AbsView {...props}>
      <ListHeaderComponent />

      {!data?.length && <ListEmptyComponent />}
      {data?.map?.((item, index) => (
        <React.Fragment key={keyExtractor(item, index)}>{renderItem({ item, index })}</React.Fragment>
      ))}

      <ListFooterComponent />
    </AbsView>
  )
}
