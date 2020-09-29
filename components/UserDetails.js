import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import Logo  from './Logo';

export default class UserDetails extends Component {
  state = {
    height: '',
    weight: '',
    week: '',
    age: '',
    initializing: true,
    color: 'white',
  };

  onSubmit() {
    const {height, weight, name, age, preg_week} = this.state;

    if (name === '') {
      Alert.alert('Enter Valid Name');
      return;
    }

    firestore().collection('users').doc(auth().currentUser.uid).set({
      height,
      weight,
      preg_week,
      age,
      name,
    });

    this.props.onSubmit();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style ={styles.articleContainer}></View> */}
        <View style ={styles.logoContainer}>
                    <Logo/>
       </View>
        <TextInput
          placeholder="Name"
          style={[
            styles.input,
            {
              borderColor: this.state.color,
            },
          ]}
          selectionColor= "#0172E8"
          value={this.state.name}
       //   onChange={(keyPress) => this.setState({color: '#0172E8'})}
          onChangeText={(name) => this.setState({name})}
        />

        <TextInput
          placeholder="Height"
          keyboardType="number-pad"
          style={[
            styles.input,
            {
              borderColor: this.state.color,
            },
          ]}
          selectionColor= "#0172E8"
          value={this.state.height}
        //  onKeyPress={(keyPress) => this.setState({color: '#0172E8'})}
          onChangeText={(height) => this.setState({height})}
        />
        <TextInput
          placeholder="Weight"
          keyboardType="number-pad"
          style={[
            styles.input,
            {
              borderColor: this.state.color,
            },
          ]}
          selectionColor= "#0172E8"
        
          value={this.state.weight}
         // onSelectionChange={() => this.setState({color: '#0172E8'})}
          onChangeText={(weight) => this.setState({weight})}
        />
        <TextInput
          placeholder="Pregnancy week"
          keyboardType="number-pad"
          style={[
            styles.input,
            {
              borderColor: this.state.color,
            },
          ]}
          selectionColor= "#0172E8"
          value={this.state.week}
         //  onChange={() => this.setState({color: '#0172E8'})}
          onChangeText={(week) => this.setState({week})}
        />
        <TextInput
          placeholder="Age"
          keyboardType="number-pad"
          style={[
            styles.input,
            {
              borderColor: this.state.color,
            },
          ]}
          selectionColor= "#0172E8"
          value={this.state.age}
        //  onKeyPress={(keyPress) => this.setState({color: '#0172E8'})}
          onChangeText={(age) => this.setState({age})}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.onSubmit()}>
          <Text style={styles.errorText}>Save</Text>
        </TouchableOpacity>
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
    // backgroundColor:"#2c3e50",
  },
  logoContainer:{
    justifyContent: 'center',
    alignItems: 'center',   
},
  articleContainer: {
    padding: 10,
    borderBottomColor: 'red',
    borderBottomWidth: 5,
  },
  heading: {
    fontSize: 22,
    color: 'blue',
    padding: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 22,
    color: 'green',
    padding: 10,
    marginTop: 10,
  },
  input: {
    height: 45,
    width: 300,
    backgroundColor: 'white',
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 20,
    fontSize: 15,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 20,
    color: 'white',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
 
  },
  buttonContainer: {
    backgroundColor: '#0052D0',
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300
  },
});
