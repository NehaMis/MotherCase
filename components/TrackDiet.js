import React, { Component } from 'react' ;
import { View, Text, StyleSheet, FlatList, Alert} from 'react-native';import { TouchableOpacity } from 'react-native-gesture-handler';
;
import {px} from "./util/dimensions";

export default class TrackDiet extends Component {
    doc = [
        {name: 'Breakfast'},
        {name: 'Morning Snack'},
        {name: 'Lunch'},
        {name: 'Evening Snack'},
        {name: 'Dinner'},
    ];

    constructor(props) {
        super(props);
      }
   

    
      showRecipe(recipe) {
        this.props.navigation.navigate('SearchFood', {name: 'test'});
      }
    
      renderFlatList({item}) {
        return (
          <View style={styles.card}>
              <TouchableOpacity
        style={{padding: px(10)}}
        onPress={() => {
          this.showRecipe(item);
        }}>
              <Text style={[styles.headerText, {color: "#239B56"}]}>{item.name}</Text>
              </TouchableOpacity>
              
          </View>
        );
      }

  
      flatlistSeperator() {
        return (
          <View style={{height: 1, width: '100%',alignItems: "center"}}>
            <View style={{height: 1, width: '90%', backgroundColor: '#ccc'}}>
    
            </View>
          </View>
        );
      }

      render() {
        return (
          <View style={styles.container}>
                <Text style={styles.headerText}>What would you like to track ?</Text>
            <FlatList
              vertical
              data={this.doc}
              renderItem={(e) => this.renderFlatList(e)}
              ItemSeparatorComponent={() => this.flatlistSeperator()}
              keyExtractor={(item, index) => {
                return index;
              }}
              style={{width: "100%"}}
              scrollEnabled={true}
            />
          </View>
        );
      }
    }
    

const styles = StyleSheet. create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     // backgroundColor:"#2c3e50",
    },
    headerText:{
        fontSize: px(16),
        margin: 5,
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

    }
  });