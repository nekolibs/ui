import { pipe } from 'ramda'
import React from 'react'

import { AbsTable } from '../../abstractions/Table'
import { AbsView } from '../../abstractions/View'
import { useBackgroundModifier } from '../../modifiers/background'
import { useBorderModifier } from '../../modifiers/border'
import { useDefaultModifier } from '../../modifiers/default'
import { useDisplayModifier } from '../../modifiers/display'
import { useMarginModifier } from '../../modifiers/margin'
import { useOverflowModifier } from '../../modifiers/overflow'
import { usePaddingModifier } from '../../modifiers/padding'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const TableContext = React.createContext(null)
export const useTable = () => React.useContext(TableContext) || {}

const DEFAULT_PROPS = {
  br: 'md', //
  overflow: 'scroll',
  width: '100%',
  relative: true,
}

export function Table({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('Table'),
    useDefaultModifier(DEFAULT_PROPS),
    useDisplayModifier,
    useSizeModifier,
    useOverflowModifier,
    usePaddingModifier,
    useMarginModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  const scrollRef = React.useRef()
  const [scrolledToMaxLeft, setScrolledToMaxLeft] = React.useState(true)
  const [scrolledToMaxRight, setScrolledToMaxRight] = React.useState(false)

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el || !el.addEventListener) return

    const onScroll = () => {
      setScrolledToMaxLeft(el.scrollLeft === 0)
      setScrolledToMaxRight(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
    }

    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <TableContext.Provider value={{ scrolledToMaxLeft, scrolledToMaxRight }}>
      <AbsView {...props} className="neko-table-wrapper" ref={scrollRef}>
        <AbsTable className="neko-table">{children}</AbsTable>
      </AbsView>
    </TableContext.Provider>
  )
}
