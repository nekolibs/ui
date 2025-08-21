import { pipe } from 'ramda'

import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useFormState } from './Form'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'

export function FormWrapperComponent({ children, form, ...rootProps }) {
  const formState = useFormState()
  const [_, props] = pipe(
    useDisplayModifier, //
    // useStateModifier,
    useSizeModifier, //
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexWrapperModifier,
    useFlexModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formState?.loading || formState?.disabled) return
    form.handleSubmit()
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
      <input type="submit" style={{ display: 'none' }} />
    </form>
  )
}
