
export default class MemorySettings extends Settings {

  soundEnabled = true;
  set = new Set();

  setSetting(name, value) {
    hashtable.set(name, value);
  }

  getSetting(name, defaultValue) {
    const result = set.get(name);
    if (result != null)
    {
      return result;
    }
    else
    {
      return defaultValue;
    }
  }

  get unid() {
    return null;
  }

  set unid(unid) {
  }

}
