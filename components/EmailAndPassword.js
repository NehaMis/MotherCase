import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default class EmailAndPassword extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    isSignUp: false,
  };

  handleLogin() {

    this.setState({error: ''});

    if (this.state.email === '' || this.state.password === '') {
      this.setState({error: 'Please enter your details'});
      return;
    }
    
 
    if(!this.state.isSignUp){
        auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
          if (error.code === 'auth/network-request-failed') {
             // ToastAndroid.show('Please Check Internet!', ToastAndroid.SHORT);
          } else {
              // ToastAndroid.show("Invalid Login", ToastAndroid.SHORT);
          }
        })
        .finally(() => {
          // this.setState({ startLoading: false });
        });
    }
    else{
        auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    
  }

  renderSignUp() {
    this.setState({isSignUp: !this.state.isSignUp});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.handleLogin()}>
          <Text style={styles.buttonText}>
            {!this.state.isSignUp ? 'Login' : 'Register'}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.errorText ,{ color: 'red'}]}>{this.state.error}</Text>
        <TouchableOpacity onPress={() => this.renderSignUp()}>
          <Text style={[styles.errorText ,{ color: 'white'}]}>
            {!this.state.isSignUp ? 'Dont have an account? Sign Up' : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    // justifyContent: 'center',
    // alignItems: 'center',
  
  },
  input: {
    height: 45,
    backgroundColor: 'white',
    opacity: 0.5,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 15,
  },
  errorText: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 255, 255,.5)',
    opacity: 0.5,
    borderRadius: 5,
    padding: 15,
    //   height: 45,
  },
});
