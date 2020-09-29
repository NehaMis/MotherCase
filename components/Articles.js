import React, { Component } from 'react' ;
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

export default class Articles extends Component {

    state = {
        height: '',
        weight: '',
        week: '',
        age: '',
        initializing: true
      };
    

    handleLogout(){
        auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }

    onSubmit() {

      const {height, weight, name, age, preg_week} = this.state;

      if( name === "" ){
        Alert.alert("Enter Valid Name")
        return;
      }

      firestore().collection("users").doc(auth().currentUser.uid).set({
        height,
        weight,
        preg_week,
        age,
        name
      });

      this.props.onSubmit();
    }

    render(){
        return(
            <LinearGradient colors={['#1A2980', '#26D0CE']}  style={styles.linearGradient}>
            <View style ={styles.container}>
            {/* <View style ={styles.articleContainer}></View> */}
            
      
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})}
          />
       
            <TextInput
             placeholder="Height"
          style={styles.input}
          value={this.state.height}
          onChangeText={(height) => this.setState({height})}
        />
        <TextInput
          placeholder="Weight"
          style={styles.input}
          value={this.state.weight}
          onChangeText={(weight) => this.setState({weight})}
        />
          <TextInput
          placeholder="Pregnancy week"
          style={styles.input}
          value={this.state.week}
          onChangeText={(week) => this.setState({week})}
        />
          <TextInput
          placeholder="Age"
          style={styles.input}
          value={this.state.age}
          onChangeText={(age) => this.setState({age})}
        />
          <TouchableOpacity 
             style={styles.buttonContainer}  onPress={() => this.onSubmit()}>
          <Text style={styles.errorText}>
            Next
          </Text>
        </TouchableOpacity>
            <TouchableOpacity style ={{padding: 20}} onPress={()=>this.handleLogout()}>
            <Text style ={{color: 'orange'}}>Logout</Text>
            </TouchableOpacity>       
            </View> 
            </LinearGradient>
        )
    }
};

const styles = StyleSheet. create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     // backgroundColor:"#2c3e50",
     // backgroundColor:"#2c3e50",
    },
    articleContainer:{
     padding: 10,
     borderBottomColor:"red",
     borderBottomWidth: 5
    },
    heading:{
    fontSize: 22,
    color: "blue",
    padding: 10,
    marginBottom: 10,
    },
    content:{
        fontSize: 22,
        color: "green",
        padding: 10,
        marginTop: 10,
    },
    input: {
        height: 44,
        width: 300,
        backgroundColor: 'white',
        opacity: 0.5,
        paddingLeft: 10,
        marginBottom: 15,
        borderRadius: 5,
        fontSize: 15,
      },
      errorText: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center',
        marginTop: 10,
      },
      buttonText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
      },
      buttonContainer: {
        height: 44,
        width: 300,
        backgroundColor: 'rgba(255, 255, 255,.5)',
        opacity: 0.5,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        //   height: 45,
      },
      linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
  });