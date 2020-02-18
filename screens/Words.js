import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Button } from 'react-native'

import WordListItem from '../components/WordListItem'
import { getState } from '../store'

const keyExtractor = ({ word }) => word

export default class Words extends Component {
  state = {
    records: getState().records,
    loading: false,
    error: getState().error,
  }

  // componentDidMount = async () => {
  //   let allRecords = await getAllRecords()
  //   if (allRecords !== null) this.setState({ words: allRecords })
  // }

  // shouldComponentUpdate = (_a, _b) => {
  //   console.dir(_a)
  //   console.dir(_b)
  //   debugger
  // }

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
    const { records } = getState()

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
