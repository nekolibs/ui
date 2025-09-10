import { pipe } from 'ramda'

import { AbsTableRow } from '../../abstractions/Table'
import { useBackgroundModifier } from '../../modifiers/background'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePositionModifier } from '../../modifiers/position'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  // bg: 'green',
}

export function TableRow({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('TableRow'),
    useDefaultModifier(DEFAULT_PROPS),
    useDisplayModifier,
    usePositionModifier,
    useOverflowModifier,
    useBackgroundModifier
  )([{}, rootProps])

  return (
    <AbsTableRow className="neko-table-row" {...props}>
      {children}
    </AbsTableRow>
  )
}
