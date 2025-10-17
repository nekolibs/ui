import React from 'react'

import { useColors } from './theme'

export function DynamicStyleTag() {
  const colors = useColors()
  const placeholderColor = colors.text_op30

  React.useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      ::placeholder {
        color: ${placeholderColor};
      }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [placeholderColor])

  return false
}
