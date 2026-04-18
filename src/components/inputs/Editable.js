import { isEmpty } from 'ramda'
import React from 'react'

import { Icon } from '../presentation/Icon'
import { IconLabel } from '../presentation/IconLabel'
import { Loading } from '../state/Loading'
import { Text } from '../text/Text'
import { TextInput } from './TextInput'
import { View } from '../structure/View'

function getInputValue(e) {
  return e?.target?.value !== undefined ? e.target.value : e
}

function hasValue(v) {
  return v !== undefined && v !== null && !isEmpty(v)
}

function EditableInput({
  Input,
  renderInput,
  onChange,
  onClose,
  onSubmit,
  submitOnChange,
  submitWhenHasNoValue,
  disableCloseOnBlur,
  alwaysEditing,
  ...props
}) {
  const initialValue = props.value || props.defaultValue
  const [value, setValue] = React.useState(initialValue)
  Input = Input || TextInput

  const submit = (val) => {
    const inputHasValue = hasValue(val)
    const shouldSubmit = submitWhenHasNoValue || inputHasValue
    const hasChangedTheValue = val !== initialValue
    if (shouldSubmit && hasChangedTheValue) {
      onSubmit && onSubmit(val)
    }
    onClose()
  }

  const handleSubmit = (e) => submit(getInputValue(e))

  const handleChange = (e) => {
    const inputValue = getInputValue(e)
    setValue(inputValue)
    onChange && onChange(inputValue)
    if (submitOnChange) submit(inputValue)
  }

  const { value: _, defaultValue: __, ...inputProps } = props

  if (!!renderInput) {
    return renderInput({ handleSubmit, handleChange, value, ...inputProps })
  }

  return (
    <Input
      startsOpen
      sm
      value={value}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          handleSubmit(e)
        }
      }}
      onBlur={!disableCloseOnBlur && !alwaysEditing ? () => submit(value) : undefined}
      onOpenChange={(open) => !open && !alwaysEditing && submit(value)}
      onOk={() => submit(value)}
      {...inputProps}
    />
  )
}

export function Editable({ children, hidden, disabled, visibleIcon, emptyLabel, emptyIcon, loading, ...props }) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)

  if (!!props.alwaysEditing || isEditing) {
    return (
      <EditableInput
        disabled={disabled}
        autoFocus={!props.alwaysEditing}
        onClose={() => setIsEditing(false)}
        {...props}
      />
    )
  }

  if (disabled) return children
  if (loading) return <Loading />

  const hasAnyValue = hasValue(props.value || props.defaultValue)
  const showEmptyLabel = emptyLabel && !hasAnyValue

  return (
    <View
      row
      centerV
      gap={!hidden ? 1 : 0}
      pointer
      border={!hidden ? 1 : 0}
      borderStyle="dashed"
      borderColor={hovered && !hidden ? 'divider' : 'transparent'}
      br={!hidden ? 'xxs' : undefined}
      onClick={() => {
        setIsEditing(true)
        setHovered(false)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <View flex minHeight={17} maxWidth="100%">
        {hovered && !hasAnyValue && props.placeholder && <Text color="text4">{props.placeholder}</Text>}
        {showEmptyLabel ? <IconLabel icon={emptyIcon} label={emptyLabel} color="text4" /> : children}
      </View>
      {!hidden && (visibleIcon || hovered) && (
        <View>
          <Icon name="RiEditLine" text4 />
        </View>
      )}
    </View>
  )
}
