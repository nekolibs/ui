import { useState, useRef, useCallback } from 'react'

function toArray(val) {
  if (!val) return []
  return Array.isArray(val) ? val : [val]
}

export function useUploadState({ onUpload, onChange, multiple, maxCount, value: valueProp }) {
  const [inFlight, setInFlight] = useState([])
  const [committed, setCommitted] = useState(null)
  const idRef = useRef(0)
  const genRef = useRef(0)

  const isControlled = valueProp !== undefined
  const externalValue = isControlled ? valueProp : committed
  const externalArray = toArray(externalValue)

  const externalArrayRef = useRef(externalArray)
  externalArrayRef.current = externalArray
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const inFlightRef = useRef(inFlight)
  inFlightRef.current = inFlight

  const value = multiple
    ? [...externalArray, ...inFlight]
    : (inFlight[0] || externalArray[0] || null)

  const addFiles = useCallback(
    (normalizedFiles) => {
      if (!normalizedFiles?.length) return

      if (!onUpload) {
        if (!multiple) {
          const entry = { ...normalizedFiles[0], _id: ++idRef.current }
          if (!isControlled) setCommitted(entry)
          onChangeRef.current?.(entry)
        } else {
          let files = normalizedFiles
          if (maxCount) {
            const available = maxCount - externalArrayRef.current.length
            if (available <= 0) return
            files = files.slice(0, available)
          }
          const entries = files.map((file) => ({ ...file, _id: ++idRef.current }))
          if (!isControlled) {
            setCommitted((prev) => {
              const next = [...toArray(prev), ...entries]
              onChangeRef.current?.(next)
              return next
            })
          } else {
            onChangeRef.current?.([...externalArrayRef.current, ...entries])
          }
        }
        return
      }

      if (!multiple) {
        const gen = ++genRef.current
        const file = normalizedFiles[0]
        const _id = ++idRef.current
        const entry = { ...file, _id, status: 'uploading' }

        setInFlight([entry])

        onUpload(file)
          .then((result) => {
            if (genRef.current !== gen) return
            const done = { ...entry, ...result, status: 'done' }
            setInFlight([])
            if (!isControlled) setCommitted(done)
            onChangeRef.current?.(done)
          })
          .catch((error) => {
            if (genRef.current !== gen) return
            setInFlight((prev) =>
              prev.map((f) => (f._id === _id ? { ...f, status: 'error', error } : f))
            )
          })
        return
      }

      // Multi mode
      let files = normalizedFiles
      if (maxCount) {
        const available = maxCount - externalArrayRef.current.length - inFlightRef.current.length
        if (available <= 0) return
        files = files.slice(0, available)
      }

      const entries = files.map((file) => ({
        ...file,
        _id: ++idRef.current,
        status: 'uploading',
      }))

      setInFlight((prev) => [...prev, ...entries])

      entries.forEach((entry, i) => {
        onUpload(files[i])
          .then((result) => {
            const done = { ...entry, ...result, status: 'done' }
            setInFlight((prev) => prev.filter((f) => f._id !== entry._id))
            if (!isControlled) {
              setCommitted((prev) => {
                const next = [...toArray(prev), done]
                onChangeRef.current?.(next)
                return next
              })
            } else {
              onChangeRef.current?.([...externalArrayRef.current, done])
            }
          })
          .catch((error) => {
            setInFlight((prev) =>
              prev.map((f) => (f._id === entry._id ? { ...f, status: 'error', error } : f))
            )
          })
      })
    },
    [onUpload, multiple, maxCount, isControlled]
  )

  const remove = useCallback(
    (file) => {
      if (!file) return

      setInFlight((prev) => prev.filter((f) => f._id !== file._id))

      const ext = externalArrayRef.current
      if (ext.some((f) => f._id === file._id)) {
        const next = ext.filter((f) => f._id !== file._id)
        const val = multiple ? next : next[0] || null
        if (!isControlled) setCommitted(val)
        onChangeRef.current?.(val)
      }
    },
    [multiple, isControlled]
  )

  return { value, addFiles, remove }
}
