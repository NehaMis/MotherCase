

import React, { Component } from 'react' ;
import { View, Text, StyleSheet} from 'react-native';
import Logo  from './Logo';
import EmailAndPassword from './EmailAndPassword';
import LinearGradient from 'react-native-linear-gradient';


export default class LoginForm extends Component {

    render(){
        return(
          //  
            <View style ={styles.container}>
                <View style ={styles.logoContainer}>
                    <Logo/>
                </View>
                <View style ={styles.emailAndPassword}>
                    <EmailAndPassword/>
                </View>
            </View>
            
           // </LinearGradient>
        )
    }       

};


const styles = StyleSheet. create({
    container: {
      flex: 1,
    //  justifyContent: 'center',
      //alignItems: 'center',
     // backgroundColor:"#2c3e50",
    },
    logoContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
    },
    emailAndPassword:{
        flex: 2,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
  });