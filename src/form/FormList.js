import React from 'react'

import { FormGroup, useRelativePath } from './FormGroup'
import { Text } from '../text/Text'
import { useFormInstance } from './Form'

const FormListContext = React.createContext(null)
const useFormList = () => React.useContext(FormListContext)

export function FormList({ name, relative, children }) {
  const form = useFormInstance()
  const listPath = useRelativePath(name, { relative })
  // To avoid watch being recalled
  const listPathStr = listPath.join('$NEKOJOIN$')
  const error = form.getError(listPath)

  const [fields, setFields] = React.useState(() => {
    const initial = form.getFieldValue(listPath) || []
    return initial.map((_, index) => ({ key: index, name: index }))
  })

  React.useEffect(() => {
    return form.registerListener(listPath, (val) => {
      if (Array.isArray(val)) {
        setFields(val.map((_, index) => ({ key: index, name: index })))
      }
    })
  }, [listPathStr])

  const add = (defaultValue = {}) => {
    const current = form.getFieldValue(listPath) || []
    form.setFieldValue(listPath, [...current, defaultValue])
  }

  const addOn = (index, defaultValue = {}) => {
    const current = form.getFieldValue(listPath) || []
    form.setFieldValue(listPath, [...current.slice(0, index), defaultValue, ...current.slice(index)])
  }

  const replace = (index, value) => {
    const current = form.getFieldValue(listPath) || []
    form.setFieldValue(
      listPath,
      current.map((item, i) => (i === index ? value : item))
    )
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
  }

  const actions = React.useMemo(
    () => ({
      add,
      addOn,
      replace,
      remove,
      move,
    }),
    [listPathStr]
  )

  return (
    <FormGroup name={listPath}>
      <FormListContext.Provider value={actions}>
        {typeof children === 'function'
          ? children(fields, actions)
          : React.cloneElement(React.Children.only(children), { fields, ...actions })}
        {error && <Text color="red">{error}</Text>}
      </FormListContext.Provider>
    </FormGroup>
  )
}
