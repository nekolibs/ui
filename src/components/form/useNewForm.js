import { assocPath, path } from 'ramda'
import React from 'react'
import { validateRules, validateAllFields, normalizeRules } from './validation'

export function useNewForm({ initialValues = {}, validate, onSubmit } = {}) {
  const valuesRef = React.useRef({ ...initialValues })
  const errorsRef = React.useRef({}) // Flat structure: { 'users': 'error', 'users.0.name': 'error' }
  const listenersRef = React.useRef({})
  const errorListenersRef = React.useRef({})
  const rulesRegistryRef = React.useRef(new Map())

  const formApi = React.useMemo(() => {
    const toKey = (name) => (Array.isArray(name) ? name.join('.') : name)

    const notify = (name) => {
      const key = toKey(name)
      if (listenersRef.current[key]) {
        listenersRef.current[key].forEach((cb) => cb(path(name, valuesRef.current)))
      }
    }

    const notifyError = (name) => {
      const key = toKey(name)
      if (errorListenersRef.current[key]) {
        errorListenersRef.current[key].forEach((cb) => cb(errorsRef.current[key]))
      }
    }

    const setFieldValue = (name, value) => {
      valuesRef.current = assocPath(name, value, valuesRef.current)
      notify(name)
    }

    const getFieldValue = (name) => path(name, valuesRef.current)

    // Flat error lookup by key
    const getError = (name) => {
      const key = toKey(name)
      return errorsRef.current[key]
    }

    const setError = (name, error) => {
      const key = toKey(name)
      if (error) {
        errorsRef.current[key] = error
      } else {
        delete errorsRef.current[key]
      }
      notifyError(name)
    }

    const clearErrors = () => {
      errorsRef.current = {}
    }

    const registerListener = (name, cb) => {
      const key = toKey(name)
      if (!listenersRef.current[key]) {
        listenersRef.current[key] = []
      }
      listenersRef.current[key].push(cb)
      return () => {
        listenersRef.current[key] = listenersRef.current[key].filter((fn) => fn !== cb)
      }
    }

    const registerErrorListener = (name, cb) => {
      const key = toKey(name)
      if (!errorListenersRef.current[key]) {
        errorListenersRef.current[key] = []
      }
      errorListenersRef.current[key].push(cb)
      return () => {
        errorListenersRef.current[key] = errorListenersRef.current[key].filter((fn) => fn !== cb)
      }
    }

    const registerRules = (name, rules, defaultTrigger = 'onSubmit') => {
      if (!rules) return
      const key = toKey(name)
      const rulesArray = normalizeRules(rules).map((rule) => ({
        ...rule,
        trigger: rule.trigger || defaultTrigger,
      }))
      rulesRegistryRef.current.set(key, { path: name, rules: rulesArray })
      return () => rulesRegistryRef.current.delete(key)
    }

    const validateField = async (name, trigger = 'onSubmit') => {
      const key = toKey(name)
      const entry = rulesRegistryRef.current.get(key)
      if (!entry) return null

      const value = path(name, valuesRef.current)
      const error = await validateRules(value, entry.rules, trigger)

      if (error) {
        errorsRef.current[key] = error
      } else {
        delete errorsRef.current[key]
      }
      notifyError(name)
      return error
    }

    const validateForm = async () => {
      // Clear previous errors
      errorsRef.current = {}

      // Run rules-based validation
      const rulesErrors = await validateAllFields(valuesRef.current, rulesRegistryRef.current)

      // Run legacy validate function if provided
      const legacyErrors = validate ? validate(valuesRef.current) || {} : {}

      // Store errors in flat structure
      Object.entries(rulesErrors).forEach(([key, error]) => {
        errorsRef.current[key] = error
      })

      // Legacy errors are already flat (or should be converted)
      Object.entries(legacyErrors).forEach(([key, error]) => {
        if (!errorsRef.current[key]) {
          errorsRef.current[key] = error
        }
      })

      // Notify all error listeners
      rulesRegistryRef.current.forEach((_, key) => {
        notifyError(key)
      })

      return Object.keys(errorsRef.current).length === 0
    }

    const handleSubmit = async () => {
      const isValid = await validateForm()
      if (!isValid) return
      console.log('SUBMIT')
      onSubmit(valuesRef.current)
    }

    return {
      setFieldValue,
      getFieldValue,
      getError,
      setError,
      clearErrors,
      registerListener,
      registerErrorListener,
      registerRules,
      validateField,
      handleSubmit,
      valuesRef,
    }
  }, [validate, onSubmit])

  return formApi
}
