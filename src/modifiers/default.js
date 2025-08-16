import { mergeDeepRight, is } from 'ramda'

export function useDefaultModifier(defaultPropsOrFunc) {
  return ([values, props]) => {
    const defaultProps =
      (is(Function, defaultPropsOrFunc) ? defaultPropsOrFunc([values, props]) : defaultPropsOrFunc) || {}
    return [values, mergeDeepRight(defaultProps, props)]
  }
}
