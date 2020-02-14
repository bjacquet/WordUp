import { StackNavigator } from '@react-navigation/stack'

import Words from '../screens/Words'
import Word from '../screens/Word'

export default StackNavigator({
  Words: {
    screen: Words,
  },
  Word: {
    screen: Word,
  },
 })
