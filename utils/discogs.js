var DiscogsClient = require('disconnect').Client

export var discogs = new DiscogsClient({
    consumerKey: 'VLJrJianNOdxxvhKTRlr',
    consumerSecret: 'NmmuIKZzVKneCmtbuGaQhKCQojbyjmyt'
}).database()

export async function searchRecords(searchWord) {
  const response = fetch('http://localhost:8000/search/' + searchWord)
    .then(((response) => response.json()))
  console.log('discogs - searchRecords')
  console.dir(response)
}
