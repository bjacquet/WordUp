import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native'

export default class Word extends Component {
  renderDefinition = (definition) => {
    return (
      <Text style={styles.definition}>
        {definition}
      </Text>
    )
  }

  handleOnPress = async (word, definitions, stored) => {
    const { navigation: { navigate } } = this.props

    try {
      if (stored) {

      } else {
        const records_list = await AsyncStorage.getItem('record_list')
        await AsyncStorage.setItem(
          'records_list',
          JSON.stringify(
            [
              ...records_list,
              { word, definitions }
            ]
          )
        )

        navigate('Words')
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      word: { word, definitions },
      stored
    } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text style={styles.word}>
          {word}
        </Text>
        <View style={styles.definitions}>
          {definitions.map(this.renderDefinition)}
        </View>
        <View>
          <Button
            title={stored && 'Remove from list' || 'Add to list'}
            onPress={() => this.handleOnPress(word, definitions, stored)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  word: {
    flex: 1
  },
  definitions: {
    flex: 4
  },
  definition: {

  }
})