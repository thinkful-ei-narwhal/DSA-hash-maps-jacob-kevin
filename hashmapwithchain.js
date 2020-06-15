//The idea is to make each cell of hash table point to a linked list of records that have same hash function value.

//Let us consider a simple hash function as “key mod 7” and sequence of keys as 50, 700, 76, 85, 92, 73, 101.
const LinkedList = require('./linkedlist')

class HashMapWithChain {
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
      const loadRatio = (this.length + this._deleted) / this._capacity;
      if(loadRatio > HashMapWithChain.MAX_LOAD_RATIO) {
          console.log(loadRatio)
        this._resize(this._capacity * HashMapWithChain.SIZE_RATIO);
      }
      console.log('key', key)
      const index = this._findSlot(key);
      if(!this._hashTable[index]) {
        this._hashTable[index] = { key, value, DELETED: false }
        this.length++
        return;
      }
      if(this._hashTable[index] instanceof LinkedList) {
        this._hashTable[index].insertLast({ key, value, DELETED: false })
      }
      else {
        const originalVal = this._hashTable[index]
        const newLinkedList = new LinkedList()
        newLinkedList.insertFirst(originalVal)
        newLinkedList.insertLast({key, value, DELETED: false})
        this._hashTable[index] = newLinkedList
      }      
    }
  
    get(key) {
       //if hit a linked list, then traverese that 
      const index = this._findSlot(key);
      if(this._hashTable[index] instanceof LinkedList) {
          return LinkedList
      }
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
      const hash = HashMapWithChain._hashString(key);
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
  
  HashMapWithChain.SIZE_RATIO = 3;
  HashMapWithChain.MAX_LOAD_RATIO = .5;
  
  
  module.exports = HashMapWithChain;