import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Button, ActivityIndicator, Text } from 'react-native'

import RecordListItem from '../components/RecordListItem'
import { TheState } from '../contextApi'

const keyExtractor = ({ id }) => id

export default class Words extends Component {
  state = {
    isFetchingRecords: true,
    thumbs: [],
    error: false,
    loading: false,
  }

  renderWord = ({ item }) => {
    const { navigation: { navigate } } = this.props
 
    return (
      <RecordListItem
        record={item}
        onPress={() => navigate('Record', { record: item, stored: true })}
      />
    )
  }

  render() {
    const { navigation: { navigate } } = this.props

    return (
      <View style={styles.container}>
        <TheState.Consumer>
          {({ val }) => {
            const records = val.records

            if (records.length > 0) {
              return (
                <FlatList
                  data={records.reverse()}
                  keyExtractor={keyExtractor}
                  renderItem={this.renderWord}
                  numColumns={5}
                  style={styles.records}
              />
              )
            }

            return (
              <View style={styles.noRecords}>
                <Text style={styles.noRecordsText}>
                  Your record collection is empty!
                </Text>
              </View>
            )
          }}
        </TheState.Consumer>
        <Button title='Search' onPress={() => navigate('Search')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  records: {
    flex: 1
  },
  noRecords: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30
  },
  noRecordsText: {
    textAlign: 'center',
    fontSize: 30
  }
})
