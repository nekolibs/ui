import { pipe } from 'ramda'
import { useSharedValue } from 'react-native-reanimated'
import React from 'react'

import { useFadeEffect } from './fadeEffect'
import { useSlideEffect } from './slideEffect'

export function useAnimatedEffects([values, { open = true, onClose, lazy = false, unmountOnClose = false, ...props }]) {
  const unmountTimerRef = React.useRef()
  const [totalDuration, setTotalDuration] = React.useState(0)
  const [hasOpened, setHasOpened] = React.useState(open || !lazy)
  const [render, setRender] = React.useState(open || !lazy)

  const useRegisterEffect = (effect) => {
    React.useEffect(() => {
      if (!effect?.duration) return
      setTotalDuration((v) => (v > effect.duration ? v : effect.duration))
    }, [])
  }

  const translate = useSharedValue(0)

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
    useSlideEffect
  )([
    {
      ...values,
      animatedStyles: [],
      useRegisterEffect,
      useAddTransition: () => {},
      open,
      onClose,
      lazy,
      unmountOnClose,
      hasOpened,
      setHasOpened,
      render,
      setRender,
    },
    { ...props, animatedStyles: [] },
  ])
}
