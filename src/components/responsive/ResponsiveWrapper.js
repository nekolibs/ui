import { View } from '../structure'
import { useResponsiveValue } from '../..'

export function ResponsiveWrapper({ Wrapper, responsiveProps, ...props }) {
  Wrapper = useResponsiveValue(Wrapper) || View
  responsiveProps = useResponsiveValue(responsiveProps || {})

  return <Wrapper {...props} {...responsiveProps} />
}
