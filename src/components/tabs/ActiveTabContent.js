import React from 'react'

import { AnimatedView } from '../animations'
import { View } from '../structure'
import { useTabs } from './TabsHandler'

const duration = 100

function Item({ item, active, ...props }) {
  const Content = React.useMemo(() => item.renderContent || item.Content, [item.renderContent, item.Content])
  const [open, setOpen] = React.useState(active)

  React.useEffect(() => {
    if (!!active) {
      setTimeout(() => setOpen(true), duration)
    } else {
      setOpen(active)
    }
  }, [active])

  return (
    <AnimatedView open={open} fade={{ duration }} flex display={!open && 'none'} {...props}>
      <Content />
    </AnimatedView>
  )
}

export function ActiveTabContent({ lazy, unmountOnClose }) {
  const { activeKey, items } = useTabs()
  if (!items?.length) return false

  return items.map((item) => (
    <Item key={item.key} item={item} active={item.key === activeKey} lazy={lazy} unmountOnClose={unmountOnClose} />
  ))
}
