export async function searchRecords(searchWord, page) {
  try {
    const urlQuery = `http:///192.168.1.171:443/search/${searchWord}?page=${page}`
    let response = await fetch(urlQuery)
    response = await response.json()
    return response
  } catch(error) {
    console.log(error)
  }
}

export async function getMasterRelease(masterId) {
  try {
    const urlQuery = `http:///192.168.1.171:443/masters/${masterId}`
    let response = await fetch(urlQuery)
    response = await response.json()
    return response
  } catch(error) {
    console.log(error)
  }
}
