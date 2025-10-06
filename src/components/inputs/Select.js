import React from 'react'

import { Icon, IconLabel } from '../presentation'
import { Link } from '../actions'
import { LinkInput } from './LinkInput'
import { Picker, getOptionLabel, searchOptions } from './Picker'
import { Popover } from '../structure/popover/Popover'
import { TextInput } from './TextInput'
import { View } from '../structure'
import { useResponsiveValue } from '../../responsive'

function FullWidthInputWrapper({ ref, ...props }) {
  return (
    <View fullW ref={ref}>
      <TextInput {...props} />
    </View>
  )
}

export function Select({
  value,
  onChange,
  onChangeSearch,
  options,
  placement,
  placeholder,
  initialLabel,
  useBottomDrawer = { native: true, sm: true, md: true },
  useSearch,
  renderOption,
  labelKey,
  valueKey,
  useRawOption,
  multiple,
  onEndReached,
  renderFooter,
  renderHeader,
  pickerProps,
  popoverProps,
  popoverMaxHeight,
  ...props
}) {
  const [focus, setFocus] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [inputValue, setInputValue] = React.useState(initialLabel || '')
  const [localValue, setLocalValue] = React.useState(value)

  labelKey = labelKey || pickerProps?.labelKey || 'label'
  valueKey = valueKey || pickerProps?.valueKey || 'value'
  useRawOption = useRawOption || pickerProps?.useRawOption
  multiple = multiple || pickerProps?.multiple
  onEndReached = onEndReached || pickerProps?.onEndReached
  renderFooter = renderFooter || pickerProps?.renderFooter
  renderHeader = renderHeader || pickerProps?.renderHeader
  pickerProps = { ...pickerProps, labelKey, valueKey, useRawOption, multiple, onEndReached, renderFooter, renderHeader }

  popoverMaxHeight = popoverMaxHeight || 300

  useBottomDrawer = useResponsiveValue(useBottomDrawer)

  value = value || localValue

  const handleChange = React.useCallback(
    (value, option) => {
      if (!!multiple) {
        setInputValue(value.map((item) => getOptionLabel(options, item, { valueKey, labelKey })).join(', '))
      } else {
        setInputValue(option?.[labelKey] || getOptionLabel(options, option, { valueKey, labelKey }))
      }
      setLocalValue(value)
      onChange?.(value)
    },
    [labelKey, valueKey]
  )

  React.useEffect(() => {
    if (!!multiple) {
      setInputValue(value?.map?.((item) => getOptionLabel(options, item, { valueKey, labelKey })).join(', '))
    } else {
      const label = value?.[labelKey] || getOptionLabel(options, value, { valueKey, labelKey })
      if (!!label || !value) setInputValue(label)
    }
  }, [value])

  const handleChangeSearch = React.useCallback((v) => {
    onChangeSearch?.(v)
    setSearch(v)
  }, [])

  const Input = !useSearch || useBottomDrawer ? LinkInput : FullWidthInputWrapper
  const valueWatcher = multiple && localValue

  const finalRenderOption = React.useCallback(
    (params) => {
      if (!!renderOption) return renderOption(params)
      const { option, labelKey, selected } = params
      return <IconLabel {...option} label={option?.[labelKey]} flex strong={selected} />
    },
    [renderOption]
  )

  return (
    <Popover
      trigger="click"
      placement={placement || 'bottomLeft'}
      snapPoints={[450]}
      useBottomDrawer={useBottomDrawer}
      parentWidth
      padding={0}
      watch={[search, options, valueWatcher]}
      unmountOnClose
      maxHeight={popoverMaxHeight}
      {...popoverProps}
      renderContent={({ onClose }) => (
        <>
          {useBottomDrawer && useSearch && (
            <View padding="md" paddingB="xs">
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
            maxHeight={!useBottomDrawer && popoverMaxHeight}
            useFlatList
            onlyOnScreen
            itemMinHeight={30}
            onChange={(v, option) => {
              handleChange(v, option)
              if (!multiple) onClose()
            }}
            {...pickerProps}
            renderOption={({ option, selected, onChange }) => (
              <Link
                row
                paddingH={useBottomDrawer ? 'md' : 'sm'}
                paddingV="xs"
                minHeight={useBottomDrawer ? 'xl' : 'md'}
                gap="sm"
                onMouseDown={(e) => e.preventDefault()}
                onPress={onChange}
                centerV
                bg={selected && 'primary_op10'}
              >
                <View flex row>
                  {finalRenderOption({ option, labelKey, selected })}
                </View>
                {selected && <Icon name="checkbox-circle-fill" primary />}
              </Link>
            )}
          />
        </>
      )}
    >
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
        // When the option to use tags presentation, use prefix to render the tags
        // _prefix={
        // multiple &&
        // value?.length && (
        // <Text>{value?.map((item) => getOptionLabel(options, item, { labelKey, valueKey })).join(', ')}</Text>
        // )
        // }
        placeholder={(!multiple || !value?.length) && placeholder}
        suffixIcon="arrow-down-s-fill"
        suffixIconColor="text4"
        fullW
        {...props}
      />
    </Popover>
  )
}
