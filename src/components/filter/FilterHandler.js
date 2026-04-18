import { assocPath, curry } from 'ramda'
import React from 'react'

const FilterContext = React.createContext()
export const useFilter = () => React.useContext(FilterContext) || {}

export function FilterHandler({
  children,
  initialFilters = {},
  initialSearch,
  initialSort,
  onChange,
}) {
  const [filters, setFilters] = React.useState(initialFilters)
  const [search, setSearch] = React.useState(initialSearch)
  const [sort, setSort] = React.useState(initialSort)

  React.useEffect(() => {
    onChange?.({ filters, search, sort })
  }, [filters, search, sort])

  const onChangeFilter = curry((name, value) => {
    const listPath = Array.isArray(name) ? name : [name]
    setFilters((prev) => assocPath(listPath, value, prev))
  })
  const onChangeSearch = setSearch
  const onChangeSort = setSort

  const onReset = () => {
    setFilters(initialFilters)
    setSearch(initialSearch)
    setSort(initialSort)
  }

  const onClear = () => {
    setFilters({})
    setSearch(undefined)
    setSort(undefined)
  }

  const value = {
    filters,
    setFilters,
    onChangeFilter,
    search,
    onChangeSearch,
    sort,
    onChangeSort,
    onReset,
    onClear,
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
