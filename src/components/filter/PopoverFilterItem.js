import React from 'react'
import { path } from 'ramda'

import { Button } from '../actions/Button'
import { LinkInput } from '../inputs/LinkInput'
import { Popover } from '../structure/popover/Popover'
import { View } from '../structure/View'
import { useFilter } from './FilterHandler'
import { useFilterPath } from './FilterGroup'

function autoFormat(value) {
  if (value == null) return undefined

  if ('min' in value || 'max' in value) {
    const { min, max } = value
    if (min != null && max != null) return `${min} – ${max}`
    if (min != null) return `≥ ${min}`
    if (max != null) return `≤ ${max}`
    return undefined
  }

  if ('start' in value || 'end' in value) {
    const fmt = 'YYYY-MM-DD'
    const s = value.start?.format?.(fmt) || value.start
    const e = value.end?.format?.(fmt) || value.end
    if (s && e) return `${s} – ${e}`
    if (s) return `${s} →`
    if (e) return `→ ${e}`
    return undefined
  }

  return String(value)
}

function PopoverFilterContent({ value, onApply, submitOnClose, children, onClose }) {
  const [local, setLocal] = React.useState(value)
  const localRef = React.useRef(local)
  localRef.current = local

  React.useEffect(() => {
    if (!submitOnClose) return
    return () => onApply(localRef.current)
  }, [])

  const handleApply = () => {
    onApply(local)
    onClose()
  }

  return (
    <View gap="sm">
      {typeof children === 'function'
        ? children({ value: local, onChange: setLocal })
        : React.cloneElement(React.Children.only(children), { value: local, onChange: setLocal })}
      <View row toRight>
        <Button label="Apply" onPress={handleApply} xs />
      </View>
    </View>
  )
}

export function PopoverFilterItem({ name, label, placeholder, children, submitOnClose, popoverProps, formatValue, ...props }) {
  const { filters, onChangeFilter } = useFilter()
  const listPath = useFilterPath(name)
  const value = path(listPath, filters)

  const displayText = value != null ? (formatValue?.(value) ?? autoFormat(value)) : undefined

  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      unmountOnClose
      {...popoverProps}
      renderContent={({ onClose }) => (
        <PopoverFilterContent value={value} onApply={(val) => onChangeFilter(listPath, val)} submitOnClose={submitOnClose} onClose={onClose}>
          {children}
        </PopoverFilterContent>
      )}
    >
      <LinkInput value={displayText} placeholder={placeholder || label} suffixIcon="arrow-down-s-fill" suffixIconColor="text4" {...props} />
    </Popover>
  )
}
