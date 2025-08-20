import React from 'react'

import { FormGroup, useRelativePath } from './FormGroup'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useFormInstance } from './Form'

export function FormItem({ name, label, relative, children, ...props }) {
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

  const childProps = {
    value: value === undefined ? '' : value,
    onChange: handleChange,
  }

  return (
    <FormGroup name={listPath}>
      <View {...props}>
        {label && (
          <Text sm marginB="xxsm">
            {label}
          </Text>
        )}
        {typeof children === 'function'
          ? children(childProps)
          : React.cloneElement(React.Children.only(children), childProps)}
        {error && <Text color="red">{error}</Text>}
      </View>
    </FormGroup>
  )
}
