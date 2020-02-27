import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Image, ImageBackground, SafeAreaView } from 'react-native'

import { saveRecord, deleteRecord } from '../utils/asyncStorage'
import { TheState } from '../contextApi'
import Review from '../components/Review'
import { ScrollView } from 'react-native-gesture-handler'

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
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <ImageBackground
              source={{uri: record.thumb}}
              style={styles.imageBackground}
              imageStyle={{resizeMode: 'stretch'}}
              blurRadius={3.14}
            >
              <Image
                source={{uri: record.thumb}}
                style={styles.image}
              />
            </ImageBackground>
            <View style={{padding: 20}}>
              <Text style={styles.contentDetails}>
                {record.word}
              </Text>
              <Text style={styles.contentDetails}>
                Released date: {record.year}
              </Text>
            </View>
            {stored &&
              <Review record={record} />
            }
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
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentDetails: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  imageBackground: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center'
  },
  image: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
    paddingVertical: 20
  },
  reviewContainer: {
    padding: 20
  },
})
