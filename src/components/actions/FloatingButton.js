import { pipe } from 'ramda'

import { AbsTouchableOpacity } from '../../abstractions/TouchableOpacity'
import { Icon } from '../presentation'
import { Loading } from '../state'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useColorConverter } from '../../modifiers/colorConverter'
import { useCursorModifier } from '../../modifiers/cursor'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useFlexModifier } from '../../modifiers/flex'
import { useFlexWrapperModifier } from '../../modifiers/flexWrapper'
import { useFullColorModifier } from '../../modifiers/fullColor'
import { useHoverConverter } from '../../modifiers/hover'
import { useMarginModifier } from '../../modifiers/margin'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useSafeAreaInsets } from '../../abstractions/helpers/useSafeAreaInsets'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useSizeModifier } from '../../modifiers/size'
import { useStateModifier } from '../../modifiers/state'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS =
  ({ bottomInset }) =>
  ([{ sizeCode }, { square }]) => {
    sizeCode = moveScale(sizeCode, 1)

    return {
      absolute: true,
      shadow: true,
      bottom: 'md',
      marginB: bottomInset,
      right: 'md',
      round: !square,
      ration: 1,
      padding: 'xxxs',
      height: sizeCode,
      width: sizeCode,
      br: sizeCode,
      border: 1,
      center: true,
      pointer: true,
      hover: {
        opacity: 0.7,
      },
    }
  }

export function FloatingButton({ useSafeArea = true, ...rootProps }) {
  const insets = useSafeAreaInsets()
  const bottomInset = useSafeArea ? insets.bottom : 0

  let [{ loading, fontColor, color, sizeCode }, formattedProps] = pipe(
    useColorConverter('primary'),
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('FloatingButton'),
    useDefaultModifier(DEFAULT_PROPS({ bottomInset })),
    useHoverConverter,
    useCursorModifier,
    useFullColorModifier,
    useDisplayModifier,
    useStateModifier,
    useSizeModifier,
    usePositionModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useFlexWrapperModifier,
    useBackgroundModifier,
    useBorderModifier
  )([{}, rootProps])
  sizeCode = moveScale(sizeCode, 1)

  const { icon, iconProps, size, ...props } = formattedProps

  let content = <Icon flex color={fontColor} size={sizeCode} name={icon} loading={loading} {...iconProps} />
  if (loading) content = <Loading size={sizeCode} color={fontColor} />

  return (
    <AbsTouchableOpacity className="neko-floating-button neko-wave-click-effect" type="button" {...props}>
      {content}
    </AbsTouchableOpacity>
  )
}
