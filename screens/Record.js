import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Image, ImageBackground, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { saveRecord, deleteRecord } from '../utils/asyncStorage'
import { TheState } from '../contextApi'
import Review from '../components/Review'
import SocialMediaLinks from '../components/SocialMediaLinks'

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
              <Text style={styles.contentSectionTitle}>
                {record.title}
              </Text>
              <Text style={styles.contentSectionTitle}>
                {record.artists.map(a => a.name).join(', ')}
              </Text>
              <Text style={styles.contentSectionContent}>
                Release date: {record.year}
              </Text>
              <View style={{padding: 5}}>
              {
                record.tracklist.sort((a, b) => a.position - b.position).map(
                  track => (
                    <Text style={styles.contentSectionContent} key={track.position}>
                      {track.position} {track.title} {track.duration && '(' + track.duration + ')'}
                    </Text>
                  )
                )
              }
              </View>
            </View>
            {stored &&
              <Review record={record} />
            }
            <SocialMediaLinks masterId={record.id} />
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
  contentSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  contentSectionContent: {
    fontSize: 15
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
