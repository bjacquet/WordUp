import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    const { navigation: { navigate } } = this.props

    return (
      <View>
        <TextInput onChangeText={(text) => this.setState({text})} />
        <Button title='Search' onPress={() => navigate('Results', { searchString: this.state.text })} />
      </View>
    )
  }
}