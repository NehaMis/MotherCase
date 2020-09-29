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
import LinearGradient from 'react-native-linear-gradient';

export default class EmailAndPassword extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    isSignUp: false,
    color: 'white',
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
          style={[styles.input, {
            borderColor: this.state.color,
          }]}
          value={this.state.email}
          onKeyPress={keyPress => this.setState({color: '#0172E8'}) }
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={[styles.input, {
            borderColor: this.state.color,
          }]}
          value={this.state.password}
          onKeyPress={keyPress => this.setState({color: '#0172E8'}) }
          onChangeText={(password) => this.setState({password})}
        />
        {/* <LinearGradient colors={['#12c2e9',  '#f64f59']} style={styles.linearGradient}> */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.handleLogin()}>
          <Text style={styles.buttonText}>
            {!this.state.isSignUp ? 'Login' : 'Register'}
          </Text>
        </TouchableOpacity>
        {/* </LinearGradient> */}
        <Text style={[styles.errorText ,{ color: 'red'}]}>{this.state.error}</Text>
        <TouchableOpacity onPress={() => this.renderSignUp()}>
          <Text style={[styles.errorText ,{ color: 'black'}]}>
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
  //  opacity: 0.5,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 20,
    fontSize: 15,
    borderWidth: 1,
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
   backgroundColor: '#0052D0',
  //  opacity: 0.5,
    borderRadius: 20,
    padding: 15,
       height: 45,
       justifyContent: 'center',
    alignItems: 'center',
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20
  },
});
