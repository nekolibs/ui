import { range, is, pipe } from 'ramda'
import React from 'react'

import { Button } from '../actions/Button'
import { View } from '../structure/View'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useSizeConverter } from '../../modifiers/sizeConverter'

function getPageIndexes(pages, value, maxVisible = 5) {
  if (pages <= maxVisible) {
    return Array.from({ length: pages }, (_, i) => ({
      label: i + 1,
      value: i + 1,
    }))
  }

  const middle = Math.floor(maxVisible / 2)
  let start = value - middle
  let end = value + middle

  if (start < 1) {
    start = 1
    end = maxVisible
  }

  if (end > pages) {
    end = pages
    start = pages - maxVisible + 1
  }

  const range = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const result = []

  if (start > 1) {
    if (start === 2) {
      result.push({ label: 1, value: 1 })
    } else {
      result.push({ label: '...', value: start - 1 })
    }
  }

  result.push(...range.map((p) => ({ label: p, value: p })))

  if (end < pages) {
    if (end === pages - 1) {
      result.push({ label: pages, value: pages })
    } else {
      result.push({ label: '...', value: end + 1 })
    }
  }

  return result
}

function Item({ active, ...props }) {
  return (
    <Button
      size="sm"
      ratio={1}
      color={active ? 'primary' : 'transparent'}
      textProps={{ color: !active && 'text3' }}
      iconProps={{ color: !active && 'text3' }}
      {...props}
    />
  )
}

export function Pagination({
  total = 0,
  itemsPerPage = 10,
  pages,
  maxVisible = 5,
  value,
  initialValue = 1,
  onChange,
  ...rootProps
}) {
  const [{ sizeCode }, props] = pipe(
    useSizeConverter('padding', 'md') //
  )([{}, rootProps])
  const size = moveScale(sizeCode, -1)

  pages = pages || Math.ceil(total / itemsPerPage)

  const [localValue, setLocalValue] = React.useState(initialValue)
  value = value || localValue || initialValue
  const handleChange = (v) => {
    setLocalValue(v)
    onChange?.(v)
  }

  const pageIndexes = getPageIndexes(pages, value, maxVisible)

  return (
    <View className="neko-pagination" row gap="xxs" {...props}>
      <Item
        icon="arrow-left-s-line"
        disabled={value === 1}
        onPress={() => handleChange(value - 1)}
        size={size}
        {...props}
      />

      {pageIndexes.map((item) => {
        return (
          <Item
            key={item.value}
            active={value === item.value}
            onPress={() => handleChange(item.value)}
            label={item.label}
            disabled={is(String, item.value)}
            size={size}
            {...props}
          />
        )
      })}

      <Item
        icon="arrow-right-s-line"
        disabled={value === pages}
        onPress={() => handleChange(value + 1)}
        size={size}
        {...props}
      />
    </View>
  )
}
