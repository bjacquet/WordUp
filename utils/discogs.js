var DiscogsClient = require('disconnect').Client

export var discogs = new DiscogsClient({
    consumerKey: 'VLJrJianNOdxxvhKTRlr',
    consumerSecret: 'NmmuIKZzVKneCmtbuGaQhKCQojbyjmyt'
}).database()

export async function searchRecords(searchWord) {
  discogs.search(searchWord, {type: 'master'})
}
