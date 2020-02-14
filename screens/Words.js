import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import WordListItem from '../components/WordListItem'

const keyExtractor = ({ word }) => word

export default class Words extends Component {
  state = {
    words: [
      {
        word: 'Word Up',
        definitions: [
          'acknowledgement, approval, indication of enthusiam',
        ],
      },
      {
        word: 'tides',
        definitions: [
          'To betide; befall.',
          'The periodic variation in the surface level of the oceans and of bays, gulfs, inlets, and estuaries, caused by gravitational attraction of the moon and sun.',
        ],
      }
    ],
    loading: true,
    error: false,
  }

  renderWord = ({ item }) => {
    const { navigation: { navigate } } = this.props
    const { word, definitions } = item

    return (
      <WordListItem
        word={word}
        definitions={definitions}
        onPress={() => navigate('Word', { word: item })}
      />
    )
  }

  render() {
    const { words } = this.state

    return (
      <View>
        <FlatList
          data={words}
          keyExtractor={keyExtractor}
          renderItem={this.renderWord}
        />
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
