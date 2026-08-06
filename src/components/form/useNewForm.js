import { assocPath, path } from 'ramda'
import React from 'react'
import { validateRules, validateAllFields, normalizeRules } from './validation'

export function useNewForm({ initialValues = {}, validate, onSubmit, onValuesChange } = {}) {
  const valuesRef = React.useRef({ ...initialValues })
  const initialValuesRef = React.useRef({ ...initialValues })
  const errorsRef = React.useRef({}) // Flat structure: { 'users': 'error', 'users.0.name': 'error' }
  const touchedRef = React.useRef(new Set())
  const dirtyRef = React.useRef(new Set())
  const listenersRef = React.useRef({})
  const errorListenersRef = React.useRef({})
  const rulesRegistryRef = React.useRef(new Map())
  const callbacksRef = React.useRef({ onSubmit, validate, onValuesChange })

  callbacksRef.current = { onSubmit, validate, onValuesChange }

  const formApi = React.useMemo(() => {
    const toKey = (name) => (Array.isArray(name) ? name.join('.') : name)
    const toPath = (name) => (Array.isArray(name) ? name : [name])

    // Notify the exact field always; notify an ANCESTOR path only for listeners that
    // opted into deep watching (registerListener(..., { deep: true })). This keeps a
    // shallow parent watcher (the default) from firing on every nested keystroke — e.g.
    // FormList watching 'config.options' must not re-render when 'config.options.0.label'
    // changes, or the edited row remounts and the input loses focus. Deep watchers (e.g.
    // a preview reading the whole 'config' object) still fire on nested changes.
    const notify = (name) => {
      const parts = Array.isArray(name) ? name : String(name).split('.')
      for (let i = parts.length; i >= 1; i--) {
        const subPath = parts.slice(0, i)
        const key = subPath.join('.')
        const isExact = i === parts.length
        listenersRef.current[key]?.forEach((entry) => {
          if (isExact || entry.deep) entry.cb(path(subPath, valuesRef.current))
        })
      }
    }

    const notifyAll = () => {
      Object.keys(listenersRef.current).forEach((key) => {
        const keyPath = key.split('.')
        const value = path(keyPath, valuesRef.current)
        listenersRef.current[key]?.forEach((entry) => entry.cb(value))
      })
    }

    const notifyError = (name) => {
      const key = toKey(name)
      if (errorListenersRef.current[key]) {
        errorListenersRef.current[key].forEach((cb) => cb(errorsRef.current[key]))
      }
    }

    const notifyAllErrors = () => {
      Object.keys(errorListenersRef.current).forEach((key) => {
        errorListenersRef.current[key]?.forEach((cb) => cb(errorsRef.current[key]))
      })
    }

    const markTouched = (name) => {
      touchedRef.current.add(toKey(name))
    }

    const updateDirty = (name) => {
      const key = toKey(name)
      const current = path(toPath(name), valuesRef.current)
      const initial = path(toPath(name), initialValuesRef.current)
      if (current === initial) {
        dirtyRef.current.delete(key)
      } else {
        dirtyRef.current.add(key)
      }
    }

    const isTouched = (name) => {
      if (!name) return touchedRef.current.size > 0
      if (Array.isArray(name)) return name.some((n) => touchedRef.current.has(toKey(n)))
      return touchedRef.current.has(toKey(name))
    }

    const isDirty = (name) => {
      if (!name) return dirtyRef.current.size > 0
      if (Array.isArray(name)) return name.some((n) => dirtyRef.current.has(toKey(n)))
      return dirtyRef.current.has(toKey(name))
    }

    const getTouchedFields = () => [...touchedRef.current]
    const getDirtyFields = () => [...dirtyRef.current]

    const setFieldValue = (name, value) => {
      valuesRef.current = assocPath(toPath(name), value, valuesRef.current)
      updateDirty(name)
      notify(name)
      const fn = callbacksRef.current.onValuesChange
      if (fn) fn(name, valuesRef.current)
    }

    const getFieldValue = (name) => path(toPath(name), valuesRef.current)

    const getFieldsValue = () => ({ ...valuesRef.current })

    const setFieldsValue = (obj) => {
      if (!obj) return
      Object.entries(obj).forEach(([key, value]) => {
        valuesRef.current = assocPath(toPath(key), value, valuesRef.current)
      })
      notifyAll()
      const fn = callbacksRef.current.onValuesChange
      if (fn) fn(null, valuesRef.current)
    }

    const resetFields = () => {
      valuesRef.current = { ...initialValuesRef.current }
      errorsRef.current = {}
      touchedRef.current.clear()
      dirtyRef.current.clear()
      notifyAll()
      notifyAllErrors()
    }

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

    // deep=false (default): fire only when this exact path changes. deep=true: also fire
    // when any descendant path changes (watching a whole object subtree).
    const registerListener = (name, cb, { deep = false } = {}) => {
      const key = toKey(name)
      if (!listenersRef.current[key]) {
        listenersRef.current[key] = []
      }
      const entry = { cb, deep }
      listenersRef.current[key].push(entry)
      return () => {
        listenersRef.current[key] = listenersRef.current[key].filter((e) => e !== entry)
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
      const { validate } = callbacksRef.current
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

    const validateFields = async () => {
      const isValid = await validateForm()
      if (!isValid) return Promise.reject(errorsRef.current)
      return { ...valuesRef.current }
    }

    const handleSubmit = async () => {
      const isValid = await validateForm()
      if (!isValid) return
      const { onSubmit } = callbacksRef.current
      if (onSubmit) onSubmit({ ...valuesRef.current })
    }

    return {
      setFieldValue,
      getFieldValue,
      getFieldsValue,
      setFieldsValue,
      resetFields,
      getError,
      setError,
      clearErrors,
      markTouched,
      isTouched,
      isDirty,
      getTouchedFields,
      getDirtyFields,
      registerListener,
      registerErrorListener,
      registerRules,
      validateField,
      validateFields,
      handleSubmit,
      valuesRef,
      _callbacksRef: callbacksRef,
    }
  }, [])

  return formApi
}
