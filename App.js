import * as React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'

import Navigator from './routes/routes'

function App() {
  return (
    <Navigator />
  )
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
