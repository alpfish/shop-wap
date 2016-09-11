/*
 * 引入 WebStorageCache - 0.0.3
 * https://github.com/WQTeam/web-storage-cache
 */
import WebStorageCache from 'libs/vendor/web-storage-cache.js'

let LS = new WebStorageCache
LS.deleteAllExpires()

export default LS
