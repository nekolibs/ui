import React from 'react'

import { AbsStorage } from '../abstractions/helpers/storage'

// Pub/Sub listener registry for cross-component sync
const listeners = {}

function notify(key, value) {
  if (listeners[key]) {
    listeners[key].forEach((cb) => cb(value))
  }
}

function subscribe(key, cb) {
  if (!listeners[key]) listeners[key] = []
  listeners[key].push(cb)
  return () => {
    listeners[key] = listeners[key].filter((fn) => fn !== cb)
  }
}

function set(key, value) {
  AbsStorage.set(key, JSON.stringify(value))
  notify(key, value)
}

function setAsync(key, value) {
  return AbsStorage.setAsync(key, JSON.stringify(value)).then(() => {
    notify(key, value)
  })
}

function get(key, defaultValue) {
  const value = AbsStorage.get(key)
  return formatStoragedValue(value) ?? defaultValue
}

function getAsync(key, defaultValue) {
  return AbsStorage.getAsync(key).then((value) => {
    return formatStoragedValue(value) ?? defaultValue
  })
}

function formatStoragedValue(value) {
  try {
    if (!value) return value
    value = JSON.parse(value)
    if (value === 'undefined') return undefined
    if (value === 'null') return undefined
    return value
  } catch (e) {
    return value
  }
}

function useState(key, defaultValue) {
  const [value, setValue] = React.useState(() => get(key) ?? defaultValue)

  React.useEffect(() => {
    return subscribe(key, setValue)
  }, [key])

  const handleChange = (newValue) => {
    set(key, newValue)
  }

  return [value, handleChange]
}

export const Storage = {
  ...AbsStorage,
  set,
  setAsync,
  get,
  getAsync,
  useState,
}
