import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native'

import { searchRecords } from '../utils/discogs'
import RecordListItem from '../components/RecordListItem'

const keyExtractor = ({ id }) => id
const WIDTH = Dimensions.get('window').width

export default class Search extends Component {
  state = {
    loading: true,
    error: false,
    words: [],
    page: 1,
    seed: 1,
    pages: undefined
  }

  componentDidMount = async () => {
    try {
      const { searchString } = this.props.navigation.state.params
      const response = await searchRecords(searchString, this.state.page)
      const words = response.results.map(
        item => {
          return {
             word: item.title,
             year: item.year,
             id: item.id,
             thumb: item.thumb,
          }
        }
      )
      this.setState({
        loading: false,
        words: [...words],
        pages: response.pagination.pages
      })
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

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating={true} size='large' />
      </View>
    )
  }

  handleLoadMore = async () => {
    try {
      const { searchString } = this.props.navigation.state.params
      const nextPage = this.state.page + 1

      if (this.state.page >= this.state.pages) return

      const response = await searchRecords(searchString, nextPage)
      const moreRecords = response.results.map(
        item => {
          return {
              word: item.title,
              year: item.year,
              id: item.id,
              thumb: item.thumb,
          }
        }
      )
      this.setState({
        loading: false,
        words: [...this.state.words, ...moreRecords],
        page: nextPage
      })
    } catch (error){
      console.log(error)
    }
  }

  render() {
    const { words, loading, error } = this.state

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size='large' />
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
          numColumns={3}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    flex: 1,
  },
})
