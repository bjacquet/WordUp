import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Image } from 'react-native'

import { saveRecord, deleteRecord } from '../utils/asyncStorage'
import { TheState } from '../contextApi'

export default class Record extends Component {
  renderDefinition = (definition) => {
    return (
      <Text style={styles.definition}>
        {definition}
      </Text>
    )
  }

  handleOnPress = async (record, stored, callback) => {
    const { navigation: { navigate } } = this.props

    try {
      stored ? await deleteRecord(record) : await saveRecord(record)
      
      callback()
      navigate('Words')
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      record,
      stored
    } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View>
            <Image
              source={record.thumb}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.word}>
              {record.word}
            </Text>
            <View style={styles.definitions}>
              {record.definitions.map(this.renderDefinition)}
            </View>
          </View>
        </View>
        <View>
          <TheState.Consumer>
            {({ updateTheState }) => {
              return (
                <Button
                  title={stored && 'Remove from list' || 'Add to list'}
                  onPress={() => this.handleOnPress(record, stored, updateTheState)}
                />
              )
            }}
          </TheState.Consumer>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  word: {
    flex: 1
  },
  definitions: {
    flex: 4
  },
  definition: {

  },
  image: {
    width: 200,
    height: 200
  }
})
