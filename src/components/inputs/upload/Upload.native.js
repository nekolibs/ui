import React, { useState, useCallback } from 'react'

import { BottomDrawer } from '../../modals/bottomDrawer'
import { Icon } from '../../presentation/Icon'
import { Link } from '../../actions/Link'
import { Text } from '../../text/Text'
import { View } from '../../structure/View'
import { persistFile } from '../../../helpers/files'
import { openCamera, openLibrary } from '../../../helpers/media'
import { useUploadState } from './useUploadState'

let DocumentPicker
try {
  DocumentPicker = require('expo-document-picker')
} catch {}

let MediaLibrary
try {
  MediaLibrary = require('expo-media-library')
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

// Saves captured photos to the device Photos library (WhatsApp-style). Only used
// for camera captures — library picks are already in Photos. Opt-in via the
// `saveToLibrary` prop; no-op if expo-media-library isn't installed.
async function saveAssetsToLibrary(assets) {
  if (!MediaLibrary || !assets?.length) return
  try {
    const perm = await MediaLibrary.requestPermissionsAsync(true) // write-only
    if (!perm.granted) return
    for (const a of assets) {
      try {
        await MediaLibrary.saveToLibraryAsync(a.uri)
      } catch (e) {
        console.warn('[UploadInput] saveToLibrary failed:', e?.message)
      }
    }
  } catch (e) {
    console.warn('[UploadInput] saveToLibrary permission error:', e?.message)
  }
}

export function Upload({ children, onChange, onUpload, value: valueProp, accept, multiple = false, maxCount, disabled = false, persistTo, saveToLibrary, ...props }) {
  const { value, addFiles, remove } = useUploadState({ onUpload, onChange, multiple, maxCount, value: valueProp })
  const [open, setOpen] = useState(false)

  // Persist picked files locally (durable uri) when `persistTo` is set and
  // there's no server upload. Otherwise hand the temp/picked assets straight to
  // the upload state (uploaded by onUpload, or kept as-is).
  const commit = useCallback(
    (assets) => {
      if (persistTo && !onUpload) {
        addFiles(assets.map((a) => ({ ...a, uri: persistFile(a.uri, persistTo, { name: a.name }) })))
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
    try {
      const assets = await openCamera({ allowsMultipleSelection: multiple, selectionLimit: maxCount || 0, mediaTypes: getMediaTypes(accept) })
      if (!assets.length) return
      if (saveToLibrary) await saveAssetsToLibrary(assets)
      commit(assets)
    } finally {
      setOpen(false)
    }
  }, [multiple, maxCount, accept, commit, saveToLibrary])

  const handleLibrary = useCallback(async () => {
    try {
      const assets = await openLibrary({ allowsMultipleSelection: multiple, selectionLimit: maxCount || 0, mediaTypes: getMediaTypes(accept) })
      if (!assets.length) return
      commit(assets)
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
