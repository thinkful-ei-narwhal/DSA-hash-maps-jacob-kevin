const HashMap = require('./hashmaps');


//Question 1-------------------------------------------------------------------------------------------
function main() {
  const newHash = new HashMap;

  newHash.set('Hobbit', 'Bilbo');
  newHash.set('Hobbit', 'Frodo');
  newHash.set('Human', 'Aragorn');
  newHash.set('Elf', 'Legolas');
  newHash.set('Maiar', 'Sauron');
  newHash.set('RingBearer', 'Gollum');
  newHash.set('HalfElven', 'Arwen');
  newHash.set('Ent', 'treeBeard');
  newHash.set('person', 'jacob');
  newHash.set('dog', 'max');
  newHash.set('lizard', 'alex');
  // console.log(JSON.stringify(newHash))
  // console.log(newHash)
  console.log(newHash.get('Hobbit'));
  // console.log(newHash.MAX_LOAD_RATIO)
}

// main();

//Question 2-------------------------------------------------------------------------------------------
//This creates two hash maps, each with two key-value pairs.
//The output for the first console.log is 20
//The output for the second console.log is 10

//Question 3-------------------------------------------------------------------------------------------
//1) [88, 22, null, null, 4, 15, 28, 17, 59, 31, 10]
//2) [null, 19, 28, null, null, 5, 15, null, 17]
//                   |                  |
//                   20                 33
//                   |
//                   12
//                   |
//                   10

//Question 4-------------------------------------------------------------------------------------------
const removeDuplicates = (string) => {
  const stringHash = new HashMap;
  for (let i = 0; i < string.length; i++) {
    let exists;
    try {
      exists = stringHash.get(string[i]);
    }
    catch(err) {
      exists = false;
    }
    if (!exists) {
      stringHash.set(string[i]);
    }
  }
  let newString = '';
  let table = stringHash._hashTable;
  for (let i = 0; i < stringHash.length; i++) {
    newString += table[i].key;
  }
  console.log(newString);
};

// removeDuplicates('google all that you think can think of');


//Question 5-------------------------------------------------------------------------------------------

const checkPalindrome = (string) => {
    const stringHash = new HashMap();
    let newString = string.toLowerCase().replace(/ /g,'')
    let keys = []
    for (let i = 0; i < newString.length; i++) {
        try {
            let newValue = stringHash.get(newString[i])
            stringHash.set(newString[i], newValue + 1)
        }
        catch {
            stringHash.set(newString[i], 1)
            keys.push(newString[i])
        }
      }
    let isOdd = 0;
    for(let i = 0; i < keys.length; i++) {
        console.log('get keys', stringHash.get(keys[i]))
        if(stringHash.get(keys[i]) % 2 === 1) {
            isOdd++
        }
    }
    if(newString.length % 2 === 1 && isOdd === 1) {
        return true
    }
    if(newString.length % 2 === 0 && isOdd === 0) {
        return true
    }
    return false
}

// console.log(checkPalindrome('true')); // -> true

//Question 6-------------------------------------------------------------------------------------------
//sorting the letters in each string alpha
//for each set of char, create a key: value where the value is an array with index of each instance of the set of letters
//iterate through the hashmap, printing out the words at each index of the array;
const anagramGrouper = (stringArray) => {
    const stringHash = new HashMap();
    let arrCopy = stringArray;
    const keys = [];
    for (let i = 0; i < arrCopy.length; i++) {
        let currSet = arrCopy[i].split('').sort().join('');
        try {
            let newArr = stringHash.get(currSet);
            newArr.push(i);
            stringHash.set(currSet, newArr)
        }
        catch {
            stringHash.set(currSet, [i])
            keys.push(currSet)
        }
    }
    let sortedWords = [];
    for (let j = 0; j < keys.length; j++) {
        let indexes = stringHash.get(keys[j]);
        let grouping = [];
        for (let k = 0; k < indexes.length; k++) {
            grouping.push(stringArray[indexes[k]])
        }
        sortedWords.push(grouping);
    }
    console.log(sortedWords);
}

anagramGrouper(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']);