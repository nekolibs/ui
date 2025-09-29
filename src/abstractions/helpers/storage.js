function set(key, value) {
  return localStorage.setItem(key, value)
}

function setAsync(key, value) {
  return Promise.resulve(set(key, value))
}

function get(key) {
  return localStorage.getItem(key)
}

function getAsync(key) {
  return Promise.resulve(get(key))
}

function remove(key) {
  return localStorage.removeItem(key)
}

function removeAsync(key) {
  return Promise.resulve(remove(key))
}

export const AbsStorage = {
  set,
  setAsync,
  get,
  getAsync,
  remove,
  removeAsync,
}
