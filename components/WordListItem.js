import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default class WordListItem extends Component {
  render() {
    const { word, definitions, onPress } = this.props

    return (
      <View>
        <Text style={styles.word}>
          {word}
        </Text>
        <Text>
          {definitions[0]}
        </Text>
        <Button title='hit' onPress={onPress}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  word: {
    
  },
  definition: {

  }
})
