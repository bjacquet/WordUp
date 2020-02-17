import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Button, AsyncStorage } from 'react-native'

import WordListItem from '../components/WordListItem'

const keyExtractor = ({ word }) => word

export default class Words extends Component {
  state = {
    words: [],
    loading: true,
    error: false,
  }

  componentDidMount = async () => {
    let value = await AsyncStorage.getItem('records_list')
    if (value !== null) {
      this.setState({
        ...this.state,
        words: value
      })
    }
  }

  renderWord = ({ item }) => {
    const { navigation: { navigate } } = this.props
    const { word, definitions } = item
   
    return (
      <WordListItem
        word={word}
        definitions={definitions}
        onPress={() => navigate('Word', { word: item, stored: true })}
      />
    )
  }


  render() {
    const { navigation: { navigate } } = this.props
    const { words } = this.state

    return (
      <View>
        <FlatList
          data={words}
          keyExtractor={keyExtractor}
          renderItem={this.renderWord}
        />
        <Button title='Search' onPress={() => navigate('Search')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
})
