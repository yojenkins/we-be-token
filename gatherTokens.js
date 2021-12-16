const axios = require('axios')


async function fetchFromZH(url) {
    try {
        const resp = await axios.get(url)
        return resp.data
    } catch (error) {
        return error.response.data || {error: `Unable to fetch tokens from ${url}`}
    }
}


async function gatherTokens() {
    const URLS = [
        'https://remaxdesign.zeroheight.com/api/token_file/a1f2e84fe1fd/share',
        'https://remaxdesign.zeroheight.com/api/token_file/a1f2e84feccc/share'
    ]


      const values = await Promise.all(URLS.map(url => fetchFromZH(url)))

      console.log(values.filter(val => !val.error))   
 
}

gatherTokens()

