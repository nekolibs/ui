import React from 'react'

const DEFAULT_EFFECT = { duration: 400, from: 'top' }

export function useSlideEffect([values, { slide, ...props }]) {
  if (slide === true) slide = DEFAULT_EFFECT
  if (!!slide) slide = { ...DEFAULT_EFFECT, ...slide }
  const { duration, from, distance } = slide || {}
  const { open, useRegisterEffect, useAddTransition } = values

  const initialValue = React.useMemo(() => {
    const w = window.innerWidth
    const h = window.innerHeight

    switch (from) {
      case 'left':
        return `translateX(-${distance || w}px)`
      case 'right':
        return `translateX(${distance || w}px)`
      case 'top':
        return `translateY(-${distance || h}px)`
      case 'bottom':
        return `translateY(${distance || h}px)`
      default:
        return `translateX(-${distance || w}px)`
    }
  }, [distance, from])

  const [transform, setTransform] = React.useState(initialValue)

  useRegisterEffect(slide)
  useAddTransition(slide, `transform ${duration}ms ease-in-out`)

  React.useLayoutEffect(() => {
    if (!slide) return
    if (open) {
      setTransform(initialValue)

      requestAnimationFrame(() => {
        setTransform('translateY(0)')
      })
    } else {
      setTransform(initialValue)
    }
  }, [open])

  if (!slide) return [values, props]

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
