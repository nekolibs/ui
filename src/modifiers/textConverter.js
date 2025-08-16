import { getTextFromProps } from '../theme/helpers/textScale'
import { useGetThemeValue } from '../theme/ThemeHandler'

export function useTextConverter(defaultValue) {
  const getTextValue = useGetThemeValue('texts')

  return ([values, props]) => {
    const [textCode, formattedProps] = getTextFromProps(props, defaultValue)
    const text = getTextValue(textCode)
    return [{ ...values, text, textCode }, formattedProps]
  }
}
