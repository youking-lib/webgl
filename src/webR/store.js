const cacheMap = new Map()

export default class Store {
  constructor(dir) {
    if (cacheMap.get(dir)) {
      return cacheMap.get(dir)
    }
    this._dir = dir
    this.initStore()
  }

  initStore () {
    this.store = new Map()
    
    cacheMap.set(this._dir, this)
  }

}