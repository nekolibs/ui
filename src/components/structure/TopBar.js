import { pipe } from 'ramda'

import { Text } from '../text'
import { View } from './View'
import { useDefaultModifier } from '../../modifiers/default'
import { useResponsiveConverter } from '../../modifiers/responsiveConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'
import { useSafeAreaInsets } from '../../abstractions/helpers/useSafeAreaInsets'

const DEFAULT_PROPS = {
  borderB: 'overlayDivider',
}

export function TopBar({ right, left, WrapperView, children, ...rootProps }) {
  const { top: safeTop } = useSafeAreaInsets()

  const [_, props] = pipe(
    useThemeComponentModifier('TopBar'),
    useDefaultModifier(DEFAULT_PROPS),
    useResponsiveConverter([])
  )([{}, rootProps])
  let { useSafeArea = true, title, subtitle } = props

  const hasContent = !!title || !!subtitle || !!children || !!right || !!left

  WrapperView = WrapperView || View

  return (
    <WrapperView paddingT={useSafeArea && safeTop} {...props}>
      {!!hasContent && (
        <View minH="xxl" centerV row paddingH="md" paddingV="sm" gap="sm" fullW>
          <View flex={1} toLeft>
            {left}
          </View>

          <View center flex={3}>
            {children || (
              <Text center h6 numberOfLines={1}>
                {title}
              </Text>
            )}

            {subtitle && (
              <Text center xs numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          <View flex={1} toRight>
            {right}
          </View>
        </View>
      )}
    </WrapperView>
  )
}
