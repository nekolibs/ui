import React from 'react'

import { FormGroup, useRelativePath } from './FormGroup'
import { Text } from '../text/Text'
import { useFormInstance } from './Form'
import { shouldValidateOn } from './validation'

const FormListContext = React.createContext(null)
const useFormList = () => React.useContext(FormListContext)

export function FormList({ name, isAbsolutePath, children, rules, validateTrigger = 'onSubmit' }) {
  const form = useFormInstance()
  const listPath = useRelativePath(name, { isAbsolutePath })
  const listPathStr = listPath.join('$NEKOJOIN$')
  const [error, setError] = React.useState(form.getError(listPath))

  // Counter to generate unique keys
  const keyCounter = React.useRef(0)
  // Map to track keys by value reference
  const keysMap = React.useRef(new WeakMap())

  // Register rules with the form
  React.useEffect(() => {
    return form.registerRules(listPath, rules, validateTrigger)
  }, [listPathStr, JSON.stringify(rules), validateTrigger])

  // Listen for error changes
  React.useEffect(() => {
    return form.registerErrorListener(listPath, (err) => setError(err))
  }, [listPathStr])

  const generateFields = (items) => {
    if (!Array.isArray(items)) return []
    return items.map((item, index) => {
      let key
      if (typeof item === 'object' && item !== null) {
        key = keysMap.current.get(item)
        if (!key) {
          key = `field_${keyCounter.current++}`
          keysMap.current.set(item, key)
        }
      } else {
        key = `field_${keyCounter.current++}`
      }
      return { key, name: index }
    })
  }

  const [fields, setFields] = React.useState(() => {
    const initial = form.getFieldValue(listPath) || []
    return generateFields(initial)
  })

  React.useEffect(() => {
    return form.registerListener(listPath, (val) => {
      setFields(generateFields(val))
    })
  }, [listPathStr])

  const validateOnChange = () => {
    if (shouldValidateOn('onChange', rules, validateTrigger)) {
      form.validateField(listPath, 'onChange')
    }
  }

  const add = (defaultValue = {}) => {
    const current = form.getFieldValue(listPath) || []
    form.setFieldValue(listPath, [...current, defaultValue])
    validateOnChange()
  }

  const addOn = (index, defaultValue = {}) => {
    const current = form.getFieldValue(listPath) || []
    form.setFieldValue(listPath, [...current.slice(0, index), defaultValue, ...current.slice(index)])
    validateOnChange()
  }

  const replace = (index, value) => {
    const current = form.getFieldValue(listPath) || []
    form.setFieldValue(
      listPath,
      current.map((item, i) => (i === index ? value : item))
    )
  }

  const duplicate = (index) => {
    const current = form.getFieldValue(listPath) || []
    const value = current[index]
    if (!value) return
    // Deep clone the value to avoid reference issues
    const clonedValue = typeof value === 'object' ? { ...value } : value
    addOn(index + 1, clonedValue)
  }

  const move = (fromIndex, toIndex) => {
    const current = form.getFieldValue(listPath) || []
    if (fromIndex < 0 || fromIndex >= current.length) return
    if (toIndex < 0 || toIndex >= current.length) return
    const item = current[fromIndex]
    const updated = [...current]
    updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, item)
    form.setFieldValue(listPath, updated)
  }

  const remove = (index) => {
    const current = form.getFieldValue(listPath) || []
    form.setFieldValue(
      listPath,
      current.filter((_, i) => i !== index)
    )
    validateOnChange()
  }

  const actions = React.useMemo(
    () => ({
      add,
      addOn,
      replace,
      remove,
      move,
      duplicate,
    }),
    [listPathStr, rules, validateTrigger]
  )

  let content
  if (typeof children === 'function') {
    content = children(fields, actions)
  } else {
    const child = React.Children.only(children)
    content = React.cloneElement(child, { ...child.props, fields, ...actions })
  }

  return (
    <FormGroup name={listPath}>
      <FormListContext.Provider value={actions}>
        {content}
        {error && <Text color="red">{error}</Text>}
      </FormListContext.Provider>
    </FormGroup>
  )
}
