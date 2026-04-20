import React, { useRef, useState, useCallback } from 'react'

import { View } from '../../structure/View'
import { useUploadState } from './useUploadState'

function normalizeFile(file) {
  return {
    uri: URL.createObjectURL(file),
    name: file.name,
    type: file.type,
    size: file.size,
    file,
  }
}

export function Upload({ children, onChange, onUpload, value: valueProp, accept, multiple = false, maxCount, disabled = false, dnd = true, ...props }) {
  const { value, addFiles, remove } = useUploadState({ onUpload, onChange, multiple, maxCount, value: valueProp })
  const inputRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const dragCounter = useRef(0)

  const handleClick = useCallback(() => {
    if (disabled) return
    inputRef.current?.click()
  }, [disabled])

  const handleInputChange = useCallback(
    (e) => {
      const files = e.target.files
      if (!files?.length) return
      addFiles(Array.from(files).map(normalizeFile))
      e.target.value = ''
    },
    [addFiles]
  )

  const handleDragEnter = useCallback(
    (e) => {
      if (!dnd || disabled) return
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current++
      if (dragCounter.current === 1) setIsDragging(true)
    },
    [dnd, disabled]
  )

  const handleDragOver = useCallback(
    (e) => {
      if (!dnd || disabled) return
      e.preventDefault()
      e.stopPropagation()
    },
    [dnd, disabled]
  )

  const handleDragLeave = useCallback(
    (e) => {
      if (!dnd || disabled) return
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current--
      if (dragCounter.current === 0) setIsDragging(false)
    },
    [dnd, disabled]
  )

  const handleDrop = useCallback(
    (e) => {
      if (!dnd || disabled) return
      e.preventDefault()
      e.stopPropagation()
      dragCounter.current = 0
      setIsDragging(false)
      const files = e.dataTransfer?.files
      if (!files?.length) return
      addFiles(Array.from(files).map(normalizeFile))
    },
    [dnd, disabled, addFiles]
  )

  const dndHandlers = dnd
    ? {
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
      }
    : {}

  const isRenderFn = typeof children === 'function'

  return (
    <View onPress={!isRenderFn && !disabled ? handleClick : undefined} pointer={!isRenderFn && !disabled} {...dndHandlers} {...props}>
      {isRenderFn ? children({ value, remove, isDragging, open: handleClick }) : children}
      <input ref={inputRef} type="file" style={{ display: 'none' }} accept={accept} multiple={multiple} onChange={handleInputChange} />
    </View>
  )
}
