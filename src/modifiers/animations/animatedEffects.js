import { pipe } from 'ramda'
import React from 'react'

import { useApplyStyles } from '../applyStyles'
import { useFadeEffect } from './fadeEffect'
import { useSlideEffect } from './slideEffect'

export function useAnimatedEffects([values, { open, onClose, lazy = false, unmountOnClose = false, ...props }]) {
  const unmountTimerRef = React.useRef()
  const [totalDuration, setTotalDuration] = React.useState(0)
  const [transform, setTransform] = React.useState('')
  const [transitions, setTransitions] = React.useState([])
  const [hasOpened, setHasOpened] = React.useState(open || !lazy)
  const [render, setRender] = React.useState(open || !lazy)

  const useRegisterEffect = (effect) => {
    React.useEffect(() => {
      if (!effect?.duration) return
      setTotalDuration((v) => (v > effect.duration ? v : effect.duration))
    }, [])
  }

  const useAddTransition = (effect, transition) => {
    React.useEffect(() => {
      if (!effect?.duration) return

      setTransitions((v) => [...v, transition])
    }, [])
  }

  React.useEffect(() => {
    if (open) {
      clearTimeout(unmountTimerRef?.current)
      setHasOpened(true)
      setRender(true)
    } else if (unmountOnClose) {
      unmountTimerRef.current = setTimeout(() => setRender(false), totalDuration)
    }
  }, [open])

  return pipe(
    useFadeEffect, //
    useSlideEffect,
    useApplyStyles({ transition: transitions.join(',') })
  )([
    {
      ...values,
      useRegisterEffect,
      useAddTransition,
      open,
      onClose,
      lazy,
      unmountOnClose,
      transform,
      setTransform,
      hasOpened,
      setHasOpened,
      render,
      setRender,
    },
    props,
  ])
}
