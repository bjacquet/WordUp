import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'

import { discogs, searchRecords } from '../utils/discogs'
import RecordListItem from '../components/RecordListItem'

const keyExtractor = ({ id }) => id

export default class Search extends Component {
  state = {
    loading: true,
    error: false,
    words: [],
  }

  componentDidMount = async () => {
    try {
      const { searchString } = this.props.navigation.state.params
      const response = await searchRecords(searchString)

      const words = response.results.map(
        item => {
          return {
             word: item.title,
             definitions: [`Year: ${item.year}`],
             id: item.id,
             thumb: item.thumb,
          }
        }
      )
      this.setState({loading: false, words})
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderRecord = ({ item }) => {
    const { navigation: { navigate } } = this.props
   
    return (
      <RecordListItem
        record={item}
        onPress={() => navigate('Record', { record: item, stored: false })}
      />
    )
  }

  render() {
    const { words, loading, error } = this.state

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
      <View style={styles.container}>
        <FlatList
          data={words}
          renderItem={this.renderRecord}
          keyExtractor={keyExtractor}
          numColumns={5}
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
