import { is, propEq } from 'ramda'
import React from 'react'

function formatOptions(options) {
  if (!options?.length) return options
  return options.map((option) => {
    if (is(String, option) || is(Number, option)) {
      return { label: option, value: option }
    }
    return option
  })
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
    options: formatOptions(isLazy ? options : optionsOrFetch),
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
