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

let FS
try {
  FS = require('expo-file-system')
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

// `persistTo="<base>/<subdir>"`, base is 'document' | 'cache'. Resolves to a
// permanent Directory using the modern (sync) expo-file-system API.
function resolveDir(persistTo) {
  const [base, ...rest] = persistTo.split('/').filter(Boolean)
  if (base !== 'cache' && base !== 'document') {
    console.warn(`[UploadInput] persistTo base "${base}" unknown — using document dir. Use "document" or "cache".`)
  }
  const root = base === 'cache' ? FS.Paths.cache : FS.Paths.document
  const dir = new FS.Directory(root, ...rest)
  try {
    dir.create({ intermediates: true, idempotent: true })
  } catch (e) {
    console.warn('[UploadInput] persistTo dir create failed:', e?.message)
  }
  return dir
}

// Copies a picked asset out of the temp/cache uri into `dir`, returning the
// asset with its uri replaced by the durable path. Expects a `file://` source
// (what expo-image-picker returns on iOS/Android); `content://` sources from the
// document picker can't be copied and fall back to the original uri below.
// Falls back to the original asset if anything goes wrong, so picking never
// hard-fails.
function persistAsset(asset, dir, index = 0) {
  try {
    const ext =
      asset.name?.split('.').pop() || asset.uri?.split('?')[0].split('.').pop() || 'jpg'
    const dest = new FS.File(dir, `${Date.now()}_${index}_${Math.round(Math.random() * 1e6)}.${ext}`)
    new FS.File(asset.uri).copy(dest)
    return { ...asset, uri: dest.uri }
  } catch (e) {
    console.warn('[UploadInput] persistTo failed, keeping temp uri:', e?.message)
    return asset
  }
}

export function Upload({ children, onChange, onUpload, value: valueProp, accept, multiple = false, maxCount, disabled = false, persistTo, ...props }) {
  const { value, addFiles, remove } = useUploadState({ onUpload, onChange, multiple, maxCount, value: valueProp })
  const [open, setOpen] = useState(false)

  // Persist picked files locally (durable uri) when `persistTo` is set and
  // there's no server upload. Otherwise hand the temp/picked assets straight to
  // the upload state (uploaded by onUpload, or kept as-is).
  const commit = useCallback(
    (assets) => {
      if (persistTo && FS && !onUpload) {
        const dir = resolveDir(persistTo)
        addFiles(assets.map((a, i) => persistAsset(a, dir, i)))
      } else {
        addFiles(assets)
      }
    },
    [persistTo, onUpload, addFiles]
  )

  const handlePress = useCallback(() => {
    if (disabled) return
    setOpen(true)
  }, [disabled])

  // NOTE: keep the drawer OPEN while presenting the native picker, and close it
  // only after the picker returns. The drawer is a RN <Modal>; closing it first
  // makes the picker present from a modal that's mid-dismiss (and then unmounts
  // under the picker) -> iOS present/dismiss collision that freezes the screen on
  // the second open. Closing in `finally` avoids any concurrent modal transition.
  const handleCamera = useCallback(async () => {
    if (!ImagePicker) return setOpen(false)
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync()
      if (!permission.granted) return
      const result = await ImagePicker.launchCameraAsync({
        allowsMultipleSelection: multiple,
        selectionLimit: maxCount || 0,
        mediaTypes: getMediaTypes(accept),
      })
      if (result.canceled) return
      commit(result.assets.map(normalizeImageResult))
    } finally {
      setOpen(false)
    }
  }, [multiple, maxCount, accept, commit])

  const handleLibrary = useCallback(async () => {
    if (!ImagePicker) return setOpen(false)
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permission.granted) return
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: multiple,
        selectionLimit: maxCount || 0,
        mediaTypes: getMediaTypes(accept),
      })
      if (result.canceled) return
      commit(result.assets.map(normalizeImageResult))
    } finally {
      setOpen(false)
    }
  }, [multiple, maxCount, accept, commit])

  const handleFiles = useCallback(async () => {
    if (!DocumentPicker) return setOpen(false)
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple,
        type: accept || '*/*',
      })
      if (result.canceled) return
      commit(result.assets.map(normalizeDocumentResult))
    } finally {
      setOpen(false)
    }
  }, [multiple, accept, commit])

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
