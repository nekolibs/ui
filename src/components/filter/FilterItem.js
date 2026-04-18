import React from 'react'
import { path } from 'ramda'

import { clearProps } from '../../modifiers/_helpers'
import { useFilter } from './FilterHandler'
import { useFilterPath } from './FilterGroup'

export function FilterItem({ name, children }) {
  const { filters, onChangeFilter } = useFilter()
  const listPath = useFilterPath(name)

  const value = path(listPath, filters)

  const handleChange = (e) => {
    const val = e?.target?.value ?? e
    onChangeFilter(listPath, val)
  }

  const childProps = clearProps({
    value: value === undefined ? '' : value,
    onChange: handleChange,
  })

  if (typeof children === 'function') {
    return children(childProps)
  }

  const child = React.Children.only(children)
  return React.cloneElement(child, { ...child.props, ...childProps })
}
