const axios = require('axios')
const { writeFile } = require('fs/promises')

async function fetchFromZH(name, url) {
    try {
        const resp = await axios.get(url)
        
        // TODO having to append the name in front is not a great option, it would be better to have this setup directly in the tokens json
        if (!name === 'color') {
            return {name, data: {[name]: resp.data}}
        }

        return {name, data: resp.data}
    } catch (error) {
        return error.response.data || {error: `Unable to fetch tokens from ${url}`}
    }
}


async function gatherTokens() {
    const URLS = [
        {name: 'color-global', url: 'https://remaxdesign.zeroheight.com/api/token_file/883ff9e9447f/share'},
        {name: 'color-alias', url: 'https://remaxdesign.zeroheight.com/api/token_file/56fbaaa49948/share'},
        {name: 'size-global', url: 'https://remaxdesign.zeroheight.com/api/token_file/e127d3fffa09/share'},
        {name: 'size-alias', url: 'https://remaxdesign.zeroheight.com/api/token_file/5ad282b0c7c9/share'},
        {name: 'typography-global', url: 'https://remaxdesign.zeroheight.com/api/token_file/22605184a021/share'},
        {name: 'typography-alias', url: 'https://remaxdesign.zeroheight.com/api/token_file/5cf07899e712/share'}
    ]
      const responses = await Promise.all(URLS.map(({name, url}) => fetchFromZH(name, url)))

      console.info('Gathered successfully', responses.filter(val => !val.error))

      responses.filter(val => !val.data.error).map(({name, data}) => {
          const category = name.split('-')[0]
        writeFile(`./tokens/${category}/${name}-tokens.json`, JSON.stringify(data))
      })
      
 
}

gatherTokens()

