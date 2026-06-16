import { pipe } from 'ramda'

import { Text } from '../text'
import { View } from './View'
import { useDefaultModifier } from '../../modifiers/default'
import { useResponsiveConverter } from '../../modifiers/responsiveConverter'
import { useSafeAreaInsets } from '../../abstractions/helpers/useSafeAreaInsets'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  borderB: 'overlayDivider',
  titleProps: {
    center: true,
    size: 'h6',
    numberOfLines: 1,
  },
  subtitleProps: {
    center: true,
    size: 'xs',
    numberOfLines: 1,
  },
}

export function TopBar({ title, subtitle, right, left, WrapperView, children, ...rootProps }) {
  const { top: safeTop } = useSafeAreaInsets()

  const [_, props] = pipe(
    useThemeComponentModifier('TopBar'),
    useDefaultModifier(DEFAULT_PROPS),
    useResponsiveConverter([])
  )([{}, rootProps])
  let { useSafeArea = true, titleProps, subtitleProps } = props

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
            {children || <Text {...titleProps}>{title}</Text>}

            {subtitle && <Text {...subtitleProps}>{subtitle}</Text>}
          </View>

          <View flex={1} toRight>
            {right}
          </View>
        </View>
      )}
    </WrapperView>
  )
}
