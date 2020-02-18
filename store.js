let state = {
  isFetchingRecords: true,
  records: [],
  error: false,
}

export const getState = () => {
  return state
}

export const setState = (stateChanges) => {
  state = {
    ...state,
    ...stateChanges,
  }
  return state
}

export const onChange = () => {

}
