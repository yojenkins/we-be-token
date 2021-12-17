const axios = require('axios')
const { existsSync, mkdirSync } = require('fs')
const { writeFile } = require('fs/promises')


async function fetchFromZH(name, url) {
    try {
        const resp = await axios.get(url)
        
        // TODO having to append the name in front is not a great option, it would be better to have this setup directly in the tokens json
        return {name, data: {[name]: resp.data}}
    } catch (error) {
        return error.response.data || {error: `Unable to fetch tokens from ${url}`}
    }
}


async function gatherTokens() {
    const URLS = [
        {name: 'color', url: 'https://remaxdesign.zeroheight.com/api/token_file/a1f2e84fe1fd/share',}   
    ]
      const responses = await Promise.all(URLS.map(({name, url}) => fetchFromZH(name, url)))

      console.info('Gathered successfully', responses.filter(val => !val.error))

      responses.filter(val => !val.data.error).map(({name, data}) => {
        writeFile(`./tokens/${name}-tokens.json`, JSON.stringify(data))
      })
      
 
}

gatherTokens()

