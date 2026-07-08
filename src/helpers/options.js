import { is, prop, propEq, uniqBy, mergeDeepLeft } from 'ramda'
import React from 'react'

import { debounce } from './debounce'

function formatOption(option) {
  if (is(String, option) || is(Number, option)) return { label: option, value: option }
  return option
}

export function formatOptions(options) {
  if (!options?.length) return options
  return options.map(formatOption)
}

export function getOptions(optionsOrFetch, params) {
  const result = is(Function, optionsOrFetch) ? optionsOrFetch(params) : formatOptions(optionsOrFetch)
  return Promise.resolve(result).then(formatOptions)
}

export function useOptions(optionsOrFetch, opts) {
  const { limit, lazy } = mergeDeepLeft(opts || {}, { limit: 15, lazy: false })
  const isFetch = is(Function, optionsOrFetch)
  const [loading, setLoading] = React.useState(isFetch && !lazy)
  const [options, setOptions] = React.useState([])
  const [lastSearch, setLastSearch] = React.useState()
  const [page, setPage] = React.useState(1)
  const [done, setDone] = React.useState(!isFetch)

  const isFirstLoad = page === 1 && !options?.length && loading
  const isRefetching = page === 1 && !!options.length && loading
  const isFetchingMore = page > 1 && !!options.length && loading

  const handleGetOptions = (search, page = 1) => {
    setLastSearch(search)
    setDone(false)
    setPage(page)
    setLoading(true)
    const after = page > 1 ? options[options.length - 1]?.id : undefined
    if (search === '') search = undefined
    getOptions(optionsOrFetch, { search, after, page })
      .then((result) => {
        if (result?.length < limit) setDone(true)
        let merged = page > 1 ? [...options, ...result] : result
        // Offset pagination can repeat rows when the list shifts between pages; dedup by id.
        if (merged[0]?.id) merged = uniqBy(prop('id'), merged)
        setOptions(merged)
      })
      .finally(() => setLoading(false))
  }

  const fetchMore = () => {
    const newPage = (page || 1) + 1
    handleGetOptions(lastSearch, newPage)
  }

  const handleSearch = debounce(handleGetOptions)

  React.useEffect(() => {
    if (isFetch && !lazy) handleGetOptions()
  }, [])

  const formattedOptions = React.useMemo(
    () => (is(Array, optionsOrFetch) ? formatOptions(optionsOrFetch) : formatOptions(options)),
    [optionsOrFetch, options]
  )

  return {
    options: formattedOptions,
    handleGetOptions,
    handleSearch,
    fetchMore,
    done,
    page,
    limit,
    loading,
    isFirstLoad,
    isRefetching,
    isFetchingMore,
    lastSearch,
  }
}

export function findOptionByValue(options, value) {
  return options.find(propEq('value', value))
}
