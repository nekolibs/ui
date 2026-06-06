const IMAGE_DEFAULTS = { maxWidth: 1920, maxHeight: 1920, quality: 0.8 }

function isImage(asset) {
  return asset?.type?.startsWith('image/')
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const ALPHA_TYPES = new Set(['image/png', 'image/webp', 'image/gif'])

function compressWithCanvas(img, { maxWidth, maxHeight, quality, mimeType }) {
  let { width, height } = img
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height)
    width = Math.round(width * ratio)
    height = Math.round(height * ratio)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  const outputType = ALPHA_TYPES.has(mimeType) ? mimeType : 'image/jpeg'

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob ? { uri: URL.createObjectURL(blob), width, height } : null),
      outputType,
      quality
    )
  })
}

export async function compressAsset(asset, options = {}) {
  if (!asset?.uri || !isImage(asset)) return asset

  try {
    const opts = { ...IMAGE_DEFAULTS, ...options.image }
    const img = await loadImage(asset.uri)
    const result = await compressWithCanvas(img, { ...opts, mimeType: asset.type })
    if (!result) return asset
    return { ...asset, uri: result.uri, width: result.width, height: result.height }
  } catch (e) {
    console.warn('[neko-ui compress] web image compression failed:', e?.message)
    return asset
  }
}

export function compressAssets(assets, options = {}) {
  if (!assets?.length) return Promise.resolve(assets || [])
  return Promise.all(assets.map((a) => compressAsset(a, options)))
}
