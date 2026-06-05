// Web / non-native: no filesystem persistence. The uri (blob/object URL or
// remote) is used as-is. Mirrors the native API surface.
export function persistFile(uri) {
  return uri
}

export function removeFile() {}
