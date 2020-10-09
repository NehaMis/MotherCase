import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert, TextInput, Modal } from 'react-native';
import Logo from './Logo';
import EmailAndPassword from './EmailAndPassword';
import LinearGradient from 'react-native-linear-gradient';
import { px } from "./util/dimensions";
import { SafeAreaView } from 'react-native-safe-area-context';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class SearchFood extends Component {

  constructor(props) {
    super(props);

    this.objRecipe = {};
    this.state = {
      isSearching: false,
      arrSearchedProducts: [],
      openAddProduct: false,
      arrIntakeProducts: []
    }
    this.arrSelectedProducts = {};
    this.arrProducts = [
      {
        name: "Apple",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mother-care-7f6c8.appspot.com/o/foods%2Fapple.png?alt=media&token=f5139189-7d9d-463a-b1a9-8da4822a9b0e",
        description: "Raw Apple",
        qty_type: "qty",
        calories: "100",
        qty: 1,
      },
      {
        name: "Oats",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mother-care-7f6c8.appspot.com/o/foods%2Foats.jpg?alt=media&token=cf362198-8ad7-4a95-b701-1bc69e809f28",
        description: "Multigrain Oats with lots of fibres",
        qty_type: "gm",
        calories: "200",
        qty: 200,
      },
      {
        name: "Water",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mother-care-7f6c8.appspot.com/o/foods%2Fwater.jpg?alt=media&token=2ea44a5f-d88f-47d3-96a4-9a75dda5ba39",
        description: "Mineral Water",
        qty_type: "Glass",
        calories: "0",
        qty: 1,
      },
      {
        name: "Poha",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mother-care-7f6c8.appspot.com/o/foods%2Fpoha.jpg?alt=media&token=310e77ff-de84-4809-b596-36f3cb360b35",
        description: "Poha with peanuts",
        qty_type: "gm",
        calories: "250",
        qty: 200,
      },
      {
        name: "Peanuts",
        image_url: "https://firebasestorage.googleapis.com/v0/b/mother-care-7f6c8.appspot.com/o/foods%2Fpeanut.jpg?alt=media&token=b0e0327d-abd6-490f-990e-e1a32efbd4d1",
        description: "Raw Peanuts",
        qty_type: "gm",
        calories: "100",
        qty: 100,
      },
    ]

    this.strCategory = this.props.route.params.name || "";
  }

  loadRecipe(name) {
    var arrProducts = this.arrProducts.filter(data => {
      return data.name.toLowerCase().startsWith(name.toLowerCase());
    });


    this.setState({ arrSearchedProducts: arrProducts || [] });

  }

  componentDidMount() {
    let userid = auth().currentUser.uid;
    let date = new Date();
    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let category_id = this.strCategory.toLowerCase().split(" ").join("_");

    this.snapshot = firestore().collection("users").doc(userid).collection("diet_intake").doc(date).onSnapshot(data => {
      let arrData = data.data();

      let arr = [];
      for (let product in arrData.timely_intake_recipes[category_id]) {
        arr.push(arrData.timely_intake_recipes[category_id][product]);
      }

      this.setState({
        arrIntakeProducts: arr
      });
    })
  }

  componentWillUnmount() {
    this.snapshot && this.snapshot();
  }

  handleSearch(text) {
    if (text === '' || text.length === 0) {
      this.handleStopSearch();
    } else {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }

      this.typingTimeout = setTimeout(() => {
        this.loadRecipe(text);
      }, 100);

      this.setState({ recipe_name: text, isSearching: true });
    }
  }

  handleStopSearch() {
    this.setState({ recipe_name: "", isSearching: false, arrSearchedProducts: [] });
  }

  addProducts(item) {
    if (!this.arrSelectedProducts[item.name]) {
      this.arrSelectedProducts[item.name] = {
        ...item,
        qty: 0,
        consuming_qty: 0
      }
    }

    this.arrSelectedProducts[item.name].qty += item.qty;
    this.arrSelectedProducts[item.name].consuming_qty += 1;
    this.setState({ render: true })
  }

  removeProduct(item) {
    if (this.arrSelectedProducts[item.name] && this.arrSelectedProducts[item.name].qty > 0) {
      this.arrSelectedProducts[item.name].qty -= item.qty;
    }

    this.setState({ render: true });
  }

  renderFlatList({ item }) {
    return (
      <View style={styles.card}>
        <View style={{ width: "30%" }}>
          <Image source={{uri:item.image_url}} style={{ width: px(70), height: px(70) }} />
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ fontSize: px(14) }}>{item.name}</Text>
          <Text style={{ fontSize: px(10), marginTop: px(5) }}>Quantity: {item.qty} {item.qty_type}</Text>
          <Text style={{ fontSize: px(10) }}>Calories: {item.calories}</Text>
        </View>
        <View style={{ width: "20%", alignItems: "center" }}>
          <TouchableOpacity style={styles.buttons} ><Text style={{ fontSize: px(16), color: "white", fontWeight: "bold" }} onPress={() => this.removeProduct(item)}>-</Text></TouchableOpacity>
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

  handleOpenAddProduct() {
    this.setState({ openAddProduct: true });
  }

  handleAddProduct() {
    try {
      let category_id = this.strCategory.toLowerCase().split(" ").join("_");
      let arrUpdateData = {
        timely_intake: {
          [category_id]: 0
        },
        timely_intake_recipes: {
          [category_id]: {}
        },
        total_cal_intake: 0
      }

      let calCount = 0;

      for (let id in this.arrSelectedProducts) {
        let product = this.arrSelectedProducts[id];

        calCount += product.consuming_qty * 1 * product.calories;
        let newid = (id.toLowerCase()).split(" ").join("_");
        arrUpdateData.timely_intake_recipes[category_id][newid] = {
          name: product.name,
          image_url: product.image_url,
          description: product.description,
          qty_type: product.qty_type,
          calories: firebase.firestore.FieldValue.increment(parseInt(product.consuming_qty * 1 * product.calories)),
          qty: firebase.firestore.FieldValue.increment(parseInt(product.qty)),
        }
      }

      arrUpdateData.timely_intake[category_id] = firebase.firestore.FieldValue.increment(parseInt(calCount));
      arrUpdateData.total_cal_intake = firebase.firestore.FieldValue.increment(parseInt(calCount));

      let date = new Date();
      date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      let userid = auth().currentUser.uid;
      firestore().collection("users").doc(userid).collection("diet_intake").doc(date).set(arrUpdateData, { merge: true }).then(() => {
        this.setState({ openAddProduct: false });
      }).catch(error => {

      });

    }
    catch (error) {
      Alert.alert("here")
      this.setState({ openAddProduct: false });
    }

  }

  renderConsumedFood({ item }) {
    return (
      <View style={styles.card}>
        <View style={{ width: "30%" }}>
          <Image source={{uri:item.image_url}} style={{ width: px(70), height: px(70) }} />
        </View>
        <View style={{ width: "50%" }}>
          <Text style={{ fontSize: px(14) }}>{item.name}</Text>
          <Text style={{ fontSize: px(10), marginTop: px(5) }}>Quantity: {item.qty} {item.qty_type}</Text>
          <Text style={{ fontSize: px(10) }}>Calories: {item.calories}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          vertical
          data={this.state.arrIntakeProducts}
          renderItem={(e) => this.renderConsumedFood(e)}
          // ItemSeparatorComponent={() => this.flatlistSeperator()}
          keyExtractor={(item, index) => {
            return index + "";
          }}
          style={{ width: "100%" }}
          scrollEnabled={true}
        />


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.openAddProduct}
          onRequestClose={() => this.setState({ openAddProduct: false })}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={{ paddingBottom: px(55) }}>
                <View style={styles.card}>
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
                    return index + "";
                  }}
                  style={{ width: "100%" }}
                  scrollEnabled={true}
                />
              </View>

              <View style={{ flexDirection: "row", justifyContent: 'center', position: "absolute", bottom: 0, width: "100%", height: px(50), backgroundColor: "#eee", alignItems: "center" }}>

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: 'white' }}
                  onPress={() => {
                    this.setState({ openAddProduct: false });
                  }}>
                  <Text style={{ ...styles.textStyle, color: '#2196F3' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => this.handleAddProduct()}>
                  <Text style={styles.textStyle}>Add</Text>
                </TouchableOpacity>

              </View>


            </View>
          </View>

        </Modal>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            this.handleOpenAddProduct();
          }}>
          <Text
            style={{
              ...styles.textStyle,
              fontSize: px(20),
              fontWeight: '200',
              alignSelf: 'center',
            }}>
            +
              </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  plusButton: {
    backgroundColor: '#2196F3',
    borderRadius: 50,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: px(40),
    height: px(40),
    position: 'absolute',
    right: px(20),
    bottom: px(20),
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: px(80),
    marginRight: px(10),
    height: px(35)
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
