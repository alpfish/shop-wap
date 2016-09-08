/*
 * 引入 WebStorageCache - 0.0.3
 * https://github.com/WQTeam/web-storage-cache
 */
import WebStorageCache from 'libs/vendor/web-storage-cache.js'

let Cache = new WebStorageCache
Cache.deleteAllExpires()

export default Cache
