var DiscogsClient = require('disconnect').Client

export var discogs = new DiscogsClient({
    consumerKey: 'VLJrJianNOdxxvhKTRlr',
    consumerSecret: 'NmmuIKZzVKneCmtbuGaQhKCQojbyjmyt'
}).database()

export async function searchRecords(searchWord) {
  try {
    let response = await fetch('http://192.168.1.171:8000/search/' + searchWord)
    response = await response.json()
    return response
  } catch(error) {
    console.log(error)
  }
}
