import React, { useState, useCallback } from 'react'

import { BottomDrawer } from '../../modals/bottomDrawer'
import { Icon } from '../../presentation/Icon'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { compressAssets } from '../../../helpers/compress'
import { persistFile } from '../../../helpers/files'
import { pickFromCamera, pickFromLibrary } from '../../../helpers/pickAssets'
import { useUploadState } from './useUploadState'

let DocumentPicker
try {
  DocumentPicker = require('expo-document-picker')
} catch {}

function acceptsImages(accept) {
  if (!accept) return true
  return accept.includes('image/') || accept.includes('image/*')
}

function needsFilePicker(accept) {
  if (!accept) return true
  const parts = accept.split(',').map((s) => s.trim())
  return parts.some((p) => !p.startsWith('image/'))
}

function normalizeDocumentResult(doc) {
  return {
    uri: doc.uri,
    name: doc.name,
    type: doc.mimeType || doc.type,
    size: doc.size,
  }
}

function getMediaTypes(accept) {
  if (!accept) return undefined
  if (accept.includes('video/') && !accept.includes('image/')) return ['videos']
  if (accept.includes('image/') && !accept.includes('video/')) return ['images']
  if (accept.includes('video/') && accept.includes('image/')) return ['images', 'videos']
  return undefined
}

export function Upload({ children, onChange, onUpload, value: valueProp, accept, multiple = false, maxCount, disabled = false, onAddPress, persistTo, saveToLibrary, compress = true, ...props }) {
  const { value, addFiles, remove } = useUploadState({ onUpload, onChange, multiple, maxCount, value: valueProp })
  const [open, setOpen] = useState(false)

  const commitFiles = useCallback(
    async (assets) => {
      const compressOpts = typeof compress === 'object' ? compress : {}
      const processed = compress !== false ? await compressAssets(assets, compressOpts) : assets
      if (persistTo && !onUpload) {
        addFiles(processed.map((a) => ({ ...a, uri: persistFile(a.uri, persistTo, { name: a.name }) })))
      } else {
        addFiles(processed)
      }
    },
    [compress, persistTo, onUpload, addFiles]
  )

  const handlePress = useCallback(() => {
    if (disabled) return
    const open = () => setOpen(true)
    if (onAddPress) return onAddPress(open)
    open()
  }, [disabled, onAddPress])

  // NOTE: keep the drawer OPEN while presenting the native picker, and close it
  // only after the picker returns. The drawer is a RN <Modal>; closing it first
  // makes the picker present from a modal that's mid-dismiss (and then unmounts
  // under the picker) -> iOS present/dismiss collision that freezes the screen on
  // the second open. Closing in `finally` avoids any concurrent modal transition.
  const handleCamera = useCallback(async () => {
    try {
      const result = await pickFromCamera({
        multiple, maxCount, compress, saveToLibrary,
        mediaTypes: getMediaTypes(accept),
        persistTo: !onUpload ? persistTo : undefined,
      })
      if (multiple ? !result.length : !result) return
      addFiles(multiple ? result : [result])
    } finally {
      setOpen(false)
    }
  }, [multiple, maxCount, accept, compress, saveToLibrary, onUpload, persistTo, addFiles])

  const handleLibrary = useCallback(async () => {
    try {
      const result = await pickFromLibrary({
        multiple, maxCount, compress,
        mediaTypes: getMediaTypes(accept),
        persistTo: !onUpload ? persistTo : undefined,
      })
      if (multiple ? !result.length : !result) return
      addFiles(multiple ? result : [result])
    } finally {
      setOpen(false)
    }
  }, [multiple, maxCount, accept, compress, onUpload, persistTo, addFiles])

  const handleFiles = useCallback(async () => {
    if (!DocumentPicker) return setOpen(false)
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple,
        type: accept || '*/*',
      })
      if (result.canceled) return
      commitFiles(result.assets.map(normalizeDocumentResult))
    } finally {
      setOpen(false)
    }
  }, [multiple, accept, commitFiles])

  const showCamera = acceptsImages(accept)
  const showLibrary = acceptsImages(accept)
  const showFiles = needsFilePicker(accept)

  const isRenderFn = typeof children === 'function'

  return (
    <>
      {isRenderFn ? (
        <View {...props}>
          {children({ value, remove, isDragging: false, open: handlePress })}
        </View>
      ) : (
        <Link onPress={handlePress} disabled={disabled} {...props}>
          {children}
        </Link>
      )}
      <BottomDrawer open={open} onClose={() => setOpen(false)} snapPoints={[200]}>
        <View padding="md" gap="xs">
          {showCamera && (
            <Link onPress={handleCamera}>
              <View row gap="md" padding="sm" centerV>
                <Icon name="camera-line" />
                <Text>Camera</Text>
              </View>
            </Link>
          )}
          {showLibrary && (
            <Link onPress={handleLibrary}>
              <View row gap="md" padding="sm" centerV>
                <Icon name="image-line" />
                <Text>Photo Library</Text>
              </View>
            </Link>
          )}
          {showFiles && (
            <Link onPress={handleFiles}>
              <View row gap="md" padding="sm" centerV>
                <Icon name="file-line" />
                <Text>Files</Text>
              </View>
            </Link>
          )}
        </View>
      </BottomDrawer>
    </>
  )
}
