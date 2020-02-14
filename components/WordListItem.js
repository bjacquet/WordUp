import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class WordListItem extends Component {
  render() {
    const { word, definitions, onPress } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <Text style={styles.word}>
            {word}
          </Text>
          <Text>
            {definitions[0]}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  word: {
    
  },
  definition: {

  }
})
