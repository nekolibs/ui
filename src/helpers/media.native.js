let ImagePicker
try {
  ImagePicker = require('expo-image-picker')
} catch {}

// Normalize an expo-image-picker asset into the shape neko-ui works with.
// Internal — callers consume the already-normalized assets from openCamera/openLibrary.
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

// Request camera permission, launch the camera, return normalized assets.
// Returns [] when expo-image-picker is missing, permission is denied, or the user
// cancels. The caller owns post-processing (persist, save-to-library, closing any
// drawer) — and any drawer should stay open until this resolves (iOS present/
// dismiss collision otherwise).
export async function openCamera(options = {}) {
  if (!ImagePicker) return []
  const permission = await ImagePicker.requestCameraPermissionsAsync()
  if (!permission.granted) return []
  const result = await ImagePicker.launchCameraAsync(options)
  if (result.canceled) return []
  return result.assets.map(normalizeImageResult)
}

// Same as openCamera but for the photo library.
export async function openLibrary(options = {}) {
  if (!ImagePicker) return []
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (!permission.granted) return []
  const result = await ImagePicker.launchImageLibraryAsync(options)
  if (result.canceled) return []
  return result.assets.map(normalizeImageResult)
}
