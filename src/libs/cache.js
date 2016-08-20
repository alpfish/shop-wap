import WebStorageCache from 'libs/third/web-storage-cache.js'

let LS = new WebStorageCache
LS.deleteAllExpires()

export default Cache = LS
