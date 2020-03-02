import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native'
import Styles from '../Styles';
import * as Font from "expo-font";
import MyButton from './MyButton';
import * as Permissions from "expo-permissions";

export default class Main extends Component {

  state = {
    loading: true
  }

  static navigationOptions = {
    header: null,
    
  }

  setPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
    }
}

  componentDidMount = async () => {
    await Font.loadAsync({
      'custom': require('../TitilliumWeb.ttf'),
    });
    this.setState({ loading: false })
    this.setPermissions();
  }

  render() {
    const {state} = this;
    const {navigation} = this.props;
    return (
      !state.loading ?
      (
        <View style={styles.main}>
          <View style={styles.header}>
            <Text style={{fontSize: Styles.size_3, ...styles.text}}>
              GeoMap App
            </Text>
            <Text style={{fontSize: Styles.size_2, ...styles.text}}>
              find and save your position
            </Text>
          </View>
          <View style={styles.content}>
            <MyButton 
              text="START" 
              textStyle={{color: Styles.text, fontFamily: 'custom'}} 
              OnClick={() => {navigation.navigate('list')}}
            />
          </View>
        </View>
      )
      :
      <View style={styles.main}>
        <View style={styles.center}>
          <ActivityIndicator color={Styles.accent} size='large'/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Styles.color_1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    paddingTop: StatusBar.currentHeight,
    flex: 2,
    backgroundColor: Styles.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'custom',
    color: Styles.color_1
  }
})