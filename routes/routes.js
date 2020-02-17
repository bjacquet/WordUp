import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Words from '../screens/Words'
import Word from '../screens/Word'
import Search from '../screens/Search'
import SearchResults from '../screens/SearchResults'

const screens = {
  Words: {
    screen: Words,
    navigationOptions: {
      title: 'WordUp'
    }
  },
  Word: {
    screen: Word,
    navigationOptions: {
      title: 'WordUp'
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search for Records'
    }
  },
  Results: {
    screen: SearchResults,
    navigationOptions: {
      title: 'Records'
    }
  }
}

const Stack = createStackNavigator(screens)

export default createAppContainer(Stack)
