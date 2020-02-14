import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class WordListItem extends Component {
  render() {
    const { word, definitions } = this.props

    return (
      <View>
        <Text style={styles.word}>
          {word}
        </Text>
        <Text>
          {definitions[0]}
        </Text>
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
