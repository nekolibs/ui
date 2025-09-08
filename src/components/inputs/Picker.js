import React from 'react'

import { Col } from '../structure/Col'
import { LoadingView } from '../state/LoadingView'
import { Row } from '../structure/Row'
import { useOptions } from '../../helpers/options'

function isSelected(value, option, config = {}) {
  return !!config.multiple
    ? value?.some?.((item) => compareOptionsValues(item, option, config))
    : compareOptionsValues(value, option, config)
}

function compareOptionsValues(optionA, optionB, config = {}) {
  const valueKey = config.valueKey || 'value'
  const valueA = optionA?.[valueKey] || optionA
  const valueB = optionB?.[valueKey] || optionB

  if (!valueA || !valueB) return false

  return valueA === valueB
}

function formatSingleChangeValue(option, value, { useRawOption, selected, valueKey }) {
  let selectedOption = option
  let selectedValue = option[valueKey]
  if (!!useRawOption) selectedValue = option
  if (selected) {
    selectedOption = null
    selectedValue = null
  }

  return selectedValue
}

function formatMultipleChangeValue(option, value, { useRawOption, selected, multiple, valueKey }) {
  let selectedOption = option
  let selectedValue = option[valueKey]
  value = [...(value || [])]
  if (!!useRawOption) selectedValue = option
  if (selected) {
    value = value.filter((item) => !isSelected(item, selectedOption, { multiple, valueKey }))
  } else {
    value.push(selectedValue)
  }

  return value
}

function PickerItem({ option, onChange, value, renderOption, useRawOption, multiple, labelKey, valueKey, ...props }) {
  const selected = isSelected(value, option, { multiple, valueKey })

  const handleChange = () => {
    const formatChangeValueFunc = multiple ? formatMultipleChangeValue : formatSingleChangeValue
    const formattedValue = formatChangeValueFunc(option, value, { selected, useRawOption, valueKey })
    onChange(formattedValue)
  }

  return <Col {...props}>{renderOption({ option, selected, onChange: handleChange, valueKey, labelKey })}</Col>
}

export function Picker({
  value,
  initialValue,
  onChange,
  disabled,
  options,
  renderOption,
  colProps,
  useRawOption,
  multiple,
  valueKey,
  labelKey,
  ...rootProps
}) {
  const [localValue, setLocalValue] = React.useState(initialValue)
  value = value === undefined ? localValue : value
  onChange = onChange || setLocalValue

  const handleChange = (v) => {
    if (!!disabled) return
    setLocalValue(v)
    onChange?.(v)
  }

  const { options: finalOptions, isFirstLoad } = useOptions(options, {})

  valueKey = valueKey || 'value'
  labelKey = labelKey || 'label'

  if (!renderOption) {
    console.error('Picker requires a renderOption prop')
    return false
  }

  return (
    <LoadingView active={isFirstLoad} replaceChildren>
      <Row className="neko-picker" gap="md" {...rootProps}>
        {finalOptions?.map?.((option) => (
          <PickerItem
            key={option.value}
            option={option}
            onChange={handleChange}
            value={value}
            renderOption={renderOption}
            useRawOption={useRawOption}
            multiple={multiple}
            valueKey={valueKey}
            labelKey={labelKey}
            {...colProps}
          />
        ))}
      </Row>
    </LoadingView>
  )
}
