import React from 'react'

import { BottomDrawer } from '../modals/bottomDrawer'
import { LinkInput } from './LinkInput'

// A LinkInput that opens a BottomDrawer with arbitrary content. `value` is the
// display string ('' shows the placeholder); the content owns the actual editing.
export function BottomDrawerInput({ value, children, snapPoints = [275], contentProps, ...props }) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <LinkInput value={value} onPress={() => setOpen(true)} {...props} />
      <BottomDrawer
        open={open}
        onClose={() => setOpen(false)}
        snapPoints={snapPoints}
        contentProps={{ padding: 'md', ...contentProps }}
      >
        {children}
      </BottomDrawer>
    </>
  )
}
