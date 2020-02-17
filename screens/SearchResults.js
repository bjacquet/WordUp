import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'

import { discogs, searchRecords } from '../utils/discogs'
import WordListItem from '../components/WordListItem'

export default class Search extends Component {
  state = {
    loading: true,
    error: false,
    words: [],
  }

  componentDidMount = async () => {
    try {
      const { searchString } = this.props.navigation.state.params
      const response = await discogs.search(searchString, {type: 'master'})

      const words = response.results.map(
        item => {
          return {
             word: item.title,
             definitions: [`Year: ${item.year}`]
          }
        }
      )
      this.setState({loading: false, words})
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderRecord = ({ item }) => {
    const { word, definitions } = item
   
    return (
      <WordListItem
        word={word}
        definitions={definitions}
      />
    )
  }

  render() {
    const { words, loading, error } = this.state

    console.dir(words)

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View>
          <Text>
            Failed to load records!
          </Text>
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data={words}
          renderItem={this.renderRecord}
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
