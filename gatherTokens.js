const axios = require('axios')
const { writeFile } = require('fs/promises')


async function fetchFromZH(name, url) {
    try {
        const resp = await axios.get(url)
        
        return {name, data: resp.data}
    } catch (error) {
        return error.response.data || {error: `Unable to fetch tokens from ${url}`}
    }
}


async function gatherTokens() {
    const URLS = [
        {name: 'colors', url: 'https://remaxdesign.zeroheight.com/api/token_file/a1f2e84fe1fd/share',}   
    ]
      const responses = await Promise.all(URLS.map(({name, url}) => fetchFromZH(name, url)))

      console.log(responses.filter(val => !val.error))

      responses.filter(val => !val.data.error).map(({name, data}) => {
        writeFile(`./tokens/${name}-tokens.json`, JSON.stringify(data))
      })
      
 
}

gatherTokens()

