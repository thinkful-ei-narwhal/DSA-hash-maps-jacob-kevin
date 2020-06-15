const HashMap = require('./hashmaps')



function main() {
    const newHash = new HashMap;

    newHash.set("Hobbit", "Bilbo")
    newHash.set("Hobbit", "Frodo")
    newHash.set("Human", "Aragorn")
    newHash.set("Elf", "Legolas")
    newHash.set("Maiar", "Sauron")
    newHash.set("RingBearer", "Gollum")
    newHash.set("HalfElven", "Arwen")
    newHash.set("Ent", "treeBeard")
    newHash.set("person", "jacob")
    newHash.set("dog", "max")
    newHash.set("lizard", "alex")
    // console.log(JSON.stringify(newHash))
    // console.log(newHash)
    console.log(newHash.get('Hobbit'))
    // console.log(newHash.MAX_LOAD_RATIO)
}

main()