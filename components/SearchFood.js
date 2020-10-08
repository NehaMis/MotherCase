import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert, TextInput, DevSettings } from 'react-native';
import Logo from './Logo';
import EmailAndPassword from './EmailAndPassword';
import LinearGradient from 'react-native-linear-gradient';
import { px } from "./util/dimensions";

export default class SearchFood extends Component {

  constructor(props) {
    super(props);

    this.objRecipe = {};
    this.state = {
      isSearching: false,
      arrSearchedProducts: []
    }
    this.arrSelectedProducts = {};
    this.arrProducts = [
      {
        name: "Apple",
        image_url: require("../assets/apple.png"),
        description: "Raw Apple",
        qty_type: "qty",
        calories: "100",
        qty: 1,
      },
      {
        name: "Oats",
        image_url: require("../assets/oats.jpg"),
        description: "Multigrain Oats with lots of fibres",
        qty_type: "gm",
        calories: "200",
        qty: 200,
      },
      {
        name: "Water",
        image_url: require("../assets/water.jpg"),
        description: "Mineral Water",
        qty_type: "Glass",
        calories: "0",
        qty: 1,
      },
      {
        name: "Poha",
        image_url: require("../assets/poha.jpg"),
        description: "Poha with peanuts",
        qty_type: "gm",
        calories: "250",
        qty: 200,
      },

    ]

  }

  loadRecipe(name) {
    var arrProducts = this.arrProducts.filter(data => {
      return data.name.toLowerCase().startsWith(name.toLowerCase());
    });


    this.setState({ arrSearchedProducts: arrProducts || [] });

  }

  handleSearch(text) {
    if (text === '' || text.length === 0) {
      this.handleStopSearch();
    } else {
      // if (this.state.boolSearchWithNum) {
      //   if (text.length > 9) {
      //     this.loadRecipe(text);
      //   } else {
      //     this.setState({userData: '', arrUserRecharge: []});
      //   }
      //   this.setState({mobile_no: text});
      // } else {

      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }

      this.typingTimeout = setTimeout(() => {
        this.loadRecipe(text);
      }, 100);

      this.setState({ recipe_name: text, isSearching: true });

      //}
    }
  }

  handleStopSearch() {
    this.setState({ recipe_name: "", isSearching: false, arrSearchedProducts: [] });
  }

  addProducts(item) {
    if (!this.arrSelectedProducts[item.name]) {
      this.arrSelectedProducts[item.name] = {
        qty: 0,
        name: item.name,

      }
    }

    this.arrSelectedProducts[item.name].qty += item.qty;
    this.setState({ render: true })
  }

  removeProduct(item) {
    if (this.arrSelectedProducts[item.name] && this.arrSelectedProducts[item.name].qty > 0) {
      this.arrSelectedProducts[item.name].qty -= item.qty;
    }

    this.setState({render:true});
  }

  renderFlatList({ item }) {
    return (
      <View style={styles.card}>
        <View style={{ width: "30%" }}>
          <Image source={item.image_url} style={{ width: px(70), height: px(70) }} />
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ fontSize: px(14) }}>{item.name}</Text>
          <Text style={{ fontSize: px(10), marginTop: px(5) }}>Quantity: {item.qty} {item.qty_type}</Text>
          <Text style={{ fontSize: px(10) }}>Calories: {item.calories}</Text>
        </View>
        <View style={{ width: "20%", alignItems: "center" }}>
          <TouchableOpacity style={styles.buttons} ><Text style={{ fontSize: px(16), color: "white", fontWeight: "bold" }} onPress={()=>this.removeProduct(item)}>-</Text></TouchableOpacity>
          <View style={{ fontSize: px(10), height: px(20), justifyContent: "center" }}>
            {this.arrSelectedProducts[item.name] && this.arrSelectedProducts[item.name].qty > 0 ?
              <Text style={{ fontSize: px(10) }}>{this.arrSelectedProducts[item.name].qty} {item.qty_type}</Text>
              :
              null}
          </View>
          <TouchableOpacity style={styles.buttons} ><Text style={{ fontSize: px(14), color: "white", fontWeight: "bold" }} onPress={() => this.addProducts(item)}>+</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {/* <TouchableOpacity style={styles.searchButton}> */}

          {/* </TouchableOpacity> */}

          <Image source={require('../assets/greySearch.png')} />
          <TextInput value={this.state.recipe_name} onChangeText={(text) => this.handleSearch(text)} style={{ paddingLeft: px(10), width: "100%" }} placeholder="Start Type..."></TextInput>

        </View>

        {!this.state.isSearching ?
          <View style={{ borderRadius: 10, padding: px(10), flexDirection: 'row', marginTop: px(20), borderColor: "grey", borderWidth: 1, marginLeft: "5%", marginRight: "5%", width: "90%", backgroundColor: "white" }}>
            <Image style={{ marginTop: px(15) }} source={require('../assets/greySearch.png')} />
            <View style={{ width: "100%", paddingLeft: px(15) }}>
              <Text style={{ fontWeight: "bold" }}>Start Typing the food name </Text>
              <Text style={{ marginTop: px(5), width: "80%" }}>Search by typing the name of the food you had for breakfast </Text>
            </View>
          </View>
          : null}

        <FlatList
          vertical
          data={this.state.arrSearchedProducts}
          renderItem={(e) => this.renderFlatList(e)}
          // ItemSeparatorComponent={() => this.flatlistSeperator()}
          keyExtractor={(item, index) => {
            return index;
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
    //s justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    height: px(20),
    width: px(20),
    backgroundColor: "#3333cc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flexDirection: "row",
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
    paddingLeft: px(5)
  },
  searchButton: {
    height: 50,
    width: 100,
  }
});
