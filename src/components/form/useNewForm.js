import { assocPath, path } from 'ramda'
import React from 'react'

export function useNewForm({ initialValues = {}, validate, onSubmit } = {}) {
  const valuesRef = React.useRef({ ...initialValues })
  const errorsRef = React.useRef({})
  const listenersRef = React.useRef({})

  const formApi = React.useMemo(() => {
    const notify = (name) => {
      const key = Array.isArray(name) ? name.join('.') : name
      if (listenersRef.current[key]) {
        listenersRef.current[key].forEach((cb) => cb(path(name, valuesRef.current)))
      }
    }

    const setFieldValue = (name, value) => {
      valuesRef.current = assocPath(name, value, valuesRef.current)
      notify(name)
    }

    const getFieldValue = (name) => path(name, valuesRef.current)

    const getError = (name) => path(name, errorsRef.current)

    const setError = (name, error) => {
      errorsRef.current = assocPath(name, error, errorsRef.current)
    }

    const registerListener = (name, cb) => {
      const key = Array.isArray(name) ? name.join('.') : name
      if (!listenersRef.current[key]) {
        listenersRef.current[key] = []
      }
      listenersRef.current[key].push(cb)
      return () => {
        listenersRef.current[key] = listenersRef.current[key].filter((fn) => fn !== cb)
      }
    }

    const validateForm = () => {
      if (!validate) return true
      const newErrors = validate(valuesRef.current) || {}
      errorsRef.current = newErrors
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
      const isValid = validateForm()
      if (!isValid) return
      console.log('SUBMIT')
      onSubmit(valuesRef.current)
    }

    return {
      setFieldValue,
      getFieldValue,
      getError,
      setError,
      registerListener,
      handleSubmit,
      valuesRef,
    }
  }, [validate, onSubmit])

  return formApi
}
