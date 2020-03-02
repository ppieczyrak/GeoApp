import React from 'react'
import { View, Text, StyleSheet, Switch, Image } from 'react-native'
import Styles from '../Styles'

const ListItem = ({item, toggle}) => {
  return (
    <View style={styles.main}>
      <View>
        <Image
          style={{width: 50, height: 50, resizeMode: 'cover'}}
          source={require('../earth.png')}
        />
      </View>
      <View>
        <Text style={{...styles.text, fontSize: Styles.size_2}}>timestamp: {item.timestamp}</Text>
        <Text style={styles.text}>latitude: {item.coords.latitude}</Text>
        <Text style={styles.text}>longitude: {item.coords.longitude}</Text>
      </View>
      <View>
        <Switch trackColor={Styles.accent} thumbColor={Styles.accent} value={item.on} onValueChange={() => {toggle(item.id)}}/>
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 4,
    marginHorizontal: 8,
    padding: 8,
    backgroundColor: Styles.color_2,
    borderRadius: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  upper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: Styles.size_1,
    color: Styles.text,
    fontFamily: 'custom'
  }
})

export default ListItem