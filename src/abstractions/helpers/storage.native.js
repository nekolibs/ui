let set = () => console.warn('expo-sqlite not installed. Neko Storage needs expo-sqlite to work properly')
let setAsync = () => Promise.resolve(set())

let get = () => console.warn('expo-sqlite not installed. Neko Storage needs expo-sqlite to work properly')
let getAsync = () => Promise.resolve(get())

let remove = () => console.warn('expo-sqlite not installed. Neko Storage needs expo-sqlite to work properly')
let removeAsync = () => Promise.resolve(remove())

try {
  const StorageModule = require('expo-sqlite/kv-store')
  if (StorageModule?.default) {
    const Storage = StorageModule.default
    set = Storage.setItemSync.bind(Storage)
    setAsync = Storage.setItem.bind(Storage)

    get = Storage.getItemSync.bind(Storage)
    getAsync = Storage.getItem.bind(Storage)

    remove = Storage.removeItemSync.bind(Storage)
    removeAsync = Storage.removeItem.bind(Storage)
  }
} catch (e) {
  console.log('expo-sqlite not available:', e)
}

export const AbsStorage = {
  set,
  setAsync,
  get,
  getAsync,
  remove,
  removeAsync,
}
