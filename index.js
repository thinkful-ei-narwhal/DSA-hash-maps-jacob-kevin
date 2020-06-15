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

removeDuplicates('google all that you think can think of');