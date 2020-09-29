import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {px} from './util/dimensions';

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
        <LinearGradient
          colors={['#1A2980', '#0172E8']}
          style={styles.linearGradient}>
          <View style={styles.profileCard}>
            <Image
              source={require('../assets/profile.png')}
              style={{
                height: px(80),
                width: px(80),
                borderRadius: px(40),
              }}
            />
            <Text style={{color: 'white', fontSize: px(22), marginTop: px(50)}}>
              {this.state.name}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          <View style={{flexDirection: 'row', width: '100%', height: px(60)}}>
            <View style={{width: '33%', alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: 'black', fontSize: px(16)}}>Height</Text>
            </View>

            <View style={{width: '33%', alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: 'black', fontSize: px(16)}}>Weight</Text>
            </View>

            <View style={{width: '33%', alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: 'black', fontSize: px(16)}}>Age</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', height: px(30)}}>
            <View style={{width: '33%', alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: 'black', fontSize: px(14)}}>{this.state.height} feet</Text>
            </View>

            <View style={{width: '33%', alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: 'black', fontSize: px(14)}}>{this.state.weight} Kg</Text>
            </View>

            <View style={{width: '33%', alignItems: "center", justifyContent: "center"}}>
              <Text style={{color: 'black', fontSize: px(14)}}>{this.state.age || 'Not Set'}</Text>
            </View>
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
  card: {
    alignSelf: 'center',
    backgroundColor: 'white',
    minHeight: px(100),
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
    borderRadius: 10,
  },
  linearGradient: {
    height: px(250),
    width: '100%',
    padding: px(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
