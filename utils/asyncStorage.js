import { AsyncStorage } from 'react-native'

const ASYNC_STORAGE_RECORDS_KEY = 'ASYNC_STORAGE_RECORDS_KEY'

export const getRecord = async(id) => {
  try {
    let allRecords = await AsyncStorage.getItem(ASYNC_STORAGE_RECORDS_KEY) || []
    if (typeof(allRecords) === 'string') allRecords = JSON.parse(allRecords)

    return allRecords.find(elem => elem.id === id)
  } catch (error) {
    console.log(error)
    return
  }
}

export const saveRecord = async (record) => {
  try {
    let allRecords = await AsyncStorage.getItem(ASYNC_STORAGE_RECORDS_KEY) || []
    if (typeof(allRecords) === 'string') allRecords = JSON.parse(allRecords)
    
    allRecords = allRecords.filter((elem) => elem.id !== record.id)
    allRecords.push(record)

    await AsyncStorage.setItem(ASYNC_STORAGE_RECORDS_KEY, JSON.stringify(allRecords))
    return record
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteRecord = async (record) => {
  try {
    let allRecords = await getAllRecords()
    allRecords = allRecords.filter((elem) => elem.id !== record.id)
    await AsyncStorage.setItem(ASYNC_STORAGE_RECORDS_KEY, JSON.stringify(allRecords))
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getAllRecords = async () => {
  try {
    const allRecords = await AsyncStorage.getItem(ASYNC_STORAGE_RECORDS_KEY)

    return !allRecords ? [] : JSON.parse(allRecords)
  } catch (error) {
    console.log(error)
    return []
  }
}
