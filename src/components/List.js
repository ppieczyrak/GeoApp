import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Switch, AsyncStorage, ActivityIndicator } from 'react-native';
import Styles from '../Styles';
import * as Location from "expo-location";
import MyButton from './MyButton';
import ListItem from './ListItem';

export default class List extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: Styles.accent
    },
    title: 'Zapis pozycji',
    headerTitleStyle: {
      fontWeight: '100'
    },
    headerTintColor: '#fff'
  }

  state = {
    list: [],
    loading: true,
    switch: false
  }

  componentDidMount(){
    this.getStorage()
  }
  
  componentDidUpdate(){
    const {state} = this
    console.log(state.list)
    const listWithEnabled = state.list.filter(el => {
      return el.on === true
    })
    if(listWithEnabled.length === 0 && state.list.length > 0 && state.switch === true){
      this.setState({switch: false})
    }
    else if(listWithEnabled.length === state.list.length && state.list.length > 0 && state.switch === false){
      this.setState({switch: true})
    }
  }

  genKey = () => {
    return (Math.round(Date.now() / 1000000) * Math.round(Math.random() * 1000000)).toString(16)
  }

  clearAll = () => {
    this.setState({list: []}, () => {
      this.setState({loading: false})
      this.updateStorage()
    })
  }

  getStorage = async () => {
    let sList = await AsyncStorage.getItem('list')
    sList = JSON.parse(sList)
    if(sList == null){
      this.setState({list: []}, () => {
        this.setState({loading: false})
        this.updateStorage()
      })
      return
    }
    this.setState({list: sList}, () => {
      this.setState({loading: false})
      this.updateStorage()
    })
  }

  getPosition = async () => {
    this.setState({loading: true})
    const {state} = this
    let pos = await Location.getCurrentPositionAsync({})
    let newList = [...state.list]
    pos.id = this.genKey()
    pos.on = true
    newList.push(pos)
    this.setState({list: newList}, () => {
      this.setState({loading: false})
      this.updateStorage()
    })
  }

  updateStorage = async () => {
    const {state} = this
    let sList = await AsyncStorage.getItem('list')
    sList = JSON.parse(sList)
    await AsyncStorage.setItem('list', JSON.stringify(state.list));
  }

  toggleOne = id => {
    const newList = this.state.list.map(el => {
      if(el.id === id){
        el.on = !el.on
      }
      return el
    })
    this.setState({list: newList}, () => {
      this.updateStorage()
    })
  }
  
  toggleAll = () => {
    const newList = this.state.list.map(el => {
      el.on = !this.state.switch;
      return el
    })
    this.setState({list: newList, switch: !this.state.switch})
  }

  goToMap = () => {
    const {state} = this
    const {navigation} = this.props
    const enabledList = state.list.filter(el => {
      return el.on === true
    })
    if(enabledList.length === 0){
      alert("zaznacz przynajmniej jedną pozycję")
      return
    }
    navigation.navigate('map', {list: enabledList})
  }

  render() {
    const {state} = this; 
    return (
      !state.loading ?
      <View style={styles.main}>
        <View style={styles.menu1}>
          <MyButton 
            text="POBIERZ I ZAPISZ POZYCJĘ" 
            OnClick={this.getPosition}
            textStyle={{color: Styles.text, fontFamily: 'custom'}}
          />
          <MyButton 
            text="USUŃ WSZYSTKIE DANE" 
            OnClick={this.clearAll}
            style={{paddingHorizontal: 8}}
            textStyle={{color: Styles.text, fontFamily: 'custom'}}
          />
          <MyButton 
            text="PRZEJDŹ DO MAPY" 
            OnClick={this.goToMap}
            style={{paddingHorizontal: 8}}
            textStyle={{color: Styles.text, fontFamily: 'custom'}}
          />
        </View>
        <View style={styles.menu2}>
          <Switch thumbColor={Styles.accent} onValueChange={this.toggleAll} value={state.switch}/>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={state.list}
            renderItem={({ item }) => <ListItem toggle={this.toggleOne} item={item}/>}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      :
      <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color={Styles.accent} size='large'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Styles.color_1,
  },
  menu1: {
    backgroundColor: Styles.color_2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  menu2: {
    alignItems: 'flex-end',
    padding: 8,
  }
})