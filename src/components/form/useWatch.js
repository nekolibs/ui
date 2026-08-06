import React from 'react'
import { useFormInstance } from './Form'

// deep=false (default): re-render only when this exact path changes. deep=true: also
// re-render when any nested path under `name` changes — use when watching a whole object
// (e.g. useWatch('config', { deep: true })).
export function useWatch(name, { form, deep = false } = {}) {
  const contextForm = useFormInstance()
  form = form || contextForm
  const [value, setValue] = React.useState(() => form?.getFieldValue(name))

  React.useEffect(() => {
    if (!form) {
      console.error('No form provided to useWatch. Pass it as params or wrap it inside a <Form> component.')
      return
    }

    setValue(form.getFieldValue(name))

    const unsubscribe = form.registerListener(
      name,
      (newValue) => {
        setValue(newValue)
      },
      { deep }
    )

    return unsubscribe
  }, [form, name, deep])

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
          const unsub = form.registerListener(
            field,
            () => {
              setValues({ ...form.valuesRef.current })
            },
            { deep: true }
          )
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
