import { openCamera, openLibrary } from './media'
import { compressAsset, compressAssets } from './compress'
import { persistFile } from './files'

let MediaLibrary
try {
  MediaLibrary = require('expo-media-library')
} catch {}

async function saveAssetsToLibrary(assets) {
  if (!MediaLibrary || !assets?.length) return
  try {
    const perm = await MediaLibrary.requestPermissionsAsync(true)
    if (!perm.granted) return
    for (const a of assets) {
      try {
        await MediaLibrary.saveToLibraryAsync(a.uri)
      } catch (e) {
        console.warn('[neko-ui pick] saveToLibrary failed:', e?.message)
      }
    }
  } catch (e) {
    console.warn('[neko-ui pick] saveToLibrary permission error:', e?.message)
  }
}

function persistAsset(asset, persistTo) {
  if (!persistTo) return asset
  return { ...asset, uri: persistFile(asset.uri, persistTo, { name: asset.name }) }
}

async function processAssets(assets, { compress = true, persistTo } = {}) {
  let result = assets
  if (compress !== false) {
    const compressOpts = typeof compress === 'object' ? compress : {}
    result = await compressAssets(result, compressOpts)
  }
  if (persistTo) {
    result = result.map((a) => persistAsset(a, persistTo))
  }
  return result
}

export async function pickFromCamera({ multiple = false, maxCount, mediaTypes, persistTo, compress, saveToLibrary } = {}) {
  const assets = await openCamera({
    allowsMultipleSelection: multiple,
    selectionLimit: maxCount || 0,
    mediaTypes,
  })
  if (!assets.length) return multiple ? [] : null
  // Save original (pre-compression) captures to device Photos
  if (saveToLibrary) await saveAssetsToLibrary(assets)
  const result = await processAssets(assets, { compress, persistTo })
  return multiple ? result : result[0]
}

export async function pickFromLibrary({ multiple = false, maxCount, mediaTypes, persistTo, compress } = {}) {
  const assets = await openLibrary({
    allowsMultipleSelection: multiple,
    selectionLimit: maxCount || 0,
    mediaTypes,
  })
  if (!assets.length) return multiple ? [] : null
  const result = await processAssets(assets, { compress, persistTo })
  return multiple ? result : result[0]
}
