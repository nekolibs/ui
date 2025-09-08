import { is, propEq } from 'ramda'
import React from 'react'

import { debounce } from './debounce'

export function formatOption(option) {
  if (!option || !is(Object, option)) return option
  return { value: option.id, label: option.name, ...option }
}

export function formatOptions(options = []) {
  if (!!options && is(Object, options) && !is(Array, options)) return formatOption(options)
  if (!options || !is(Array, options)) return options
  return options?.map(formatOption)
}

export function useOptions(optionsOrFetch, { limit } = {}) {
  const isLazy = !is(Array, optionsOrFetch)
  const [loading, setLoading] = React.useState(isLazy)
  const [options, setOptions] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [done, setDone] = React.useState(!isLazy)

  const isFirstLoad = page === 1 && !options?.length && loading
  const isRefetching = page === 1 && !!options.length && loading
  const isFetchingMore = page > 1 && !!options.length && loading

  const handleGetOptions = (page = 1) => {
    setDone(false)
    setPage(page)
    setLoading(true)
    optionsOrFetch(optionsOrFetch, page)
      .then(formatOptions)
      .then((result) => {
        if (result?.length < limit) setDone(true)
        let newOptions = []
        if (page > 1) newOptions = options
        setOptions([...newOptions, ...result])
      })
      .finally(() => setLoading(false))
  }

  const fetchMore = () => {
    const newPage = (page || 1) + 1
    handleGetOptions(newPage)
  }

  React.useEffect(() => {
    if (isLazy) handleGetOptions()
  }, [limit])

  return {
    options: isLazy ? options : optionsOrFetch,
    handleGetOptions,
    fetchMore,
    done,
    page,
    done,
    limit,
    loading,
    isFirstLoad,
    isRefetching,
    isFetchingMore,
  }
}

export function findOptionByValue(options, value) {
  return options.find(propEq('value', value))
}
