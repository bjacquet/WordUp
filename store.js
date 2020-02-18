let state = {
  isFetchingRecords: true,
  records: [],
  thumbs: [],
  error: false,
  loading: false,
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
