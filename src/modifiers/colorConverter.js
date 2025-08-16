import { getColorFromProps } from '../theme/helpers/colorScale'
import { useGetColor } from '../theme/ThemeHandler'

export function useColorConverter(defaultValue) {
  const getColor = useGetColor()

  return ([values, props]) => {
    const [colorCode, formattedProps] = getColorFromProps(props, defaultValue)
    const color = getColor(colorCode)

    return [{ ...values, color, colorCode }, formattedProps]
  }
}
