import React, { useState, useCallback } from 'react'

import { BottomDrawer } from '../../modals/bottomDrawer'
import { Icon } from '../../presentation/Icon'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { useUploadState } from './useUploadState'

let ImagePicker
try {
  ImagePicker = require('expo-image-picker')
} catch {}

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

function normalizeImageResult(asset) {
  return {
    uri: asset.uri,
    name: asset.fileName || asset.uri.split('/').pop(),
    type: asset.mimeType || asset.type || 'image/jpeg',
    size: asset.fileSize || asset.filesize,
    width: asset.width,
    height: asset.height,
  }
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

export function Upload({ children, onChange, onUpload, value: valueProp, accept, multiple = false, maxCount, disabled = false, ...props }) {
  const { value, addFiles, remove } = useUploadState({ onUpload, onChange, multiple, maxCount, value: valueProp })
  const [open, setOpen] = useState(false)

  const handlePress = useCallback(() => {
    if (disabled) return
    setOpen(true)
  }, [disabled])

  const handleCamera = useCallback(async () => {
    setOpen(false)
    if (!ImagePicker) return
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if (!permission.granted) return
    const result = await ImagePicker.launchCameraAsync({
      allowsMultipleSelection: multiple,
      selectionLimit: maxCount || 0,
      mediaTypes: getMediaTypes(accept),
    })
    if (result.canceled) return
    addFiles(result.assets.map(normalizeImageResult))
  }, [multiple, maxCount, accept, addFiles])

  const handleLibrary = useCallback(async () => {
    setOpen(false)
    if (!ImagePicker) return
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) return
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: multiple,
      selectionLimit: maxCount || 0,
      mediaTypes: getMediaTypes(accept),
    })
    if (result.canceled) return
    addFiles(result.assets.map(normalizeImageResult))
  }, [multiple, maxCount, accept, addFiles])

  const handleFiles = useCallback(async () => {
    setOpen(false)
    if (!DocumentPicker) return
    const result = await DocumentPicker.getDocumentAsync({
      multiple,
      type: accept || '*/*',
    })
    if (result.canceled) return
    addFiles(result.assets.map(normalizeDocumentResult))
  }, [multiple, accept, addFiles])

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
