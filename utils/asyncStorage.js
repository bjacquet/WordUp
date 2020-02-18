import { AsyncStorage } from 'react-native'

import { getState, setState } from '../store'

const ASYNC_STORAGE_RECORDS_KEY = 'ASYNC_STORAGE_RECORDS_KEY'

export const saveRecord = async (record) => {
  try {
    let allRecords =  await AsyncStorage.getItem(ASYNC_STORAGE_RECORDS_KEY) || []
    if (typeof(allRecords) === 'string') allRecords = JSON.parse(allRecords)

    allRecords.push(record)

    await AsyncStorage.setItem(ASYNC_STORAGE_RECORDS_KEY, JSON.stringify(allRecords))
    setState({ records: allRecords })
    return allRecords
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getAllRecords = async (record) => {
  try {
    const allRecords = await AsyncStorage.getItem(ASYNC_STORAGE_RECORDS_KEY)

    return !allRecords ? [] : JSON.parse(allRecords)
  } catch (error) {
    console.log(error)
    return []
  }
}
