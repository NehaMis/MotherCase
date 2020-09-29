

import React, { Component } from 'react' ;
import { View, Text, StyleSheet, Image} from 'react-native';



export default class Logo extends Component {

    render(){
        return(
            <View>
             <Image source = {require('../assets/logo.png')}></Image>
            </View> 
        )
    }

};


