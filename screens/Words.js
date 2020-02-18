import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Button } from 'react-native'

import WordListItem from '../components/WordListItem'
import { getState, setState } from '../store'
import { getAllRecords } from '../utils/asyncStorage'

const keyExtractor = ({ word }) => word

export default class Words extends Component {
  state = getState()

  initializeData = async () => {
    try {
      const records = await getAllRecords()
      this.setState({records})
    } catch (error) {
      console.log(error)
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

  componentDidMount() {
    this.initializeData()
  }

  render() {
    const { navigation: { navigate } } = this.props
    const { records } = this.state

    console.log('Words - render')
    console.dir(records)

    return (
      <View>
        {records.length > 0 &&
          <FlatList
            data={records}
            keyExtractor={keyExtractor}
            renderItem={this.renderWord}
          />
        }
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
