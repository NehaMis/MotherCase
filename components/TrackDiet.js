import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'; import { TouchableOpacity } from 'react-native-gesture-handler';
;
import { px } from "./util/dimensions";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class TrackDiet extends Component {
  doc = [
    { name: 'Breakfast' },
    { name: 'Morning Snack' },
    { name: 'Lunch' },
    { name: 'Evening Snack' },
    { name: 'Dinner' },
  ];

  constructor(props) {
    super(props);
    this.state = {
      total_cal_intake: 0
    }
  }

  componentDidMount() {
    let userId = auth().currentUser.uid;
    let date = new Date();
    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    this.snapshot = firestore().collection("users").doc(userId).collection("diet_intake").doc(date).onSnapshot((arrdata) => {
      if (arrdata.exists !== true) {
        firestore().collection("users").doc(userId).collection("diet_intake").doc(date).set({
          date: date,
          total_cal_intake: 0,
          glass_of_water_intake: 0,
          timely_intake: {
            breakfast: 0,
            morning_snack: 0,
            lunch: 0,
            evening_snack: 0,
            dinner: 0
          },
          timely_intake_recipes: {
            breakfast: {},
            morning_snack: {},
            lunch: {},
            evening_snack: {},
            dinner: {}
          }
        });
      }
      else{
        let data = arrdata.data();
        this.setState(data.timely_intake);
        this.setState({total_cal_intake: data.total_cal_intake});
      }
    });
  }

  componentWillUnmount(){
    this.snapshot && this.snapshot();
  }



  showRecipe(recipe) {
    this.props.navigation.navigate('SearchFood', recipe);
  }

  renderFlatList({ item }) {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={{ padding: px(10), flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            this.showRecipe(item);
          }}>
          <View style={{ flexDirection: "column", width: "90%" }}>
            <Text style={[styles.headerText, { color: "#239B56" }]}>{item.name}</Text>
        <Text>Calories Took: {this.state[item.name.toLowerCase().split(" ").join("_")]}/200</Text>
          </View>
          <View style={{ width: px(20), height: px(20), borderRadius: px(10), backgroundColor: "blue", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>+</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }


  flatlistSeperator() {
    return (
      <View style={{ height: 1, width: '100%', alignItems: "center" }}>
        <View style={{ height: 1, width: '90%', backgroundColor: '#ccc' }}>

        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: px(10) }}>Today Calories Took: {this.state.total_cal_intake} / 1000</Text>

        <Text style={{ ...styles.headerText, ...{ marginTop: px(10) } }}>What would you like to track ?</Text>
        <FlatList
          vertical
          data={this.doc}
          renderItem={(e) => this.renderFlatList(e)}
          ItemSeparatorComponent={() => this.flatlistSeperator()}
          keyExtractor={(item, index) => {
            return index + "";
          }}
          style={{ width: "100%" }}
          scrollEnabled={true}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"#2c3e50",
  },
  headerText: {
    fontSize: px(16),
  },

  card: {
    justifyContent: 'center',
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