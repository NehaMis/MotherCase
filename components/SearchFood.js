import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert} from 'react-native';
import Logo from './Logo';
import EmailAndPassword from './EmailAndPassword';
import LinearGradient from 'react-native-linear-gradient';
import {px} from "./util/dimensions";
import { TextInput } from 'react-native-gesture-handler';

export default class SearchFood extends Component {

  constructor(props) {
      super(props);

      this.objRecipe = {};
   
     
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
              <TextInput></TextInput>
              <TouchableOpacity  style={styles.searchButton}> <Image source = {require('../assets/greySearch.png')}></Image>
          </TouchableOpacity>
          </View>  
          <View>
             <Text>Start Typing the food name </Text>
             <Text>Search by typing the name of the food you had for breakfast </Text>
             </View> 
            <Image source = {require('../assets/greySearch.png')}></Image>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //s justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    justifyContent: 'center',
     alignItems: 'center',
    alignSelf: "center",
    backgroundColor: 'white',
    minHeight: px(30),
    width: '92%',
    shadowOpacity: 0.8,
    borderBottomWidth: 0,
    shadowRadius: 2,
    marginTop: px(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
    overflow: "hidden",

    },
    searchButton:{
        height: 50,
        width: 100,
    }
});
