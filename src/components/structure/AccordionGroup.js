import React from 'react'

import { Accordion } from './Accordion'
import { Card } from './Card'

export function AccordionsGroup({ items, contentProps, titleProps, headerProps, initOpen, open, onChange, ...props }) {
  const [localOpen, setLocalOpen] = React.useState(initOpen)
  open = open === undefined ? localOpen : open

  const handleChange = (key) => {
    const v = open === key ? null : key
    setLocalOpen(v)
    onChange?.(v)
  }

  if (!items?.length) return false

  const sharedProps = { contentProps, titleProps, headerProps }

  return (
    <Card padding={0} {...props}>
      {items.map(({ key, ...item }, index) => (
        <Accordion
          key={key || index}
          {...sharedProps}
          {...item}
          br={0}
          borderB={index < items.length - 1}
          open={!!open && open === key}
          onChange={() => handleChange(key)}
        />
      ))}
    </Card>
  )
}
