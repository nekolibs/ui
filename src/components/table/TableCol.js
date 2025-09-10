import { pipe, is } from 'ramda'

import { AbsTableCol } from '../../abstractions/Table'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useAlignConverter } from '../../modifiers/alignConverter'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useSizeModifier } from '../../modifiers/size'
import { useTable } from './Table'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS =
  ({ scrolledToMaxLeft, scrolledToMaxRight }) =>
  ([{ sizeCode }, { sticky, left, right }]) => ({
    bg: 'overlayBG',
    paddingH: ['xxxs', 'xxs', 'xs'].includes(sizeCode) ? 'sm' : sizeCode,
    paddingV: sizeCode,
    borderB: true, //
    margin: 0,
    borderR: left !== undefined && !!sticky && !scrolledToMaxLeft,
    borderL: right !== undefined && !!sticky && !scrolledToMaxRight,
  })

export function TableCol({ label, children, strong, color, colSpan, rowSpan, ...rootProps }) {
  const { scrolledToMaxLeft, scrolledToMaxRight } = useTable()

  const [{ sizeCode, align }, { style, ...props }] = pipe(
    useAlignConverter('left'),
    useSizeConverter('padding', 'md'),
    useThemeComponentModifier('TableCol'),
    useDefaultModifier(DEFAULT_PROPS({ scrolledToMaxLeft, scrolledToMaxRight })),
    useDisplayModifier,
    usePositionModifier,
    useSizeModifier,
    useOverflowModifier,
    usePaddingModifier,
    useMarginModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  if (!!label || is(String, children) || is(Number, children)) {
    children = (
      <Text strong={!!strong} color={color} size={sizeCode} align={align}>
        {label || children}
      </Text>
    )
  }

  return (
    <AbsTableCol className="neko-table-col" style={style} colSpan={colSpan} rowSpan={rowSpan}>
      <View className="neko-table-col-content" fullW fullH align={align} {...props}>
        {children}
      </View>
    </AbsTableCol>
  )
}
