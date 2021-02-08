// Only for educational purposes. Real world performance using this class in JavaScript is low. 

class HashTable {
    constructor() {
        this.table = []
        this.length = 0
        this.size = 100
    }

    hash = (value) => {
        const string = String(value)
        let total = 0
        for (var i = 0; i < string.length; i++) {
            total += string.charCodeAt(i)
        }

        return total % this.size
    }

    put = (key, value) => {
        if(this.length === this.size) {
            this.increaseSize()
        }
        const hash = this.hash(key)
        if(!this.table[hash]) this.table[hash] = [];
        this.table[hash].push({key: key, value: value})
        this.length++;
    }

    get = (key) => {
        const hash = this.hash(key)
        if(!this.table[hash]) return null;
        for(let i in this.table[hash]) {
            if(this.table[hash][i].key === key) return this.table[hash][i].value;
        }
        return null;
    }

    increaseSize = () => {
        this.size += 100;
        this.rehashTable()
    }

    rehashTable = () => {
        const copyTable = [...this.table]
        this.table = []
        for(let i in copyTable) {
            const row = copyTable[i]
            if(row) {
                for(let k in row) {
                    const item = row[k]
                    this.put(item.key, item.value)
                }
            }
        }
    }

    print = () => {
        console.log(this.table)
    }
}

const main = () => {
    const table = new HashTable()

    table.put("Sue", "hello")
    table.put("Mia", "hello2")
    console.log(table.get("Sue"))

}

main()