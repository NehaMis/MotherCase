import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import LoginForm from './LoginForm';
import UserDetails from './UserDetails';
import auth from '@react-native-firebase/auth';
import Dashboard from './Dashboard';
import firestore from '@react-native-firebase/firestore';


class App extends Component {
  
  state = {
    login_status: "false",
    initializing: true
  };

  componentDidMount(){
    this.subscriber = auth().onAuthStateChanged((user) =>{
       
        if(user!==null){
          this.setState({login_status: "true"});
 
          firestore().collection("users").doc(user.uid).get().then(data =>{

            if(!data.exists){
              this.setState({login_status: "article"});
            }
             
          }).catch(error =>{
          });
        }
        else{
          this.setState({login_status: "false"});
        }

        this.setState({initializing: false});
    })
  }

  componentWillUnmount(){
    this.subscriber && this.subscriber();
  }

  renderContent() {
    switch (this.state.login_status) {
      case "false":
        return <LoginForm/>;
      case "article":
        return <UserDetails onSubmit={(e)=> this.handleArticle(e)} />;
      default:
        return <Dashboard />;
    }
  };

  handleArticle(){
    this.setState({login_status: "true"});
  }

  render() {
    if (this.state.initializing) return null;

  return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   // alignItems: 'center',
    // backgroundColor:"#2c3e50",
  },
});

export default App;
