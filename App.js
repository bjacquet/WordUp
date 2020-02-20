import * as React from 'react'
import { StyleSheet } from 'react-native'

import Navigator from './routes/routes'
import { TheState } from './contextApi'
import { getAllRecords } from './utils/asyncStorage'

class App extends React.Component {
  state = {
    records: []
  }
  
  updateTheState = async () => {
    try {
      const records = await getAllRecords()
      this.setState({records})
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.updateTheState()
  }

  render () {
    return (
      <TheState.Provider value={{ val: this.state, updateTheState: this.updateTheState }}>
        <Navigator />
      </TheState.Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
