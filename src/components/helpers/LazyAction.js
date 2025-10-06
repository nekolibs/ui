import { is } from 'ramda'
import React from 'react'

import { LazyRender } from './LazyRender'

function InnerContent({ action }) {
  React.useEffect(() => {
    action?.()
  }, [])

  return false
}

export function LazyAction({ children, disabled, action, minHeight: initMinHeight, ...props }) {
  if (!action || !is(Function, action) || !!disabled) return false

  return (
    <LazyRender whenVisible minHeight={2} {...props}>
      <InnerContent action={action} />
    </LazyRender>
  )
}
