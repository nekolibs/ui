import { pipe } from 'ramda'

import { AbsTableRow } from '../../abstractions/Table'
import { useBackgroundModifier } from '../../modifiers/background'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePositionModifier } from '../../modifiers/position'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  top: 0,
  zIndex: 40,
}

export function TableHeaderRow({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('TableHeaderRow'),
    useDefaultModifier(DEFAULT_PROPS),
    useDisplayModifier,
    usePositionModifier,
    useOverflowModifier,
    useBackgroundModifier
  )([{}, rootProps])

  return (
    <AbsTableRow className="neko-table-header-row" {...props}>
      {children}
    </AbsTableRow>
  )
}
