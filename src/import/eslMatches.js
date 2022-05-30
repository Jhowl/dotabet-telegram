const esl = []

let url = 'https://api.opendota.com/api/proMatches'

const getEslMatches = arr => { 
    return arr.filter(match => (match.leagueid === 14173))
}

for (let index = 0; index < 10; index++) {
    let response = await axios.get(url)
    esl.push(...getEslMatches(response.data))
    let last = response.data[response.data.length - 1]
    url = `https://api.opendota.com/api/proMatches?less_than_match_id=${last.match_id}`
}

fs.writeFileSync('database/esl.json', JSON.stringify(esl))