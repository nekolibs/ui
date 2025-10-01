import React from 'react'

import { Icon, IconLabel } from '../presentation'
import { Link } from '../actions'
import { LinkInput } from './LinkInput'
import { Picker, getOptionLabel, searchOptions } from './Picker'
import { Popover } from '../structure/popover/Popover'
import { Text } from '../text'
import { TextInput } from './TextInput'
import { View } from '../structure'
import { useResponsiveValue } from '../../responsive'

export function Select({
  value,
  onChange,
  onChangeSearch,
  options,
  placement,
  initialLabel,
  useBottomDrawer = { native: true, sm: true, md: true },
  useSearch,
  renderOption,
  labelKey,
  valueKey,
  useRawOption,
  pickerProps,
  popoverProps,
  ...props
}) {
  labelKey = labelKey || pickerProps?.labelKey || 'label'
  valueKey = valueKey || pickerProps?.valueKey || 'value'
  useRawOption = useRawOption || pickerProps?.useRawOption
  pickerProps = { ...pickerProps, labelKey, valueKey, useRawOption }

  useBottomDrawer = useResponsiveValue(useBottomDrawer)
  const [focus, setFocus] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [inputValue, setInputValue] = React.useState(initialLabel || '')
  const [localValue, setLocalValue] = React.useState(value)

  value = value || localValue

  const handleChange = (value, option) => {
    setInputValue(option?.[labelKey] || getOptionLabel(options, option, { valueKey, labelKey }))
    setLocalValue(value)
    onChange?.(value)
  }

  const handleChangeSearch = (v) => {
    onChangeSearch?.(v)
    setSearch(v)
  }

  React.useEffect(() => {
    const label = value?.[labelKey] || getOptionLabel(options, value, { valueKey, labelKey })
    if (!!label || !value) setInputValue(label)
  }, [value])

  const Input = !useSearch || useBottomDrawer ? LinkInput : TextInput

  return (
    <Popover
      trigger="click"
      placement={placement || 'bottomLeft'}
      snapPoints={[350]}
      useBottomDrawer={useBottomDrawer}
      parentWidth
      padding={0}
      watch={[search]}
      unmountOnClose
      {...popoverProps}
      renderContent={({ onClose }) => (
        <>
          {useBottomDrawer && (
            <View padding="md">
              <TextInput
                prefixIcon="search-line"
                prefixIconColor="text4"
                value={search}
                onChange={handleChangeSearch}
              />
            </View>
          )}
          <Picker
            row={false}
            options={searchOptions(options, search, { labelKey })}
            value={value}
            gap={0}
            onChange={(v, option) => {
              handleChange(v, option)
              onClose()
            }}
            {...pickerProps}
            renderOption={({ option, selected, onChange }) => (
              <Link
                row
                paddingH="md"
                paddingV="xs"
                minHeight="md"
                gap="sm"
                onPress={onChange}
                centerV
                bg={selected && 'primary_op10'}
              >
                <IconLabel {...option} label={option?.[labelKey]} flex strong={selected} />
                {selected && <Icon name="checkbox-circle-fill" primary />}
              </Link>
            )}
          />
        </>
      )}
    >
      <View fullW>
        <Input
          value={!!focus ? search : inputValue}
          onChange={handleChangeSearch}
          onFocus={() => {
            handleChangeSearch('')
            setFocus(true)
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false)
            }, 200)
          }}
          suffixIcon="arrow-down-s-fill"
          suffixIconColor="text4"
          {...props}
        />
      </View>
    </Popover>
  )
}
