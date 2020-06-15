class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  set(key, value) {
    //set the loadratio = to the total length / the capacity
    // console.log(this.MAX_LOAD_RATIO)
    const loadRatio = (this.length + this._deleted) / this._capacity;
    if(loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    //find the slot where key should be 
    const index = this._findSlot(key);
    //if its not available go up one slot
    if(!this._hashTable[index]) {
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }

  get(key) {
    const index = this._findSlot(key);
    if(this._hashTable[index] === undefined) {
      throw new Error('Key Error');
    }
    return this._hashTable[index].value;
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if(slot === undefined) {
      throw new Error('key error');
    }
    slot.DELETED = true;
    this.length --;
    this._deleted++;
  }

  _findSlot(key) {
    //hash the incoming key
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    //loop through starting from the hash key until finding 
    //undefined (key is not in hash map)
    //until you find the corresponding key
    for (let i = 0; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if(slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    //here we reset the length of the hashmap
    this.length = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if(slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }
}
HashMap.SIZE_RATIO = 3;
HashMap.MAX_LOAD_RATIO = .5;


module.exports = HashMap;