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
    const { review } = record.review || { rating: '', review: '' }

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
              value={review}
            />
            <Button
              title='Save'
              onPress={this.handleSubmit}
            />
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
