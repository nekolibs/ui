import { getSizeFromProps } from '../theme/helpers/sizeScale'
import { useGetThemeValue } from '../theme/ThemeHandler'

export function useSizeConverter(groupKey, defaultValue) {
  const getSizeValue = useGetThemeValue(groupKey)

  return ([values, props]) => {
    const [sizeCode, formattedProps] = getSizeFromProps(props, defaultValue)
    const size = getSizeValue(sizeCode)
    return [{ ...values, size, sizeCode }, formattedProps]
  }
}
