var DiscogsClient = require('disconnect').Client

export var discogs = new DiscogsClient({
    consumerKey: 'VLJrJianNOdxxvhKTRlr',
    consumerSecret: 'NmmuIKZzVKneCmtbuGaQhKCQojbyjmyt'
}).database()

const handleResponse = (data, callback) => {
  const results = data.results.map(
    item => {
      return {
         word: item.title,
         definitions: `Year: ${item.year}`
      }
    }
  )
  callback(results)
}

export async function searchRecords(searchWord) {
  discogs.search(searchWord, {type: 'master'})
}
