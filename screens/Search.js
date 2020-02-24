import React, { Component } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    const { navigation: { navigate } } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            autoFocus={true}
            returnKeyType='search'
            onEndEditing={(_event) => navigate('Results', { searchString: this.state.text })}
          />
          <Text>Search by album title or artist</Text>
        </View>
        <Button title='Search' onPress={() => navigate('Results', { searchString: this.state.text })} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  content: {
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#FFF',
    padding: 10,
    fontSize: 30    
  }
})
