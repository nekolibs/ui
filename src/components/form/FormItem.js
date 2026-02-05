import React from 'react'

import { FormGroup, useRelativePath } from './FormGroup'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { clearProps } from '../../modifiers/_helpers'
import { useFormInstance, useFormState } from './Form'
import { shouldValidateOn } from './validation'

export function FormItem({
  name,
  label,
  isAbsolutePath,
  children,
  useDefaultValue,
  rules,
  validateTrigger = 'onSubmit',
  ...props
}) {
  const form = useFormInstance()
  const formState = useFormState()
  const listPath = useRelativePath(name, { isAbsolutePath })
  const listPathStr = listPath.join('$NEKOJOIN$')
  const [value, setValue] = React.useState(form.getFieldValue(listPath))
  const [error, setError] = React.useState(form.getError(listPath))

  // Register rules with the form
  React.useEffect(() => {
    return form.registerRules(listPath, rules, validateTrigger)
  }, [listPathStr, JSON.stringify(rules), validateTrigger])

  // Listen for value changes
  React.useEffect(() => {
    return form.registerListener(listPath, (val) => setValue(val))
  }, [listPathStr])

  // Listen for error changes
  React.useEffect(() => {
    return form.registerErrorListener(listPath, (err) => setError(err))
  }, [listPathStr])

  const handleChange = (e) => {
    const val = e?.target?.value ?? e
    form.setFieldValue(listPath, val)

    if (shouldValidateOn('onChange', rules, validateTrigger)) {
      form.validateField(listPath, 'onChange')
    }
  }

  const handleBlur = (e, originalOnBlur) => {
    if (originalOnBlur) originalOnBlur(e)

    if (shouldValidateOn('onBlur', rules, validateTrigger)) {
      form.validateField(listPath, 'onBlur')
    }
  }

  let valueKey = 'value'
  if (!!useDefaultValue) valueKey = 'defaultValue'

  const child = typeof children === 'function' ? null : React.Children.only(children)
  const originalOnBlur = child?.props?.onBlur

  const childProps = clearProps({
    [valueKey]: value === undefined ? '' : value,
    onChange: handleChange,
    onBlur: (e) => handleBlur(e, originalOnBlur),
    disabled: formState?.disabled === true || undefined,
    error: !!error || undefined,
  })

  let content
  if (typeof children === 'function') {
    content = children(childProps)
  } else {
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
