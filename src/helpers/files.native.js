let FS
try {
  FS = require('expo-file-system')
} catch {}

// `target="<base>/<subdir>"`, base is 'document' | 'cache'. Resolves to a
// permanent Directory (created if missing) via the modern sync expo-file-system API.
function resolveDir(target) {
  const [base, ...rest] = (target || '').split('/').filter(Boolean)
  if (base !== 'cache' && base !== 'document') {
    console.warn(`[neko-ui files] target base "${base}" unknown — using document dir. Use "document" or "cache".`)
  }
  const root = base === 'cache' ? FS.Paths.cache : FS.Paths.document
  const dir = new FS.Directory(root, ...rest)
  try {
    dir.create({ intermediates: true, idempotent: true })
  } catch (e) {
    console.warn('[neko-ui files] dir create failed:', e?.message)
  }
  return dir
}

let seq = 0

// Copy a file at `uri` into a permanent app directory (`target`, default
// 'document/files'). Returns the durable uri string. Never throws — on failure
// or when expo-file-system is unavailable, returns the original uri.
// `opts.name` is used only to derive the file extension (falls back to the uri,
// then 'jpg'); the stored filename is always unique (timestamp + counter), so
// rapid multi-select can't collide. Expects a `file://` source (e.g.
// expo-image-picker output); `content://` sources can't be copied and fall back
// to the original uri.
export function persistFile(uri, target = 'document/files', { name } = {}) {
  if (!FS || !uri) return uri
  try {
    const ext = name?.split('.').pop() || uri.split('?')[0].split('.').pop() || 'jpg'
    const filename = `${Date.now()}_${seq++}_${Math.round(Math.random() * 1e6)}.${ext}`
    const dest = new FS.File(resolveDir(target), filename)
    new FS.File(uri).copy(dest)
    return dest.uri
  } catch (e) {
    console.warn('[neko-ui files] persistFile failed, keeping uri:', e?.message)
    return uri
  }
}

// Delete a persisted file. No-op if missing / unavailable.
export function removeFile(uri) {
  if (!FS || !uri) return
  try {
    new FS.File(uri).delete()
  } catch (e) {
    console.warn('[neko-ui files] removeFile failed:', e?.message)
  }
}
