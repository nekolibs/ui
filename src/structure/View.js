import React from 'react'
import { View as NativeView } from 'react-native'
import { pipe } from 'ramda'

import { useFlexModifier } from '../modifiers/flex'
import { useFlexWrapperModifier } from '../modifiers/flexWrapper'
import { useMarginModifier } from '../modifiers/margin'
import { usePaddingModifier } from '../modifiers/padding'
import { usePositionModifier } from '../modifiers/position'
import { useSizeModifier } from '../modifiers/size'

export function View(props) {
  props = pipe(
    useSizeModifier, //
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexWrapperModifier,
    useFlexModifier
  )

  return <NativeView {...props} />
}
