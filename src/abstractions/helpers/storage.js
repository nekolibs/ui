function set(key, value) {
  return localStorage.setItem(key, value)
}

function setAsync(key, value) {
  return Promise.resolve(set(key, value))
}

function get(key) {
  return localStorage.getItem(key)
}

function getAsync(key) {
  return Promise.resolve(get(key))
}

function remove(key) {
  return localStorage.removeItem(key)
}

function removeAsync(key) {
  return Promise.resolve(remove(key))
}

function clear() {
  return localStorage.clear()
}

function clearAsync() {
  return Promise.resolve(clear())
}

export const AbsStorage = {
  set,
  setAsync,
  get,
  getAsync,
  remove,
  removeAsync,
  clear,
  clearAsync,
}
