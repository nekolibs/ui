import React from 'react'

import { SectionItemLink } from '../sections/SectionItemLink'
import { ThemePickerDrawer } from './ThemePickerDrawer'
import { useThemeHandler } from '../../theme'

export function ThemePickerSectionItem({ label = 'Theme', value, onChange, drawerProps, ...props }) {
  const [open, setOpen] = React.useState(false)
  const { theme } = useThemeHandler()

  return (
    <>
      <SectionItemLink label={label} value={value ?? theme?.label} onPress={() => setOpen(true)} {...props} />
      <ThemePickerDrawer open={open} onClose={() => setOpen(false)} onChange={onChange} {...drawerProps} />
    </>
  )
}
