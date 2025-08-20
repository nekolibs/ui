import React from 'react'
import { useFormInstance } from './Form'

export function useWatch(name, { form } = {}) {
  const contextForm = useFormInstance()
  form = form || contextForm
  const [value, setValue] = React.useState(() => form?.getFieldValue(name))

  React.useEffect(() => {
    if (!form) {
      console.error('No form provided to useWatch. Pass it as params or wrap it inside a <Form> component.')
      return
    }

    setValue(form.getFieldValue(name))

    const unsubscribe = form.registerListener(name, (newValue) => {
      setValue(newValue)
    })

    return unsubscribe
  }, [form, name])

  return value
}

export function useWatchAll(form) {
  const contextForm = useFormInstance()
  form = form || contextForm
  const [values, setValues] = React.useState(() => form?.valuesRef.current || {})
  const watchedFieldsRef = React.useRef(new Set())

  React.useEffect(() => {
    if (!form) return

    setValues({ ...form.valuesRef.current })

    const checkForNewFields = () => {
      const currentFields = Object.keys(form.valuesRef.current)
      const unsubscribers = []

      currentFields.forEach((field) => {
        if (!watchedFieldsRef.current.has(field)) {
          watchedFieldsRef.current.add(field)
          const unsub = form.registerListener(field, () => {
            setValues({ ...form.valuesRef.current })
          })
          unsubscribers.push(unsub)
        }
      })

      return unsubscribers
    }

    const unsubscribers = checkForNewFields()

    const interval = setInterval(() => {
      const newUnsubs = checkForNewFields()
      unsubscribers.push(...newUnsubs)
    }, 100)

    return () => {
      clearInterval(interval)
      unsubscribers.forEach((unsub) => unsub())
      watchedFieldsRef.current.clear()
    }
  }, [form])

  return values
}
