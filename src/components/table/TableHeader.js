import { pipe, is } from 'ramda'

import { AbsTableHeader } from '../../abstractions/Table'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { moveScale } from '../../theme/helpers/sizeScale'
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
    paddingV: moveScale(sizeCode, -1),
    borderB: true,
    margin: 0,
    borderR: left !== undefined && !!sticky && !scrolledToMaxLeft,
    borderL: right !== undefined && !!sticky && !scrolledToMaxRight,
  })

export function TableHeader({ children, label, colSpan, rowSpan, ...rootProps }) {
  const { scrolledToMaxLeft, scrolledToMaxRight } = useTable()

  const [{ sizeCode, align }, { style, ...props }] = pipe(
    useAlignConverter('left'),
    useSizeConverter('padding', 'md'),
    useThemeComponentModifier('TableHeader'),
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

  if (!!label || is(String, children)) {
    console.log(sizeCode, moveScale(sizeCode, -1))
    children = (
      <Text strong text3 fullW block align={align} size={moveScale(sizeCode, -1)}>
        {label || children}
      </Text>
    )
  }

  return (
    <AbsTableHeader className="neko-table-header" style={style} colSpan={colSpan} rowSpan={rowSpan}>
      <View className="neko-table-header-content" fullW fullH align={align} centerV {...props}>
        {children}
      </View>
    </AbsTableHeader>
  )
}
