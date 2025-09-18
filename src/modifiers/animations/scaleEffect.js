import React from 'react'

const DEFAULT_EFFECT = { duration: 300, initialScale: 0 }

export function useScaleEffect([values, { scale, ...props }]) {
  if (scale === true) scale = DEFAULT_EFFECT
  if (!!scale) scale = { ...DEFAULT_EFFECT, ...scale }
  const { duration, initialScale } = scale || {}
  const { open, useRegisterEffect, useAddTransition } = values
  const [transform, setTransform] = React.useState(`scale(${initialScale})`)

  useRegisterEffect(scale)
  useAddTransition(scale, `transform ${duration}ms ease-in-out`)

  React.useEffect(() => {
    if (!scale) return

    if (open) {
      setTransform(`scale(${initialScale})`)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransform('scale(1)')
        })
      })
    } else {
      setTransform(`scale(${initialScale})`)
    }
  }, [open])

  if (!scale) return [values, props]

  const style = { transform }

  return [
    values,
    {
      ...props,
      style: {
        ...props.style,
        ...style,
      },
    },
  ]
}
