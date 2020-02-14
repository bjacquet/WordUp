import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'

import Words from './screens/Words'
import Word from './screens/Word'

const Stack = createStackNavigator()


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Words' component={Words} />
        <Stack.Screen name='Word' component={Word} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
