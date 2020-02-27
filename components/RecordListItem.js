import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class RecordListItem extends Component {
  render() {
    const { record, onPress } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          <Image
            source={{ uri: record.thumb }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  word: {
    
  },
  definition: {

  },
  image: {
    width: 135,
    height: 135,
  }
})
