import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class Word extends Component {
  renderDefinition = (definition) => {
    return (
      <Text style={styles.definition}>
        {definition}
      </Text>
    )
  }

  render() {
    const { word, definitions } = this.props.word || { word: 'asd', definitions: ['qwe', 'zxc'] }
    console.dir(this.props)

    return (
      <View style={styles.container}>
        <Text style={styles.word}>
          {word}
        </Text>
        <View style={styles.definitions}>
          {definitions.map(this.renderDefinition)}
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