import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Button } from 'react-native'

import { getState } from '../store'
import { getAllRecords } from '../utils/asyncStorage'
import RecordListItem from '../components/RecordListItem'

const keyExtractor = ({ id }) => id

export default class Words extends Component {
  state = {
    records: []
  }

  initializeData = async () => {
    try {
      const records = await getAllRecords()
      this.setState({records})
    } catch (error) {
      console.log(error)
    }
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

  componentDidMount() {
    this.initializeData()
    console.log('Words - componentDidMount')
  }

  render() {
    const { navigation: { navigate } } = this.props
    const { records } = getState()

    console.log('Words - render')
    console.dir(records)

    return (
      <View style={styles.container}>
        {records.length > 0 &&
          <FlatList
            data={records}
            keyExtractor={keyExtractor}
            renderItem={this.renderWord}
            numColumns={5}
          />
        }
        <Button title='Search' onPress={() => navigate('Search')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
})
