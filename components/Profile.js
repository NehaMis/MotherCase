import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Logo from './Logo';
import EmailAndPassword from './EmailAndPassword';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class Profile extends Component {
  state = {};

  componentDidMount() {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then((data) => {
        if (data.exists) {
          this.setState(data.data());
        }
      })
      .catch((error) => {});
  }

  handleLogout() {
    auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {/* <LinearGradient
            colors={['#1A2980', '#26D0CE']}
            style={styles.linearGradient}>
            <Text style={{color: 'white', fontSize: 22}}>
              Personal Information
            </Text>
          </LinearGradient> */}
            <Image
                    source={require('../assets/profile.png')}
                    style={{
                      height: 65,
                      width: 65,
                      borderRadius: 30,
                      // margin: 10
                    }}></Image>
          <View style={styles.foodDescription}>
            <Text style={{color: 'black', fontSize: 26}}>
               {this.state.name}
            </Text>
            <Text style={{color: 'black', fontSize: 16}}>
              Height: {this.state.height}
            </Text>
            <Text style={{color: 'black', fontSize: 16}}>
              Weight: {this.state.weight}
            </Text>
            <Text style={{color: 'black', fontSize: 16}}>
              Pregnancy Week: {this.state.preg_weeks || 'NA'}
            </Text>
            {/* <Text style={{color: 'black', fontSize: 16}}>
              Today Calories Took: {this.state.calories || 0}
            </Text> */}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.handleLogout()}
          style={{marginTop: 20, flexDirection: 'row'}}>
             <Image
                    source={require('../assets/logout.png')}
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: 30,
                      // margin: 10
                    }}></Image>
          <Text style={{color: 'black', fontSize: 20}}> Logout</Text>
        </TouchableOpacity>
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
    padding: 7,
    paddingLeft: 20,
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
    marginRight: 20,
  },
  foodDescription: {
    justifyContent: 'center',
    padding: 20
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    minHeight: 230,
    width: '95%',
    borderWidth: 1,
    borderRadius: 5,
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
