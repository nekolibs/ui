import { Text } from 'react-native'
import React from 'react'

import { FormGroup, useRelativePath } from './FormGroup'
import { useFormInstance } from './Form'

export function FormItem({ name, relative, children }) {
  const form = useFormInstance()
  const listPath = useRelativePath(name, { relative })
  const [value, setValue] = React.useState(form.getFieldValue(listPath))
  const error = form.getError(listPath)

  React.useEffect(() => {
    return form.registerListener(listPath, (val) => setValue(val))
  }, [listPath.join('$NEKOJOIN$')])

  const handleChange = (e) => {
    const val = e?.target?.value ?? e
    form.setFieldValue(listPath, val)
  }

  const child = React.Children.only(children)
  const childWithProps = React.cloneElement(child, {
    value,
    onChange: handleChange,
  })

  return (
    <FormGroup name={listPath}>
      {childWithProps}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </FormGroup>
  )
}
