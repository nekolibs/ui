import React from 'react'

import { AbsStorage } from '../abstractions/helpers/storage'

function set(key, value) {
  return AbsStorage.set(key, JSON.stringify(value))
}

function setAsync(key, value) {
  return AbsStorage.setAsync(key, JSON.stringify(value))
}

function get(key, defaultValue) {
  const value = AbsStorage.get(key)
  return formatStoragedValue(value) || defaultValue
}

function getAsync(key, defaultValue) {
  return AbsStorage.getAsync(key).then((value) => {
    return formatStoragedValue(value) || defaultValue
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
  const [value, setValue] = React.useState(get(key) || defaultValue)

  const handleChange = (newValue) => {
    set(key, newValue)
    setValue(newValue)
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
