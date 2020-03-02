import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Styles from '../Styles'

const MyButton = ({text, OnClick, style, textStyle}) => {
  return (
    <TouchableOpacity 
      onPress={OnClick} 
      style={{...styles.touch, ...style}}
    >
      <Text style={{...styles.text, ...textStyle}}>{text}</Text> 
    </TouchableOpacity>
  )
}

MyButton.propTypes = {
  text: PropTypes.string.isRequired,
  OnClick: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: Styles.text
  },
  touch: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default MyButton