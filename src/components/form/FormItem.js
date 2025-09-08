import React from 'react'

import { FormGroup, useRelativePath } from './FormGroup'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { clearProps } from '../../modifiers/_helpers'
import { useFormInstance, useFormState } from './Form'

export function FormItem({ name, label, isAbsolutePath, children, useDefaultValue, ...props }) {
  const form = useFormInstance()
  const formState = useFormState()
  const listPath = useRelativePath(name, { isAbsolutePath })
  const [value, setValue] = React.useState(form.getFieldValue(listPath))
  const error = form.getError(listPath)

  React.useEffect(() => {
    return form.registerListener(listPath, (val) => setValue(val))
  }, [listPath.join('$NEKOJOIN$')])

  const handleChange = (e) => {
    const val = e?.target?.value ?? e
    form.setFieldValue(listPath, val)
  }

  let valueKey = 'value'
  if (!!useDefaultValue) valueKey = 'defaultValue'

  const childProps = clearProps({
    [valueKey]: value === undefined ? '' : value,
    onChange: handleChange,
    // loading: formState?.loading === true || undefined,
    disabled: formState?.disabled === true || undefined,
  })

  let content
  if (typeof children === 'function') {
    content = children(childProps)
  } else {
    const child = React.Children.only(children)
    content = React.cloneElement(child, { ...child.props, ...childProps })
  }

  return (
    <FormGroup name={listPath}>
      <View {...props}>
        {label && (
          <Text sm marginB="xxs">
            {label}
          </Text>
        )}
        {content}
        {error && <Text color="red">{error}</Text>}
      </View>
    </FormGroup>
  )
}
