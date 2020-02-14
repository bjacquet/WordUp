import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Words from '../screens/Words'
import Word from '../screens/Word'

const screens = {
  Words: {
    screen: Words,
  },
  Word: {
    screen: Word,
  },
}

const Stack = createStackNavigator(screens)

export default createAppContainer(Stack)
