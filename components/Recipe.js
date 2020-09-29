import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert} from 'react-native';
import Logo from './Logo';
import EmailAndPassword from './EmailAndPassword';
import LinearGradient from 'react-native-linear-gradient';

export default class Recipe extends Component {

  constructor(props) {
      super(props);

      this.objRecipe = {};
   
     
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
        Development in process!
        </Text>
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
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailAndPassword: {
    flex: 2,
  },
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  header: {
    height: 50,
    width: 380,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
  },
  data: {
    flexDirection: 'row',
  },
  foodImage: {
    height: 65,
    width: 65,
    marginRight: 20
  },
  foodDescription: {
    justifyContent: 'center',
  },
  card: {
    minHeight: 230,
    width: 380,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2.22,
    elevation: 3,
  },
});
