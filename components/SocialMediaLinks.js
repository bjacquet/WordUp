import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { WebView } from 'react-native-webview';

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
        videos: record.videos.map(v => v.uri.replace('/watch?', '/embed?')),
      })
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  render() {
    const { videos } = this.state

    console.log(videos[0])

    return(
      <View style={{padding: 20}}>
        <Text style={styles.sectionTitle}>
          Videos
        </Text>
        <View>
        <WebView
                source={{ uri: videos[0] }}
                style={{ marginTop: 20 }}
              /></View>
        {/* {
          videos.map(
            video => (
              <WebView
                source={{ uri: video }}
                style={{ marginTop: 20 }}
                key={video}
              />
            )
          )
        } */}
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
