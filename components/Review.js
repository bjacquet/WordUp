import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import t from 'tcomb-form-native'
import { saveRecord } from '../utils/asyncStorage'

const Form = t.form.Form

const RecordReview = t.struct({
  rating: t.Num,
  review: t.maybe(t.String)
})

export default class Review extends Component {
  constructor(props) {
    super(props)
  }

  state = { record: this.props.record }

  handleSubmit = async () => {
    const value = this._form.getValue()
  
    try {
      let record = this.props.record
      record.review = {
        rating: value.rating,
        review: value.review
      }

      record = await saveRecord(record)
      this.setState({ record })
    } catch (error) {
      console.log(error)
      return false
    }
  }

  render() {
    const { record } = this.state

    return (
      <View style={styles.container}>
        {!record.review &&
          <View> 
            <Text style={{fontSize: 40, alignSelf: 'center'}}>
              Write a review
            </Text>
            <Form
              ref={c => this._form = c}
              type={RecordReview}
            />
            <Button
              title='Save'
              onPress={this.handleSubmit}
            />
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
        }
        {record.review &&
          <View> 
            <Text style={{fontSize: 40, alignSelf: 'center'}}>
              Your review
            </Text>
            <Text style={{fontSize: 25}}>
              Rating {record.review.rating}
            </Text>
            {record.review.review &&
              <Text style={{fontSize: 25}}>
                {record.review.review}
              </Text>
            }
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40
  },
})
