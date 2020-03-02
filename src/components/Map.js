import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Styles from '../Styles'
import MapView from 'react-native-maps';

export default class Map extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: Styles.accent
    },
    title: 'Lokalizacja na mapie',
    headerTitleStyle: {
      fontWeight: '100'
    },
    headerTintColor: '#fff'
  }

  render() {
    const {list} = this.props.navigation.state.params
    const positions = list.map(el => {
      return(
        <MapView.Marker
          coordinate={{
              latitude: el.coords.latitude,
              longitude: el.coords.longitude,
          }}
          key = {el.id}
          title = {el.id}
        />
      )
    })
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
              latitude: list[0] ? list[0].coords.latitude : 50.049683,
              longitude: list[0] ? list[0].coords.longitude : 19.944544,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
          }}
        >
        {positions}
        </MapView>
      </View>
    )
  }
}