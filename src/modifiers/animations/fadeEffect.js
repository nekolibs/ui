import React from 'react'

const DEFAULT_EFFECT = { duration: 300 }

export function useFadeEffect([values, { fade, ...props }]) {
  if (fade === true) fade = DEFAULT_EFFECT
  if (!!fade) fade = { ...DEFAULT_EFFECT, ...fade }
  const { duration } = fade || {}
  const { open, useRegisterEffect, useAddTransition } = values
  const [opacity, setOpacity] = React.useState(0)

  useRegisterEffect(fade)
  useAddTransition(fade, `opacity ${duration}ms ease-in-out`)

  React.useEffect(() => {
    if (!fade) return

    if (open) {
      setOpacity(0)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setOpacity(1)
        })
      })
    } else {
      setOpacity(0)
    }
  }, [open])

  if (!fade) return [values, props]

  const style = { opacity }

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
