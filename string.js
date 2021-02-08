// https://github.com/valeryburtsev

const bruteSearch = (str, pattern, caseSensitive=false) => {
    if(!str || !pattern) return;
    for(let i=0; i<= str.length - pattern.length; i++) {

        let match = false;
        let match_position

        for(let j=0; j<pattern.length; j++) {
            let symbol = str[i+j]
            let pattern_symbol = pattern[j]
            if(!caseSensitive) {
                pattern_symbol = pattern_symbol.toLowerCase()
                symbol = symbol.toLowerCase()
            }
            if(pattern_symbol === symbol) {
                if(!match) match_position = i+j
                match = true
            } else {
                match = false
                break;
            }
        }
        if(match) {
            return match_position
        }
    }
    return -1;
}

const RabinKarpSearch = (str, pattern, caseSensitive=false) => {
    if(!str || !pattern) return;
    const patternHash = Buffer.from(pattern).toString('base64')
    let match = false;
    let match_position
    for(let i=0; i<=str.length - pattern.length; i++) {
        const substr = str.substr(i, pattern.length)
        const sshash = Buffer.from(substr).toString('base64')

        if(sshash === patternHash) {
            for(let j=0; j<pattern.length; j++) {
                let p = pattern[j]
                let s = substr[j]
                if(!caseSensitive) {
                    p = p.toLowerCase()
                    s = s.toLowerCase()
                }
                if(p === s) {
                    if(!match) match_position = i
                    match = true
                } else {
                    match = false
                    break
                }
            }
        }

        if(match) return match_position
    }
    return -1;
}



const main = () => {
    const str = "This is test"
    const pattern = "test"

    console.log(bruteSearch(str, pattern, true))
    console.log(RabinKarpSearch(str, pattern))
}

main()