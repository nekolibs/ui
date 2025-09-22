import React from 'react'

import { AnimatedView } from '../../animations/AnimatedView'
import { Icon } from '../../presentation/Icon'
import { Link } from '../../actions/Link'
import { ResultBar } from '../../presentation/ResultBar'

export function Notification({ time, ...props }) {
  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    setTimeout(() => setOpen(false), time - 500)
  }, [])

  return (
    <AnimatedView
      open={open}
      className="neko-notification"
      slide={{ from: 'right' }}
      fade
      zIndex={520}
      maxWidth="100%"
      bg="overlayBG"
      br="sm"
      unmountOnClose
    >
      <ResultBar
        {...props}
        rightContent={
          <Link onPress={() => setOpen(false)}>
            <Icon name="close-line" text4 />
          </Link>
        }
      />
    </AnimatedView>
  )
}
