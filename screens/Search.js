import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { searchRecords } from '../utils/discogs'

async function fetchRecords(word, callback) {
  searchRecords(word, callback)
}


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleOnPress(word) {
    fetchRecords(word, this.handleResponse)
  }

  handleResponse(results) {
    const { navigation: { navigate } } = this.props
    this.setState(
      {
        ...this.state,
        words: results
      }
    )
    console.dir(this.state)
    navigate('Words')
  }

  render() {
    const { navigation: { navigate } } = this.props

    return (
      <View>
        <TextInput onChangeText={(text) => this.setState({text})} />
        {/* <Button title='Search' onPress={() => this.handleOnPress(this.state.text)} /> */}
        <Button title='Search' onPress={() => navigate('Results', { searchString: this.state.text })} />
      </View>
    )
  }
}