import React from 'react'

import { AbsView } from './View'
import { LazyAction } from '../components/helpers/LazyAction'

const defaultRender = () => false

export function AbsStaticList({
  data,
  renderItem,
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
  keyExtractor,
  onEndReached,
  ...props
}) {
  ItemSeparatorComponent = ItemSeparatorComponent || Separator || renderSeparator || defaultRender
  ListEmptyComponent = ListEmptyComponent || Empty || renderEmpty || defaultRender
  ListFooterComponent = ListFooterComponent || Footer || renderFooter || defaultRender
  ListHeaderComponent = ListHeaderComponent || Header || renderHeader || defaultRender
  keyExtractor = keyExtractor || ((item, index) => index)
  renderItem = renderItem || defaultRender

  return (
    <AbsView {...props}>
      <ListHeaderComponent />

      {!data?.length && <ListEmptyComponent />}
      {data?.map?.((item, index) => (
        <React.Fragment key={keyExtractor(item, index)}>
          {index !== 0 && <ItemSeparatorComponent />}
          {renderItem({ item, index })}
        </React.Fragment>
      ))}

      <LazyAction action={onEndReached} destroyOffScreen />

      <ListFooterComponent />
    </AbsView>
  )
}
