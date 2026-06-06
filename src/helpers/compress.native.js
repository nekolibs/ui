let ImageCompressor
let VideoCompressor
try {
  const RNC = require('react-native-compressor')
  ImageCompressor = RNC.Image
  VideoCompressor = RNC.Video
} catch {}

const IMAGE_DEFAULTS = { maxWidth: 1920, maxHeight: 1920, quality: 0.8 }
const VIDEO_DEFAULTS = { maxSize: 720 }

function isImage(asset) {
  return asset?.type?.startsWith('image/')
}

function isVideo(asset) {
  return asset?.type?.startsWith('video/')
}

export async function compressAsset(asset, options = {}) {
  if (!asset?.uri) return asset

  if (isImage(asset) && ImageCompressor) {
    try {
      const uri = await ImageCompressor.compress(asset.uri, { ...IMAGE_DEFAULTS, ...options.image })
      return { ...asset, uri }
    } catch (e) {
      console.warn('[neko-ui compress] image failed, keeping original:', e?.message)
      return asset
    }
  }

  if (isVideo(asset) && VideoCompressor) {
    try {
      const uri = await VideoCompressor.compress(asset.uri, { ...VIDEO_DEFAULTS, ...options.video })
      return { ...asset, uri }
    } catch (e) {
      console.warn('[neko-ui compress] video failed, keeping original:', e?.message)
      return asset
    }
  }

  return asset
}

export function compressAssets(assets, options = {}) {
  if (!assets?.length) return Promise.resolve(assets || [])
  return Promise.all(assets.map((a) => compressAsset(a, options)))
}
