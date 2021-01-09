export class Storage {
  constructor(localStorageItemKey = 'APP_NAME') {
    this._LOCAL_STORAGE_ITEM_KEY = localStorageItemKey;
    this._load();
    this._save();
  }

  _save() {
    localStorage.setItem(
      this._LOCAL_STORAGE_ITEM_KEY,
      JSON.stringify(this._cache)
    );
  }

  _load() {
    this._cache =
      JSON.parse(localStorage.getItem(this._LOCAL_STORAGE_ITEM_KEY)) ??
      Object.create(null);
  }

  getItem(key) {
    return this._cache[key] ?? null;
  }

  setItem(key, value) {
    this._cache[key] = value;
    this._save();
  }

  removeItem(key) {
    this._cache[key] = undefined;
    this._save();
  }

  clear() {
    localStorage.removeItem(this._LOCAL_STORAGE_ITEM_KEY);
  }
}
