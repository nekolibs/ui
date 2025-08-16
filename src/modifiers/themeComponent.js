import { mergeDeepRight } from 'ramda'
import { useThemeComponent } from '../theme/ThemeHandler'

export function useThemeComponentModifier(componentName) {
  const themeProps = useThemeComponent(componentName)

  return ([values, props]) => {
    props = mergeDeepRight(themeProps, props)
    return [values, props]
  }
}
