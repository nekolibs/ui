import React from 'react'

import { Icon } from '../presentation'
import { Link } from '../actions'
import { TextInput } from '../inputs'
import { useFilter } from './FilterHandler'

export function SearchInput({ value: valueProp, onChange: onChangeProp, placeholder = 'Search...', ...rest }) {
  const filter = useFilter()

  const value = valueProp ?? filter.search
  const onChange = onChangeProp ?? filter.onChangeSearch

  const [local, setLocal] = React.useState(value || '')

  React.useEffect(() => {
    setLocal(value || '')
  }, [value])

  const push = () => {
    onChange?.(local)
  }

  const clear = () => {
    setLocal('')
    onChange?.('')
  }

  const suffix = !!local && (
    <Link onPress={clear}>
      <Icon name="close-line" />
    </Link>
  )

  return (
    <TextInput
      prefixIcon="search-line"
      prefixIconColor="text4"
      placeholder={placeholder}
      value={local}
      onChange={setLocal}
      onBlur={push}
      onKeyDown={(e) => e.key === 'Enter' && push()}
      onSubmitEditing={push}
      suffix={suffix}
      {...rest}
    />
  )
}
