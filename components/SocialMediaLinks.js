import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { getMasterRelease } from '../utils/discogs'

export default class SocialMediaLinks extends Component {
  state = {
    videos: []
  }

  componentDidMount = async () => {
    try {
      const { masterId } = this.props
      const record = await getMasterRelease(masterId)
      
      this.setState({
        videos: record.videos.map(v => v.uri),
      })
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderYouTubeItem ({ item }) {
    return (
      <Text>{item}</Text>
    )
  }

  render() {
    const { videos } = this.state

    return(
      <View style={{padding: 20}}>
        <Text style={styles.sectionTitle}>
          Videos
        </Text>
        {
          videos.map(
            video => (
              <Text>{video}</Text>
            )
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  videoList: {
    margin: 5,
    backgroundColor: 'skyblue',
  }
})